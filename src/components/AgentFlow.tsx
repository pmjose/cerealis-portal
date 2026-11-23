import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, UserCheck, Play, Check, X, Loader2, RotateCcw, Clock } from 'lucide-react';
import type { Agent } from '../data/types';
import { useToast } from '../ui/toast';

export default function AgentFlow({ a, compact }: { a: Agent; compact?: boolean }) {
  const [step, setStep] = useState(-1);
  const [decision, setDecision] = useState<'pend' | 'ok' | 'no'>('pend');
  const toast = useToast();
  const approvalIdx = a.steps.findIndex(s => s.title.startsWith('Aprovação'));
  const waiting = a.mode === 'humano' && step === approvalIdx && decision === 'pend';

  useEffect(() => {
    if (step < 0 || step >= a.steps.length - 1 || waiting || decision === 'no') return;
    const id = setTimeout(() => setStep(s => s + 1), 1050);
    return () => clearTimeout(id);
  }, [step, waiting, decision, a.steps.length]);

  const run = () => { setDecision('pend'); setStep(0); toast('agent', `Agente iniciado · ${a.name}`, `Gatilho: ${a.trigger}`); };
  const done = step === a.steps.length - 1;
  useEffect(() => { if (done) toast('success', `Agente concluído · ${a.name}`, a.steps[a.steps.length - 1].detail); }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="card" style={{ padding: 20, borderColor: waiting ? 'rgba(217,154,0,.55)' : undefined, boxShadow: waiting ? '0 0 0 4px rgba(253,183,4,.14)' : undefined, transition: '.3s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
            <span className={`chip ${a.mode === 'auto' ? 'sf' : 'gold'}`}>
              {a.mode === 'auto' ? <><Bot size={12} /> Autónomo</> : <><UserCheck size={12} /> Humano no circuito</>}
            </span>
            {a.domain && <span className="chip">{a.domain}</span>}
            {a.last && <span className="chip" style={{ color: 'var(--muted)' }}><Clock size={11} /> {a.last}</span>}
          </div>
          <div style={{ fontWeight: 650, fontSize: 15.5 }}>{a.name}</div>
          <div className="muted" style={{ fontSize: 12.5, marginTop: 4 }}>Gatilho: {a.trigger}</div>
          <div style={{ fontSize: 12.5, marginTop: 3 }}>Impacto: <b style={{ color: 'var(--ok)' }}>{a.impact}</b></div>
        </div>
        <button className={step < 0 ? 'btn btn-sm' : 'btn-ghost btn-sm'} style={{ flexShrink: 0 }} onClick={run}>
          {step < 0 ? <><Play size={13} /> Executar</> : <><RotateCcw size={13} /> Repetir</>}
        </button>
      </div>

      <div style={{ marginTop: 16, display: compact && step < 0 ? 'none' : 'grid' }}>
        {a.steps.map((s, i) => {
          const active = i === step, past = i < step || (done && i === step);
          const isApproval = i === approvalIdx;
          const col = past ? '#17924B' : active ? (isApproval ? '#D99A00' : '#1D8FC4') : '#C9C4B6';
          return (
            <div key={i} style={{ display: 'flex', gap: 12, opacity: step < 0 || i <= step ? 1 : .4, transition: '.4s' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div animate={{ scale: active && !past ? [1, 1.14, 1] : 1 }} transition={{ repeat: active && !past ? Infinity : 0, duration: 1.2 }}
                  style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${col}`, display: 'grid', placeItems: 'center', background: past ? '#17924B14' : '#fff' }}>
                  {past ? <Check size={12} color="#17924B" /> : active ? <Loader2 size={12} color={col} className="spin" /> : <span style={{ fontSize: 10.5, fontWeight: 600, color: '#9B968A' }}>{i + 1}</span>}
                </motion.div>
                {i < a.steps.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 14, background: past ? '#17924B55' : 'rgba(18,18,16,.08)' }} />}
              </div>
              <div style={{ paddingBottom: 13, flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 650, color: step >= 0 && i <= step ? col : 'var(--muted)' }}>{s.title}</div>
                <div style={{ fontSize: 13, marginTop: 2, lineHeight: 1.5 }}>{s.detail}</div>
                {isApproval && waiting && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 10, padding: 12, borderRadius: 12, background: 'var(--gold-wash)', border: '1px solid rgba(217,154,0,.35)' }}>
                    <div style={{ fontSize: 12, marginBottom: 8 }}>Aprovador: <b>{a.approver}</b></div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-sm" onClick={() => { setDecision('ok'); setStep(x => x + 1); toast('action', 'Decisão aprovada', `${a.approver?.split(' — ')[0]} aprovou: ${a.name}`); }}><Check size={13} /> Aprovar</button>
                      <button className="btn-ghost btn-sm" onClick={() => { setDecision('no'); toast('info', 'Decisão rejeitada', `Fluxo "${a.name}" encerrado e registado na auditoria.`); }}><X size={13} /> Rejeitar</button>
                    </div>
                  </motion.div>
                )}
                {isApproval && decision === 'no' && <div style={{ fontSize: 12, color: 'var(--crit)', marginTop: 6 }}>Rejeitado por {a.approver?.split(' — ')[0]} · fluxo encerrado e registado.</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
