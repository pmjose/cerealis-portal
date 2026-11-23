import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ship, Warehouse, Factory, Package, Truck, Store, Play, AlertTriangle, CheckCircle2, Timer, FileText } from 'lucide-react';
import { useToast } from '../ui/toast';
import { downloadPdf } from '../utils/download';
import { useData } from '../data';
import { useT } from '../i18n';

const ICONS = [Ship, Warehouse, Factory, Package, Truck, Store];

export default function Trace({ title }: { title?: string }) {
  const [phase, setPhase] = useState(-1);
  const [done, setDone] = useState(false);
  const toast = useToast();
  const t = useT();
  const { TRACE } = useData();
  const { destinations, units, pallets, customers } = TRACE.summary;
  const run = () => {
    setDone(false); setPhase(0);
    toast('agent', t('cmp.trace.started'), t('cmp.trace.startedText', { product: TRACE.product, lot: TRACE.lot }));
    TRACE.stages.forEach((_, i) => setTimeout(() => setPhase(i), i * 650));
    setTimeout(() => { setDone(true); toast('success', t('cmp.trace.done'), t('cmp.trace.doneText', { destinations, units, customers })); }, TRACE.stages.length * 650 + 200);
  };
  const pdf = () => {
    downloadPdf(t('cmp.trace.file', { lot: TRACE.lot }), t('cmp.trace.pdfTitle', { product: TRACE.product }), t('cmp.trace.pdfSub', { lot: TRACE.lot, produced: TRACE.produced }), [
      { text: t('cmp.trace.summary'), size: 13, bold: true },
      { text: t('cmp.trace.summaryLine', { destinations, units, pallets, customers }), gap: 8 },
      ...TRACE.stages.flatMap(s => [{ text: s.label, size: 12, bold: true }, ...s.nodes.map(n => ({ text: `•  ${n.title} — ${n.sub} (${n.meta})`, size: 10 })), { text: '', gap: 4 }]),
      { text: t('cmp.trace.notifications'), bold: true },
    ]);
    toast('download', t('cmp.trace.dossier'), t('cmp.trace.dossierText', { lot: TRACE.lot }));
  };
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontWeight: 650, fontSize: 15 }}>{title ?? t('cmp.trace.title')}</div>
          <div className="muted" style={{ fontSize: 12.5, marginTop: 3 }}>{TRACE.product} · EAN {TRACE.ean} · {t('cmp.trace.lot')} <b className="mono" style={{ color: 'var(--ink)' }}>{TRACE.lot}</b> · {TRACE.produced}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {done && <button className="btn-ghost btn-sm" onClick={pdf}><FileText size={13} /> {t('cmp.trace.pdfButton')}</button>}
          <button className="btn btn-sm" onClick={run}><Play size={13} /> {t('cmp.trace.simulate')}</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${TRACE.stages.length}, minmax(0,1fr))`, gap: 12, marginTop: 20, position: 'relative' }}>
        {TRACE.stages.map((s, i) => {
          const I = ICONS[i] ?? Package;
          const lit = phase >= i;
          return (
            <div key={s.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <motion.div animate={{ background: lit ? '#FDB704' : '#F2EFE3', scale: phase === i && !done ? [1, 1.15, 1] : 1 }} transition={{ duration: .5 }}
                  style={{ width: 30, height: 30, borderRadius: 10, display: 'grid', placeItems: 'center' }}><I size={15} /></motion.div>
                <div style={{ fontSize: 12, fontWeight: 650, textTransform: 'uppercase', letterSpacing: '.06em' }} className={lit ? '' : 'muted'}>{s.label}</div>
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                {s.nodes.map(n => (
                  <motion.div key={n.title} animate={{ borderColor: lit ? 'rgba(217,154,0,.6)' : 'rgba(18,18,16,.09)', background: lit ? '#FFFBEA' : '#fff' }} transition={{ duration: .4 }}
                    style={{ border: '1px solid', borderRadius: 12, padding: '9px 11px' }}>
                    <div style={{ fontSize: 12.5, fontWeight: 650, display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                      <span>{n.title}</span>{n.flag && <AlertTriangle size={13} color="#E08600" />}
                    </div>
                    <div style={{ fontSize: 11.5, marginTop: 2 }}>{n.sub}</div>
                    <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>{n.meta}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <motion.div initial={false} animate={{ height: done ? 'auto' : 0, opacity: done ? 1 : 0 }} style={{ overflow: 'hidden' }}>
        <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background: '#E9F7EF', border: '1px solid rgba(23,146,75,.3)', display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center', fontSize: 13 }}>
          <CheckCircle2 size={18} color="#17924B" />
          <span><Timer size={13} style={{ display: 'inline', verticalAlign: -2 }} /> <b>4 min 12 s</b> {t('cmp.trace.before')}</span>
          <span><b>{destinations}</b> {t('cmp.trace.destinations')}</span><span><b>{pallets}</b> {t('cmp.trace.pallets')}</span>
          <span><b>{units}</b> {t('cmp.trace.units')}</span><span><b>{customers}</b> {t('cmp.trace.customers')}</span>
          <span className="muted">{t('cmp.trace.prepared')}</span>
        </div>
      </motion.div>
    </div>
  );
}
