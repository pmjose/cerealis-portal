import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, AlertTriangle, CheckCircle2, Info, TrendingUp, TrendingDown, Cpu, ArrowRight, SlidersHorizontal, Flame } from 'lucide-react';
import type { Block, Insight, Kpi, Model, FlowNode, ScenarioInput, ScenarioOutput } from '../data/types';
import { useFilters, applyChart, applyKpi } from '../filters';
import ChartCard from './ChartCard';
import MapView from './MapView';
import AgentFlow from './AgentFlow';
import Trace from './Trace';
import { Meter } from '../ui/kit';

function Spark({ d, good }: { d: number[]; good: boolean }) {
  const min = Math.min(...d), max = Math.max(...d), r = max - min || 1;
  const pts = d.map((v, i) => `${(i / (d.length - 1)) * 100},${28 - ((v - min) / r) * 24}`).join(' ');
  const c = good ? '#17924B' : '#D92D20';
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: '100%', height: 30, marginTop: 8 }}>
      <polyline points={`0,30 ${pts} 100,30`} fill={c + '14'} stroke="none" />
      <polyline points={pts} fill="none" stroke={c} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function KpiCard({ k, i = 0 }: { k: Kpi; i?: number }) {
  const col = k.good ? 'var(--ok)' : 'var(--crit)';
  return (
    <motion.div className="card kpi" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05, duration: .45 }} title={k.hint}>
      <div className="l">{k.label}</div>
      <div className="v">{k.value}</div>
      <div style={{ fontSize: 12.5, color: col, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 550 }}>
        {k.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}{k.delta}
      </div>
      {k.spark && <Spark d={k.spark} good={k.good} />}
    </motion.div>
  );
}

const tone = (v: string) => /crít|alto|alta|rutura|atras|falha|rejeit|bloque|vencid|parado|excede|fora/i.test(v) ? 'crit'
  : /aten|médi|medio|aviso|risco|pend|revis|ligeir|em curso|análise|aguard|piloto|limite/i.test(v) ? 'warn'
    : /ok|normal|baixo|baixa|conform|aprov|ativo|ativa|concl|estável|em dia|cumpr|produção|certificad|válid|no prazo|regular/i.test(v) ? 'ok' : '';

