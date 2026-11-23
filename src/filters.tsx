import { createContext, useContext, useState } from 'react';
import type { Chart, Kpi } from './data/types';

export type Filters = { period: '12M' | '6M' | '3M'; bu: string; channel: string };
export const BUS = ['Todas as unidades', 'Produtos Alimentares', 'Cerealis Moagens', 'Cerealis a.s. (CZ/SK)', 'Pasta VB3 (ES)'];
export const CHANNELS = ['Todos os canais', 'Retalho moderno', 'Cash & Carry', 'Panificação & Indústria', 'HoReCa', 'Exportação'];
// Peso de cada unidade/canal nas vendas 2026E (€398 M) — usado para escalar volumes quando se filtra.
const SHARE: Record<string, number> = {
  'Todas as unidades': 1, 'Produtos Alimentares': 0.382, 'Cerealis Moagens': 0.241, 'Cerealis a.s. (CZ/SK)': 0.186, 'Pasta VB3 (ES)': 0.191,
  'Todos os canais': 1, 'Retalho moderno': 0.58, 'Cash & Carry': 0.07, 'Panificação & Indústria': 0.22, HoReCa: 0.04, 'Exportação': 0.09,
};

const Ctx = createContext<{ f: Filters; set: (p: Partial<Filters>) => void }>({ f: { period: '12M', bu: BUS[0], channel: CHANNELS[0] }, set: () => {} });
export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [f, setF] = useState<Filters>({ period: '12M', bu: BUS[0], channel: CHANNELS[0] });
  return <Ctx.Provider value={{ f, set: p => setF(x => ({ ...x, ...p })) }}>{children}</Ctx.Provider>;
}
export const useFilters = () => useContext(Ctx);
export const factor = (f: Filters) => SHARE[f.bu] * SHARE[f.channel];
export const isFiltered = (f: Filters) => f.bu !== BUS[0] || f.channel !== CHANNELS[0];

// Rácios (%, índices, preços unitários, dias) não escalam com o filtro — só volumes e valores absolutos.
const isRatio = (s: string) => /%|OEE|MAPE|Precis|taxa|índice|Índice|€\/t|kWh\/t|m³\/t|por |médi|Médi|dias|Dias|semanas|Semanas|Cobertura|OTIF|Quota|quota|Preço|preço|NPS|ppm|Score|score|Risco|risco|Margem|margem|Rácio|Extração|extração|Humidade|Proteína|Elasticidade|ROI|Absentismo|TF|Sentimento|Temperatura|DON|Brix|Satisfação|Uptime|Lead time|Idade|horas|Horas/.test(s);
const fmt = (n: number, dec: number) => n.toLocaleString('pt-PT', { minimumFractionDigits: dec, maximumFractionDigits: dec });

export function applyChart(c: Chart, f: Filters): Chart {
  const n = f.period === '12M' ? 12 : f.period === '6M' ? 6 : 3;
  const data = c.kind !== 'pie' && c.kind !== 'hbar' && c.data.length === 12 ? c.data.slice(-n) : c.data;
  const k = isRatio(c.title) || c.ratio ? 1 : factor(f);
  if (k === 1 && data === c.data) return c;
  return { ...c, data: data.map(r => Object.fromEntries(Object.entries(r).map(([key, v]) => [key, typeof v === 'number' ? Math.round(v * k * 10) / 10 : v]))) };
}

export function applyKpi(kpi: Kpi, f: Filters): Kpi {
  const k = factor(f);
  if (k === 1 || isRatio(kpi.label) || /%|dias|\bh\b|\/100|ppm|€\/t|\/t\b/.test(kpi.value)) return kpi;
  const m = kpi.value.match(/^(€\s?)?(\d[\d\s.]*?(?:,\d+)?)(\s*\D.*|)$/);
  if (!m) return kpi;
  const num = parseFloat(m[2].replace(/[\s.]/g, '').replace(',', '.'));
  const dec = m[2].includes(',') ? m[2].split(',')[1].length : 0;
  return { ...kpi, value: `${m[1] ?? ''}${fmt(num * k, dec)}${m[3]}` };
}
