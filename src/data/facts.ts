import type { MapPoint } from './types';

/* ──────────────────────────────────────────────────────────────
   Factos canónicos do Grupo Cerealis — todas as páginas leem daqui
   para garantir números consistentes (referência: out/2026, YTD jan–out).
   ────────────────────────────────────────────────────────────── */

export const GROUP = {
  founded: 1919,
  revenue2025: 312.4,      // € M real
  revenue2026E: 398.2,     // € M previsão (Cerealto Pasta VB3 consolidada desde abril)
  revenueYTD: 325.8,       // € M jan–out
  budgetYTD: 321.0,
  ebitdaYTD: 30.6,         // € M
  ebitdaMarginYTD: 9.4,    // %
  ebitda2026E: 37.9,
  netDebtEbitda: 2.4,
  employees: 912,
  plants: 10,
  countries: 3,
  brands: 11,
  products: 140,
  cerealsT: 412000,        // t de cereais transformados/ano (moagens PT)
  pastaT: 226000,          // t de massa/ano (Maia + Litovel + Venta de Baños, 2026E)
  oee: 78.6,
  otif: 95.8,
  valueYTD: 7.9,           // € M valor capturado pelos casos de uso Espiga (YTD)
  valueRunRate: 12.4,      // € M/ano em regime
};

export const BU = [
  { id: 'pa', name: 'Produtos Alimentares', short: 'Produtos Alimentares', ytd: 126.0, fy: 151.6, margin: 11.2, color: '#D3122E', country: 'Portugal', desc: 'Massas, cereais, bolachas, barras e farinhas culinárias — Milaneza, Nacional, Del Mondo, Amiga' },
  { id: 'cm', name: 'Cerealis Moagens', short: 'Moagens', ytd: 79.6, fy: 96.0, margin: 7.1, color: '#8C5A14', country: 'Portugal', desc: 'Farinhas de trigo e centeio para panificação, pastelaria e restauração — Nacional, BIG, Napolitana' },
  { id: 'cz', name: 'Cerealis a.s. (ex-Europasta)', short: 'Cerealis a.s.', ytd: 61.4, fy: 73.9, margin: 10.4, color: '#1B1B1B', country: 'Chéquia / Eslováquia', desc: 'Massas em Litovel — Adriana, Zátkovy, Rosické, Ideál' },
  { id: 'es', name: 'Cerealis Pasta VB3 (ex-Cerealto)', short: 'Pasta VB3', ytd: 58.8, fy: 76.7, margin: 8.3, color: '#29B5E8', country: 'Espanha', desc: 'Massas MDD em Venta de Baños (Palência) — consolidada desde abril de 2026' },
];

// Vendas mensais do grupo 2026 (€ M) por unidade — soma jan–out = 325,8
export const SALES_2026 = {
  pa: [12.1, 11.8, 12.6, 12.4, 12.9, 12.3, 12.8, 12.5, 13.1, 13.5],
  cm: [7.9, 7.6, 8.1, 7.7, 8.0, 7.8, 8.0, 7.6, 8.3, 8.6],
  cz: [6.1, 5.9, 6.2, 6.0, 6.1, 6.0, 6.2, 6.1, 6.3, 6.5],
  es: [0, 0, 0, 8.2, 8.5, 8.3, 8.4, 8.1, 8.5, 8.8],
};
export const BUDGET_2026 = [25.6, 25.0, 26.4, 33.6, 34.6, 33.8, 34.9, 33.7, 35.4, 38.0];

