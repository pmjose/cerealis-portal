import { motion } from 'framer-motion';

export function Tabs({ tabs, value, onChange }: { tabs: { id: string; label: string; icon?: React.ReactNode; badge?: string }[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="tabs">
      {tabs.map(t => (
        <button key={t.id} className={`tab ${value === t.id ? 'on' : ''}`} onClick={() => onChange(t.id)}>
          {value === t.id && <motion.span layoutId="tabpill" className="pill" transition={{ type: 'spring', damping: 30, stiffness: 320 }} />}
          {t.icon}{t.label}
          {t.badge && <span className="chip gold" style={{ padding: '0 6px', fontSize: 10.5, marginLeft: 2 }}>{t.badge}</span>}
        </button>
      ))}
    </div>
  );
}

export function Section({ title, sub, right, children, style }: { title: string; sub?: string; right?: React.ReactNode; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="card" style={{ padding: 22, ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, marginBottom: 14 }}>
        <div><div style={{ fontWeight: 650, fontSize: 15 }}>{title}</div>{sub && <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>{sub}</div>}</div>
        {right}
      </div>
      {children}
    </div>
  );
}

export function Meter({ value, color = 'var(--ink)', h = 6 }: { value: number; color?: string; h?: number }) {
  return <div className="bar" style={{ height: h }}><i style={{ width: `${Math.max(2, Math.min(100, value))}%`, background: color }} /></div>;
}

export const statusChip = (s: string) => {
  const map: Record<string, string> = { ok: 'ok', aviso: 'warn', critico: 'crit', alto: 'crit', medio: 'warn', baixo: 'ok' };
  return map[s] ?? '';
};

export function Avatar({ name, size = 36, color = '#FDB704' }: { name: string; size?: number; color?: string }) {
  const ini = name.split(' ').filter(Boolean).map(w => w[0]).filter(c => /[A-ZÁÉÍÓÚÂÊÔÃÕÇŠČŘŽ]/i.test(c)).slice(0, 2).join('').toUpperCase();
  return <div style={{ width: size, height: size, borderRadius: '50%', background: color, color: '#121210', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: size * .36, flexShrink: 0 }}>{ini}</div>;
}
