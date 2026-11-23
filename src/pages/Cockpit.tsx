import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, AlertTriangle, Flame, Info, UserCheck, Volume2 } from 'lucide-react';
import { useData } from '../data';
import { k, spark } from '../data/gen';
import type { Kpi } from '../data/types';
import { useFilters, applyKpi } from '../filters';
import { t, pick } from '../i18n';
import { fmtDateLong, fmtEurM, fmtNum, fmtPct } from '../i18n/format';
import { KpiCard } from '../components/Blocks';
import ChartCard from '../components/ChartCard';
import MapView from '../components/MapView';
import { useToast } from '../ui/toast';

const BRIEF = {
  pt: 'Outubro fechou com €37,4 M de vendas — o melhor mês de sempre — e o ano segue 1,5% acima do orçamento, com EBITDA de €30,6 M (9,4%). O trigo duro caiu 4,2% em 10 dias: o agente de cobertura propõe comprar 25 000 t de CWAD n.º 1, com poupança de €0,9 M, e aguarda a decisão do Nuno Ferraz. Em Lisboa, o moinho B3 tem 6 dias de vida útil remanescente — a intervenção de domingo evita 26 h de paragem. A rutura da Milaneza Esparguete no Pingo Doce foi evitada com 6 paletes de Lisboa. Atenção a Venta de Baños: vendas 3,2% acima do plano, mas OEE de 72,5% (meta 78%).',
  en: 'October closed with €37.4M in sales — the best month ever — and the year is running 1.5% above budget, with EBITDA of €30.6M (9.4%). Durum wheat fell 4.2% in 10 days: the coverage agent proposes buying 25,000 t of CWAD No. 1, saving €0.9M, and is awaiting Nuno Ferraz’s decision. In Lisbon, roller mill B3 has 6 days of remaining useful life — Sunday’s intervention avoids 26 h of downtime. The Milaneza Esparguete stock-out at Pingo Doce was avoided with 6 pallets from Lisbon. Watch Venta de Baños: sales 3.2% above plan, but OEE of 72.5% (target 78%).',
};

type Alert = { tone: 'crit' | 'warn' | 'info'; area: string; text: string; to: string };
const ALERTS: { pt: Alert[]; en: Alert[] } = {
  pt: [
    { tone: 'crit', area: 'Operações · Lisboa', text: 'Moinho B3: vibração +38% em 9 dias — vida útil remanescente de 6 dias', to: '/portal/360/ativos/LIS-MOI-B3' },
    { tone: 'warn', area: 'Compras & Cereais', text: 'Cobertura de trigo duro em 6,1 semanas (política: 8) — janela de compra aberta', to: '/portal/compras/cobertura' },
    { tone: 'warn', area: 'Compras · Qualidade', text: 'MV Sonora Star (21 500 t) com DON previsto de 980 µg/kg — ETA 09/12', to: '/portal/compras/origens' },
    { tone: 'warn', area: 'Qualidade · Maia II', text: 'Cluster de 23 reclamações de massa partida — CAPA-26-114 aberta', to: '/portal/qualidade/consumidor' },
    { tone: 'info', area: 'Comercial · Moagens', text: 'Panificação Douro (€5,6 M/ano) em risco alto de abandono', to: '/portal/360/clientes/panificacao-douro' },
  ],
  en: [
    { tone: 'crit', area: 'Operations · Lisbon', text: 'Roller mill B3: vibration +38% in 9 days — 6 days of remaining useful life', to: '/portal/360/ativos/LIS-MOI-B3' },
    { tone: 'warn', area: 'Procurement & Grains', text: 'Durum wheat coverage at 6.1 weeks (policy: 8) — buying window open', to: '/portal/compras/cobertura' },
    { tone: 'warn', area: 'Procurement · Quality', text: 'MV Sonora Star (21,500 t) with forecast DON of 980 µg/kg — ETA 09/12', to: '/portal/compras/origens' },
    { tone: 'warn', area: 'Quality · Maia II', text: 'Cluster of 23 broken-pasta complaints — CAPA-26-114 opened', to: '/portal/qualidade/consumidor' },
    { tone: 'info', area: 'Sales · Moagens', text: 'Panificação Douro (€5.6M/year) at high risk of churn', to: '/portal/360/clientes/panificacao-douro' },
  ],
};
const AI = { crit: [Flame, '#D92D20', '#FDEEEC'], warn: [AlertTriangle, '#B86E00', '#FFF6E5'], info: [Info, '#11567F', '#EAF6FC'] } as const;