export type Plant = { id: string; name: string; city: string; country: string; lat: number; lng: number; units: string; capacity: string; employees: number; oee: number; status: 'ok' | 'aviso' | 'critico'; note: string; energy: string };
export const PLANTS: Plant[] = [
  { id: 'MAI', name: 'Centro Industrial da Maia', city: 'Águas Santas, Maia', country: 'PT', lat: 41.2016, lng: -8.5967, units: 'Semolaria · Massas I · Massas II · Bolachas · Hub logístico', capacity: '112 000 t trigo duro · 96 000 t massa · 11 800 t bolachas', employees: 312, oee: 81.2, status: 'aviso', note: 'Linha L3 (massa longa) com humidade à saída do secador +0,4 pp', energy: '412 kWh/t massa' },
  { id: 'TRO', name: 'Centro Industrial da Trofa', city: 'Santiago do Bougado, Trofa', country: 'PT', lat: 41.3312, lng: -8.5646, units: 'Cereais de pequeno-almoço · Barras de cereais', capacity: '17 500 t/ano', employees: 96, oee: 76.4, status: 'ok', note: 'Nova linha de extrusão a 92% da cadência nominal', energy: '688 kWh/t' },
  { id: 'POR', name: 'Centro Industrial do Porto (Freixo)', city: 'Freixo, Porto', country: 'PT', lat: 41.1447, lng: -8.5717, units: 'Moagem de trigo mole e centeio · Embalamento industrial', capacity: '64 000 t/ano', employees: 42, oee: 79.8, status: 'ok', note: 'Centeio: extração 71,8% (+0,6 pp vs. plano)', energy: '96 kWh/t' },
  { id: 'LIS', name: 'Centro Industrial de Lisboa', city: 'Av. Infante D. Henrique, Lisboa', country: 'PT', lat: 38.7372, lng: -9.1017, units: 'Moagem de trigo mole (720 t/24 h) · Embalamento industrial e culinário · Centro Técnico', capacity: '236 000 t/ano · silos 27 000 t', employees: 118, oee: 83.1, status: 'critico', note: 'Moinho B3: vibração do rolo +38% — intervenção recomendada em ≤ 6 dias', energy: '88 kWh/t' },
  { id: 'LIT', name: 'Litovel', city: 'Tři Dvory, Litovel (CZ)', country: 'CZ', lat: 49.7046, lng: 17.0768, units: '5 linhas de massa · armazém automático', capacity: '100 000 t/ano', employees: 152, oee: 77.9, status: 'ok', note: 'Adriana 100% sêmola: +14% volume a/a', energy: '398 kWh/t' },
  { id: 'VDB', name: 'Venta de Baños', city: 'Palência (ES)', country: 'ES', lat: 41.9214, lng: -4.4936, units: 'Massas MDD · 4 linhas', capacity: '90 000 t/ano', employees: 142, oee: 72.5, status: 'aviso', note: 'Integração Dia 100: MES e SAP ligados ao Snowflake; OEE abaixo da meta (78%)', energy: '436 kWh/t' },
];
export const plantPoints: MapPoint[] = PLANTS.map(p => ({ id: p.id, name: p.name, type: p.units, lat: p.lat, lng: p.lng, status: p.status, detail: `OEE ${p.oee.toLocaleString('pt-PT')}% · ${p.employees} colaboradores · ${p.note}` }));

export type Brand = { id: string; name: string; bu: string; cat: string; since: string; color: string; img?: string; tile?: string; tagline: string };
export const BRANDS: Brand[] = [
  { id: 'milaneza', name: 'Milaneza', bu: 'Produtos Alimentares', cat: 'Massas', since: '1933', color: '#D3122E', img: 'milaneza.webp', tile: 'milaneza.jpg', tagline: 'Massa feita de histórias felizes desde 1933 · 62 variedades' },
  { id: 'nacional', name: 'Nacional', bu: 'Produtos Alimentares · Moagens', cat: 'Massas · Cereais · Bolachas · Farinhas', since: '1849', color: '#0A8FD3', img: 'nacional.webp', tagline: 'A Companhia Original dos Cereais · desde 1849' },
  { id: 'napolitana', name: 'Napolitana', bu: 'Cerealis Moagens', cat: 'Farinhas profissionais italianas', since: '1957', color: '#B4532A', img: 'napolitana.webp', tile: 'napolitana.jpg', tagline: 'Farinhas T00 e sêmolas para os profissionais mais exigentes' },
  { id: 'delmondo', name: 'Del Mondo', bu: 'Produtos Alimentares', cat: 'Massas premium', since: '2019', color: '#1D2A4D', img: 'delmondo.webp', tile: 'delmondo.jpg', tagline: 'Imaginário italiano, qualidade superior' },
  { id: 'amiga', name: 'Amiga', bu: 'Produtos Alimentares · Exportação', cat: 'Massas', since: '1998', color: '#D7261E', img: 'amiga.webp', tile: 'amiga.jpg', tagline: 'Líder em Cabo Verde, São Tomé e Príncipe e Guiné' },
  { id: 'big', name: 'BIG', bu: 'Cerealis Moagens', cat: 'Farinhas industriais', since: '1986', color: '#3D3D3D', tagline: 'Farinhas de desempenho para panificação industrial' },
  { id: 'adriana', name: 'Adriana', bu: 'Cerealis a.s.', cat: 'Massas 100% sêmola', since: '1992', color: '#111111', img: 'adriana.webp', tagline: 'A rainha checa das massas — 100% trigo duro' },
  { id: 'zatkovy', name: 'Zátkovy', bu: 'Cerealis a.s.', cat: 'Massas com ovo', since: '1884', color: '#7A2E12', tile: 'zatkovy.jpg', tagline: 'N.º 1 no mercado checo de massa com ovos' },
  { id: 'rosicke', name: 'Rosické', bu: 'Cerealis a.s.', cat: 'Massas de trigo mole', since: '1867', color: '#C8102E', img: 'rosicke.webp', tile: 'rosicke.jpg', tagline: 'Tradição da Morávia desde 1867' },
  { id: 'ideal', name: 'Ideál', bu: 'Cerealis a.s.', cat: 'Massas (Eslováquia)', since: '1994', color: '#6B3A1A', tile: 'ideal.jpg', tagline: 'A massa popular do mercado eslovaco' },
  { id: 'mdd', name: 'Marcas do distribuidor', bu: 'Todas', cat: 'MDD', since: '—', color: '#8A8578', tagline: 'Parcerias com Mercadona, Lidl, Albert e outros' },
];

