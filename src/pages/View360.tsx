import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Share2, CalendarPlus, Zap, Wrench, ShieldCheck, MapPin, User, Clock, Database, Leaf, Award, Target } from 'lucide-react';
import type { Customer, Tone } from '../data/c360';
import { useData } from '../data';
import ChartCard from '../components/ChartCard';
import Schematic from '../components/Schematic';
import Trace from '../components/Trace';
import { KpiCard, DataTable } from '../components/Blocks';
import { Avatar, Meter } from '../ui/kit';
import { useToast } from '../ui/toast';
import { downloadPdf, copyLink } from '../utils/download';
import type { Chart } from '../data/types';
import { t } from '../i18n';
import { fmtEurK, fmtEurM, fmtNum, fmtPct } from '../i18n/format';
import { mapStatusLabel, riskLabel } from '../i18n/labels';

const TONE_COL: Record<Tone, string> = { ok: '#17924B', warn: '#E08600', crit: '#D92D20', info: '#1D8FC4' };
// "Risco baixo" · "Low risk": o código interno do risco é traduzido só na apresentação.
const riskText = (r: Customer['risk']) => t('pg.v360.risk', { r: riskLabel(r).toLowerCase(), R: riskLabel(r) });

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
        <button className="btn-ghost btn-sm" onClick={async () => { const ok = await copyLink(); toast('link', ok ? t('pg.common.linkCopied') : t('pg.v360.linkReady'), t('pg.v360.linkText')); }}><Share2 size={14} /> {t('pg.common.share')}</button>
        <button className="btn btn-sm" onClick={onPdf}><FileText size={14} /> {t('pg.v360.reportBtn')}</button>
      </div>
    </div>
  );
}

