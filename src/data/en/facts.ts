// English twin of ../facts.ts: same records and numbers (taken from the Portuguese source), translated text only.
import type { MapPoint } from '../types';
import * as pt from '../facts';

export { GROUP, SALES_2026, BUDGET_2026 } from '../facts';
export type { Plant, Brand } from '../facts';

const over = <T extends { id: string }>(src: readonly T[], text: Record<string, Partial<T>>): T[] => src.map(r => ({ ...r, ...text[r.id] }));

export const BU = over(pt.BU, {
  pa: { name: 'Food Products', short: 'Food Products', country: 'Portugal', desc: 'Pasta, cereals, biscuits, bars and household flours — Milaneza, Nacional, Del Mondo, Amiga' },
  cm: { name: 'Cerealis Moagens', short: 'Moagens', country: 'Portugal', desc: 'Wheat and rye flours for bakery, patisserie and food service — Nacional, BIG, Napolitana' },
  cz: { name: 'Cerealis a.s. (ex-Europasta)', short: 'Cerealis a.s.', country: 'Czechia / Slovakia', desc: 'Pasta made in Litovel — Adriana, Zátkovy, Rosické, Ideál' },
  es: { name: 'Cerealis Pasta VB3 (ex-Cerealto)', short: 'Pasta VB3', country: 'Spain', desc: 'Private-label pasta in Venta de Baños (Palencia) — consolidated since April 2026' },
});

export const PLANTS: pt.Plant[] = over(pt.PLANTS, {
  MAI: { name: 'Maia Industrial Centre', city: 'Águas Santas, Maia', units: 'Semolina mill · Pasta I · Pasta II · Biscuits · Logistics hub', capacity: '112,000 t durum wheat · 96,000 t pasta · 11,800 t biscuits', note: 'Line L3 (long pasta) with dryer outlet moisture +0.4 pp', energy: '412 kWh/t pasta' },
  TRO: { name: 'Trofa Industrial Centre', city: 'Santiago do Bougado, Trofa', units: 'Breakfast cereals · Cereal bars', capacity: '17,500 t/year', note: 'New extrusion line at 92% of rated speed', energy: '688 kWh/t' },
  POR: { name: 'Porto Industrial Centre (Freixo)', city: 'Freixo, Porto', units: 'Soft wheat and rye milling · Industrial packing', capacity: '64,000 t/year', note: 'Rye: extraction 71.8% (+0.6 pp vs. plan)', energy: '96 kWh/t' },
  LIS: { name: 'Lisbon Industrial Centre', city: 'Av. Infante D. Henrique, Lisbon', units: 'Soft wheat milling (720 t/24 h) · Industrial and household packing · Technical Centre', capacity: '236,000 t/year · 27,000 t silos', note: 'Mill B3: roll vibration +38% — intervention recommended within 6 days', energy: '88 kWh/t' },
  LIT: { name: 'Litovel', city: 'Tři Dvory, Litovel (CZ)', units: '5 pasta lines · automated warehouse', capacity: '100,000 t/year', note: 'Adriana 100% semolina: +14% volume YoY', energy: '398 kWh/t' },
  VDB: { name: 'Venta de Baños', city: 'Palencia (ES)', units: 'Private-label pasta · 4 lines', capacity: '90,000 t/year', note: 'Integration Day 100: MES and SAP connected to Snowflake; OEE below target (78%)', energy: '436 kWh/t' },
});
export const plantPoints: MapPoint[] = PLANTS.map(p => ({ id: p.id, name: p.name, type: p.units, lat: p.lat, lng: p.lng, status: p.status, detail: `OEE ${p.oee.toLocaleString('en-GB')}% · ${p.employees} employees · ${p.note}` }));

export const BRANDS: pt.Brand[] = over(pt.BRANDS, {
  milaneza: { bu: 'Food Products', cat: 'Pasta', tagline: 'Pasta made of happy stories since 1933 · 62 varieties' },
  nacional: { bu: 'Food Products · Moagens', cat: 'Pasta · Cereals · Biscuits · Flours', tagline: 'The Original Cereals Company · since 1849' },
  napolitana: { cat: 'Italian professional flours', tagline: 'T00 flours and semolinas for the most demanding professionals' },
  delmondo: { bu: 'Food Products', cat: 'Premium pasta', tagline: 'Italian imagination, superior quality' },
  amiga: { bu: 'Food Products · Export', cat: 'Pasta', tagline: 'Leader in Cape Verde, São Tomé and Príncipe and Guinea' },
  big: { cat: 'Industrial flours', tagline: 'Performance flours for industrial bakery' },
  adriana: { cat: '100% semolina pasta', tagline: 'The Czech queen of pasta — 100% durum wheat' },
  zatkovy: { cat: 'Egg pasta', tagline: 'No. 1 in the Czech egg pasta market' },
  rosicke: { cat: 'Soft wheat pasta', tagline: 'Moravian tradition since 1867' },
  ideal: { cat: 'Pasta (Slovakia)', tagline: 'The popular pasta of the Slovak market' },
  mdd: { name: 'Private labels', bu: 'All', cat: 'Private label', tagline: 'Partnerships with Mercadona, Lidl, Albert and others' },
});

