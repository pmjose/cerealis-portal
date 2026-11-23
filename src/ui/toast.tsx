import { createContext, useCallback, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Download, Info, Link2, Zap, X, Bot } from 'lucide-react';

type Kind = 'success' | 'action' | 'download' | 'info' | 'link' | 'agent';
type Toast = { id: number; kind: Kind; title: string; text?: string };
const ICON = {
  success: [CheckCircle2, '#17924B'], action: [Zap, '#D99A00'], download: [Download, '#1D8FC4'],
  info: [Info, '#11567F'], link: [Link2, '#7C3AED'], agent: [Bot, '#29B5E8'],
} as const;

const Ctx = createContext<(kind: Kind, title: string, text?: string) => void>(() => {});
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<Toast[]>([]);
  const push = useCallback((kind: Kind, title: string, text?: string) => {
    const id = Date.now() + Math.random();
    setList(l => [...l.slice(-3), { id, kind, title, text }]);
    setTimeout(() => setList(l => l.filter(t => t.id !== id)), 5200);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div style={{ position: 'fixed', right: 24, bottom: 92, zIndex: 500, display: 'flex', flexDirection: 'column', gap: 10, width: 380, pointerEvents: 'none' }}>
        <AnimatePresence>
          {list.map(t => {
            const [Icon, col] = ICON[t.kind];
            return (
              <motion.div key={t.id} layout initial={{ opacity: 0, x: 60, scale: .96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 60 }}
                transition={{ type: 'spring', damping: 24, stiffness: 260 }}
                style={{ pointerEvents: 'auto', padding: '14px 16px', borderRadius: 16, background: 'rgba(255,255,255,.97)', border: '1px solid rgba(18,18,16,.1)', boxShadow: '0 24px 48px -20px rgba(0,0,0,.35)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, display: 'grid', placeItems: 'center', background: col + '1c', flexShrink: 0 }}><Icon size={17} color={col} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.title}</div>
                    {t.text && <div className="muted" style={{ fontSize: 12.5, marginTop: 3, lineHeight: 1.45 }}>{t.text}</div>}
                  </div>
                  <button onClick={() => setList(l => l.filter(x => x.id !== t.id))} aria-label="Fechar"><X size={14} className="muted" /></button>
                </div>
                <motion.div initial={{ width: '100%' }} animate={{ width: 0 }} transition={{ duration: 5.2, ease: 'linear' }}
                  style={{ position: 'absolute', left: 0, bottom: 0, height: 2, background: col }} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
