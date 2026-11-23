import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Share2, CalendarPlus, Zap, Wrench, ShieldCheck, MapPin, User, Clock, Database, Leaf, Award, Target } from 'lucide-react';
import { customers, products, employees, assets, findCustomer, findProduct, findEmployee, findAsset, type Tone } from '../data/c360';
import { MONTHS, FUT } from '../data/gen';
import ChartCard from '../components/ChartCard';
import Schematic from '../components/Schematic';
import Trace from '../components/Trace';
import { KpiCard, DataTable } from '../components/Blocks';
import { Avatar, Meter } from '../ui/kit';
import { useToast } from '../ui/toast';
import { downloadPdf, copyLink } from '../utils/download';
import type { Chart } from '../data/types';

const TONE_COL: Record<Tone, string> = { ok: '#17924B', warn: '#E08600', crit: '#D92D20', info: '#1D8FC4' };

function Header({ title, sub, chips, avatar, onPdf }: { title: string; sub: string; chips: React.ReactNode; avatar: React.ReactNode; onPdf: () => void }) {
  const toast = useToast();
  return (
    <div className="card" style={{ padding: 22, display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', background: 'linear-gradient(120deg,#FFFFFF 40%,#FFF6D6)' }}>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
        {avatar}
        <div>
          <h1 className="display" style={{ fontSize: 28, fontWeight: 750, letterSpacing: '-0.03em' }}>{title}</h1>
          <div className="muted" style={{ fontSize: 14, marginTop: 2 }}>{sub}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>{chips}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn-ghost btn-sm" onClick={async () => { const ok = await copyLink(); toast('link', ok ? 'Ligação copiada' : 'Ligação pronta', 'Abre diretamente nesta vista 360.'); }}><Share2 size={14} /> Partilhar</button>
        <button className="btn btn-sm" onClick={onPdf}><FileText size={14} /> Relatório 360</button>
      </div>
    </div>
  );
}

function Summary({ text, extra }: { text: string; extra?: string }) {
  return (
    <div className="card" style={{ padding: 20, background: 'linear-gradient(160deg,#EAF7FD,#FFFFFF 70%)', borderColor: 'rgba(41,181,232,.3)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}><Sparkles size={16} color="#1D8FC4" /><b style={{ fontSize: 14 }}>Resumo Cortex</b><span className="chip sf" style={{ marginLeft: 'auto', fontSize: 11 }}>Atualizado às 09:42</span></div>
      <p style={{ fontSize: 14, lineHeight: 1.62 }}>{text}</p>
      {extra && <div className="chip" style={{ marginTop: 10 }}><Database size={11} /> {extra}</div>}
    </div>
  );
}

function Timeline({ items, title = 'Cronologia' }: { items: [string, string, Tone][]; title?: string }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <b style={{ fontSize: 14.5 }}>{title}</b>
      <div style={{ marginTop: 14, display: 'grid', gap: 0 }}>
        {items.map(([d, t, tone], i) => (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: TONE_COL[tone], marginTop: 4 }} />
              {i < items.length - 1 && <span style={{ width: 2, flex: 1, background: 'var(--line)', minHeight: 20 }} />}
            </div>
            <div style={{ paddingBottom: 14 }}><div className="muted" style={{ fontSize: 11.5, fontWeight: 600 }}>{d}</div><div style={{ fontSize: 13.5, marginTop: 2, lineHeight: 1.45 }}>{t}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const chart = (c: Partial<Chart> & Pick<Chart, 'id' | 'title' | 'kind' | 'keys' | 'data'>): Chart => ({ subtitle: '', insight: '', forecast: '', action: '', ...c });
const page = (children: React.ReactNode) => <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'grid', gap: 16 }}>{children}</motion.div>;
const ListHead = ({ title, sub, icon }: { title: string; sub: string; icon: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 4 }}>
    <div style={{ width: 52, height: 52, borderRadius: 16, background: '#121210', display: 'grid', placeItems: 'center' }}>{icon}</div>
    <div><h1 className="display" style={{ fontSize: 28, fontWeight: 750, letterSpacing: '-0.03em' }}>{title}</h1><div className="muted" style={{ fontSize: 14 }}>{sub}</div></div>
  </div>
);

/* ───────── Cliente 360 ───────── */
export function CustomerList() {
  const total = customers.reduce((s, c) => s + c.ytd, 0);
  return page(<>
    <ListHead title="Cliente 360" sub={`${customers.length} contas-chave · €${total.toLocaleString('pt-PT', { maximumFractionDigits: 1 })} M de vendas YTD (${Math.round(total / 325.8 * 100)}% do grupo)`} icon={<User size={24} color="#FDB704" />} />
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
      {customers.map((c, i) => (
        <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .04 }}>
          <Link to={`/portal/360/clientes/${c.id}`} className="card" style={{ display: 'block', padding: 18, transition: '.2s' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Avatar name={c.name} size={42} color={c.color} />
              <div style={{ minWidth: 0 }}><div style={{ fontWeight: 650 }}>{c.name}</div><div className="muted" style={{ fontSize: 12 }}>{c.segment} · {c.country}</div></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 14, fontSize: 12 }}>
              <div><div className="muted">Vendas YTD</div><b style={{ fontSize: 15 }}>€{c.ytd.toLocaleString('pt-PT')} M</b></div>
              <div><div className="muted">Cresc.</div><b style={{ fontSize: 15 }}>{c.growth}</b></div>
              <div><div className="muted">OTIF</div><b style={{ fontSize: 15 }}>{c.otif.toLocaleString('pt-PT')}%</b></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <span className="chip" style={{ fontSize: 11 }}>{c.unit}</span>
              <span className={`chip ${c.risk === 'Alto' ? 'crit' : c.risk === 'Médio' ? 'warn' : 'ok'}`} style={{ fontSize: 11 }}>Risco {c.risk.toLowerCase()}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </>);
}

export function CustomerDetail() {
  const { id } = useParams();
  const c = findCustomer(id);
  const toast = useToast();
  if (!c) return <Navigate to="/portal/360/clientes" replace />;
  const pdf = () => { downloadPdf(`cliente360_${c.id}`, `Cliente 360 — ${c.name}`, `${c.segment} · ${c.unit} · KAM ${c.kam}`, [
    { text: 'Resumo', size: 13, bold: true }, { text: c.summary, gap: 8 },
    { text: 'Indicadores', size: 13, bold: true }, { text: `Vendas YTD €${c.ytd.toLocaleString('pt-PT')} M (${c.growth}) · Margem ${c.margin} · OTIF ${c.otif.toLocaleString('pt-PT')}% · DSO ${c.dso} dias · ${c.skus} SKUs`, gap: 8 },
    { text: 'Principais SKUs', size: 13, bold: true }, ...c.topSkus.map(([s, v, g]) => ({ text: `•  ${s}: ${v} (${g})` })), { text: '', gap: 6 },
    { text: 'Próximas melhores ações', size: 13, bold: true }, ...c.actions.map(([t, d]) => ({ text: `•  ${t}: ${d}` })),
  ]); toast('download', 'Relatório 360 gerado', c.name); };
  return page(<>
    <Header title={c.name} sub={`${c.group} · ${c.segment} · cliente desde ${c.since}`} onPdf={pdf} avatar={<Avatar name={c.name} size={64} color={c.color} />}
      chips={<><span className="chip"><MapPin size={11} /> {c.city}</span><span className="chip"><User size={11} /> KAM: {c.kam}</span><span className="chip">{c.unit}</span><span className={`chip ${c.risk === 'Alto' ? 'crit' : c.risk === 'Médio' ? 'warn' : 'ok'}`}>Risco {c.risk.toLowerCase()}</span></>} />
    <div className="grid kpis">
      {[['Vendas YTD', `€${c.ytd.toLocaleString('pt-PT')} M`, c.growth, !c.growth.startsWith('−')], ['Margem bruta', c.margin, 'YTD', true], ['OTIF', `${c.otif.toLocaleString('pt-PT')}%`, c.otif >= 95 ? 'cumpre contrato' : 'abaixo de 95%', c.otif >= 95], ['Prazo de recebimento', `${c.dso} dias`, `${c.skus} SKUs ativos`, c.dso <= 50]]
        .map(([l, v, d, g], i) => <KpiCard key={l as string} i={i} k={{ label: l as string, value: v as string, delta: d as string, up: !!g, good: !!g }} />)}
    </div>
    <div className="grid charts">
      <Summary text={c.summary} extra={c.dataShare} />
      <div className="card" style={{ padding: 20 }}>
        <b style={{ fontSize: 14.5 }}>Próximas melhores ações</b>
        <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
          {c.actions.map(([t, d]) => (
            <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 12px', borderRadius: 12, background: '#FAF8EF', border: '1px solid var(--line)' }}>
              <Target size={16} color="#D99A00" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}><div style={{ fontWeight: 650, fontSize: 13.5 }}>{t}</div><div className="muted" style={{ fontSize: 12.5 }}>{d}</div></div>
              <button className="btn-ghost btn-sm" onClick={() => toast('action', `Ação criada · ${t}`, `${d} — atribuída a ${c.kam}`)}><Zap size={12} /> Criar</button>
            </div>
          ))}
          <button className="btn-ghost btn-sm" style={{ justifySelf: 'start' }} onClick={() => toast('success', 'Reunião agendada', `Plano de negócio com ${c.name} · convite enviado no Teams`)}><CalendarPlus size={13} /> Agendar reunião de negócio</button>
        </div>
      </div>
      <ChartCard c={chart({ id: `cu1${c.id}`, title: 'Vendas mensais (€ M)', subtitle: 'Últimos 12 meses', kind: 'area', keys: ['Vendas'], data: MONTHS.map((m, i) => ({ m, Vendas: c.monthly[i] })),
        insight: `${c.name}: ${c.growth} a/a com ${c.topSkus[0][0]} como principal referência.`, forecast: 'Previsão Cortex de +4% nos próximos 3 meses com a sazonalidade de Natal.', action: c.actions[0][1] })} />
      <ChartCard c={chart({ id: `cu2${c.id}`, title: 'Mix de vendas', subtitle: '% das vendas YTD', kind: 'pie', keys: ['v'], data: c.mix.map(([m, v]) => ({ m, v })), ratio: true,
        insight: `O mix é dominado por ${c.mix[0][0]} (${c.mix[0][1]}%).`, forecast: 'Mix estável nos próximos 6 meses.', action: c.actions[c.actions.length - 1][1] })} />
      <DataTable t="table" title="Principais SKUs (YTD)" columns={['SKU', 'Vendas', 'Cresc. a/a']} rows={c.topSkus.map(([s, v, g]) => ({ SKU: s, Vendas: v, 'Cresc. a/a': g }))} />
      <Timeline items={c.timeline} title="Interações e eventos recentes" />
    </div>
  </>);
}

/* ───────── Produto 360 ───────── */
export function ProductList() {
  return page(<>
    <ListHead title="Produto 360" sub={`${products.length} SKUs estratégicos · genealogia de lote, qualidade, procura e pegada`} icon={<ShieldCheck size={24} color="#FDB704" />} />
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
      {products.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .03 }}>
          <Link to={`/portal/360/produtos/${p.id}`} className="card" style={{ display: 'block', padding: 16 }}>
            <div style={{ height: 110, borderRadius: 12, background: '#FAF8EF', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
              {p.img ? <img src={`./brands/${p.img}`} alt={p.brand} style={{ height: '100%', width: '100%', objectFit: 'contain' }} loading="lazy" /> : <span className="display" style={{ fontSize: 26, fontWeight: 750 }}>{p.brand}</span>}
            </div>
            <div style={{ fontWeight: 650, marginTop: 12, fontSize: 14 }}>{p.name}</div>
            <div className="muted" style={{ fontSize: 12 }}>{p.category} · {p.plant}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12.5 }}><span><b>{p.ytd}</b> YTD</span><span className="chip ok" style={{ fontSize: 10.5 }}>Nutri-Score {p.nutri}</span></div>
          </Link>
        </motion.div>
      ))}
    </div>
  </>);
}