export const CUSTOMERS_SUMMARY = [
  // name, unit, channel, YTD sales (€ M), YoY growth (%), OTIF (%)
  ['Continente (Sonae MC)', 'Food Products', 'Modern retail', 30.2, 4.1, 96.4],
  ['Mercadona (private label)', 'Pasta VB3 · Food Products', 'Modern retail', 33.9, 0, 97.8],
  ['Pingo Doce (Jerónimo Martins)', 'Food Products', 'Modern retail', 23.9, 2.6, 93.1],
  ['Lidl Portugal', 'Food Products', 'Modern retail', 15.1, 7.9, 95.2],
  ['Albert (Ahold Delhaize CZ)', 'Cerealis a.s.', 'Modern retail', 9.8, 6.3, 96.9],
  ['Kaufland Česko', 'Cerealis a.s.', 'Modern retail', 8.6, 3.2, 95.6],
  ['Recheio Cash & Carry', 'Food Products · Moagens', 'Cash & Carry', 6.2, 5.5, 94.7],
  ['Panificação Douro, S.A.', 'Cerealis Moagens', 'Bakery & Industry', 4.7, -3.8, 97.1],
] as const;

export const ORIGINS: MapPoint[] = over(pt.ORIGINS, {
  o1: { name: 'Saskatchewan · Canada', type: 'Durum wheat CWAD No. 1', detail: '38% of durum wheat · protein 13.9% · via Montreal → Leixões' },
  o2: { name: 'Sonora · Mexico', type: 'Durum wheat', detail: '14% of durum wheat · DON rising after late rains' },
  o3: { name: 'Occitania · France', type: 'Durum wheat', detail: '17% of durum wheat · truck and rail to Venta de Baños' },
  o4: { name: 'Foggia · Italy', type: 'Durum wheat', detail: '9% of durum wheat · Litovel and Maia' },
  o5: { name: 'Alentejo · Portugal', type: 'Durum and soft wheat', detail: 'National wheat programme · 31,500 t contracted with farmers' },
  o6: { name: 'Beauce · France', type: 'Soft wheat', detail: '29% of soft wheat · Rouen → Lisbon' },
  o7: { name: 'Constanța · Romania', type: 'Soft wheat', detail: '24% of soft wheat · W 230–260' },
  o8: { name: 'Castile and León · Spain', type: 'Soft wheat', detail: '12% of soft wheat · by truck to Lisbon and Porto' },
  o9: { name: 'Haná · Czechia', type: 'Durum and soft wheat', detail: 'Local supply to Litovel by truck and rail' },
  o10: { name: 'North Dakota · USA', type: 'Durum wheat', detail: '8% of durum wheat · alternative to Canada' },
});

export const EXPORT: MapPoint[] = over(pt.EXPORT, {
  e1: { name: 'Cape Verde', detail: 'Amiga No. 1 in pasta · €3.1M YTD' },
  e2: { name: 'São Tomé and Príncipe', detail: 'Amiga market leader · €0.9M YTD' },
  e3: { name: 'Guinea-Bissau', detail: '9-day delay at the port of Bissau' },
  e4: { name: 'Angola', detail: 'Currency restrictions (AOA) — average payment term 94 days' },
  e5: { name: 'Mozambique', detail: '€1.8M YTD · +12% YoY' },
  e6: { name: 'France', type: 'Milaneza · Nacional (diaspora)', detail: 'Diaspora · €2.7M YTD' },
  e7: { name: 'Luxembourg · Switzerland', detail: '€1.4M YTD' },
  e8: { name: 'United Kingdom', detail: '€0.8M YTD' },
  e9: { name: 'USA · Canada', detail: 'Diaspora market · €1.1M YTD' },
  e10: { name: 'Brazil', detail: '€0.6M YTD' },
  e11: { name: 'Macau', detail: '€0.3M YTD' },
  e12: { name: 'Australia', detail: 'Portuguese community · €0.2M YTD' },
  e13: { name: 'Slovakia', detail: 'Cerealis a.s. · €7.9M YTD' },
  e14: { name: 'Hungary · Romania', detail: 'Adriana expansion · €2.2M YTD' },
});

const SITE_EN = ['Maia (plants + hub)', 'Headquarters and services (Maia)', 'Trofa', 'Lisbon', 'Porto (Freixo)', 'Litovel (CZ)', 'Venta de Baños (ES)'];
export const PEOPLE_BY_SITE = pt.PEOPLE_BY_SITE.map(([, n], i) => [SITE_EN[i], n] as const);
