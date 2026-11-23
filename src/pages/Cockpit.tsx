import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, AlertTriangle, Flame, Info, UserCheck, Volume2 } from 'lucide-react';
import { GROUP, BU, SALES_2026, BUDGET_2026, plantPoints } from '../data/facts';
import { YTD, k, spark } from '../data/gen';
import { allAgents } from '../data/modules';
import { useFilters, applyKpi } from '../filters';
import { KpiCard } from '../components/Blocks';
import ChartCard from '../components/ChartCard';
import MapView from '../components/MapView';
import { useToast } from '../ui/toast';

const BRIEF = 'Outubro fechou com €37,4 M de vendas — o melhor mês de sempre — e o ano segue 1,5% acima do orçamento, com EBITDA de €30,6 M (9,4%). O trigo duro caiu 4,2% em 10 dias: o agente de cobertura propõe comprar 25 000 t de CWAD n.º 1, com poupança de €0,9 M, e aguarda a decisão do Nuno Ferraz. Em Lisboa, o moinho B3 tem 6 dias de vida útil remanescente — a intervenção de domingo evita 26 h de paragem. A rutura da Milaneza Esparguete no Pingo Doce foi evitada com 6 paletes de Lisboa. Atenção a Venta de Baños: vendas 3,2% acima do plano, mas OEE de 72,5% (meta 78%).';

const ALERTS: { tone: 'crit' | 'warn' | 'info'; area: string; text: string; to: string }[] = [
  { tone: 'crit', area: 'Operações · Lisboa', text: 'Moinho B3: vibração +38% em 9 dias — vida útil remanescente de 6 dias', to: '/portal/360/ativos/LIS-MOI-B3' },
  { tone: 'warn', area: 'Compras & Cereais', text: 'Cobertura de trigo duro em 6,1 semanas (política: 8) — janela de compra aberta', to: '/portal/compras/cobertura' },
  { tone: 'warn', area: 'Compras · Qualidade', text: 'MV Sonora Star (21 500 t) com DON previsto de 980 µg/kg — ETA 09/12', to: '/portal/compras/origens' },
  { tone: 'warn', area: 'Qualidade · Maia II', text: 'Cluster de 23 reclamações de massa partida — CAPA-26-114 aberta', to: '/portal/qualidade/consumidor' },
  { tone: 'info', area: 'Comercial · Moagens', text: 'Panificação Douro (€5,6 M/ano) em risco alto de abandono', to: '/portal/360/clientes/panificacao-douro' },
];
const AI = { crit: [Flame, '#D92D20', '#FDEEEC'], warn: [AlertTriangle, '#B86E00', '#FFF6E5'], info: [Info, '#11567F', '#EAF6FC'] } as const;