function Summary({ text, extra }: { text: string; extra?: string }) {
  return (
    <div className="card" style={{ padding: 20, background: 'linear-gradient(160deg,#EAF7FD,#FFFFFF 70%)', borderColor: 'rgba(41,181,232,.3)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}><Sparkles size={16} color="#1D8FC4" /><b style={{ fontSize: 14 }}>{t('pg.v360.summary')}</b><span className="chip sf" style={{ marginLeft: 'auto', fontSize: 11 }}>{t('pg.common.updated')}</span></div>
      <p style={{ fontSize: 14, lineHeight: 1.62 }}>{text}</p>
      {extra && <div className="chip" style={{ marginTop: 10 }}><Database size={11} /> {extra}</div>}
    </div>
  );
}

function Timeline({ items, title = t('pg.v360.timeline') }: { items: [string, string, Tone][]; title?: string }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <b style={{ fontSize: 14.5 }}>{title}</b>
      <div style={{ marginTop: 14, display: 'grid', gap: 0 }}>
        {items.map(([d, txt, tone], i) => (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: TONE_COL[tone], marginTop: 4 }} />
              {i < items.length - 1 && <span style={{ width: 2, flex: 1, background: 'var(--line)', minHeight: 20 }} />}
            </div>
            <div style={{ paddingBottom: 14 }}><div className="muted" style={{ fontSize: 11.5, fontWeight: 600 }}>{d}</div><div style={{ fontSize: 13.5, marginTop: 2, lineHeight: 1.45 }}>{txt}</div></div>
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
  const { customers } = useData();
  const total = customers.reduce((s, c) => s + c.ytd, 0);
  return page(<>
    <ListHead title={t('pg.kind.customer')} sub={t('pg.cu.listSub', { n: customers.length, v: fmtNum(total, 0, 1), pct: Math.round(total / 325.8 * 100) })} icon={<User size={24} color="#FDB704" />} />
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
      {customers.map((c, i) => (
        <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .04 }}>
          <Link to={`/portal/360/clientes/${c.id}`} className="card" style={{ display: 'block', padding: 18, transition: '.2s' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Avatar name={c.name} size={42} color={c.color} />
              <div style={{ minWidth: 0 }}><div style={{ fontWeight: 650 }}>{c.name}</div><div className="muted" style={{ fontSize: 12 }}>{c.segment} · {c.country}</div></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 14, fontSize: 12 }}>
              <div><div className="muted">{t('pg.salesYtd')}</div><b style={{ fontSize: 15 }}>{fmtEurM(c.ytd)}</b></div>
              <div><div className="muted">{t('pg.cu.growth')}</div><b style={{ fontSize: 15 }}>{c.growth}</b></div>
              <div><div className="muted">OTIF</div><b style={{ fontSize: 15 }}>{fmtPct(c.otif)}</b></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <span className="chip" style={{ fontSize: 11 }}>{c.unit}</span>
              <span className={`chip ${c.risk === 'Alto' ? 'crit' : c.risk === 'Médio' ? 'warn' : 'ok'}`} style={{ fontSize: 11 }}>{riskText(c.risk)}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </>);
}

export function CustomerDetail() {
  const { id } = useParams();
  const { findCustomer, cal: { MONTHS } } = useData();
  const c = findCustomer(id);
  const toast = useToast();
  if (!c) return <Navigate to="/portal/360/clientes" replace />;
  const pdf = () => { downloadPdf(`${t('pg.v360.file.customer')}_${c.id}`, `${t('pg.kind.customer')} — ${c.name}`, `${c.segment} · ${c.unit} · KAM ${c.kam}`, [
    { text: t('pg.v360.pdf.summary'), size: 13, bold: true }, { text: c.summary, gap: 8 },
    { text: t('pg.v360.pdf.kpis'), size: 13, bold: true }, { text: t('pg.cu.pdfKpis', { ytd: fmtEurM(c.ytd), growth: c.growth, margin: c.margin, otif: fmtPct(c.otif), dso: c.dso, skus: c.skus }), gap: 8 },
    { text: t('pg.cu.topSkus'), size: 13, bold: true }, ...c.topSkus.map(([s, v, g]) => ({ text: `•  ${s}: ${v} (${g})` })), { text: '', gap: 6 },
    { text: t('pg.cu.nba'), size: 13, bold: true }, ...c.actions.map(([title, d]) => ({ text: `•  ${title}: ${d}` })),
  ]); toast('download', t('pg.cu.pdfDone'), c.name); };
  const kSales = t('pg.cu.sales');
  const [cSku, cYoy] = ['SKU', t('pg.cu.yoy')];
  return page(<>
    <Header title={c.name} sub={t('pg.cu.sub', { group: c.group, segment: c.segment, since: c.since })} onPdf={pdf} avatar={<Avatar name={c.name} size={64} color={c.color} />}
      chips={<><span className="chip"><MapPin size={11} /> {c.city}</span><span className="chip"><User size={11} /> KAM: {c.kam}</span><span className="chip">{c.unit}</span><span className={`chip ${c.risk === 'Alto' ? 'crit' : c.risk === 'Médio' ? 'warn' : 'ok'}`}>{riskText(c.risk)}</span></>} />
    <div className="grid kpis">
      {[[t('pg.salesYtd'), fmtEurM(c.ytd), c.growth, !c.growth.startsWith('−')], [t('pg.v360.grossMargin'), c.margin, 'YTD', true], ['OTIF', fmtPct(c.otif), c.otif >= 95 ? t('pg.cu.otifOk') : t('pg.cu.otifLow'), c.otif >= 95], [t('pg.cu.dso'), t('pg.cu.days', { n: c.dso }), t('pg.cu.activeSkus', { n: c.skus }), c.dso <= 50]]
        .map(([l, v, d, g], i) => <KpiCard key={l as string} i={i} k={{ label: l as string, value: v as string, delta: d as string, up: !!g, good: !!g }} />)}
    </div>
    <div className="grid charts">
      <Summary text={c.summary} extra={c.dataShare} />
      <div className="card" style={{ padding: 20 }}>
        <b style={{ fontSize: 14.5 }}>{t('pg.cu.nba')}</b>
        <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
          {c.actions.map(([title, d]) => (
            <div key={title} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 12px', borderRadius: 12, background: '#FAF8EF', border: '1px solid var(--line)' }}>
              <Target size={16} color="#D99A00" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}><div style={{ fontWeight: 650, fontSize: 13.5 }}>{title}</div><div className="muted" style={{ fontSize: 12.5 }}>{d}</div></div>
              <button className="btn-ghost btn-sm" onClick={() => toast('action', t('pg.cu.actionCreated', { title }), t('pg.cu.actionText', { detail: d, kam: c.kam }))}><Zap size={12} /> {t('pg.cu.create')}</button>
            </div>
          ))}
          <button className="btn-ghost btn-sm" style={{ justifySelf: 'start' }} onClick={() => toast('success', t('pg.cu.meetingDone'), t('pg.cu.meetingText', { name: c.name }))}><CalendarPlus size={13} /> {t('pg.cu.meeting')}</button>
        </div>
      </div>
      <ChartCard c={chart({ id: `cu1${c.id}`, title: t('pg.cu.c1.title'), subtitle: t('pg.common.last12'), kind: 'area', keys: [kSales], data: MONTHS.map((m, i) => ({ m, [kSales]: c.monthly[i] })),
        insight: t('pg.cu.c1.insight', { name: c.name, growth: c.growth, sku: c.topSkus[0][0] }), forecast: t('pg.cu.c1.forecast'), action: c.actions[0][1] })} />
      <ChartCard c={chart({ id: `cu2${c.id}`, title: t('pg.cu.c2.title'), subtitle: t('pg.cu.c2.sub'), kind: 'pie', keys: ['v'], data: c.mix.map(([m, v]) => ({ m, v })), ratio: true,
        insight: t('pg.cu.c2.insight', { x: c.mix[0][0], p: c.mix[0][1] }), forecast: t('pg.cu.c2.forecast'), action: c.actions[c.actions.length - 1][1] })} />
      <DataTable t="table" title={t('pg.cu.skuTable')} columns={[cSku, kSales, cYoy]} rows={c.topSkus.map(([s, v, g]) => ({ [cSku]: s, [kSales]: v, [cYoy]: g }))} />
      <Timeline items={c.timeline} title={t('pg.cu.timeline')} />
    </div>
  </>);
}

/* ───────── Produto 360 ───────── */
export function ProductList() {
  const { products } = useData();
  return page(<>
    <ListHead title={t('pg.kind.product')} sub={t('pg.pr.listSub', { n: products.length })} icon={<ShieldCheck size={24} color="#FDB704" />} />
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
  const { findProduct, cal: { MONTHS, FUT } } = useData();
  const p = findProduct(id);
  const toast = useToast();
  if (!p) return <Navigate to="/portal/360/produtos" replace />;
  const pdf = () => { downloadPdf(`${t('pg.v360.file.product')}_${p.id}`, `${t('pg.kind.product')} — ${p.name}`, `${p.brand} · ${p.category} · EAN ${p.ean}`, [
    { text: t('pg.v360.pdf.summary'), size: 13, bold: true }, { text: p.summary, gap: 8 },
    { text: t('pg.v360.pdf.kpis'), size: 13, bold: true }, { text: t('pg.pr.pdfKpis', { ytd: p.ytd, volume: p.volume, margin: p.margin, price: p.price, share: p.share }), gap: 8 },
    { text: t('pg.pr.quality'), size: 13, bold: true }, ...p.quality.map(([l, v, s]) => ({ text: t('pg.pr.qualityLine', { l, v, s }) })), { text: '', gap: 6 },
    { text: `${t('pg.pr.ingredients')}: ${p.ingredients}` }, { text: `${t('pg.pr.allergens')}: ${p.allergens}` }, { text: `${t('pg.pr.carbon')}: ${p.carbon}` },
  ]); toast('download', t('pg.pr.pdfDone'), p.name); };
  const [kA, kF] = [t('pg.pr.actual'), t('pg.pr.forecast')];
  return page(<>
    <Header title={p.name} sub={`${p.brand} · ${p.category} · EAN ${p.ean}`} onPdf={pdf}
      avatar={<div style={{ width: 110, height: 76, borderRadius: 14, background: '#fff', border: '1px solid var(--line)', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>{p.img ? <img src={`./brands/${p.img}`} alt={p.brand} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <b>{p.brand}</b>}</div>}
      chips={<><span className="chip"><MapPin size={11} /> {p.plant} · {p.line}</span><span className="chip">{p.format}</span><span className="chip ok">Nutri-Score {p.nutri}</span><span className="chip"><Leaf size={11} /> {p.carbon}</span></>} />
    <div className="grid kpis">
      {[[t('pg.salesYtd'), p.ytd, p.volume, true], [t('pg.v360.grossMargin'), p.margin, p.price, true], [t('pg.pr.share'), p.share, 'NielsenIQ', true], [t('pg.pr.complaints'), `${fmtNum(p.ppm, 0, 3)} ppm`, p.ppm > 5 ? t('pg.pr.ppmHigh') : t('pg.pr.ppmLow'), p.ppm <= 5]]
        .map(([l, v, d, g], i) => <KpiCard key={l as string} i={i} k={{ label: l as string, value: v as string, delta: d as string, up: !!g, good: !!g }} />)}
    </div>
    <div className="grid charts">
      <Summary text={p.summary} />
      <div className="card" style={{ padding: 20 }}>
        <b style={{ fontSize: 14.5 }}>{t('pg.pr.lastLot')}</b>
        <table className="t" style={{ marginTop: 8 }}><thead><tr><th>{t('pg.pr.col.param')}</th><th>{t('pg.mod.col.value')}</th><th>{t('pg.pr.col.spec')}</th><th>{t('pg.mod.col.status')}</th></tr></thead>
          <tbody>{p.quality.map(([l, v, s, st]) => <tr key={l}><td>{l}</td><td><b>{v}</b></td><td className="muted">{s}</td><td><span className={`chip ${st}`}>{st === 'ok' ? t('pg.pr.conform') : t('pg.pr.attention')}</span></td></tr>)}</tbody></table>
        <div style={{ marginTop: 12, fontSize: 12.5, lineHeight: 1.55 }}><b>{t('pg.pr.ingredients')}:</b> {p.ingredients}<br /><b>{t('pg.pr.allergens')}:</b> {p.allergens}<br /><b>{t('pg.pr.shelf')}:</b> {p.shelf}</div>
      </div>
      <ChartCard c={chart({ id: `pr1${p.id}`, title: t('pg.pr.c1.title'), subtitle: t('pg.pr.c1.sub'), kind: 'line', keys: [kA, kF],
        data: [...MONTHS.map((m, i): Record<string, string | number> => (i === 11 ? { m, [kA]: p.monthly[i], [kF]: p.monthly[i] } : { m, [kA]: p.monthly[i] })), ...FUT.map((m, i): Record<string, string | number> => ({ m: `${m}*`, [kF]: p.forecast[i] }))],
        insight: p.summary.split('. ')[0] + '.', forecast: t('pg.pr.c1.fc', { v: fmtEurK(p.forecast[1]) }), action: t('pg.pr.c1.action'), model: t('pg.pr.c1.model') })} />
      <ChartCard c={chart({ id: `pr2${p.id}`, title: t('pg.pr.c2.title'), subtitle: '% YTD', kind: 'pie', keys: ['v'], data: p.channels.map(([m, v]) => ({ m, v })), ratio: true,
        insight: t('pg.pr.c2.insight', { x: p.channels[0][0], p: p.channels[0][1] }), forecast: t('pg.pr.c2.forecast'), action: t('pg.pr.c2.action') })} />
    </div>
    {p.trace ? <Trace /> : (
      <div className="card" style={{ padding: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
        <ShieldCheck size={18} color="#17924B" /><div style={{ fontSize: 13.5 }}><b>{t('pg.pr.trace')}</b> — {t('pg.pr.traceText')} <span className="muted">{t('pg.pr.traceHint')}</span></div>
        <Link to="/portal/360/produtos/milaneza-esparguete" className="btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>{t('pg.pr.traceBtn')}</Link>
      </div>
    )}
  </>);
}

/* ───────── Colaborador 360 ───────── */
export function EmployeeList() {
  const { employees } = useData();
  return page(<>
    <ListHead title={t('pg.kind.employee')} sub={t('pg.em.listSub', { n: employees.length })} icon={<User size={24} color="#FDB704" />} />
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
      {employees.map((e, i) => (
        <motion.div key={e.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .04 }}>
          <Link to={`/portal/360/colaboradores/${e.id}`} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16 }}>
            <Avatar name={e.name} size={46} />
            <div style={{ minWidth: 0 }}><div style={{ fontWeight: 650 }}>{e.name}</div><div className="muted" style={{ fontSize: 12.5 }}>{e.role}</div><div className="faint" style={{ fontSize: 12 }}>{e.site} · {t('pg.em.since', { y: e.since })}</div></div>
          </Link>
        </motion.div>
      ))}
    </div>
  </>);
}

export function EmployeeDetail() {
  const { id } = useParams();
  const { findEmployee } = useData();
  const e = findEmployee(id);
  const toast = useToast();
  if (!e) return <Navigate to="/portal/360/colaboradores" replace />;
  const pdf = () => { downloadPdf(`${t('pg.v360.file.employee')}_${e.id}`, `${t('pg.kind.employee')} — ${e.name}`, `${e.role} · ${e.site} · ${t('pg.em.since', { y: e.since })}`, [
    { text: t('pg.v360.pdf.summary'), size: 13, bold: true }, { text: e.summary, gap: 8 },
    { text: t('pg.em.skills'), size: 13, bold: true }, ...e.skills.map(([s, l]) => ({ text: `•  ${s}: ${l}/5` })), { text: '', gap: 6 },
    { text: t('pg.em.goals'), size: 13, bold: true }, ...e.goals.map(([g, p]) => ({ text: `•  ${g}: ${p}%` })),
  ]); toast('download', t('pg.em.pdfDone'), e.name); };
  return page(<>
    <Header title={e.name} sub={`${e.role} · ${e.site}`} onPdf={pdf} avatar={<Avatar name={e.name} size={64} />}
      chips={<><span className="chip">{e.unit}</span><span className="chip"><Clock size={11} /> {e.shift}</span><span className="chip"><User size={11} /> {t('pg.em.manager', { name: e.manager })}</span><span className="chip sf"><ShieldCheck size={11} /> {t('pg.em.masked')}</span></>} />
    <div className="grid kpis">
      {[[t('pg.em.kpi.since'), e.since, t('pg.em.years', { n: 2026 - +e.since }), true], [t('pg.em.kpi.training'), `${e.training} h`, t('pg.em.trainingAvg'), e.training >= 21], [t('pg.em.kpi.absence'), e.absence, t('pg.em.absenceAvg'), true], [t('pg.em.kpi.engagement'), e.engagement, t('pg.em.survey'), true]]
        .map(([l, v, d, g], i) => <KpiCard key={l as string} i={i} k={{ label: l as string, value: v as string, delta: d as string, up: !!g, good: !!g }} />)}
    </div>
    <div className="grid charts">
      <Summary text={e.summary} />
      <div className="card" style={{ padding: 20 }}>
        <b style={{ fontSize: 14.5 }}>{t('pg.em.skillsTitle')}</b>
        <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
          {e.skills.map(([s, l]) => <div key={s}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}><span>{s}</span><b>{l}/5</b></div><Meter value={l * 20} color={l >= 4 ? 'var(--ink)' : 'var(--gold-deep)'} /></div>)}
        </div>
      </div>
      <div className="card" style={{ padding: 20 }}>
        <b style={{ fontSize: 14.5 }}>{t('pg.em.goalsTitle')}</b>
        <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          {e.goals.map(([g, p]) => <div key={g}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}><span>{g}</span><b>{p}%</b></div><Meter value={p} color={p >= 80 ? 'var(--ok)' : p >= 50 ? 'var(--gold-deep)' : 'var(--crit)'} h={8} /></div>)}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>{e.certs.map(c => <span key={c} className="chip"><Award size={11} /> {c}</span>)}</div>
        <button className="btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={() => toast('action', t('pg.em.devDone'), t('pg.em.devText', { name: e.name, manager: e.manager }))}><Sparkles size={13} /> {t('pg.em.devBtn')}</button>
      </div>
      <Timeline items={e.timeline} />
    </div>
  </>);
}

/* ───────── Ativo 360 ───────── */
export function AssetList() {
  const { assets } = useData();
  const C = { asset: t('pg.as.col.asset'), equip: t('pg.as.col.equipment'), site: t('pg.as.col.site'), maker: t('pg.as.col.maker'), health: t('pg.as.col.health'), rul: t('pg.as.col.rul'), status: t('pg.mod.col.status') };
  return page(<>
    <ListHead title={t('pg.kind.asset')} sub={t('pg.as.listSub', { n: assets.length })} icon={<Wrench size={24} color="#FDB704" />} />
    <DataTable t="table" title={t('pg.as.table')} sub={t('pg.as.tableSub')} bars={[C.health]} status={[C.status]} link={{ base: '/portal/360/ativos', idCol: C.asset }}
      columns={[C.asset, C.equip, C.site, C.maker, C.health, C.rul, C.status]}
      rows={assets.map(a => ({ [C.asset]: a.id, [C.equip]: a.name, [C.site]: a.site, [C.maker]: `${a.maker} ${a.model}`, [C.health]: a.health, [C.rul]: a.rul, [C.status]: mapStatusLabel(a.status) }))} />
  </>);
}

export function AssetDetail() {
  const { id } = useParams();
  const { findAsset } = useData();
  const a = findAsset(id);
  const toast = useToast();
  if (!a) return <Navigate to="/portal/360/ativos" replace />;
  const pdf = () => { downloadPdf(`${t('pg.v360.file.asset')}_${a.id}`, `${t('pg.kind.asset')} — ${a.id} · ${a.name}`, `${a.site} · ${a.maker} ${a.model} (${a.year})`, [
    { text: t('pg.v360.pdf.summary'), size: 13, bold: true }, { text: a.summary, gap: 8 },
    { text: t('pg.as.prediction'), size: 13, bold: true }, { text: t('pg.as.pdf.prob', { p: a.prediction.failProb, c: a.prediction.driver }) }, { text: t('pg.as.pdf.action', { a: a.prediction.action, b: a.prediction.saving }), gap: 8 },
    { text: t('pg.as.pdf.sensors'), size: 13, bold: true }, ...a.sensors.map(s => ({ text: `•  ${s.label}: ${s.value}` })), { text: '', gap: 6 },
    { text: t('pg.as.workOrders'), size: 13, bold: true }, ...a.workOrders.map(([n, d, dt, st]) => ({ text: `•  ${n} — ${d} (${dt}, ${st})` })),
  ]); toast('download', t('pg.as.pdfDone'), `${a.id} · ${a.name}`); };
  const hc = a.health >= 80 ? '#17924B' : a.health >= 65 ? '#E08600' : '#D92D20';
  const [kV, kL] = [t('pg.mod.col.value'), t('pg.as.limit')];
  const W = { order: t('pg.as.col.order'), desc: t('pg.as.col.desc'), date: t('pg.as.col.date'), status: t('pg.mod.col.status') };
  return page(<>
    <Header title={`${a.id} · ${a.name}`} sub={`${a.site} · ${a.maker} ${a.model} · ${a.year}`} onPdf={pdf}
      avatar={<div style={{ width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `conic-gradient(${hc} ${a.health * 3.6}deg, #EEE9DA 0)` }}><div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', fontWeight: 750 }}>{a.health}</div></div>}
      chips={<><span className={`chip ${a.status === 'critico' ? 'crit' : a.status === 'aviso' ? 'warn' : 'ok'}`}><span className={`dot ${a.status}`} /> {mapStatusLabel(a.status)}</span><span className="chip">{t('pg.as.rul', { v: a.rul })}</span><span className="chip">{a.throughput}</span></>} />
    <div className="grid kpis">
      {[[t('pg.as.col.health'), `${a.health}/100`, a.status === 'ok' ? t('pg.as.stable') : t('pg.as.degrading'), a.status === 'ok'], ['MTBF', a.mtbf, t('pg.as.mtbf'), true], [t('pg.as.kpi.avail'), a.availability, t('pg.as.last90'), true], [t('pg.as.kpi.energy'), a.energy, t('pg.as.intensity'), true]]
        .map(([l, v, d, g], i) => <KpiCard key={l as string} i={i} k={{ label: l as string, value: v as string, delta: d as string, up: !!g, good: !!g }} />)}
    </div>
    <Schematic a={a} />
    <div className="grid charts">
      <div className="card" style={{ padding: 20, background: a.status === 'ok' ? '#fff' : 'linear-gradient(160deg,#FFF6E5,#FFFFFF 70%)' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Sparkles size={16} color="#1D8FC4" /><b style={{ fontSize: 14.5 }}>{t('pg.as.prediction')}</b></div>
        <div style={{ display: 'grid', gap: 10, marginTop: 12, fontSize: 13.5 }}>
          <div><span className="muted">{t('pg.as.failProb')}:</span> <b>{a.prediction.failProb}</b></div>
          <div><span className="muted">{t('pg.as.cause')}:</span> {a.prediction.driver}</div>
          <div><span className="muted">{t('pg.as.action')}:</span> <b>{a.prediction.action}</b></div>
          <div><span className="muted">{t('pg.as.benefit')}:</span> <b style={{ color: 'var(--ok)' }}>{a.prediction.saving}</b></div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="btn btn-sm" onClick={() => toast('action', t('pg.as.woDone'), `${a.id}: ${a.prediction.action}`)}><Wrench size={13} /> {t('pg.as.woBtn')}</button>
          <button className="btn-ghost btn-sm" onClick={() => toast('success', t('pg.as.partsDone'), t('pg.as.partsText', { site: a.site }))}>{t('pg.as.partsBtn')}</button>
        </div>
        <p className="muted" style={{ fontSize: 12.5, marginTop: 14, lineHeight: 1.5 }}>{a.summary}</p>
      </div>
      <ChartCard c={chart({ id: `as1${a.id}`, title: a.trendLabel, subtitle: t('pg.as.c1.sub'), kind: 'area', keys: [kV, kL], ratio: true,
        data: a.trend.map((v, i) => ({ m: `${i + 1}`, [kV]: v, [kL]: a.trendLimit })), insight: a.prediction.driver, forecast: a.prediction.failProb, action: a.prediction.action, model: t('pg.as.c1.model') })} />
      <div style={{ gridColumn: '1 / -1' }}><DataTable t="table" title={t('pg.as.workOrders')} columns={[W.order, W.desc, W.date, W.status]} status={[W.status]} rows={a.workOrders.map(([n, d, dt, st]) => ({ [W.order]: n, [W.desc]: d, [W.date]: dt, [W.status]: st }))} /></div>
    </div>
  </>);
}
