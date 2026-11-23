import { createContext, Fragment, useCallback, useContext, useEffect, useState } from 'react';
import * as core from './dict/core';
import * as cmp from './dict/components';
import * as pg from './dict/pages';

export type Lang = 'pt' | 'en';
const STORE = 'cerealis.lang';

function initialLang(): Lang {
  // HashRouter: query params live inside the hash fragment, e.g. /#/?lang=en
  const hash = location.hash;
  const qIdx = hash.indexOf('?');
  const q = qIdx >= 0
    ? new URLSearchParams(hash.slice(qIdx)).get('lang')
    : new URLSearchParams(location.search).get('lang');
  if (q === 'pt' || q === 'en') {
    try { localStorage.setItem(STORE, q); } catch { /* modo privado */ }
    return q;
  }
  try {
    const s = localStorage.getItem(STORE);
    if (s === 'pt' || s === 'en') return s;
  } catch { /* modo privado */ }
  return 'pt';
}

// Língua corrente ao nível do módulo: usada por funções fora do React (formatação, PDF, CSV).
let current: Lang = initialLang();
export const getLang = () => current;
export const loc = () => (current === 'en' ? 'en-GB' : 'pt-PT');

const DICT = {
  pt: { ...core.pt, ...cmp.pt, ...pg.pt },
  en: { ...core.en, ...cmp.en, ...pg.en },
};
export type DictKey = keyof typeof core.pt | keyof typeof cmp.pt | keyof typeof pg.pt;

/** Tradução com interpolação simples: t('cmp.agentStarted', { name }) → "Agente iniciado · {name}". */
export function t(key: DictKey, vars?: Record<string, string | number>): string {
  const table = DICT[current] as Record<string, string>;
  let s = table[key] ?? (DICT.pt as Record<string, string>)[key] ?? key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
  return s;
}
/** Escolhe a variante da língua corrente: pick({ pt: ..., en: ... }). */
export const pick = <T,>(v: { pt: T; en: T }): T => v[current];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: current, setLang: () => {} });
export const useLang = () => useContext(Ctx);
/** Hook de conveniência: subscreve a mudanças de língua e devolve t(). */
export const useT = () => { useContext(Ctx); return t; };

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(current);
  const setLang = useCallback((l: Lang) => {
    current = l;
    try { localStorage.setItem(STORE, l); } catch { /* modo privado */ }
    setLangState(l);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en-GB' : 'pt-PT';
    document.title = t('core.docTitle');
  }, [lang]);
  // A chave força a remontagem: todos os textos, gráficos e dados passam para a nova língua de uma vez.
  return <Ctx.Provider value={{ lang, setLang }}><Fragment key={lang}>{children}</Fragment></Ctx.Provider>;
}

export function LangToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { lang, setLang } = useLang();
  const dark = tone === 'dark';
  return (
    <div role="group" aria-label={t('core.language')} style={{ display: 'inline-flex', gap: 2, padding: 3, borderRadius: 999, flexShrink: 0,
      background: dark ? 'rgba(20,15,8,.55)' : '#fff', border: `1px solid ${dark ? 'rgba(253,183,4,.28)' : 'var(--line)'}`,
      backdropFilter: dark ? 'blur(14px)' : undefined, WebkitBackdropFilter: dark ? 'blur(14px)' : undefined }}>
      {(['pt', 'en'] as const).map(l => {
        const on = lang === l;
        return (
          <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={on} title={l === 'pt' ? 'Português' : 'English'}
            style={{ padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 650, letterSpacing: '.05em', transition: 'background .2s, color .2s',
              background: on ? (dark ? '#FDB704' : 'var(--ink)') : 'transparent',
              color: on ? (dark ? '#121210' : '#fff') : (dark ? 'rgba(255,240,210,.72)' : 'var(--muted)') }}>
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