export function ProductDetail() {
  const { id } = useParams();
  const p = findProduct(id);
  const toast = useToast();
  if (!p) return <Navigate to="/portal/360/produtos" replace />;
  const pdf = () => { downloadPdf(`produto360_${p.id}`, `Produto 360 — ${p.name}`, `${p.brand} · ${p.category} · EAN ${p.ean}`, [
    { text: 'Resumo', size: 13, bold: true }, { text: p.summary, gap: 8 },
    { text: 'Indicadores', size: 13, bold: true }, { text: `Vendas YTD ${p.ytd} · Volume ${p.volume} · Margem ${p.margin} · Preço ${p.price} · Quota ${p.share}`, gap: 8 },
    { text: 'Qualidade', size: 13, bold: true }, ...p.quality.map(([l, v, s]) => ({ text: `•  ${l}: ${v} (especificação ${s})` })), { text: '', gap: 6 },
    { text: `Ingredientes: ${p.ingredients}` }, { text: `Alergénios: ${p.allergens}` }, { text: `Pegada de carbono: ${p.carbon}` },
  ]); toast('download', 'Ficha de produto gerada', p.name); };
  return page(<>
    <Header title={p.name} sub={`${p.brand} · ${p.category} · EAN ${p.ean}`} onPdf={pdf}
      avatar={<div style={{ width: 110, height: 76, borderRadius: 14, background: '#fff', border: '1px solid var(--line)', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>{p.img ? <img src={`./brands/${p.img}`} alt={p.brand} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <b>{p.brand}</b>}</div>}
      chips={<><span className="chip"><MapPin size={11} /> {p.plant} · {p.line}</span><span className="chip">{p.format}</span><span className="chip ok">Nutri-Score {p.nutri}</span><span className="chip"><Leaf size={11} /> {p.carbon}</span></>} />
    <div className="grid kpis">
      {[['Vendas YTD', p.ytd, p.volume, true], ['Margem bruta', p.margin, p.price, true], ['Quota', p.share, 'NielsenIQ', true], ['Reclamações', `${p.ppm.toLocaleString('pt-PT')} ppm`, p.ppm > 5 ? 'acima da média (4,1)' : 'abaixo da média (4,1)', p.ppm <= 5]]
        .map(([l, v, d, g], i) => <KpiCard key={l as string} i={i} k={{ label: l as string, value: v as string, delta: d as string, up: !!g, good: !!g }} />)}
    </div>
    <div className="grid charts">
      <Summary text={p.summary} />
      <div className="card" style={{ padding: 20 }}>
        <b style={{ fontSize: 14.5 }}>Qualidade do último lote vs. especificação</b>
        <table className="t" style={{ marginTop: 8 }}><thead><tr><th>Parâmetro</th><th>Valor</th><th>Especificação</th><th>Estado</th></tr></thead>
          <tbody>{p.quality.map(([l, v, s, st]) => <tr key={l}><td>{l}</td><td><b>{v}</b></td><td className="muted">{s}</td><td><span className={`chip ${st}`}>{st === 'ok' ? 'Conforme' : 'Atenção'}</span></td></tr>)}</tbody></table>
        <div style={{ marginTop: 12, fontSize: 12.5, lineHeight: 1.55 }}><b>Ingredientes:</b> {p.ingredients}<br /><b>Alergénios:</b> {p.allergens}<br /><b>Vida útil:</b> {p.shelf}</div>
      </div>
      <ChartCard c={chart({ id: `pr1${p.id}`, title: 'Vendas e previsão (€ mil)', subtitle: 'Últimos 12 meses + 6 meses previstos', kind: 'line', keys: ['Real', 'Previsão'],
        data: [...MONTHS.map((m, i): Record<string, string | number> => (i === 11 ? { m, Real: p.monthly[i], 'Previsão': p.monthly[i] } : { m, Real: p.monthly[i] })), ...FUT.map((m, i): Record<string, string | number> => ({ m: `${m}*`, 'Previsão': p.forecast[i] }))],
        insight: p.summary.split('. ')[0] + '.', forecast: `Previsão Cortex para dezembro: €${p.forecast[1].toLocaleString('pt-PT')} mil.`, action: 'Ajustar o plano de produção ao pico previsto.', model: 'Previsão hierárquica · Snowflake ML FORECAST' })} />
      <ChartCard c={chart({ id: `pr2${p.id}`, title: 'Vendas por canal/cliente', subtitle: '% YTD', kind: 'pie', keys: ['v'], data: p.channels.map(([m, v]) => ({ m, v })), ratio: true,
        insight: `${p.channels[0][0]} representa ${p.channels[0][1]}% das vendas.`, forecast: 'Distribuição estável.', action: 'Rever a cobertura nos clientes com crescimento acima de 10%.' })} />
    </div>
    {p.trace ? <Trace /> : (
      <div className="card" style={{ padding: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
        <ShieldCheck size={18} color="#17924B" /><div style={{ fontSize: 13.5 }}><b>Genealogia de lote disponível</b> — todos os lotes deste SKU têm rastreabilidade completa do cereal à entrega. <span className="muted">Abra a Milaneza Esparguete 500 g para ver uma simulação de recolha.</span></div>
        <Link to="/portal/360/produtos/milaneza-esparguete" className="btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>Ver exemplo</Link>
      </div>
    )}
  </>);
}

/* ───────── Colaborador 360 ───────── */
export function EmployeeList() {
  return page(<>
    <ListHead title="Colaborador 360" sub={`${employees.length} perfis em destaque · dados pessoais protegidos por políticas Horizon`} icon={<User size={24} color="#FDB704" />} />
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
      {employees.map((e, i) => (
        <motion.div key={e.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .04 }}>
          <Link to={`/portal/360/colaboradores/${e.id}`} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16 }}>
            <Avatar name={e.name} size={46} />
            <div style={{ minWidth: 0 }}><div style={{ fontWeight: 650 }}>{e.name}</div><div className="muted" style={{ fontSize: 12.5 }}>{e.role}</div><div className="faint" style={{ fontSize: 12 }}>{e.site} · desde {e.since}</div></div>
          </Link>
        </motion.div>
      ))}
    </div>
  </>);
}

export function EmployeeDetail() {
  const { id } = useParams();
  const e = findEmployee(id);
  const toast = useToast();
  if (!e) return <Navigate to="/portal/360/colaboradores" replace />;
  const pdf = () => { downloadPdf(`colaborador360_${e.id}`, `Colaborador 360 — ${e.name}`, `${e.role} · ${e.site} · desde ${e.since}`, [
    { text: 'Resumo', size: 13, bold: true }, { text: e.summary, gap: 8 },
    { text: 'Competências', size: 13, bold: true }, ...e.skills.map(([s, l]) => ({ text: `•  ${s}: ${l}/5` })), { text: '', gap: 6 },
    { text: 'Objetivos', size: 13, bold: true }, ...e.goals.map(([g, p]) => ({ text: `•  ${g}: ${p}%` })),
  ]); toast('download', 'Perfil gerado', e.name); };
  return page(<>
    <Header title={e.name} sub={`${e.role} · ${e.site}`} onPdf={pdf} avatar={<Avatar name={e.name} size={64} />}
      chips={<><span className="chip">{e.unit}</span><span className="chip"><Clock size={11} /> {e.shift}</span><span className="chip"><User size={11} /> Chefia: {e.manager}</span><span className="chip sf"><ShieldCheck size={11} /> Dados mascarados por Horizon</span></>} />
    <div className="grid kpis">
      {[['Na Cerealis desde', e.since, `${2026 - +e.since} anos`, true], ['Formação (12 meses)', `${e.training} h`, 'média do grupo: 21 h', e.training >= 21], ['Absentismo', e.absence, 'média do grupo: 4,1%', true], ['Envolvimento', e.engagement, 'inquérito de outubro', true]]
        .map(([l, v, d, g], i) => <KpiCard key={l as string} i={i} k={{ label: l as string, value: v as string, delta: d as string, up: !!g, good: !!g }} />)}
    </div>
    <div className="grid charts">
      <Summary text={e.summary} />
      <div className="card" style={{ padding: 20 }}>
        <b style={{ fontSize: 14.5 }}>Competências (0–5)</b>
        <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
          {e.skills.map(([s, l]) => <div key={s}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}><span>{s}</span><b>{l}/5</b></div><Meter value={l * 20} color={l >= 4 ? 'var(--ink)' : 'var(--gold-deep)'} /></div>)}
        </div>
      </div>
      <div className="card" style={{ padding: 20 }}>
        <b style={{ fontSize: 14.5 }}>Objetivos 2026</b>
        <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          {e.goals.map(([g, p]) => <div key={g}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}><span>{g}</span><b>{p}%</b></div><Meter value={p} color={p >= 80 ? 'var(--ok)' : p >= 50 ? 'var(--gold-deep)' : 'var(--crit)'} h={8} /></div>)}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>{e.certs.map(c => <span key={c} className="chip"><Award size={11} /> {c}</span>)}</div>
        <button className="btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={() => toast('action', 'Plano de desenvolvimento proposto', `${e.name}: formação recomendada pelo Cortex enviada a ${e.manager}`)}><Sparkles size={13} /> Sugerir plano de desenvolvimento</button>
      </div>
      <Timeline items={e.timeline} />
    </div>
  </>);
}

