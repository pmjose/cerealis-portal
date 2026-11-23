import { useState } from 'react';
import { Inbox, Bot, ScrollText } from 'lucide-react';
import { useData } from '../data';
import AgentFlow from '../components/AgentFlow';
import { KpiCard, DataTable } from '../components/Blocks';
import { Tabs } from '../ui/kit';
import { k } from '../data/gen';
import { t, pick, type DictKey } from '../i18n';
import { fmtEurM } from '../i18n/format';
import { modeLabel } from '../i18n/labels';

// Registo de auditoria: quando (dia + hora), agente (pelo id — o nome vem dos dados da língua ativa), decisor e resultado.
type Res = 'done' | 'pending' | 'approved' | 'rejected';
const AUDIT: [day: string, time: string, agentId: string, decider: string, res: Res][] = [
  ['today', '09:41', 'ag-coa', 'auto', 'done'],
  ['today', '08:10', 'ag-don', 'Teresa Antunes', 'pending'],
  ['today', '07:55', 'ag-rut', 'auto', 'done'],
  ['today', '06:20', 'ag-sec', 'auto', 'done'],
  ['today', '05:00', 'ag-vb3', 'auto', 'done'],
  ['yesterday', '17:40', 'ag-capa', 'Teresa Antunes', 'approved'],
  ['yesterday', '15:12', 'ag-promo', 'Sofia Carvalho', 'approved'],
  ['yesterday', '12:04', 'ag-omie', 'auto', 'done'],
  ['21/11', '11:03', 'ag-credito', 'Paulo Rebelo', 'approved'],
  ['20/11', '16:30', 'ag-recl', 'Rui Matos', 'approved'],
  ['19/11', '10:15', 'ag-mdd', 'Henrique Lobo', 'rejected'],
];
const ACTIONS = {
  pt: [
    'Inspeção registada no SAP QM · CT-26-0418 (Viterra)',
    'Plano de receção e amostragem proposto',
    '6 paletes de Milaneza Esparguete transferidas para o Pingo Doce',
    'Setpoint da zona 3 da L3 = 82 °C (janela validada)',
    '201 correspondências aplicadas · 13 em revisão',
    'CAPA-26-114 aberta e 23 respostas enviadas',
    'Proposta alternativa enviada ao Pingo Doce',
    'Plano horário da moagem de Lisboa atualizado (−€1 870)',
    'Bloqueio de novas cargas — distribuidor de Luanda',
    'Nota de crédito de €2 980 ao Recheio de Braga',
    'Preço de €2,61/kg rejeitado — margem abaixo de 18%',
  ],
  en: [
    'Inspection logged in SAP QM · CT-26-0418 (Viterra)',
    'Receiving and sampling plan proposed',
    '6 pallets of Milaneza Esparguete transferred to Pingo Doce',
    'L3 zone 3 setpoint = 82 °C (validated window)',
    '201 matches applied · 13 under review',
    'CAPA-26-114 opened and 23 replies sent',
    'Alternative proposal sent to Pingo Doce',
    'Lisbon mill hourly load plan updated (−€1,870)',
    'New shipments blocked — Luanda distributor',
    '€2,980 credit note to Recheio Braga',
    'Price of €2.61/kg rejected — margin below 18%',
  ],
};
const RES: Record<Res, DictKey> = { done: 'pg.dec.res.done', pending: 'pg.dec.res.pending', approved: 'pg.dec.res.approved', rejected: 'pg.dec.res.rejected' };

export default function Decisions() {
  const [tab, setTab] = useState('pend');
  const { allAgents } = useData();
  const human = allAgents.filter(a => a.mode === 'humano');
  const auto = allAgents.filter(a => a.mode === 'auto');
  const cols = [t('pg.dec.col.time'), t('pg.dec.col.agent'), t('pg.dec.col.action'), t('pg.dec.col.decider'), t('pg.dec.col.result')];
  const actions = pick(ACTIONS);
  const rows = AUDIT.map(([d, h, id, who, r], i) => {
    const when = d === 'today' ? t('pg.dec.today', { t: h }) : d === 'yesterday' ? t('pg.dec.yesterday', { t: h }) : `${d} ${h}`;
    const cells = [when, allAgents.find(a => a.id === id)?.name ?? id, actions[i], who === 'auto' ? modeLabel('auto') : who, t(RES[r])];
    return Object.fromEntries(cols.map((c, j) => [c, cells[j]]));
  });
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, background: '#121210', display: 'grid', placeItems: 'center' }}><Inbox size={26} color="#FDB704" /></div>
        <div>
          <h1 className="display" style={{ fontSize: 30, fontWeight: 750, letterSpacing: '-0.035em' }}>{t('pg.nav.decisions')}</h1>
          <div className="muted" style={{ fontSize: 14 }}>{t('pg.dec.sub')}</div>
        </div>
      </div>
      <div className="grid kpis">
        {[k(t('pg.dec.kpi.pending'), String(human.length), t('pg.humanAgents'), true, false), k(t('pg.dec.kpi.auto'), String(auto.length), t('pg.dec.kpi.autoDelta'), true, true),
          k(t('pg.dec.kpi.value'), fmtEurM(4.6), t('pg.dec.kpi.valueDelta'), true, true), { ...k(t('pg.dec.kpi.time'), '2 h 40 min', t('pg.dec.kpi.timeDelta'), false, true), ratio: true }]
          .map((x, i) => <KpiCard key={x.label} k={x} i={i} />)}
      </div>
      <div><Tabs value={tab} onChange={setTab} tabs={[{ id: 'pend', label: t('pg.dec.tab.pending'), icon: <Inbox size={15} />, badge: String(human.length) }, { id: 'auto', label: t('pg.dec.tab.auto'), icon: <Bot size={15} /> }, { id: 'audit', label: t('pg.dec.tab.audit'), icon: <ScrollText size={15} /> }]} /></div>
      {tab === 'pend' && <div className="grid charts">{human.map(a => <AgentFlow key={a.id} a={a} />)}</div>}
      {tab === 'auto' && <div className="grid charts">{auto.map(a => <AgentFlow key={a.id} a={a} />)}</div>}
      {tab === 'audit' && <DataTable t="table" title={t('pg.dec.audit.title')} sub={t('pg.dec.audit.sub')} status={[cols[4]]} columns={cols} rows={rows} />}
    </div>
  );
}
