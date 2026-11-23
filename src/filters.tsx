import { createContext, useContext, useState } from 'react';
import type { Chart, Kpi } from './data/types';
import { getLang, loc, t, type DictKey } from './i18n';

export type Filters = { period: '12M' | '6M' | '3M'; bu: string; channel: string };
// Valores internos (estáveis nas duas línguas); a apresentação passa por buLabel/channelLabel.
export const BUS = ['Todas as unidades', 'Produtos Alimentares', 'Cerealis Moagens', 'Cerealis a.s. (CZ/SK)', 'Pasta VB3 (ES)'];
export const CHANNELS = ['Todos os canais', 'Retalho moderno', 'Cash & Carry', 'Panificação & Indústria', 'HoReCa', 'Exportação'];
const BU_KEY: Record<string, DictKey> = { 'Todas as unidades': 'core.bu.all', 'Produtos Alimentares': 'core.bu.pa', 'Cerealis Moagens': 'core.bu.cm', 'Cerealis a.s. (CZ/SK)': 'core.bu.cz', 'Pasta VB3 (ES)': 'core.bu.es' };
const CH_KEY: Record<string, DictKey> = { 'Todos os canais': 'core.ch.all', 'Retalho moderno': 'core.ch.retail', 'Cash & Carry': 'core.ch.cc', 'Panificação & Indústria': 'core.ch.bakery', HoReCa: 'core.ch.horeca', 'Exportação': 'core.ch.export' };
export const buLabel = (v: string) => (BU_KEY[v] ? t(BU_KEY[v]) : v);
export const channelLabel = (v: string) => (CH_KEY[v] ? t(CH_KEY[v]) : v);

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
// Os módulos trazem a decisão já calculada a partir do português (flag `ratio`); o texto só decide quando falta a flag.
const RATIO_PT = /%|OEE|MAPE|Precis|taxa|índice|Índice|€\/t|kWh\/t|m³\/t|por |médi|Médi|dias|Dias|semanas|Semanas|Cobertura|OTIF|Quota|quota|Preço|preço|NPS|ppm|Score|score|Risco|risco|Margem|margem|Rácio|Extração|extração|Humidade|Proteína|Elasticidade|ROI|Absentismo|TF|Sentimento|Temperatura|DON|Brix|Satisfação|Uptime|Lead time|Idade|horas|Horas/;
const RATIO_EN = /\brates?\b|Rate|[Ii]ndex|per |[Aa]verage|\bdays?\b|Days|\bweeks?\b|Weeks|[Cc]overage|[Ss]hare|[Pp]rice|[Rr]isk|[Mm]argin|[Rr]atio|[Ee]xtraction|[Mm]oisture|[Pp]rotein|[Ee]lasticity|[Aa]bsenteeism|[Ss]entiment|[Tt]emperature|[Ss]atisfaction|[Aa]ccuracy|[Yy]ield|\bAge\b|\bhours?\b|Hours|[Oo]ccupancy|[Uu]tilisation/;
export const isRatioText = (s: string) => RATIO_PT.test(s) || RATIO_EN.test(s);
export const kpiIsRatio = (k: Kpi) => isRatioText(k.label) || /%|dias|days|\bh\b|\/100|ppm|€\/t|\/t\b/.test(k.value);
// Regras originais (só português) — usadas para calcular as flags a partir da fonte portuguesa.
export const isRatioPt = (s: string) => RATIO_PT.test(s);
export const kpiIsRatioPt = (k: Kpi) => RATIO_PT.test(k.label) || /%|dias|\bh\b|\/100|ppm|€\/t|\/t\b/.test(k.value);
const fmt = (n: number, dec: number) => n.toLocaleString(loc(), { minimumFractionDigits: dec, maximumFractionDigits: dec });

export function applyChart(c: Chart, f: Filters): Chart {
  const n = f.period === '12M' ? 12 : f.period === '6M' ? 6 : 3;
  const data = c.kind !== 'pie' && c.kind !== 'hbar' && c.data.length === 12 ? c.data.slice(-n) : c.data;
  const k = (c.ratio ?? isRatioText(c.title)) ? 1 : factor(f);
  if (k === 1 && data === c.data) return c;
  return { ...c, data: data.map(r => Object.fromEntries(Object.entries(r).map(([key, v]) => [key, typeof v === 'number' ? Math.round(v * k * 10) / 10 : v]))) };
}

export function applyKpi(kpi: Kpi, f: Filters): Kpi {
  const k = factor(f);
  if (k === 1 || (kpi.ratio ?? kpiIsRatio(kpi))) return kpi;
  if (getLang() === 'en') {
    // en-GB: "€325.8M", "1,284", "402k t"
    const m = kpi.value.match(/^(€\s?)?(\d[\d,]*(?:\.\d+)?)(\s*\D.*|)$/);
    if (!m) return kpi;
    const num = parseFloat(m[2].replace(/,/g, ''));
    const dec = m[2].includes('.') ? m[2].split('.')[1].length : 0;
    return { ...kpi, value: `${m[1] ?? ''}${fmt(num * k, dec)}${m[3]}` };
  }
  // pt-PT: "€325,8 M", "1 284", "402 mil t"
  const m = kpi.value.match(/^(€\s?)?(\d[\d\s.]*?(?:,\d+)?)(\s*\D.*|)$/);
  if (!m) return kpi;
  const num = parseFloat(m[2].replace(/[\s.]/g, '').replace(',', '.'));
  const dec = m[2].includes(',') ? m[2].split(',')[1].length : 0;
  return { ...kpi, value: `${m[1] ?? ''}${fmt(num * k, dec)}${m[3]}` };
}
