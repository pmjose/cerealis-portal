import { useParams, Navigate, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Clock, User, Download, Share2, FileText, Layers } from 'lucide-react';
import { useToast } from '../ui/toast';
import { downloadCsv, downloadPdf, copyLink, type Sheet, type PdfLine } from '../utils/download';
import { useFilters, buLabel, channelLabel } from '../filters';
import { useData } from '../data';
import { t } from '../i18n';
import { fmtDate } from '../i18n/format';
import { modelStatusLabel, driftLabel, modeLabel } from '../i18n/labels';
import Blocks from '../components/Blocks';
import { ModuleCtx } from '../components/ChartCard';
import { Tabs } from '../ui/kit';
import { Icon } from '../ui/icons';

export default function ModulePage() {
  const { slug, section } = useParams();
  const nav = useNavigate();
  const toast = useToast();
  const { f } = useFilters();
  const { findModule, svOf } = useData();
  const m = findModule(slug);
  if (!m) return <Navigate to="/portal" replace />;
  const s = m.sections.find(x => x.id === section) ?? m.sections[0];
  const ctx = `${f.period} · ${buLabel(f.bu)} · ${channelLabel(f.channel)}`;
  const sheets = (): Sheet[] => s.blocks.flatMap((b): Sheet[] => {
    if (b.t === 'kpis') {
      const [kpi, val, chg] = [t('pg.mod.col.kpi'), t('pg.mod.col.value'), t('pg.mod.col.change')];
      return [{ title: t('pg.mod.sheet.kpis'), columns: [kpi, val, chg], rows: b.items.map(k => ({ [kpi]: k.label, [val]: k.value, [chg]: k.delta })) }];
    }
    if (b.t === 'table') return [{ title: b.title, columns: b.columns, rows: b.rows }];
    if (b.t === 'chart') {
      const dim = t('pg.mod.col.dimension');
      const cols = ['m', ...b.c.keys];
      return [{ title: b.c.title, columns: cols.map(k => k === 'm' ? dim : k), rows: b.c.data.map(r => Object.fromEntries(cols.map(k => [k === 'm' ? dim : k, r[k] ?? '']))) }];
    }
    if (b.t === 'funnel') {
      const [stage, qty, det] = [t('pg.mod.col.stage'), t('pg.mod.col.qty'), t('pg.mod.col.detail')];
      return [{ title: b.title, columns: [stage, qty, det], rows: b.stages.map(([a, v, d]) => ({ [stage]: a, [qty]: v, [det]: d })) }];
    }
    if (b.t === 'heat') {
      const row = t('pg.mod.col.row');
      return [{ title: b.title, columns: [row, ...b.cols], rows: b.rows.map((r, i) => ({ [row]: r, ...Object.fromEntries(b.cols.map((c, j) => [c, b.values[i][j]])) })) }];
    }
    if (b.t === 'models') {
      const cols = [t('pg.mod.col.model'), t('pg.mod.col.type'), t('pg.mod.col.metric'), t('pg.mod.col.status'), t('pg.mod.col.drift'), t('pg.mod.col.trained')];
      return [{ title: t('pg.mod.sheet.models'), columns: cols, rows: b.items.map(x => Object.fromEntries(cols.map((c, j) => [c, [x.name, x.kind, x.metric, modelStatusLabel(x.status), driftLabel(x.drift), x.trained][j]]))) }];
    }
    return [];
  });
  const exportCsv = () => { const sh = sheets(); downloadCsv(`${m.short}_${s.label}`, sh); toast('download', t('pg.mod.csvDone'), t('pg.mod.csvText', { name: m.name, section: s.label, n: sh.length, ctx })); };
  const exportPdf = () => {
    const L: PdfLine[] = [{ text: t('pg.mod.pdf.meta', { owner: m.owner, ctx }), size: 9, color: [0.43, 0.42, 0.38], gap: 10 }];
    s.blocks.forEach(b => {
      if (b.t === 'kpis') { L.push({ text: t('pg.mod.pdf.kpis'), size: 13, bold: true, gap: 4 }); b.items.forEach(k => L.push({ text: `•  ${k.label}: ${k.value}  (${k.delta})` })); L.push({ text: '', gap: 6 }); }
      if (b.t === 'insights') { L.push({ text: t('pg.mod.pdf.insights'), size: 13, bold: true, gap: 4 }); b.items.forEach(i => { L.push({ text: i.title, bold: true }); L.push({ text: i.text, gap: 4, color: [0.3, 0.3, 0.27] }); }); L.push({ text: '', gap: 6 }); }
      if (b.t === 'chart') { L.push({ text: b.c.title, size: 12, bold: true, gap: 2 }); L.push({ text: t('pg.mod.pdf.insight', { v: b.c.insight }) }); L.push({ text: t('pg.mod.pdf.forecast', { v: b.c.forecast }) }); L.push({ text: t('pg.mod.pdf.action', { v: b.c.action }), gap: 8 }); }
      if (b.t === 'table') { L.push({ text: b.title, size: 12, bold: true, gap: 2 }); L.push({ text: b.columns.join('  |  '), size: 9, bold: true }); b.rows.forEach(r => L.push({ text: b.columns.map(c => r[c]).join('  |  '), size: 9 })); L.push({ text: '', gap: 8 }); }
      if (b.t === 'agents') b.items.forEach(a => { L.push({ text: t('pg.mod.pdf.agent', { name: a.name, mode: modeLabel(a.mode).toLowerCase() }), size: 12, bold: true }); a.steps.forEach(st => L.push({ text: `${st.title}: ${st.detail}`, size: 9.5 })); L.push({ text: '', gap: 6 }); });
      if (b.t === 'models') { L.push({ text: t('pg.mod.pdf.models'), size: 12, bold: true }); b.items.forEach(x => L.push({ text: `•  ${x.name} — ${x.metric} (${modelStatusLabel(x.status)})`, size: 9.5 })); L.push({ text: '', gap: 6 }); }
    });
    downloadPdf(`${m.short}_${s.label}`, `${m.name} — ${s.label}`, t('pg.mod.pdf.generated', { date: fmtDate() }), L);
    toast('download', t('pg.mod.pdfDone'), `${m.name} › ${s.label}`);
  };
  const share = async () => { const ok = await copyLink(); toast('link', ok ? t('pg.common.linkCopied') : t('pg.mod.linkReady'), ok ? t('pg.mod.linkText') : location.href); };

  return (
    <ModuleCtx.Provider value={{ sv: svOf(m.slug), schema: m.slug.toUpperCase().replace(/-/g, '_') }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, display: 'grid', placeItems: 'center', background: '#121210' }}><Icon name={m.icon} size={26} color="#FDB704" /></div>
            <div>
              <h1 className="display" style={{ fontSize: 30, fontWeight: 750, letterSpacing: '-0.035em' }}>{m.name}</h1>
              <div className="muted" style={{ fontSize: 14 }}>{m.tagline}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-ghost btn-sm" onClick={share}><Share2 size={14} /> {t('pg.common.share')}</button>
            <button className="btn-ghost btn-sm" onClick={exportCsv}><Download size={14} /> Excel (CSV)</button>
            <button className="btn-ghost btn-sm" onClick={exportPdf}><FileText size={14} /> PDF</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14, fontSize: 12 }}>
          <span className="chip"><User size={12} /> {m.owner}</span>
          <span className="chip"><Clock size={12} /> {t('pg.common.updated')}</span>
          <span className="chip sf"><Layers size={12} /> {svOf(m.slug)}</span>
          {m.sources.map(x => <span key={x} className="chip" style={{ color: 'var(--muted)' }}><Database size={11} /> {x}</span>)}
          <Link to="/portal/dados/produtos" className="chip gold">{t('pg.mod.dataProducts')}</Link>
        </div>
        <div style={{ marginTop: 16, overflowX: 'auto' }}>
          <Tabs value={s.id} onChange={id => nav(`/portal/${m.slug}/${id}`)} tabs={m.sections.map(x => ({ id: x.id, label: x.label, icon: <Icon name={x.icon} size={15} /> }))} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .28 }}>
            <Blocks blocks={s.blocks} />
          </motion.div>
        </AnimatePresence>
      </div>
    </ModuleCtx.Provider>
  );
}
