// Downloads gerados no browser: CSV (separador de lista do Excel: ';' em PT, ',' em EN) e PDF simples de uma ou mais páginas.
import { getLang, t } from '../i18n';
import { fmtDateTime } from '../i18n/format';

function save(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const slug = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w]+/g, '_').replace(/^_|_$/g, '').toLowerCase();
export const stamp = () => new Date().toISOString().slice(0, 10);

export type Sheet = { title: string; columns: string[]; rows: Record<string, string | number>[] };
const cell = (v: unknown, sep: string) => { const s = String(v ?? ''); return s.includes(sep) || /["\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };

export function downloadCsv(name: string, sheets: Sheet[]) {
  const sep = getLang() === 'en' ? ',' : ';';
  const line = (vs: unknown[]) => vs.map(v => cell(v, sep)).join(sep);
  const body = sheets.map(s => [line([`# ${s.title}`]), line(s.columns), ...s.rows.map(r => line(s.columns.map(c => r[c])))].join('\r\n')).join('\r\n\r\n');
  save(new Blob(['\ufeff' + body], { type: 'text/csv;charset=utf-8' }), `cerealis_${slug(name)}_${stamp()}.csv`);
}

/* ── PDF mínimo (Helvetica, WinAnsi) ── */
const WIN: Record<string, number> = { '€': 0x80, '—': 0x97, '–': 0x96, '•': 0x95, '‘': 0x91, '’': 0x92, '“': 0x93, '”': 0x94, '…': 0x85, 'Š': 0x8a, 'š': 0x9a, 'Ž': 0x8e, 'ž': 0x9e };
function enc(s: string) {
  let out = '';
  for (const ch of s) {
    const code = WIN[ch] ?? (ch.charCodeAt(0) < 256 ? ch.charCodeAt(0) : 63);
    const c = String.fromCharCode(code);
    out += c === '(' || c === ')' || c === '\\' ? '\\' + c : code > 126 ? '\\' + code.toString(8).padStart(3, '0') : c;
  }
  return out;
}
const sub = (s: string) => s
  .replace(/[₂]/g, '2').replace(/[≥]/g, '>=').replace(/[≤]/g, '<=').replace(/[→]/g, '->').replace(/[↑]/g, t('cmp.pdf.up')).replace(/[↓]/g, t('cmp.pdf.down'))
  .replace(/[čČ]/g, m => (m === 'č' ? 'c' : 'C')).replace(/[řŘ]/g, m => (m === 'ř' ? 'r' : 'R')).replace(/[ěĚ]/g, m => (m === 'ě' ? 'e' : 'E')).replace(/[ůŮ]/g, m => (m === 'ů' ? 'u' : 'U'));
function wrap(s: string, max: number) {
  const out: string[] = []; let line = '';
  for (const w of s.split(' ')) { if ((line + ' ' + w).trim().length > max) { out.push(line); line = w; } else line = (line + ' ' + w).trim(); }
  if (line) out.push(line); return out;
}

export type PdfLine = { text: string; size?: number; bold?: boolean; color?: [number, number, number]; gap?: number };

export function downloadPdf(name: string, title: string, subtitle: string, lines: PdfLine[]) {
  const W = 595, Hh = 842, M = 50;
  const pages: string[] = []; let ops = ''; let y = 0;
  const header = () => {
    ops = `0.992 0.718 0.016 rg 0 ${Hh - 8} ${W} 8 re f\n0.07 0.07 0.06 rg ${W * .82} ${Hh - 8} ${W * .18} 8 re f\n`;
    ops += `BT /F2 9 Tf 0.07 0.07 0.06 rg ${M} ${Hh - 34} Td (${enc('CEREALIS  ·  ESPIGA')}) Tj ET\n`;
    ops += `BT /F2 20 Tf 0.07 0.07 0.06 rg ${M} ${Hh - 64} Td (${enc(sub(title))}) Tj ET\n`;
    ops += `BT /F1 10 Tf 0.43 0.42 0.38 rg ${M} ${Hh - 82} Td (${enc(sub(subtitle))}) Tj ET\n`;
    ops += `0.86 0.85 0.8 RG 0.5 w ${M} ${Hh - 94} m ${W - M} ${Hh - 94} l S\n`;
    y = Hh - 118;
  };
  const footer = (n: number) => `BT /F1 8 Tf 0.55 0.53 0.48 rg ${M} 30 Td (${enc(t('cmp.pdf.footer', { date: fmtDateTime() }))}) Tj ET\nBT /F1 8 Tf ${W - M - 40} 30 Td (${enc(t('cmp.pdf.page', { n }))}) Tj ET\n`;
  header();
  for (const l of lines) {
    const size = l.size ?? 10.5, lh = size * 1.45;
    for (const part of wrap(sub(l.text), Math.floor((W - 2 * M) / (size * .5)))) {
      if (y < 60) { pages.push(ops + footer(pages.length + 1)); header(); }
      const [r, g, b] = l.color ?? [0.13, 0.13, 0.12];
      ops += `BT /${l.bold ? 'F2' : 'F1'} ${size} Tf ${r} ${g} ${b} rg ${M} ${y} Td (${enc(part)}) Tj ET\n`;
      y -= lh;
    }
    y -= l.gap ?? 2;
  }
  pages.push(ops + footer(pages.length + 1));

  const objs: string[] = [];
  const add = (s: string) => { objs.push(s); return objs.length; };
  add('<< /Type /Catalog /Pages 2 0 R >>'); add('');
  const f1 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const f2 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  const kids: number[] = [];
  for (const p of pages) {
    const c = add(`<< /Length ${p.length} >>\nstream\n${p}endstream`);
    kids.push(add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${Hh}] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> >> /Contents ${c} 0 R >>`));
  }
  objs[1] = `<< /Type /Pages /Kids [${kids.map(k => `${k} 0 R`).join(' ')}] /Count ${kids.length} >>`;
  let pdf = '%PDF-1.4\n'; const off: number[] = [];
  objs.forEach((o, i) => { off.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${off.map(o => String(o).padStart(10, '0') + ' 00000 n \n').join('')}trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const bytes = new Uint8Array(pdf.length); for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;
  save(new Blob([bytes], { type: 'application/pdf' }), `cerealis_${slug(name)}_${stamp()}.pdf`);
}

export async function copyLink() {
  try { await navigator.clipboard.writeText(location.href); return true; } catch { return false; }
}