// Flag explícita: os filtros escalam só volumes e valores absolutos — igual nas duas línguas, sem depender do texto.
const ratio = (x: Kpi, r: boolean): Kpi => ({ ...x, ratio: r });

function Brief() {
  const brief = pick(BRIEF);
  const [n, setN] = useState(0);
  const toast = useToast();
  useEffect(() => { const id = setInterval(() => setN(x => (x >= brief.length ? x : x + 4)), 18); return () => clearInterval(id); }, [brief]);
  const hour = new Date().getHours();
  const greet = hour < 13 ? t('pg.ck.morning') : hour < 20 ? t('pg.ck.afternoon') : t('pg.ck.evening');
  return (
    <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg,#121210 0%,#2A2416 100%)', color: '#F4F1E6', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,183,4,.35), transparent 70%)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, position: 'relative' }}>
        <div>
          <div style={{ fontSize: 13, color: '#BDB6A3' }}>{fmtDateLong()}</div>
          <h1 className="display" style={{ fontSize: 32, fontWeight: 750, letterSpacing: '-0.035em', marginTop: 4 }}>{greet}, Sofia.</h1>
        </div>
        <button className="chip" style={{ background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.16)', color: '#fff' }} onClick={() => toast('info', t('pg.ck.audioTitle'), t('pg.ck.audioText'))}><Volume2 size={12} /> {t('pg.ck.listen')}</button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 14, position: 'relative' }}><Sparkles size={15} color="#FDB704" /><b style={{ fontSize: 13.5, color: '#FDB704' }}>{t('pg.ck.briefTitle')}</b></div>
      <p style={{ fontSize: 15, lineHeight: 1.65, marginTop: 8, minHeight: 124, position: 'relative', color: '#EDE8D6' }}>{brief.slice(0, n)}{n < brief.length && <span style={{ opacity: .6 }}>▍</span>}</p>
    </div>
  );
}

export default function Cockpit() {
  const { f } = useFilters();
  const { allAgents, facts: { GROUP, BU, SALES_2026, BUDGET_2026, plantPoints }, cal: { YTD } } = useData();
  const human = allAgents.filter(a => a.mode === 'humano');
  const PRIORITY = ['ag-cob', 'ag-b3', 'ag-don', 'ag-retencao', 'ag-cheia'];
  const top = PRIORITY.map(id => human.find(a => a.id === id)).filter((a): a is NonNullable<typeof a> => !!a);
  const kpis = [
    ratio(k(t('pg.salesYtd'), fmtEurM(325.8), t('pg.ck.kpi.salesDelta'), true, true, spark(1, 26, 2, 0.4)), false),
    ratio(k(t('pg.ck.kpi.ebitda'), fmtEurM(30.6), t('pg.ck.kpi.ebitdaDelta'), true, true, spark(2, 2.4, 0.3, 0.6)), false),
    ratio(k(t('pg.ck.kpi.forecast'), fmtEurM(398.2), t('pg.ck.kpi.yoy27'), true, true), false),
    ratio(k(t('pg.ck.kpi.value'), fmtEurM(GROUP.valueYTD), t('pg.ck.kpi.valueDelta', { v: fmtEurM(GROUP.valueRunRate) }), true, true, spark(3, 4, 0.5, 0.9)), false),
    ratio(k(t('pg.ck.kpi.oee'), fmtPct(78.6), t('pg.ck.kpi.oeeDelta'), true, true), true),
    ratio(k(t('pg.ck.kpi.otif'), fmtPct(95.8), t('pg.ck.kpi.otifDelta'), true, true), true),
    ratio(k(t('pg.ck.kpi.share'), fmtPct(33.4), t('pg.ck.kpi.shareDelta'), true, true), true),
    ratio(k(t('pg.ck.kpi.wheat'), '€318/t', t('pg.ck.kpi.wheatDelta'), false, true), true),
  ];
  const [kPa, kBudget, kMargin] = [t('pg.ck.c1.pa'), t('pg.ck.c1.budget'), t('pg.ck.c2.key')];
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div className="grid" style={{ gridTemplateColumns: '1.7fr 1fr' }}>
        <Brief />
        <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="muted" style={{ fontSize: 12.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>{t('pg.ck.waiting')}</div>
            <div className="display" style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.05, marginTop: 6 }}>{human.length}</div>
            <div className="muted" style={{ fontSize: 13 }}>{t('pg.humanAgents')}</div>
          </div>
          <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
            {top.map(a => (
              <Link key={a.id} to="/portal/decisoes" style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 11px', borderRadius: 12, background: '#FFF8DE', border: '1px solid rgba(217,154,0,.3)', fontSize: 13 }}>
                <UserCheck size={14} color="#B37F00" /><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><b>{a.name}</b> · {a.impact}</span><ArrowRight size={13} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="grid kpis">{kpis.map((x, i) => <KpiCard key={x.label} k={applyKpi(x, f)} i={i} />)}</div>
      <div className="grid charts">
        <ChartCard c={{ id: 'ck1', title: t('pg.ck.c1.title'), subtitle: t('pg.ck.c1.sub'), kind: 'stack', keys: [kPa, 'Cerealis Moagens', 'Cerealis a.s.', 'Pasta VB3'],
          data: YTD.map((m, i) => ({ m, [kPa]: SALES_2026.pa[i], 'Cerealis Moagens': SALES_2026.cm[i], 'Cerealis a.s.': SALES_2026.cz[i], 'Pasta VB3': SALES_2026.es[i], [kBudget]: BUDGET_2026[i] })),
          colors: ['#D3122E', '#8C5A14', '#121210', '#29B5E8'], insight: t('pg.ck.c1.insight'), forecast: t('pg.ck.c1.forecast'), action: t('pg.ck.c1.action'), model: t('pg.ck.c1.model') }} />
        <ChartCard c={{ id: 'ck2', title: t('pg.ck.c2.title'), subtitle: 'YTD', kind: 'bar', keys: [kMargin], ratio: true,
          data: BU.map(b => ({ m: b.short, [kMargin]: b.margin })), colors: ['#F0A800'],
          insight: t('pg.ck.c2.insight'), forecast: t('pg.ck.c2.forecast'), action: t('pg.ck.c2.action') }} />
      </div>
      <div className="grid kpis">
        {BU.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05 }} style={{ height: '100%' }}>
            <Link to={`/portal/${b.id === 'pa' ? 'produtos-alimentares' : b.id === 'cm' ? 'moagens' : b.id === 'cz' ? 'cerealis-cz' : 'vb3'}`} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 18, borderTop: `3px solid ${b.color}` }}>
              <div style={{ fontWeight: 650 }}>{b.name}</div>
              <div className="muted" style={{ fontSize: 12, marginTop: 2, minHeight: 32 }}>{b.desc}</div>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, alignItems: 'baseline' }}>
                <span className="display" style={{ fontSize: 24, fontWeight: 750 }}>{fmtEurM(b.ytd)}</span>
                <span className="chip">{fmtNum(b.margin, 0, 3)}% EBITDA</span>
              </div>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>2026E: {fmtEurM(b.fy)} · {b.country}</div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="card" style={{ padding: 8 }}>
          <div style={{ padding: '10px 12px 12px', display: 'flex', justifyContent: 'space-between' }}><b style={{ fontSize: 14.5 }}>{t('pg.ck.plants')}</b><Link to="/portal/operacoes" className="chip">{t('pg.ck.ops')} <ArrowRight size={12} /></Link></div>
          <MapView points={plantPoints} height={380} />
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><Sparkles size={16} color="#1D8FC4" /><b style={{ fontSize: 14.5 }}>{t('pg.ck.alerts')}</b><span className="chip sf" style={{ marginLeft: 'auto' }}>Cortex · 09:42</span></div>
          <div style={{ display: 'grid', gap: 9 }}>
            {pick(ALERTS).map(a => {
              const [I, c, bg] = AI[a.tone];
              return (
                <Link key={a.to} to={a.to} style={{ display: 'flex', gap: 10, padding: '11px 12px', borderRadius: 13, background: bg, border: `1px solid ${c}26`, alignItems: 'start' }}>
                  <I size={16} color={c} style={{ flexShrink: 0, marginTop: 1 }} />
                  <div style={{ flex: 1 }}><div style={{ fontSize: 11.5, fontWeight: 650, color: c }}>{a.area}</div><div style={{ fontSize: 13, marginTop: 2, lineHeight: 1.45 }}>{a.text}</div></div>
                  <ArrowRight size={13} style={{ marginTop: 3, opacity: .5 }} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
