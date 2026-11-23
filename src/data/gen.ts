import type { Kpi, Block, Chart, ChartKind, Agent, Model } from './types';

/** Bloco de gráfico com painel Cortex AI (insight, previsão, ação). */
export function ch(id: string, title: string, subtitle: string, kind: ChartKind, keys: string[], data: Record<string, string | number>[],
  insight: string, forecast: string, action: string, extra: Partial<Chart> & { span?: boolean } = {}): Block {
  const { span, ...rest } = extra;
  return { t: 'chart', span, c: { id, title, subtitle, kind, keys, data, insight, forecast, action, ...rest } };
}

/** Agente: passos como [título, detalhe]. Um passo "Aprovação…" cria o ponto de decisão humana. */
export function ag(id: string, name: string, mode: 'auto' | 'humano', trigger: string, impact: string, steps: [string, string][], opts: { approver?: string; domain?: string; last?: string } = {}): Agent {
  return { id, name, mode, trigger, impact, steps: steps.map(([title, detail]) => ({ title, detail })), ...opts };
}

export const ml = (name: string, kind: string, metric: string, features: string, owner: string, status: Model['status'] = 'Produção', drift: Model['drift'] = 'Estável', trained = 'nov/26', value?: string): Model =>
  ({ name, kind, metric, features, owner, status, drift, trained, value });

// Últimos 12 meses fechados (nov/2025 → out/2026). Hoje: 23 nov 2026.
export const MONTHS = ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];
export const YTD = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];
export const WEEKS = Array.from({ length: 12 }, (_, i) => `S${36 + i}`);
export const FUT = ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'];
// Etiquetas em inglês para os gémeos de dados em src/data/en (mesma ordem e comprimento).
export const MONTHS_EN = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
export const YTD_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
export const WEEKS_EN = Array.from({ length: 12 }, (_, i) => `W${36 + i}`);
export const FUT_EN = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

export function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

/** Série mensal suave e determinística: [nome, base, amplitude]. */
export function series(seed: number, keys: [string, number, number][], labels: string[] = MONTHS, dec = 1) {
  const r = rng(seed);
  const p = 10 ** dec;
  return labels.map((m, i) => {
    const o: Record<string, string | number> = { m };
    keys.forEach(([k, base, amp], j) => {
      o[k] = Math.round((base + Math.sin(i / 1.9 + seed + j) * amp * 0.5 + (r() - 0.45) * amp * 0.6 + i * amp * 0.04) * p) / p;
    });
    return o;
  });
}

/** Constrói linhas a partir de colunas explícitas: rows(MONTHS, { Real: [...], Plano: [...] }) */
export function rows(labels: string[], cols: Record<string, (number | null)[]>) {
  return labels.map((m, i) => {
    const o: Record<string, string | number> = { m };
    Object.entries(cols).forEach(([k, v]) => { if (v[i] !== null && v[i] !== undefined) o[k] = v[i] as number; });
    return o;
  });
}

export const pie = (items: [string, number][]) => items.map(([m, v]) => ({ m, v }));

export const k = (label: string, value: string, delta: string, up: boolean, good: boolean, spark?: number[], hint?: string): Kpi =>
  ({ label, value, delta, up, good, spark, hint });

export const spark = (seed: number, base: number, amp: number, trend = 0.03) => {
  const r = rng(seed);
  return Array.from({ length: 14 }, (_, i) => Math.round((base + Math.sin(i / 2 + seed) * amp + (r() - .5) * amp + i * base * trend / 14) * 10) / 10);
};

export const eur = (n: number, dec = 1) => `€${n.toLocaleString('pt-PT', { minimumFractionDigits: dec, maximumFractionDigits: dec })} M`;
export const num = (n: number, dec = 0) => n.toLocaleString('pt-PT', { minimumFractionDigits: dec, maximumFractionDigits: dec });
export const pct = (n: number, dec = 1) => `${n.toLocaleString('pt-PT', { minimumFractionDigits: dec, maximumFractionDigits: dec })}%`;
