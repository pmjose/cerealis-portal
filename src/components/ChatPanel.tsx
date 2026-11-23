import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Database, Search, Check, Maximize2, Minimize2 } from 'lucide-react';
import type { QA } from '../data/types';

type Msg = { role: 'user' | 'ai'; text: string; steps?: string[]; shown?: number };
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s: string) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .split('\n').map(l => l.startsWith('• ') ? `<div style="display:flex;gap:8px;margin-top:4px"><span style="color:#D99A00">•</span><span>${l.slice(2)}</span></div>` : l ? `<p>${l}</p>` : '').join('');

export default function ChatPanel({ context, questions, sv }: { context: string; questions: QA[]; sv: string }) {
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { setMsgs([]); }, [context]);
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, busy]);

  const ask = (q: string) => {
    if (busy || !q.trim()) return;
    const hit = questions.find(x => x.q === q) ?? questions.find(x => q.toLowerCase().split(' ').filter(w => w.length > 4).some(w => x.q.toLowerCase().includes(w)));
    const answer = hit?.a ?? `Encaminhei a pergunta para o Cortex Analyst sobre **${context}**. Para uma resposta verificada, comece por uma das perguntas sugeridas — estão ligadas a consultas certificadas no modelo semântico **${sv}**.`;
    const steps = [`A interpretar a pergunta no contexto ${context}`, `Modelo semântico ${sv} · consultas verificadas`, 'SQL gerado e executado no warehouse WH_ESPIGA_BI', 'Resposta validada com política de acesso Horizon'];
    setMsgs(m => [...m, { role: 'user', text: q }, { role: 'ai', text: '', steps, shown: 0 }]); setInput(''); setBusy(true);
    let st = 0;
    const tick = setInterval(() => {
      st++;
      setMsgs(m => m.map((x, i) => i === m.length - 1 ? { ...x, shown: st } : x));
      if (st >= steps.length) {
        clearInterval(tick);
        let n = 0;
        const typer = setInterval(() => {
          n += 7;
          setMsgs(m => m.map((x, i) => i === m.length - 1 ? { ...x, text: answer.slice(0, n) } : x));
          if (n >= answer.length) { clearInterval(typer); setBusy(false); }
        }, 16);
      }
    }, 420);
  };

  return (
    <>
      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }} onClick={() => setOpen(true)} className="btn"
        style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60, padding: '13px 20px', boxShadow: '0 18px 40px -14px rgba(0,0,0,.55)' }}>
        <Sparkles size={17} color="#FDB704" /> Assistente Espiga
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x: 480, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 480, opacity: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            style={{ position: 'fixed', top: 12, right: 12, bottom: 12, width: wide ? 640 : 440, zIndex: 70, display: 'flex', flexDirection: 'column', borderRadius: 24, background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(20px)', border: '1px solid var(--line)', boxShadow: '0 30px 80px -30px rgba(0,0,0,.45)', transition: 'width .3s' }}>
            <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', minWidth: 0 }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: '#121210', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Sparkles size={18} color="#FDB704" /></div>
                <div style={{ minWidth: 0 }}><div style={{ fontWeight: 650 }}>Assistente Espiga</div><div className="muted" style={{ fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Snowflake Intelligence · {context}</div></div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setWide(x => !x)} aria-label="Expandir">{wide ? <Minimize2 size={16} className="muted" /> : <Maximize2 size={16} className="muted" />}</button>
                <button onClick={() => setOpen(false)} aria-label="Fechar"><X size={18} className="muted" /></button>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {msgs.length === 0 && (
                <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                  <div style={{ fontWeight: 650, fontSize: 17, marginBottom: 6 }}>Olá, Sofia.</div>
                  <div className="muted">Tenho acesso governado aos dados de <b style={{ color: 'var(--ink)' }}>{context}</b> através do Cortex Analyst, do Cortex Search e dos agentes da Espiga. Escolha uma pergunta ou escreva a sua.</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                    <span className="chip"><Database size={11} /> {sv}</span><span className="chip"><Search size={11} /> Documentos: fichas técnicas, IFS, contratos</span>
                  </div>
                </div>
              )}
              {msgs.map((m, i) => m.role === 'user' ? (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ alignSelf: 'flex-end', maxWidth: '86%', padding: '10px 14px', borderRadius: '16px 16px 4px 16px', fontSize: 14, background: '#121210', color: '#fff' }}>{m.text}</motion.div>
              ) : (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: 'flex-start', maxWidth: '94%' }}>
                  <div style={{ display: 'grid', gap: 4, marginBottom: 8 }}>
                    {m.steps?.slice(0, Math.max(1, m.shown ?? 0)).map((s, j) => (
                      <div key={j} style={{ display: 'flex', gap: 7, alignItems: 'center', fontSize: 12 }} className="muted">
                        {j < (m.shown ?? 0) ? <Check size={12} color="#17924B" /> : <span className="typing"><span /></span>}{s}
                      </div>
                    ))}
                  </div>
                  {m.text && <div className="md" style={{ padding: '12px 14px', borderRadius: '16px 16px 16px 4px', fontSize: 14, lineHeight: 1.58, background: '#F6F3E6', border: '1px solid var(--line)' }} dangerouslySetInnerHTML={{ __html: md(m.text) }} />}
                </motion.div>
              ))}
              <div ref={end} />
            </div>
            <div style={{ padding: 14, borderTop: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10, maxHeight: 132, overflowY: 'auto' }}>
                {questions.map(q => <button key={q.q} className="chip" style={{ textAlign: 'left', whiteSpace: 'normal' }} onClick={() => ask(q.q)}>{q.q}</button>)}
              </div>
              <form onSubmit={e => { e.preventDefault(); ask(input); }} style={{ display: 'flex', gap: 8, padding: 5, paddingLeft: 14, borderRadius: 999, background: '#F6F3E6', border: '1px solid var(--line)' }}>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Pergunte algo sobre os dados…" style={{ flex: 1, background: 'none', border: 0, outline: 0, fontSize: 14 }} />
                <button className="btn" style={{ padding: 9 }} aria-label="Enviar"><Send size={15} /></button>
              </form>
              <div className="faint" style={{ fontSize: 10.5, textAlign: 'center', marginTop: 8 }}>Demonstração · dados ilustrativos · respostas geradas com Snowflake Cortex</div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