/* ───────── Ativo 360 ───────── */
export function AssetList() {
  return page(<>
    <ListHead title="Ativo 360" sub={`${assets.length} ativos críticos · saúde, vida útil remanescente e gémeo digital`} icon={<Wrench size={24} color="#FDB704" />} />
    <DataTable t="table" title="Ativos críticos" sub="Clique para abrir o gémeo digital" bars={['Saúde']} status={['Estado']} link={{ base: '/portal/360/ativos', idCol: 'Ativo' }}
      columns={['Ativo', 'Equipamento', 'Local', 'Fabricante', 'Saúde', 'Vida útil remanescente', 'Estado']}
      rows={assets.map(a => ({ Ativo: a.id, Equipamento: a.name, Local: a.site, Fabricante: `${a.maker} ${a.model}`, 'Saúde': a.health, 'Vida útil remanescente': a.rul, Estado: a.status === 'critico' ? 'Crítico' : a.status === 'aviso' ? 'Atenção' : 'Normal' }))} />
  </>);
}

export function AssetDetail() {
  const { id } = useParams();
  const a = findAsset(id);
  const toast = useToast();
  if (!a) return <Navigate to="/portal/360/ativos" replace />;
  const pdf = () => { downloadPdf(`ativo360_${a.id}`, `Ativo 360 — ${a.id} · ${a.name}`, `${a.site} · ${a.maker} ${a.model} (${a.year})`, [
    { text: 'Resumo', size: 13, bold: true }, { text: a.summary, gap: 8 },
    { text: 'Previsão Cortex', size: 13, bold: true }, { text: `Probabilidade: ${a.prediction.failProb} · Causa: ${a.prediction.driver}` }, { text: `Ação: ${a.prediction.action} · Benefício: ${a.prediction.saving}`, gap: 8 },
    { text: 'Sensores', size: 13, bold: true }, ...a.sensors.map(s => ({ text: `•  ${s.label}: ${s.value}` })), { text: '', gap: 6 },
    { text: 'Ordens de trabalho', size: 13, bold: true }, ...a.workOrders.map(([n, d, dt, st]) => ({ text: `•  ${n} — ${d} (${dt}, ${st})` })),
  ]); toast('download', 'Ficha do ativo gerada', `${a.id} · ${a.name}`); };
  const hc = a.health >= 80 ? '#17924B' : a.health >= 65 ? '#E08600' : '#D92D20';
  return page(<>
    <Header title={`${a.id} · ${a.name}`} sub={`${a.site} · ${a.maker} ${a.model} · ${a.year}`} onPdf={pdf}
      avatar={<div style={{ width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `conic-gradient(${hc} ${a.health * 3.6}deg, #EEE9DA 0)` }}><div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', fontWeight: 750 }}>{a.health}</div></div>}
      chips={<><span className={`chip ${a.status === 'critico' ? 'crit' : a.status === 'aviso' ? 'warn' : 'ok'}`}><span className={`dot ${a.status}`} /> {a.status === 'critico' ? 'Crítico' : a.status === 'aviso' ? 'Atenção' : 'Normal'}</span><span className="chip">Vida útil remanescente: {a.rul}</span><span className="chip">{a.throughput}</span></>} />
    <div className="grid kpis">
      {[['Saúde', `${a.health}/100`, a.status === 'ok' ? 'estável' : 'em degradação', a.status === 'ok'], ['MTBF', a.mtbf, 'tempo médio entre falhas', true], ['Disponibilidade', a.availability, 'últimos 90 dias', true], ['Energia', a.energy, 'intensidade atual', true]]
        .map(([l, v, d, g], i) => <KpiCard key={l as string} i={i} k={{ label: l as string, value: v as string, delta: d as string, up: !!g, good: !!g }} />)}
    </div>
    <Schematic a={a} />
    <div className="grid charts">
      <div className="card" style={{ padding: 20, background: a.status === 'ok' ? '#fff' : 'linear-gradient(160deg,#FFF6E5,#FFFFFF 70%)' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Sparkles size={16} color="#1D8FC4" /><b style={{ fontSize: 14.5 }}>Previsão Cortex</b></div>
        <div style={{ display: 'grid', gap: 10, marginTop: 12, fontSize: 13.5 }}>
          <div><span className="muted">Probabilidade de falha:</span> <b>{a.prediction.failProb}</b></div>
          <div><span className="muted">Causa provável:</span> {a.prediction.driver}</div>
          <div><span className="muted">Ação recomendada:</span> <b>{a.prediction.action}</b></div>
          <div><span className="muted">Benefício:</span> <b style={{ color: 'var(--ok)' }}>{a.prediction.saving}</b></div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="btn btn-sm" onClick={() => toast('action', 'Ordem de trabalho criada no SAP PM', `${a.id}: ${a.prediction.action}`)}><Wrench size={13} /> Criar ordem de trabalho</button>
          <button className="btn-ghost btn-sm" onClick={() => toast('success', 'Peças reservadas', `Armazém de manutenção · ${a.site}`)}>Reservar peças</button>
        </div>
        <p className="muted" style={{ fontSize: 12.5, marginTop: 14, lineHeight: 1.5 }}>{a.summary}</p>
      </div>
      <ChartCard c={chart({ id: `as1${a.id}`, title: a.trendLabel, subtitle: 'Sinal principal vs. limite', kind: 'area', keys: ['Valor', 'Limite'], ratio: true,
        data: a.trend.map((v, i) => ({ m: `${i + 1}`, Valor: v, Limite: a.trendLimit })), insight: a.prediction.driver, forecast: a.prediction.failProb, action: a.prediction.action, model: 'Deteção de anomalias · Snowflake ML' })} />
      <div style={{ gridColumn: '1 / -1' }}><DataTable t="table" title="Ordens de trabalho" columns={['Ordem', 'Descrição', 'Data', 'Estado']} status={['Estado']} rows={a.workOrders.map(([n, d, dt, st]) => ({ Ordem: n, 'Descrição': d, Data: dt, Estado: st }))} /></div>
    </div>
  </>);
}
