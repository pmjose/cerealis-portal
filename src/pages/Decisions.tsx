import { useState } from 'react';
import { Inbox, Bot, ScrollText } from 'lucide-react';
import { allAgents } from '../data/modules';
import AgentFlow from '../components/AgentFlow';
import { KpiCard, DataTable } from '../components/Blocks';
import { Tabs } from '../ui/kit';
import { k } from '../data/gen';

const AUDIT = [
  { Hora: 'hoje 09:41', Agente: 'Leitura de certificados e conhecimentos de embarque', 'Ação': 'Inspeção registada no SAP QM · CT-26-0418 (Viterra)', Decisor: 'Autónomo', Resultado: 'Concluído' },
  { Hora: 'hoje 08:10', Agente: 'Gestão do risco DON no MV Sonora Star', 'Ação': 'Plano de receção e amostragem proposto', Decisor: 'Teresa Antunes', Resultado: 'Pendente' },
  { Hora: 'hoje 07:55', Agente: 'Prevenção de rutura em loja', 'Ação': '6 paletes de Milaneza Esparguete transferidas para o Pingo Doce', Decisor: 'Autónomo', Resultado: 'Concluído' },
  { Hora: 'hoje 06:20', Agente: 'Correção do diagrama de secagem', 'Ação': 'Setpoint da zona 3 da L3 = 82 °C (janela validada)', Decisor: 'Autónomo', Resultado: 'Concluído' },
  { Hora: 'hoje 05:00', Agente: 'Mapeamento de SKUs e clientes na integração', 'Ação': '201 correspondências aplicadas · 13 em revisão', Decisor: 'Autónomo', Resultado: 'Concluído' },
  { Hora: 'ontem 17:40', Agente: 'Cluster de reclamações ligado à produção', 'Ação': 'CAPA-26-114 aberta e 23 respostas enviadas', Decisor: 'Teresa Antunes', Resultado: 'Aprovado' },
  { Hora: 'ontem 15:12', Agente: 'Revisão de promoção com ROI negativo', 'Ação': 'Proposta alternativa enviada ao Pingo Doce', Decisor: 'Sofia Carvalho', Resultado: 'Aprovado' },
  { Hora: 'ontem 12:04', Agente: 'Deslocação de carga para horas baratas', 'Ação': 'Plano horário da moagem de Lisboa atualizado (−€1 870)', Decisor: 'Autónomo', Resultado: 'Concluído' },
  { Hora: '21/11 11:03', Agente: 'Limite de crédito em exportação', 'Ação': 'Bloqueio de novas cargas — distribuidor de Luanda', Decisor: 'Paulo Rebelo', Resultado: 'Aprovado' },
  { Hora: '20/11 16:30', Agente: 'Reclamação logística com reembolso', 'Ação': 'Nota de crédito de €2 980 ao Recheio de Braga', Decisor: 'Rui Matos', Resultado: 'Aprovado' },
  { Hora: '19/11 10:15', Agente: 'Proposta de MDD de cereais', 'Ação': 'Preço de €2,61/kg rejeitado — margem abaixo de 18%', Decisor: 'Henrique Lobo', Resultado: 'Rejeitado' },
];

export default function Decisions() {
  const [tab, setTab] = useState('pend');
  const human = allAgents.filter(a => a.mode === 'humano');
  const auto = allAgents.filter(a => a.mode === 'auto');
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, background: '#121210', display: 'grid', placeItems: 'center' }}><Inbox size={26} color="#FDB704" /></div>
        <div>
          <h1 className="display" style={{ fontSize: 30, fontWeight: 750, letterSpacing: '-0.035em' }}>Decisões & Agentes</h1>
          <div className="muted" style={{ fontSize: 14 }}>Do insight à ação: autónomos onde é seguro, com humano no circuito onde o impacto o exige — tudo auditado.</div>
        </div>
      </div>
      <div className="grid kpis">
        {[k('Decisões pendentes', String(human.length), 'agentes com humano no circuito', true, false), k('Agentes autónomos', String(auto.length), '37 ações hoje', true, true), k('Valor em decisão', '€4,6 M', 'impacto anual estimado', true, true), k('Tempo médio de aprovação', '2 h 40 min', 'antes: 3 dias', false, true)]
          .map((x, i) => <KpiCard key={x.label} k={x} i={i} />)}
      </div>
      <div><Tabs value={tab} onChange={setTab} tabs={[{ id: 'pend', label: 'Aguardam decisão', icon: <Inbox size={15} />, badge: String(human.length) }, { id: 'auto', label: 'Autónomos', icon: <Bot size={15} /> }, { id: 'audit', label: 'Registo de auditoria', icon: <ScrollText size={15} /> }]} /></div>
      {tab === 'pend' && <div className="grid charts">{human.map(a => <AgentFlow key={a.id} a={a} />)}</div>}
      {tab === 'auto' && <div className="grid charts">{auto.map(a => <AgentFlow key={a.id} a={a} />)}</div>}
      {tab === 'audit' && <DataTable t="table" title="Registo de auditoria das ações dos agentes" sub="Imutável · Snowflake Horizon · entrada, decisão, aprovador e resultado" status={['Resultado']} columns={['Hora', 'Agente', 'Ação', 'Decisor', 'Resultado']} rows={AUDIT} />}
    </div>
  );
}