function Brief() {
  const [n, setN] = useState(0);
  const toast = useToast();
  useEffect(() => { const id = setInterval(() => setN(x => (x >= BRIEF.length ? x : x + 4)), 18); return () => clearInterval(id); }, []);
  const hour = new Date().getHours();
  const greet = hour < 13 ? 'Bom dia' : hour < 20 ? 'Boa tarde' : 'Boa noite';
  return (
    <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg,#121210 0%,#2A2416 100%)', color: '#F4F1E6', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,183,4,.35), transparent 70%)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, position: 'relative' }}>
        <div>
          <div style={{ fontSize: 13, color: '#BDB6A3' }}>Segunda-feira, 23 de novembro de 2026</div>
          <h1 className="display" style={{ fontSize: 32, fontWeight: 750, letterSpacing: '-0.035em', marginTop: 4 }}>{greet}, Sofia.</h1>
        </div>
        <button className="chip" style={{ background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.16)', color: '#fff' }} onClick={() => toast('info', 'Briefing em áudio', 'A versão em áudio (2 min) foi enviada para o seu telemóvel.')}><Volume2 size={12} /> Ouvir</button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 14, position: 'relative' }}><Sparkles size={15} color="#FDB704" /><b style={{ fontSize: 13.5, color: '#FDB704' }}>Briefing Cortex do dia</b></div>
      <p style={{ fontSize: 15, lineHeight: 1.65, marginTop: 8, minHeight: 124, position: 'relative', color: '#EDE8D6' }}>{BRIEF.slice(0, n)}{n < BRIEF.length && <span style={{ opacity: .6 }}>▍</span>}</p>
    </div>
  );
}

export default function Cockpit() {
  const { f } = useFilters();
  const human = allAgents.filter(a => a.mode === 'humano');
  const PRIORITY = ['ag-cob', 'ag-b3', 'ag-don', 'ag-retencao', 'ag-cheia'];
  const top = PRIORITY.map(id => human.find(a => a.id === id)).filter((a): a is NonNullable<typeof a> => !!a);
  const kpis = [
    k('Vendas YTD', '€325,8 M', '+1,5% vs. orçamento', true, true, spark(1, 26, 2, 0.4)),
    k('EBITDA YTD', '€30,6 M', 'margem 9,4% · +27% a/a', true, true, spark(2, 2.4, 0.3, 0.6)),
    k('Previsão de vendas 2026', '€398,2 M', '+27% a/a', true, true),
    k('Valor capturado pela Espiga', `€${GROUP.valueYTD.toLocaleString('pt-PT')} M`, `regime: €${GROUP.valueRunRate.toLocaleString('pt-PT')} M/ano`, true, true, spark(3, 4, 0.5, 0.9)),
    k('OEE do grupo', '78,6%', '+3,4 pp a/a', true, true),
    k('OTIF', '95,8%', '+2,3 pp a/a', true, true),
    k('Quota massas secas PT', '33,4%', 'Milaneza + Nacional · +0,7 pp', true, true),
    k('Custo médio trigo duro', '€318/t', '−4,2% em 10 dias', false, true),
  ];
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div className="grid" style={{ gridTemplateColumns: '1.7fr 1fr' }}>
        <Brief />
        <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="muted" style={{ fontSize: 12.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>Decisões à sua espera</div>
            <div className="display" style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.05, marginTop: 6 }}>{human.length}</div>
            <div className="muted" style={{ fontSize: 13 }}>agentes com humano no circuito</div>
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
        <ChartCard c={{ id: 'ck1', title: 'Vendas do grupo por unidade vs. orçamento (€ M)', subtitle: '2026 · jan–out', kind: 'stack', keys: ['Produtos Alimentares', 'Cerealis Moagens', 'Cerealis a.s.', 'Pasta VB3'],
          data: YTD.map((m, i) => ({ m, 'Produtos Alimentares': SALES_2026.pa[i], 'Cerealis Moagens': SALES_2026.cm[i], 'Cerealis a.s.': SALES_2026.cz[i], 'Pasta VB3': SALES_2026.es[i], 'Orçamento': BUDGET_2026[i] })),
          colors: ['#D3122E', '#8C5A14', '#121210', '#29B5E8'], insight: 'O grupo está 1,5% acima do orçamento (+€4,8 M), com todas as unidades exceto a Moagens acima do plano.', forecast: 'Fecho previsto em €398,2 M, 0,9% acima do orçamento anual.', action: 'Rever com a Moagens o ajuste de tabela de janeiro (+1,5%).', model: 'Previsão de vendas · Snowflake ML FORECAST' }} />
        <ChartCard c={{ id: 'ck2', title: 'Margem EBITDA por unidade (%)', subtitle: 'YTD', kind: 'bar', keys: ['Margem EBITDA'], ratio: true,
          data: BU.map(b => ({ m: b.short, 'Margem EBITDA': b.margin })), colors: ['#F0A800'],
          insight: 'Produtos Alimentares (11,2%) e Cerealis a.s. (10,4%) puxam a margem do grupo; a Moagens (7,1%) é a mais exposta ao trigo mole.', forecast: 'A Pasta VB3 chega a 9% em 2027 com as sinergias de compras.', action: 'Acelerar a compra conjunta de trigo para a VB3 (€1,4 M/ano).' }} />
      </div>
      <div className="grid kpis">
        {BU.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05 }} style={{ height: '100%' }}>
            <Link to={`/portal/${b.id === 'pa' ? 'produtos-alimentares' : b.id === 'cm' ? 'moagens' : b.id === 'cz' ? 'cerealis-cz' : 'vb3'}`} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 18, borderTop: `3px solid ${b.color}` }}>
              <div style={{ fontWeight: 650 }}>{b.name}</div>
              <div className="muted" style={{ fontSize: 12, marginTop: 2, minHeight: 32 }}>{b.desc}</div>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, alignItems: 'baseline' }}>
                <span className="display" style={{ fontSize: 24, fontWeight: 750 }}>€{b.ytd.toLocaleString('pt-PT', { minimumFractionDigits: 1 })} M</span>
                <span className="chip">{b.margin.toLocaleString('pt-PT')}% EBITDA</span>
              </div>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>2026E: €{b.fy.toLocaleString('pt-PT', { minimumFractionDigits: 1 })} M · {b.country}</div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="card" style={{ padding: 8 }}>
          <div style={{ padding: '10px 12px 12px', display: 'flex', justifyContent: 'space-between' }}><b style={{ fontSize: 14.5 }}>Centros industriais em tempo real</b><Link to="/portal/operacoes" className="chip">Operações <ArrowRight size={12} /></Link></div>
          <MapView points={plantPoints} height={380} />
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><Sparkles size={16} color="#1D8FC4" /><b style={{ fontSize: 14.5 }}>Alertas prioritários</b><span className="chip sf" style={{ marginLeft: 'auto' }}>Cortex · 09:42</span></div>
          <div style={{ display: 'grid', gap: 9 }}>
            {ALERTS.map(a => {
              const [I, c, bg] = AI[a.tone];
              return (
                <Link key={a.text} to={a.to} style={{ display: 'flex', gap: 10, padding: '11px 12px', borderRadius: 13, background: bg, border: `1px solid ${c}26`, alignItems: 'start' }}>
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