export function DataTable({ title, sub, columns, rows, status = [], bars = [], link }: Extract<Block, { t: 'table' }>) {
  const nav = useNavigate();
  return (
    <div className="card" style={{ padding: 8, height: '100%' }}>
      <div style={{ padding: '12px 14px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
        <div><b style={{ fontSize: 14.5 }}>{title}</b>{sub && <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{sub}</div>}</div>
        <span className="chip" style={{ color: 'var(--muted)' }}>{rows.length} registos</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="t">
          <thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={link ? 'click' : ''} onClick={link ? () => nav(`${link.base}/${r[link.idCol]}`) : undefined}>
                {columns.map((c, j) => {
                  const v = r[c];
                  if (status.includes(c)) { const t = tone(String(v)); return <td key={c}><span className={`chip ${t}`}>{t && <span className={`dot ${t}`} style={{ width: 6, height: 6 }} />}{v}</span></td>; }
                  if (bars.includes(c) && typeof v === 'number') return <td key={c} style={{ minWidth: 120 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ flex: 1 }}><Meter value={v} color={v >= 85 ? 'var(--ok)' : v >= 70 ? 'var(--gold-deep)' : 'var(--crit)'} /></div><span style={{ fontSize: 12.5, fontVariantNumeric: 'tabular-nums' }}>{v.toLocaleString('pt-PT')}</span></div></td>;
                  return <td key={c} style={{ fontWeight: j === 0 ? 550 : undefined, whiteSpace: j === 0 ? 'nowrap' : undefined, fontVariantNumeric: 'tabular-nums' }}>
                    {typeof v === 'number' ? v.toLocaleString('pt-PT') : v}
                    {j === 0 && link && <ArrowRight size={12} style={{ display: 'inline', marginLeft: 6, verticalAlign: -1, opacity: .4 }} />}
                  </td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const IT = { ok: [CheckCircle2, '#17924B', '#E9F7EF'], warn: [AlertTriangle, '#B86E00', '#FFF6E5'], crit: [Flame, '#C3271B', '#FDEEEC'], info: [Info, '#11567F', '#EAF6FC'] } as const;
export function Insights({ items, title }: { items: Insight[]; title?: string }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <Sparkles size={16} color="#1D8FC4" /><b style={{ fontSize: 14.5 }}>{title ?? 'Insights Cortex'}</b>
        <span className="chip sf" style={{ marginLeft: 'auto' }}>Gerados às 07:30 · Cortex AI</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, minmax(0,1fr))`, gap: 12 }}>
        {items.map((it, i) => {
          const [I, c, bg] = IT[it.tone];
          return (
            <motion.div key={it.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .07 }}
              style={{ padding: 14, borderRadius: 14, background: bg, border: `1px solid ${c}26` }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'start' }}>
                <I size={16} color={c} style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div style={{ fontWeight: 650, fontSize: 13.5 }}>{it.title}</div>
                  <div style={{ fontSize: 13, marginTop: 4, lineHeight: 1.5, color: '#3B3A35' }}>{it.text}</div>
                  {it.tag && <div className="chip" style={{ marginTop: 8, fontSize: 11 }}>{it.tag}</div>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Funnel({ title, sub, stages }: Extract<Block, { t: 'funnel' }>) {
  const max = Math.max(...stages.map(s => s[1]));
  return (
    <div className="card" style={{ padding: 20, height: '100%' }}>
      <b style={{ fontSize: 14.5 }}>{title}</b>{sub && <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{sub}</div>}
      <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
        {stages.map(([l, v, d], i) => (
          <div key={l}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}><span style={{ fontWeight: 550 }}>{l}</span><span className="muted">{d}</span></div>
            <div style={{ height: 26, borderRadius: 8, background: 'rgba(18,18,16,.05)', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${(v / max) * 100}%` }} transition={{ duration: .9, delay: i * .08 }}
                style={{ height: '100%', borderRadius: 8, background: i === stages.length - 1 ? 'linear-gradient(90deg,#E09A00,#FDB704)' : `rgba(18,18,16,${0.82 - i * 0.12})`, display: 'flex', alignItems: 'center', paddingLeft: 10, color: '#fff', fontSize: 12, fontWeight: 600 }}>
                {v.toLocaleString('pt-PT')}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Models({ items, title }: { items: Model[]; title?: string }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}><Cpu size={16} /><b style={{ fontSize: 14.5 }}>{title ?? 'Modelos de machine learning'}</b><span className="chip" style={{ marginLeft: 'auto' }}>Snowflake Model Registry</span></div>
      <div className="grid three" style={{ gap: 12 }}>
        {items.map(m => (
          <div key={m.name} style={{ padding: 14, borderRadius: 14, border: '1px solid var(--line)', background: '#FCFBF6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, alignItems: 'start' }}>
              <div style={{ fontWeight: 650, fontSize: 13.5 }}>{m.name}</div>
              <span className={`chip ${m.status === 'Produção' ? 'ok' : m.status === 'Piloto' ? 'gold' : 'sf'}`} style={{ fontSize: 10.5 }}>{m.status}</span>
            </div>
            <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{m.kind}</div>
            <div style={{ fontSize: 13, marginTop: 8 }}><b>{m.metric}</b></div>
            <div className="muted" style={{ fontSize: 11.5, marginTop: 6, lineHeight: 1.45 }}>Variáveis: {m.features}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              <span className={`chip ${m.drift === 'Estável' ? 'ok' : 'warn'}`} style={{ fontSize: 10.5 }}>Drift: {m.drift}</span>
              <span className="chip" style={{ fontSize: 10.5 }}>Treino {m.trained}</span>
              {m.value && <span className="chip gold" style={{ fontSize: 10.5 }}>{m.value}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Heat({ title, sub, rows, cols, values, unit, good = 'high', fmt }: Extract<Block, { t: 'heat' }>) {
  const flat = values.flat(), min = Math.min(...flat), max = Math.max(...flat);
  const color = (v: number) => {
    let x = (v - min) / (max - min || 1); if (good === 'low') x = 1 - x;
    if (x > 0.66) return `rgba(23,146,75,${0.18 + (x - 0.66) * 1.6})`;
    if (x > 0.33) return `rgba(253,183,4,${0.25 + (x - 0.33) * 1.4})`;
    return `rgba(217,45,32,${0.16 + (0.33 - x) * 1.8})`;
  };
  return (
    <div className="card" style={{ padding: 20, height: '100%' }}>
      <b style={{ fontSize: 14.5 }}>{title}</b>{sub && <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{sub}</div>}
      <div style={{ overflowX: 'auto', marginTop: 14 }}>
        <table style={{ borderCollapse: 'separate', borderSpacing: 3, width: '100%', fontSize: 12 }}>
          <thead><tr><th />{cols.map(c => <th key={c} className="muted" style={{ fontWeight: 550, padding: '2px 4px', whiteSpace: 'nowrap' }}>{c}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r}>
                <td style={{ fontWeight: 550, paddingRight: 10, whiteSpace: 'nowrap' }}>{r}</td>
                {values[i].map((v, j) => <td key={j} title={`${r} · ${cols[j]}: ${v}${unit ?? ''}`} style={{ background: color(v), borderRadius: 7, textAlign: 'center', padding: '8px 4px', fontVariantNumeric: 'tabular-nums', fontWeight: 550 }}>{fmt ? fmt(v) : v.toLocaleString('pt-PT')}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Flow({ title, sub, nodes }: { title: string; sub?: string; nodes: FlowNode[] }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <b style={{ fontSize: 14.5 }}>{title}</b>{sub && <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{sub}</div>}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, marginTop: 16, overflowX: 'auto' }}>
        {nodes.map((n, i) => (
          <div key={n.label} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 150 }}>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }}
              style={{ flex: 1, padding: '12px 14px', borderRadius: 14, background: n.status === 'critico' ? '#FDEEEC' : n.status === 'aviso' ? '#FFF6E5' : '#FAF8EF', border: '1px solid var(--line)' }}>
              <div className="muted" style={{ fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', display: 'flex', alignItems: 'center', gap: 6 }}>{n.status && <span className={`dot ${n.status}`} style={{ width: 6, height: 6 }} />}{n.label}</div>
              <div className="display" style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>{n.value}</div>
              {n.sub && <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>{n.sub}</div>}
            </motion.div>
            {i < nodes.length - 1 && <svg width="26" height="14" style={{ flexShrink: 0 }}><line x1="2" y1="7" x2="22" y2="7" stroke="#D99A00" strokeWidth="2" className="flow" /><path d="M18 3 L24 7 L18 11" fill="none" stroke="#D99A00" strokeWidth="2" /></svg>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Scenario({ title, sub, inputs, outputs, note }: { title: string; sub?: string; inputs: ScenarioInput[]; outputs: ScenarioOutput[]; note?: string }) {
  const [v, setV] = useState<Record<string, number>>(Object.fromEntries(inputs.map(i => [i.id, i.value])));
  return (
    <div className="card" style={{ padding: 20, background: 'linear-gradient(160deg,#FFFBEA,#fff 60%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><SlidersHorizontal size={16} /><b style={{ fontSize: 14.5 }}>{title}</b><span className="chip gold" style={{ marginLeft: 'auto' }}>Simulador · Snowpark</span></div>
      {sub && <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{sub}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24, marginTop: 16 }}>
        <div style={{ display: 'grid', gap: 16 }}>
          {inputs.map(i => (
            <div key={i.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>{i.label}</span><b>{v[i.id] > 0 && i.min < 0 ? '+' : ''}{v[i.id].toLocaleString('pt-PT')} {i.unit}</b></div>
              <input type="range" min={i.min} max={i.max} step={i.step} value={v[i.id]} onChange={e => setV(x => ({ ...x, [i.id]: +e.target.value }))} style={{ width: '100%', accentColor: '#121210', marginTop: 6 }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
          {outputs.map(o => {
            const n = o.calc(v); const g = o.good ? o.good(n) : true;
            return (
              <div key={o.label} style={{ padding: '12px 14px', borderRadius: 14, background: '#fff', border: '1px solid var(--line)' }}>
                <div className="muted" style={{ fontSize: 12 }}>{o.label}</div>
                <div className="display" style={{ fontSize: 24, fontWeight: 700, color: g ? 'var(--ink)' : 'var(--crit)' }}>{o.fmt(n)}</div>
              </div>
            );
          })}
        </div>
      </div>
      {note && <div className="muted" style={{ fontSize: 11.5, marginTop: 12 }}>{note}</div>}
    </div>
  );
}

export default function Blocks({ blocks }: { blocks: Block[] }) {
  const { f } = useFilters();
  return (
    <div className="grid charts">
      {blocks.map((b, i) => {
        const full = { gridColumn: '1 / -1' };
        switch (b.t) {
          case 'kpis': return <div key={i} className="grid kpis" style={full}>{b.items.map((k, j) => <KpiCard key={k.label} k={applyKpi(k, f)} i={j} />)}</div>;
          case 'chart': return <div key={i} style={b.span ? full : undefined}><ChartCard c={applyChart(b.c, f)} /></div>;
          case 'table': return <div key={i} style={b.span ? full : undefined}><DataTable {...b} /></div>;
          case 'insights': return <div key={i} style={full}><Insights items={b.items} title={b.title} /></div>;
          case 'funnel': return <div key={i} style={b.span ? full : undefined}><Funnel {...b} /></div>;
          case 'models': return <div key={i} style={full}><Models items={b.items} title={b.title} /></div>;
          case 'heat': return <div key={i} style={b.span ? full : undefined}><Heat {...b} /></div>;
          case 'flow': return <div key={i} style={full}><Flow {...b} /></div>;
          case 'scenario': return <div key={i} style={b.span === false ? undefined : full}><Scenario {...b} /></div>;
          case 'trace': return <div key={i} style={full}><Trace title={b.title} /></div>;
          case 'map': return (
            <div key={i} className="card" style={{ padding: 8, ...full }}>
              <div style={{ padding: '10px 12px 12px', display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}><b style={{ fontSize: 14.5 }}>{b.title}</b>
                <span style={{ display: 'flex', gap: 12, fontSize: 12 }} className="muted">
                  {b.legend ? b.legend.map(([l, c]) => <span key={l} style={{ display: 'flex', gap: 6, alignItems: 'center' }}><span className="dot" style={{ background: c }} />{l}</span>)
                    : (['ok', 'aviso', 'critico'] as const).map(s => <span key={s} style={{ display: 'flex', gap: 6, alignItems: 'center' }}><span className={`dot ${s}`} />{b.points.filter(a => a.status === s).length} {s === 'ok' ? 'normal' : s === 'aviso' ? 'atenção' : 'crítico'}</span>)}
                </span>
              </div>
              <MapView points={b.points} routes={b.routes} height={b.height ?? 430} />
            </div>);
          case 'agents': return b.items.map(a => <div key={`${i}-${a.id}`}><AgentFlow a={a} /></div>);
        }
      })}
    </div>
  );
}
