import { getLang, loc } from './index';

// Data de referência da demonstração (todos os dados estão fechados a 23/11/2026).
export const DEMO_DATE = new Date(2026, 10, 23, 9, 42);

export const fmtNum = (n: number, dec = 0, maxDec?: number) =>
  n.toLocaleString(loc(), { minimumFractionDigits: dec, maximumFractionDigits: maxDec ?? dec });

/** € milhões: pt "€325,8 M" · en "€325.8M". */
export const fmtEurM = (n: number, dec = 1) => (getLang() === 'en' ? `€${fmtNum(n, dec)}M` : `€${fmtNum(n, dec)} M`);

/** € milhares: pt "€118 mil" · en "€118k". */
export const fmtEurK = (n: number, dec = 0) => (getLang() === 'en' ? `€${fmtNum(n, dec)}k` : `€${fmtNum(n, dec)} mil`);

export const fmtPct = (n: number, dec = 1) => `${fmtNum(n, dec)}%`;

/** "Segunda-feira, 23 de novembro de 2026" · "Monday 23 November 2026". */
export function fmtDateLong(d: Date = DEMO_DATE) {
  const s = d.toLocaleDateString(loc(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const fmtDate = (d: Date = new Date()) => d.toLocaleDateString(loc());
export const fmtDateTime = (d: Date = new Date()) => d.toLocaleString(loc());
