import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Lightbulb, Zap, X, Check, Download, Code2, Cpu } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ComposedChart,
} from 'recharts';
import { useToast } from '../ui/toast';
import { downloadCsv, slug } from '../utils/download';
import type { Chart } from '../data/types';

export const PALETTE = ['#F0A800', '#121210', '#29B5E8', '#D3122E', '#0A8FD3', '#8C5A14', '#17924B', '#9B968A'];
const DASH = /Plano|Meta|Orçamento|Previsão|Política|Limite|Mercado|Referência|Benchmark|Alvo|Budget/;
export const tip = {
  contentStyle: { background: 'rgba(255,255,255,.97)', border: '1px solid rgba(18,18,16,.1)', borderRadius: 12, boxShadow: '0 16px 40px -18px rgba(0,0,0,.35)', fontSize: 12.5 },
  labelStyle: { color: '#6F6B60', marginBottom: 4 }, itemStyle: { padding: 0 },
};
const axis = { stroke: '#9B968A', fontSize: 11, tickLine: false, axisLine: false } as const;
const fmtN = (v: unknown) => typeof v === 'number' ? v.toLocaleString('pt-PT', { maximumFractionDigits: 1 }) : String(v);

export const ModuleCtx = createContext<{ sv: string; schema: string }>({ sv: 'SV_GRUPO', schema: 'GRUPO' });