export const CUSTOMERS_SUMMARY = [
  // nome, unidade, canal, vendas YTD (€ M), cresc. a/a (%), OTIF (%)
  ['Continente (Sonae MC)', 'Produtos Alimentares', 'Retalho moderno', 30.2, 4.1, 96.4],
  ['Mercadona (MDD)', 'Pasta VB3 · Produtos Alimentares', 'Retalho moderno', 33.9, 0, 97.8],
  ['Pingo Doce (Jerónimo Martins)', 'Produtos Alimentares', 'Retalho moderno', 23.9, 2.6, 93.1],
  ['Lidl Portugal', 'Produtos Alimentares', 'Retalho moderno', 15.1, 7.9, 95.2],
  ['Albert (Ahold Delhaize CZ)', 'Cerealis a.s.', 'Retalho moderno', 9.8, 6.3, 96.9],
  ['Kaufland Česko', 'Cerealis a.s.', 'Retalho moderno', 8.6, 3.2, 95.6],
  ['Recheio Cash & Carry', 'Produtos Alimentares · Moagens', 'Cash & Carry', 6.2, 5.5, 94.7],
  ['Panificação Douro, S.A.', 'Cerealis Moagens', 'Panificação & Indústria', 4.7, -3.8, 97.1],
] as const;

export const ORIGINS: MapPoint[] = [
  { id: 'o1', name: 'Saskatchewan · Canadá', type: 'Trigo duro CWAD n.º 1', lat: 52.13, lng: -106.67, status: 'ok', detail: '38% do trigo duro · proteína 13,9% · via Montreal → Leixões', color: '#D99A00' },
  { id: 'o2', name: 'Sonora · México', type: 'Trigo duro', lat: 27.48, lng: -109.93, status: 'aviso', detail: '14% do trigo duro · DON a subir após chuvas tardias', color: '#D99A00' },
  { id: 'o3', name: 'Occitânia · França', type: 'Trigo duro', lat: 43.6, lng: 1.44, status: 'ok', detail: '17% do trigo duro · camião e comboio para Venta de Baños', color: '#D99A00' },
  { id: 'o4', name: 'Foggia · Itália', type: 'Trigo duro', lat: 41.46, lng: 15.55, status: 'ok', detail: '9% do trigo duro · Litovel e Maia', color: '#D99A00' },
  { id: 'o5', name: 'Alentejo · Portugal', type: 'Trigo duro e mole', lat: 38.01, lng: -7.86, status: 'ok', detail: 'Programa trigo nacional · 31 500 t contratadas a agricultores', color: '#D99A00' },
  { id: 'o6', name: 'Beauce · França', type: 'Trigo mole', lat: 48.3, lng: 1.6, status: 'ok', detail: '29% do trigo mole · Rouen → Lisboa', color: '#8C5A14' },
  { id: 'o7', name: 'Constanța · Roménia', type: 'Trigo mole', lat: 44.17, lng: 28.65, status: 'ok', detail: '24% do trigo mole · W 230–260', color: '#8C5A14' },
  { id: 'o8', name: 'Castela e Leão · Espanha', type: 'Trigo mole', lat: 41.65, lng: -4.72, status: 'ok', detail: '12% do trigo mole · camião para Lisboa e Porto', color: '#8C5A14' },
  { id: 'o9', name: 'Haná · Chéquia', type: 'Trigo duro e mole', lat: 49.59, lng: 17.25, status: 'ok', detail: 'Abastecimento local de Litovel por camião e comboio', color: '#8C5A14' },
  { id: 'o10', name: 'Dakota do Norte · EUA', type: 'Trigo duro', lat: 46.88, lng: -96.79, status: 'ok', detail: '8% do trigo duro · alternativa ao Canadá', color: '#D99A00' },
];

