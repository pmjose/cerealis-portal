import { motion } from 'framer-motion';
import type { Asset } from '../data/c360';
import { getLang, useT } from '../i18n';

const UNITS: Record<Asset['kind'], string[]> = {
  moinho: ['Silo de trigo', 'Limpeza', 'Condicionamento', 'Moinho de cilindros', 'Plansichter', 'Silo de farinha', 'Ensacagem'],
  linha: ['Doseamento', 'Prensa', 'Trefila', 'Estendedor · corte', 'Secador Z1–Z3', 'Arrefecimento', 'Embalamento'],
  extrusora: ['Mistura', 'Pré-condicionador', 'Extrusora dupla rosca', 'Corte', 'Secador · tostador', 'Revestimento', 'Embalamento'],
  forno: ['Amassadeira', 'Laminador', 'Moldagem rotativa', 'Forno túnel (4 zonas)', 'Arrefecimento', 'Empilhamento', 'Embalamento'],
  silo: ['Receção 200 t/h', 'Células 1–4', 'Células 5–8', 'Células 9–12', 'Transporte para moagem'],
};
// Mesmas unidades, mesma ordem: o ícone é escolhido pelo rótulo português; o texto mostrado segue a língua.
const UNITS_EN: Record<Asset['kind'], string[]> = {
  moinho: ['Wheat silo', 'Cleaning', 'Conditioning', 'Roller mill', 'Plansifter', 'Flour silo', 'Bagging'],
  linha: ['Dosing', 'Press', 'Die', 'Spreader · cutting', 'Dryer Z1–Z3', 'Cooling', 'Packing'],
  extrusora: ['Mixing', 'Preconditioner', 'Twin-screw extruder', 'Cutting', 'Dryer · toaster', 'Coating', 'Packing'],
  forno: ['Mixer', 'Sheeter', 'Rotary moulder', 'Tunnel oven (4 zones)', 'Cooling', 'Stacking', 'Packing'],
  silo: ['Intake 200 t/h', 'Cells 1–4', 'Cells 5–8', 'Cells 9–12', 'Conveying to mill'],
};
const COL = { ok: '#17924B', aviso: '#E08600', critico: '#D92D20' };

function Glyph({ label, x, y, w, h }: { label: string; x: number; y: number; w: number; h: number }) {
  const cx = x + w / 2, cy = y + h / 2 + 6;
  if (/cilindros|Prensa|rosca|Revestimento|Amassadeira|Laminador|Moldagem/.test(label)) return (
    <g>{[-14, 14].map(dx => (
      <g key={dx} className="spin-slow" style={{ animationDirection: dx > 0 ? 'reverse' : 'normal' }}>
        <circle cx={cx + dx} cy={cy} r={12} fill="none" stroke="#121210" strokeWidth={2} />
        <line x1={cx + dx - 12} y1={cy} x2={cx + dx + 12} y2={cy} stroke="#121210" strokeWidth={1.5} />
        <line x1={cx + dx} y1={cy - 12} x2={cx + dx} y2={cy + 12} stroke="#121210" strokeWidth={1.5} />
      </g>))}
    </g>);
  if (/Secador|Forno|tostador/.test(label)) return (
    <g>{[0, 1, 2].map(i => <path key={i} d={`M ${x + 12} ${cy - 12 + i * 10} q 10 -6 20 0 t 20 0 t 20 0 t 20 0`} fill="none" stroke={i === 1 ? '#D99A00' : '#E09A0099'} strokeWidth={2} className="flow-slow" />)}</g>);
  if (/Silo|Células/.test(label)) return (
    <g>{[-18, 0, 18].map(dx => <g key={dx}><rect x={cx + dx - 7} y={cy - 16} width={14} height={28} rx={3} fill="#FFF6D6" stroke="#121210" strokeWidth={1.5} /><rect x={cx + dx - 5} y={cy - 2} width={10} height={12} fill="#FDB704" /></g>)}</g>);
  if (/Plansichter|Limpeza/.test(label)) return (
    <motion.g animate={{ x: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: .35 }}>
      {[0, 1, 2].map(i => <line key={i} x1={cx - 22} y1={cy - 10 + i * 9} x2={cx + 22} y2={cy - 10 + i * 9} stroke="#121210" strokeWidth={1.6} strokeDasharray="3 3" />)}
    </motion.g>);
  if (/Embalamento|Ensacagem|Empilhamento/.test(label)) return (
    <g>{[0, 1, 2].map(i => <motion.rect key={i} x={cx - 24 + i * 17} y={cy - 9} width={13} height={16} rx={2} fill="#FDB704" stroke="#121210" strokeWidth={1.2}
      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.8, delay: i * .3 }} />)}</g>);
  return <g><circle cx={cx} cy={cy} r={10} fill="#FFF6D6" stroke="#121210" strokeWidth={1.6} /><circle cx={cx} cy={cy} r={3} fill="#121210" /></g>;
}