function Viz({ c }: { c: Chart }) {
  const col = (i: number) => c.colors?.[i] ?? PALETTE[i % PALETTE.length];
  const allDash = c.keys.every(k => DASH.test(k));
  const dash = (k: string, i: number) => DASH.test(k) && !(allDash && i === 0) ? '5 5' : undefined;
  const grid = <CartesianGrid stroke="rgba(18,18,16,.06)" vertical={false} />;
  const legend = <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />;
  const tt = <Tooltip {...tip} formatter={(v) => fmtN(v) + (c.unit ? ` ${c.unit}` : '')} cursor={{ fill: 'rgba(253,183,4,.08)' }} />;
  if (c.kind === 'pie') return (
    <PieChart>
      <Pie data={c.data} dataKey="v" nameKey="m" innerRadius="56%" outerRadius="86%" paddingAngle={2.5} stroke="#fff" strokeWidth={2}>
        {c.data.map((_, i) => <Cell key={i} fill={col(i)} />)}
      </Pie>
      {tt}<Legend iconType="circle" iconSize={8} layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: 12 }} />
    </PieChart>);
  if (c.kind === 'hbar') return (
    <BarChart data={c.data} layout="vertical" margin={{ left: 8, right: 16 }}>
      <CartesianGrid stroke="rgba(18,18,16,.06)" horizontal={false} />
      <XAxis type="number" {...axis} tickFormatter={fmtN} /><YAxis type="category" dataKey="m" {...axis} width={150} />
      {tt}{c.keys.length > 1 && legend}
      {c.keys.map((k, i) => <Bar key={k} dataKey={k} fill={col(i)} radius={[0, 6, 6, 0]} barSize={14} />)}
    </BarChart>);
  if (c.kind === 'bar' || c.kind === 'stack') return (
    <BarChart data={c.data}>
      {grid}<XAxis dataKey="m" {...axis} /><YAxis {...axis} tickFormatter={fmtN} width={44} />{tt}{legend}
      {c.keys.map((k, i) => <Bar key={k} dataKey={k} fill={col(i)} stackId={c.kind === 'stack' ? 'a' : undefined}
        radius={c.kind === 'stack' ? (i === c.keys.length - 1 ? [5, 5, 0, 0] : [0, 0, 0, 0]) : [5, 5, 0, 0]} maxBarSize={34} />)}
    </BarChart>);
  if (c.kind === 'combo') {
    const bars = c.keys.slice(0, -1), line = c.keys[c.keys.length - 1];
    return (
      <ComposedChart data={c.data}>
        {grid}<XAxis dataKey="m" {...axis} /><YAxis yAxisId="l" {...axis} tickFormatter={fmtN} width={44} /><YAxis yAxisId="r" orientation="right" {...axis} tickFormatter={fmtN} width={40} />{tt}{legend}
        {bars.map((k, i) => <Bar key={k} yAxisId="l" dataKey={k} fill={col(i)} radius={[5, 5, 0, 0]} maxBarSize={30} />)}
        <Line yAxisId="r" dataKey={line} stroke={col(bars.length)} strokeWidth={2.5} dot={{ r: 3, fill: '#fff', strokeWidth: 2 }} />
      </ComposedChart>);
  }
  if (c.kind === 'line') return (
    <LineChart data={c.data}>
      {grid}<XAxis dataKey="m" {...axis} /><YAxis {...axis} domain={['auto', 'auto']} tickFormatter={fmtN} width={44} />{tt}{legend}
      {c.keys.map((k, i) => <Line key={k} dataKey={k} stroke={col(i)} strokeWidth={2.4} dot={false} connectNulls strokeDasharray={dash(k, i)} />)}
    </LineChart>);
  return (
    <AreaChart data={c.data}>
      <defs>{c.keys.map((k, i) => (
        <linearGradient key={k} id={`g${c.id}${i}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={col(i)} stopOpacity={i === 0 ? .32 : .14} /><stop offset="1" stopColor={col(i)} stopOpacity={0} />
        </linearGradient>))}
      </defs>
      {grid}<XAxis dataKey="m" {...axis} /><YAxis {...axis} tickFormatter={fmtN} width={44} domain={['auto', 'auto']} />{tt}{legend}
      {c.keys.map((k, i) => <Area key={k} dataKey={k} stroke={col(i)} strokeWidth={2.2} fill={dash(k, i) ? 'none' : `url(#g${c.id}${i})`} connectNulls strokeDasharray={dash(k, i)} />)}
    </AreaChart>);
}

export default function ChartCard({ c }: { c: Chart }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'think' | 'done'>('idle');
  const [acted, setActed] = useState(false);
  const [sql, setSql] = useState(false);
  const { sv, schema } = useContext(ModuleCtx);
  const toast = useToast();
  const cols = ['m', ...c.keys];
  const exportData = () => {
    downloadCsv(c.title, [{ title: c.title, columns: cols.map(k => k === 'm' ? 'Dimensão' : k), rows: c.data.map(r => Object.fromEntries(cols.map(k => [k === 'm' ? 'Dimensão' : k, r[k] ?? '']))) }]);
    toast('download', 'Dados exportados', `${c.title} · ${c.data.length} linhas em CSV`);
  };
  const ask = () => { setOpen(true); if (phase === 'idle') { setPhase('think'); setTimeout(() => setPhase('done'), 1500); } };
  const table = `CEREALIS_DW.${schema}.${slug(c.title).toUpperCase().slice(0, 38)}`;
  const query = `-- Cortex Analyst · modelo semântico ${sv}\nSELECT ${c.kind === 'pie' ? 'dimensao, valor' : 'periodo, ' + c.keys.map(k => slug(k)).join(', ')}\nFROM ${table}\nWHERE empresa IN ('CPA','CM','CZ01','ES01')\n  AND data_ref >= DATEADD(month, -12, CURRENT_DATE)\nORDER BY 1;`;

  return (
    <div className="card" style={{ padding: 20, position: 'relative', overflow: 'hidden', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12, gap: 10 }}>
        <div style={{ minWidth: 0 }}><div style={{ fontWeight: 650, fontSize: 14.5 }}>{c.title}</div><div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{c.subtitle}</div></div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button onClick={exportData} className="chip" title="Exportar dados (CSV)" aria-label="Exportar CSV"><Download size={13} /></button>
          <button onClick={ask} className="chip sf"><Sparkles size={13} /> Cortex AI</button>
        </div>
      </div>
      <div style={{ height: c.height ?? 250 }}><ResponsiveContainer><Viz c={c} /></ResponsiveContainer></div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            style={{ position: 'absolute', inset: 8, top: 52, borderRadius: 16, padding: 16, background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(14px)', border: '1px solid rgba(41,181,232,.35)', boxShadow: '0 20px 50px -24px rgba(17,86,127,.45)', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, gap: 8 }}>
              <span className="chip sf"><Sparkles size={12} /> Análise Cortex · {c.title}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="chip" onClick={() => setSql(x => !x)} title="Ver SQL"><Code2 size={12} /> SQL</button>
                <button onClick={() => setOpen(false)} aria-label="Fechar"><X size={16} className="muted" /></button>
              </div>
            </div>
            {phase === 'think' ? (
              <div className="muted" style={{ fontSize: 13 }}>
                <div className="typing"><span /><span /><span /></div>
                <div style={{ marginTop: 8 }}>A analisar {c.data.length} pontos com SNOWFLAKE.CORTEX e {c.model ? c.model.split('·')[0] : 'ML FORECAST'}…</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 11, fontSize: 13, lineHeight: 1.55 }}>
                {sql && <pre className="mono" style={{ fontSize: 11.5, background: '#0F0E0B', color: '#EDE8D6', padding: 12, borderRadius: 12, whiteSpace: 'pre-wrap' }}>{query}</pre>}
                {([[Lightbulb, 'Insight', c.insight, '#B37F00'], [TrendingUp, 'Previsão', c.forecast, '#1D8FC4'], [Zap, 'Ação recomendada', c.action, '#121210']] as const).map(([I, t, txt, color], i) => (
                  <motion.div key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .15 }} style={{ display: 'flex', gap: 10 }}>
                    <I size={16} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
                    <div><b style={{ color }}>{t}</b><div>{txt}</div></div>
                  </motion.div>
                ))}
                {c.model && <div className="chip" style={{ justifySelf: 'start', fontSize: 11.5 }}><Cpu size={12} /> {c.model}</div>}
                <button className={acted ? 'btn-ghost btn-sm' : 'btn btn-sm'} style={{ justifySelf: 'start' }}
                  onClick={() => { if (acted) return; setActed(true); toast('action', 'Ação enviada para o fluxo de aprovação', `${c.action}`); }}>
                  {acted ? <><Check size={14} /> Enviada para aprovação</> : <><Zap size={14} /> Executar ação</>}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