export const EXPORT: MapPoint[] = [
  { id: 'e1', name: 'Cabo Verde', type: 'Amiga · Milaneza', lat: 14.93, lng: -23.51, status: 'ok', detail: 'Amiga n.º 1 em massas · €3,1 M YTD', size: 3.1 },
  { id: 'e2', name: 'São Tomé e Príncipe', type: 'Amiga', lat: 0.34, lng: 6.73, status: 'ok', detail: 'Amiga líder · €0,9 M YTD', size: 0.9 },
  { id: 'e3', name: 'Guiné-Bissau', type: 'Amiga', lat: 11.86, lng: -15.6, status: 'aviso', detail: 'Atraso de 9 dias no porto de Bissau', size: 1.2 },
  { id: 'e4', name: 'Angola', type: 'Milaneza · Nacional · Amiga', lat: -8.84, lng: 13.23, status: 'aviso', detail: 'Restrição cambial (AOA) — prazo médio 94 dias', size: 4.6 },
  { id: 'e5', name: 'Moçambique', type: 'Amiga · Nacional', lat: -25.97, lng: 32.57, status: 'ok', detail: '€1,8 M YTD · +12% a/a', size: 1.8 },
  { id: 'e6', name: 'França', type: 'Milaneza · Nacional (saudade)', lat: 48.86, lng: 2.35, status: 'ok', detail: 'Diáspora · €2,7 M YTD', size: 2.7 },
  { id: 'e7', name: 'Luxemburgo · Suíça', type: 'Milaneza · Nacional', lat: 49.61, lng: 6.13, status: 'ok', detail: '€1,4 M YTD', size: 1.4 },
  { id: 'e8', name: 'Reino Unido', type: 'Milaneza · Del Mondo', lat: 51.5, lng: -0.12, status: 'ok', detail: '€0,8 M YTD', size: 0.8 },
  { id: 'e9', name: 'EUA · Canadá', type: 'Milaneza · Nacional', lat: 40.73, lng: -74.17, status: 'ok', detail: 'Mercado da saudade · €1,1 M YTD', size: 1.1 },
  { id: 'e10', name: 'Brasil', type: 'Napolitana · Del Mondo', lat: -23.55, lng: -46.63, status: 'ok', detail: '€0,6 M YTD', size: 0.6 },
  { id: 'e11', name: 'Macau', type: 'Milaneza', lat: 22.19, lng: 113.54, status: 'ok', detail: '€0,3 M YTD', size: 0.3 },
  { id: 'e12', name: 'Austrália', type: 'Milaneza', lat: -33.87, lng: 151.21, status: 'ok', detail: 'Comunidade portuguesa · €0,2 M YTD', size: 0.2 },
  { id: 'e13', name: 'Eslováquia', type: 'Ideál · Adriana', lat: 48.15, lng: 17.11, status: 'ok', detail: 'Cerealis a.s. · €7,9 M YTD', size: 7.9 },
  { id: 'e14', name: 'Hungria · Roménia', type: 'Adriana', lat: 47.5, lng: 19.04, status: 'ok', detail: 'Expansão Adriana · €2,2 M YTD', size: 2.2 },
];

export const PEOPLE_BY_SITE = [
  ['Maia (fábricas + hub)', 312], ['Sede e serviços (Maia)', 50], ['Trofa', 96], ['Lisboa', 118], ['Porto (Freixo)', 42], ['Litovel (CZ)', 152], ['Venta de Baños (ES)', 142],
] as const;