export default function Schematic({ a }: { a: Asset }) {
  const t = useT();
  const units = UNITS[a.kind];
  const shown = getLang() === 'en' ? UNITS_EN[a.kind] : units;
  const W = 1000, H = 230, pad = 24, gap = 22;
  const w = (W - pad * 2 - gap * (units.length - 1)) / units.length, h = 104, y = 70;
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <b style={{ fontSize: 14.5 }}>{t('cmp.schematic.title')}</b>
        <span className="chip"><span className={`dot ${a.status}`} /> {t('cmp.schematic.sensors', { n: a.sensors.length })}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
        <defs><linearGradient id="unitg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#F6F3E6" /></linearGradient></defs>
        {units.map((u, i) => {
          const x = pad + i * (w + gap);
          return (
            <g key={u}>
              {i < units.length - 1 && <line x1={x + w} y1={y + h / 2} x2={x + w + gap} y2={y + h / 2} stroke="#D99A00" strokeWidth={3} className="flow" />}
              <rect x={x} y={y} width={w} height={h} rx={14} fill="url(#unitg)" stroke="rgba(18,18,16,.18)" />
              <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="#2A2925">{shown[i]}</text>
              <Glyph label={u} x={x} y={y + 14} w={w} h={h - 14} />
            </g>
          );
        })}
        {a.sensors.map((s, j) => {
          const x = pad + s.unit * (w + gap) + w / 2 + (j % 2 ? 18 : -18) * (a.sensors.filter(z => z.unit === s.unit).length > 1 ? 1 : 0);
          const cy = y - 18;
          return (
            <g key={s.label}>
              {s.status !== 'ok' && <circle cx={x} cy={cy} r={9} fill={COL[s.status]} opacity={.35} className="hs-pulse" />}
              <circle cx={x} cy={cy} r={9} fill={COL[s.status]} stroke="#fff" strokeWidth={2} />
              <text x={x} y={cy + 3.5} textAnchor="middle" fontSize={10} fontWeight={700} fill="#fff">{j + 1}</text>
              <line x1={x} y1={cy + 9} x2={x} y2={y} stroke={COL[s.status]} strokeWidth={1.2} strokeDasharray="2 2" />
            </g>
          );
        })}
      </svg>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 8, marginTop: 8 }}>
        {a.sensors.map((s, j) => (
          <div key={s.label} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 10px', borderRadius: 12, background: s.status === 'ok' ? '#FAF8EF' : s.status === 'aviso' ? '#FFF6E5' : '#FDEEEC', border: '1px solid var(--line)' }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: COL[s.status], color: '#fff', fontSize: 10.5, fontWeight: 700, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{j + 1}</span>
            <div style={{ minWidth: 0 }}><div className="muted" style={{ fontSize: 11.5 }}>{s.label} · {shown[s.unit]}</div><div style={{ fontWeight: 650, fontSize: 13.5 }}>{s.value}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
