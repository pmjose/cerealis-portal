// English twin of ../c360.ts: the Portuguese records overlaid by id with translated text. Ids, every number,
// enum codes (risk, status, kind, nutri), tones, dates and the order of every list come from the Portuguese source.
import * as pt from '../c360';
import { MONTHS, MONTHS_EN } from '../gen';

export type { Tone, Customer, Product, Employee, Sensor, Asset } from '../c360';

type Pairs = [string, number][];
type Dated = [string, string, pt.Tone][];

/** New labels for [label, number] pairs; the numbers stay those of the Portuguese record. */
const relabel = (src: Pairs, labels?: string[]): Pairs => src.map(([l, n], i): [string, number] => [labels?.[i] ?? l, n]);
/** New text for [date, text, tone] entries; dates and tones stay those of the Portuguese record. */
const retell = (src: Dated, texts?: string[]): Dated => src.map(([d, t, tone], i): [string, string, pt.Tone] => [d, texts?.[i] ?? t, tone]);
const MON: Record<string, string> = Object.fromEntries(MONTHS.map((m, i) => [m.toLowerCase(), MONTHS_EN[i]]));
/** 'jan/27' → 'Jan 27'; day/month dates (23/11) are already en-GB. */
const enDate = (d: string) => d.replace(/^([a-z]{3})\/(\d{2})$/, (s, m: string, y: string) => (MON[m] ? `${MON[m]} ${y}` : s));

/* ───────────── Customers ───────────── */
/** mix: labels only; timeline: text only. */
type CustomerText = Partial<Omit<pt.Customer, 'mix' | 'timeline'>> & { mix?: string[]; timeline?: string[] };
const C: Record<string, CustomerText> = {
  continente: {
    segment: 'Modern retail', unit: 'Food Products', city: 'Maia · Azambuja DC',
    buyer: 'Grocery Buying Department', growth: '+4.1%', margin: '28.4%', promoRoi: '1.7', claims: '0.8 per 1,000 orders', shareOfWallet: '31% of the pasta category',
    mix: ['Milaneza pasta', 'Nacional pasta', 'Cereals and bars', 'Biscuits', 'Household flours', 'Del Mondo', 'Private label'],
    topSkus: [['Milaneza Esparguete 500 g', '€3.1M', '+3%'], ['Milaneza Laços 500 g', '€1.4M', '+9%'], ['Nacional Corn Flakes Sem Açúcar', '€0.9M', '+46%'], ['Nacional Bolacha Alfa 200 g', '€0.8M', '+2%'], ['Del Mondo Penne Rigate 500 g', '€0.6M', '+31%']],
    timeline: ['Shared sell-out: Milaneza long pasta +18% with the "2nd unit −50%" promotion', '2027 business plan meeting — proposal for 3 new Del Mondo SKUs', 'OTIF of 98.1% at the Azambuja DC in October', 'Request for night-time deliveries over Christmas'],
    actions: [['Christmas plan', 'Secure 2 extra long pasta shifts at Maia II (week 49)'], ['Del Mondo', 'Propose paccheri and orecchiette in 120 stores'], ['Sell-out', 'Extend data sharing to stock by store (today: by DC)']],
    summary: "The group's No. 2 strategic customer and No. 1 in Portugal. Solid growth (+4.1%) driven by Milaneza and Corn Flakes Sem Açúcar. Daily sell-out sharing via Snowflake Data Sharing improved the forecast by 4 pp and lifted OTIF to 96.4%.",
    dataShare: 'Daily sell-out by DC and store stock via Snowflake Data Sharing since March 2026',
    questions: [
      { q: 'How is the relationship with Continente?', a: 'Very solid: **€30.2M YTD (+4.1%)**, a 28.4% margin and OTIF of **96.4%**. Shared sell-out shows Milaneza long pasta growing 18% with the "2nd unit −50%" promotion (ROI 1.9).' },
      { q: 'What opportunities do we have at Continente?', a: '• **Del Mondo** in 120 more stores (paccheri and orecchiette)\n• **Corn Flakes Sem Açúcar 750 g** (family size)\n• Stock sharing **by store** to reduce stock-outs at Christmas' },
      { q: 'Are there risks for Christmas?', a: 'Continente has asked for night-time deliveries and Maia II will be at **97% utilisation** in week 49. The S&OP plan includes 2 extra long pasta shifts.' },
    ],
  },
  mercadona: {
    name: 'Mercadona (private label)', segment: 'Modern retail · private label', unit: 'Pasta VB3 · Food Products', country: 'Spain · Portugal', city: 'Mercadona DCs (Centre) · Póvoa de Varzim',
    since: 'Apr 2026 (via VB3)', buyer: 'Proveedor Totaler · pasta category', growth: 'newly consolidated', margin: '17.9%', claims: '0.4 per 1,000 orders', shareOfWallet: 'main private-label pasta supplier',
    mix: ['Private-label short pasta', 'Private-label long pasta', 'Private-label speciality pasta', 'Portugal pasta (private label)'],
    topSkus: [['Macaroni 1 kg (private label)', '€6.8M', '—'], ['Spaghetti 1 kg (private label)', '€5.9M', '—'], ['Spirals 500 g (private label)', '€3.2M', '—'], ['Vermicelli 500 g (private label)', '€2.6M', '—'], ['Portugal pasta 500 g (private label)', '€4.1M', '—']],
    timeline: ['Supplier audit passed with no deviations', 'Request for 4,000 t of additional capacity for 2027', 'Price review indexed to durum wheat applied (−1.8%)'],
    actions: [['2027 capacity', 'Reserve 4,000 t on line L4 at Venta de Baños'], ['Concentration', 'Balance with 2 new private-label customers (Carrefour, DIA)'], ['Integration', 'Connect the Mercadona EDI to the group forecasting agent']],
    summary: "The group's largest customer since the Pasta VB3 integration (10.4% of sales). Long-term partnership with pricing indexed to durum wheat. Medium concentration risk: 48% of Venta de Baños sales.",
    dataShare: 'Forecasts and orders via EDI; demand data sharing under evaluation',
    questions: [
      { q: 'How much of the group does Mercadona account for?', a: '**€33.9M YTD (10.4% of the group)** — the largest customer since April. At Venta de Baños it accounts for **48% of sales**. The margin is 17.9%, typical of private label, with pricing indexed to durum wheat.' },
      { q: 'What request do we have for 2027?', a: 'Mercadona has asked for **4,000 t of additional capacity** for 2027. Cortex recommends reserving line L4 at Venta de Baños and, in parallel, opening 2 new private-label customers to reduce concentration.' },
    ],
  },
  'pingo-doce': {
    segment: 'Modern retail', unit: 'Food Products', city: 'North and South DCs',
    buyer: 'Savoury and Sweet Grocery Buying Department', growth: '+2.6%', margin: '27.1%', promoRoi: '1.2', claims: '1.9 per 1,000 orders', shareOfWallet: '27% of the pasta category',
    mix: ['Milaneza pasta', 'Nacional pasta', 'Cereals and bars', 'Biscuits', 'Household flours', 'Other'],
    topSkus: [['Milaneza Esparguete 500 g', '€2.6M', '+1%'], ['Nacional Corn Flakes Sem Açúcar', '€0.8M', '+52%'], ['Milaneza Laços 500 g', '€0.8M', '+4%'], ['Nacional Macarrão Riscado 500 g', '€0.7M', '−2%'], ['Nacional Bolacha Alfa 200 g', '€0.7M', '+3%']],
    timeline: ['Stock-out avoided: 6 pallets of Milaneza Esparguete transferred from Lisbon', 'Corn Flakes −30% promotion with a forecast ROI of 0.7 — alternative proposal sent', 'October OTIF: 92.8% (contract: 95%)', '26/11 leaflet confirmed with Milaneza long pasta'],
    actions: [['OTIF', 'Propose a fixed Sunday night delivery slot at the South DC'], ['Promotion', 'Replace −30% with "2nd unit −50%" plus in-store tasting (ROI 1.4)'], ['Data', 'Ask for the leaflet calendar to be shared via Data Sharing']],
    summary: "The group's No. 3 customer. Growth of 2.6% but OTIF below contract (93.1% vs. 95%) due to missed unloading slots on Mondays. Cereal promotion with negative ROI under review.",
    dataShare: 'Weekly sell-out shared via Snowflake Data Sharing since June 2026',
    questions: [
      { q: 'Why is OTIF low at Pingo Doce?', a: 'OTIF is at **93.1%** (contract: 95%). 71% of failures happen **on Mondays at the South DC**, because the unloading slots are saturated. With Sunday-night deliveries, forecast OTIF rises to **95.6%**.' },
      { q: 'Which promotion should we review?', a: 'The **Corn Flakes Sem Açúcar −30%** promotion has a forecast ROI of **0.7** (41% cannibalisation of the classic version). The alternative "2nd unit −50% with in-store tasting" has an ROI of **1.4** and was sent by Sofia Carvalho.' },
      { q: 'Is there a stock-out risk at Pingo Doce?', a: 'There was: **Milaneza Esparguete 500 g** had 4 days of coverage before the 26/11 leaflet. The agent transferred **6 pallets from Lisbon** and coverage rose to 11 days.' },
    ],
  },
  'lidl-pt': {
    segment: 'Modern retail', unit: 'Food Products', city: 'North and Centre DCs',
    buyer: 'Grocery Buying (Lidl PT)', growth: '+7.9%', margin: '22.6%', promoRoi: '0.9', claims: '0.7 per 1,000 orders', shareOfWallet: 'private label and Cerealis brands',
    mix: ['Private label (pasta and cereals)', 'Milaneza', 'Nacional biscuits', 'Nacional cereals', 'Other'],
    topSkus: [['Pasta 500 g, 6 shapes (private label)', '€5.4M', '+9%'], ['Milaneza Esparguete 500 g', '€1.7M', '+6%'], ['Cereals 500 g (private label)', '€1.9M', '+12%'], ['Nacional Bolacha Alfa 200 g', '€0.9M', '+4%']],
    timeline: ['Request for quotation: private-label chocolate cereals (420 t/year)', 'Bolacha Alfa "3 for 2" promotion with an ROI of 0.9', 'Annual supplier rating: A'],
    actions: [['Private-label cereals', 'Reply to the quotation at €2.58/kg (18.2% margin)'], ['Biscuits', 'Review the Bolacha Alfa promotional mechanic']],
    summary: 'Growing customer (+7.9%), with a strong private-label share (52%). Request for quotation for private-label cereals under review by the proposals agent.',
    dataShare: 'Orders via EDI; no sell-out sharing',
    questions: [{ q: 'How is Lidl doing?', a: '**€15.1M YTD (+7.9%)**, with 52% in private label and a 22.6% margin. There is an open quotation for **420 t/year of private-label chocolate cereals**: the agent proposed €2.58/kg (18.2% margin).' }],
  },
  albert: {
    segment: 'Modern retail', country: 'Czechia', city: 'Prague · Jirny and Brno distribution centres',
    buyer: 'Ambient grocery category', growth: '+6.3%', margin: '26.8%', promoRoi: '1.6', claims: '0.5 per 1,000 orders', shareOfWallet: '34% of the pasta category',
    mix: ['Adriana', 'Zátkovy', 'Rosické', 'Private label'],
    topSkus: [['Adriana Torti 500 g', '€1.3M', '+18%'], ['Zátkovy Vaječné Kolínka 250 g', '€0.9M', '+3%'], ['Adriana Funghetto 500 g', '€0.7M', '+14%'], ['Rosické Fleky Velké 500 g', '€0.6M', '−4%']],
    timeline: ['Adriana on gondola ends in 120 stores — 117% uplift', 'Joint 2027 plan for Adriana Bronze'],
    actions: [['Adriana Bronze', 'Launch in March 2027 in 120 stores'], ['Rosické', 'Repositioning with new packaging']],
    summary: 'The main customer of Cerealis a.s. Adriana is growing 18% on the back of in-store execution; Rosické is losing ground to private label.',
    dataShare: 'Weekly sell-out (retailer portal) integrated into Snowflake',
    questions: [{ q: 'How is Adriana doing at Albert?', a: 'Adriana accounts for **41% of our sales at Albert** and is growing **18%** with gondola ends in 120 stores (117% uplift, ROI 1.6). Next step: Adriana Bronze in March 2027.' }],
  },
  'kaufland-cz': {
    segment: 'Modern retail', country: 'Czechia',
    buyer: 'Ambient grocery buying', growth: '+3.2%', margin: '24.9%', promoRoi: '1.3', claims: '0.6 per 1,000 orders', shareOfWallet: '29% of the pasta category',
    mix: ['Zátkovy', 'Adriana', 'Rosické', 'Private label'],
    topSkus: [['Zátkovy Vaječné Kolínka 250 g', '€1.1M', '+2%'], ['Adriana Torti 500 g', '€0.9M', '+11%'], ['Rosické Abeceda 500 g', '€0.5M', '−3%']],
    timeline: ['New store in Brno: Adriana Torti at 7 days of coverage', '2027 annual agreement under negotiation'],
    actions: [['Brno', 'Increase stock at the new store'], ['2027 agreement', 'Defend the Zátkovy price with market-share data']],
    summary: 'Stable customer (+3.2%), with Zátkovy as the lead brand. New store in Brno with demand above forecast.',
    dataShare: 'Orders via EDI',
    questions: [{ q: 'How is Kaufland doing?', a: '**€8.6M YTD (+3.2%)**. Zátkovy is the lead brand (36%). The new Brno store has Adriana Torti at 7 days of coverage — being monitored.' }],
  },
  recheio: {
    unit: 'Food Products · Moagens', city: '40 stores',
    buyer: 'Food and Food Service Buying', growth: '+5.5%', margin: '25.3%', promoRoi: '2.4', claims: '1.1 per 1,000 orders', shareOfWallet: 'professional flours and pasta',
    mix: ['Napolitana', 'Milaneza pasta (5 kg and 1 kg)', 'Nacional flours', 'Other'],
    topSkus: [['Napolitana T00 10 kg', '€1.3M', '+22%'], ['Milaneza Esparguete 5 kg (HoReCa)', '€0.7M', '+6%'], ['Nacional T65 25 kg', '€0.6M', '+1%']],
    timeline: ['Napolitana T00 at 6 days of coverage — HoReCa demand +22%', '"1 free with every 10" promotion with an ROI of 2.4', 'Complaint about 3 pallets with damaged film (Braga) — €2,980 credit'],
    actions: [['Napolitana', 'Bring forward replenishment of T00 10 kg'], ['HoReCa', 'Technical Centre pizza training for Recheio customers']],
    summary: 'Strategic channel for Napolitana and HoReCa. Promotions with the best ROI in the group (2.4).',
    dataShare: 'Orders through the Customer Portal',
    questions: [{ q: 'How is Napolitana doing at Recheio?', a: '**Napolitana T00 10 kg** is growing **22%** (€1.3M YTD), driven by pizzerias. The "1 free with every 10" promotion had an ROI of **2.4**. Watch out: 6 days of coverage — early replenishment under way.' }],
  },
  'panificacao-douro': {
    group: 'Independent', segment: 'Bakery & Industry', city: 'Vila Nova de Gaia · 4 plants',
    buyer: 'Production and Purchasing Department', growth: '−3.8%', margin: '12.4%', claims: '2 flour-strength complaints (Oct)', shareOfWallet: '64% (was 78%)',
    mix: ['Nacional T65 bakery flour', 'BIG W 300+', 'Napolitana T00', 'Rye'],
    topSkus: [['Nacional T65 bulk', '€3.3M', '−5%'], ['BIG W 320 25 kg', '€0.8M', '+1%'], ['Napolitana T00 10 kg', '€0.3M', '+12%']],
    timeline: ['Quotation request to a competitor detected by the sales team', 'WhatsApp order: 40 bags of T65 + 10 Napolitana T00', '2 complaints about T65 flour strength (W)'],
    actions: [['Retention', 'Technical visit with a baking trial at the Technical Centre'], ['Price', '1.2% adjustment on T65 with a 12-month contract'], ['Quality', 'Dedicated W 240–250 blend for the 4 plants']],
    summary: 'The largest bakery customer of Moagens, at high risk of churn: order frequency −22% and a quotation request to a competitor. Price 2.1% above market on T65.',
    dataShare: 'Orders via WhatsApp with a Cortex agent and the Customer Portal',
    questions: [
      { q: 'Why is Panificação Douro at risk?', a: 'Three signals: **order frequency −22%** in 8 weeks, a **quotation request to a competitor** and **2 flour-strength complaints** on T65 in October. Our price is **2.1% above market**. Churn risk: **0.78**.' },
      { q: 'What does the retention agent propose?', a: '• Technical visit with a baking trial at the Technical Centre\n• **1.2%** price adjustment on T65 with a 12-month contract\n• Dedicated W 240–250 blend for the 4 plants\nAwaiting approval from Fernando Calheiros.' },
    ],
  },
};
export const customers: pt.Customer[] = pt.customers.map(c => {
  const { mix, timeline, ...text }: CustomerText = C[c.id] ?? {};
  return { ...c, ...text, mix: relabel(c.mix, mix), timeline: retell(c.timeline, timeline) };
});

/* ───────────── Products ───────────── */
/** channels: labels only; quality: [parameter, value, spec] (the ok/warn status stays). Names stay as on pack. */
type ProductText = Partial<Omit<pt.Product, 'channels' | 'quality'>> & { channels?: string[]; quality?: [string, string, string][] };
const P: Record<string, ProductText> = {
  'milaneza-esparguete': {
    category: 'Long pasta', line: 'L3 · long pasta', format: '500 g pack · 20 units/case',
    ytd: '€9.8M', volume: '5,320 t', margin: '39.6%', price: '€1.84/kg', share: '7.9% of PT dry pasta', shelf: '36 months',
    ingredients: 'Durum wheat semolina, water.', allergens: 'Gluten. May contain traces of egg.',
    channels: ['Continente', 'Pingo Doce', 'Lidl', 'Intermarché', 'Auchan', 'Export', 'Other'],
    quality: [['Moisture', '12.2%', '≤ 12.5%'], ['Protein', '13.1%', '≥ 12.5%'], ['DON', '290 µg/kg', '≤ 600 µg/kg'], ['Broken pasta', '1.8%', '≤ 1.5%'], ['Cooking time', '9 min', '8–10 min']],
    carbon: '1.21 kg CO₂e/kg',
    summary: "The group's best-selling SKU in Portugal. Under watch for broken pasta on line L3 (1.8% vs. a 1.5% limit), already corrected by the drying agent. Cluster of 23 complaints in 9 days with an open CAPA.",
    questions: [
      { q: 'Why are there complaints about this product?', a: '23 **broken pasta** complaints in 9 days, linked to lots **L26310–L26313 from line L3** (dryer moisture above target). The agent corrected the setpoint and CAPA-26-114 is open.' },
      { q: 'Where is lot L26312-M2L3-03?', a: '**126 pallets across 38 destinations**: Continente (34), Pingo Doce (28), Lidl, Recheio and Intermarché (40) and Auchan, Cape Verde and others (24, of which 8 are in transit by sea). Full trace in 4 min 12 s.' },
      { q: 'What is the forecast for December?', a: 'Forecast of **€1.18M** in December (+17% YoY) with the Continente and Pingo Doce Christmas leaflets. Maia II will be at 97% utilisation.' },
    ],
  },
  'milaneza-lacos': {
    category: 'Speciality short pasta', line: 'L1 · short pasta', format: '500 g pack · 20 units/case',
    ytd: '€4.1M', volume: '1,980 t', margin: '42.1%', price: '€2.07/kg', share: '3.1% of PT dry pasta', shelf: '36 months',
    ingredients: 'Durum wheat semolina, water.', allergens: 'Gluten. May contain traces of egg.',
    channels: ['Continente', 'Pingo Doce', 'Lidl', 'Export', 'Other'],
    quality: [['Moisture', '12.0%', '≤ 12.5%'], ['Protein', '13.0%', '≥ 12.5%'], ['DON', '270 µg/kg', '≤ 600 µg/kg'], ['Shape integrity', '98.7%', '≥ 97%']],
    carbon: '1.18 kg CO₂e/kg',
    summary: 'A growing format (+9% at Continente), gaining share from Barilla in speciality shapes. Margin above the Milaneza average.',
    questions: [{ q: 'Why is Milaneza Laços growing?', a: 'It is growing **+9% at Continente** and gaining share from Barilla in speciality shapes. According to the Kantar panel, it is one of the favourite shapes of families with children.' }],
  },
  'nacional-macarrao': {
    category: 'Short pasta', line: 'L2 · short pasta', format: '500 g pack',
    ytd: '€3.7M', volume: '2,140 t', margin: '36.8%', price: '€1.73/kg', share: '2.8% of PT dry pasta', shelf: '36 months',
    ingredients: 'Durum wheat semolina, water.', allergens: 'Gluten.',
    channels: ['Continente', 'Pingo Doce', 'Intermarché', 'Export (Lusophone Africa)', 'Other'],
    quality: [['Moisture', '12.1%', '≤ 12.5%'], ['Protein', '12.9%', '≥ 12.5%'], ['DON', '310 µg/kg', '≤ 600 µg/kg']],
    carbon: '1.19 kg CO₂e/kg',
    summary: 'A Nacional classic ("The Original Cereals Company, since 1849"), stable and with a strong presence in Lusophone Africa.',
    questions: [{ q: 'How is Macarrão Riscado doing?', a: 'Stable: **€3.7M YTD** and a 36.8% margin. 14% of sales come from exports to Lusophone Africa.' }],
  },
  'delmondo-penne': {
    category: 'Premium pasta', line: 'L1 · short pasta (bronze die)', format: '500 g pack',
    ytd: '€1.6M', margin: '44.3%', price: '€2.62/kg', share: '1.2% of PT dry pasta', shelf: '36 months',
    ingredients: 'Durum wheat semolina, water.', allergens: 'Gluten.',
    channels: ['Continente', 'El Corte Inglés and gourmet stores', 'Pingo Doce', 'Export (UK, Brazil)', 'Other'],
    quality: [['Moisture', '11.9%', '≤ 12.5%'], ['Surface roughness (bronze die)', 'Compliant', 'Del Mondo standard'], ['DON', '240 µg/kg', '≤ 600 µg/kg']],
    carbon: '1.24 kg CO₂e/kg',
    summary: 'The fastest-growing premium brand in the group (penetration up from 4.1% to 6.0% in 12 months), without cannibalising Milaneza.',
    questions: [{ q: 'Does Del Mondo cannibalise Milaneza?', a: 'Very little: buyer overlap is only **22%**. Del Mondo attracts premium households and already has **6.0% penetration** (was 4.1%).' }],
  },
  'amiga-espirais': {
    category: 'Pasta · export', line: 'L2 · short pasta', format: '500 g pack · bundle of 20',
    ytd: '€2.2M', volume: '1,670 t', margin: '24.9%', price: '€1.32/kg', share: 'No. 1 in Cape Verde (41%)', shelf: '36 months',
    ingredients: 'Durum wheat semolina, wheat flour, water.', allergens: 'Gluten.',
    channels: ['Cape Verde', 'Angola', 'Guinea-Bissau', 'São Tomé and Príncipe', 'Mozambique', 'Other'],
    quality: [['Moisture', '12.3%', '≤ 12.5%'], ['Bundle strength (sea freight)', 'Compliant', 'Export standard']],
    carbon: '1.33 kg CO₂e/kg (incl. sea freight)',
    summary: 'The leading brand in Cape Verde, São Tomé and Príncipe and Guinea, with an affordable "amiga" (friendly) recipe of durum and soft wheat.',
    questions: [{ q: 'Where is Amiga sold?', a: 'Mainly in Lusophone Africa: **Cape Verde (38%)**, Angola (22%), Guinea-Bissau (13%), São Tomé and Príncipe (11%) and Mozambique (10%). It is **No. 1 in Cape Verde** with an estimated 41% share.' }],
  },
  'nacional-cornflakes': {
    category: 'Breakfast cereals', line: 'Extrusion and flaking', format: '375 g box',
    ytd: '€2.4M', margin: '37.2%', price: '€3.16/kg', share: '1.4% of PT breakfast cereals', shelf: '12 months',
    ingredients: 'Maize (97%), salt, barley malt extract, vitamins and iron. 0% added sugars.', allergens: 'Gluten (barley).',
    channels: ['Continente', 'Pingo Doce', 'Intermarché', 'Auchan', 'Other'],
    quality: [['Moisture', '2.8%', '≤ 3.5%'], ['Crunchiness (instrumental test)', 'Compliant', 'Nacional standard'], ['Sugars', '1.1 g/100 g', '≤ 1.5 g']],
    carbon: '1.62 kg CO₂e/kg',
    summary: 'The most successful launch of the last 3 years: it overtook the classic Corn Flakes in February. Pingo Doce promotion under review (ROI 0.7).',
    questions: [{ q: 'How much does Corn Flakes Sem Açúcar sell?', a: '**€286k in October** (€2.4M YTD), ahead of the classic Corn Flakes since February. Only **31%** of sales cannibalise the classic version. Forecast: €310k/month in March.' }],
  },
  'nacional-alfa': {
    category: 'Biscuits', plant: 'Maia · biscuits', line: 'Tunnel oven F1', format: '200 g pack',
    ytd: '€4.2M', volume: '1,340 t', margin: '30.4%', price: '€3.13/kg', share: '1.1% of PT biscuits', shelf: '9 months',
    ingredients: 'Wheat flour, sugar, sunflower oil, blossom honey (3%), egg, raising agents, salt.', allergens: 'Gluten, egg. May contain milk and nuts.',
    channels: ['Continente', 'Pingo Doce', 'Lidl', 'Export', 'Other'],
    quality: [['Moisture', '3.9%', '≤ 4.5%'], ['Broken biscuits per pack', '4.2%', '≤ 3%'], ['Predicted rancidity (shelf life)', '9 months', '≥ 8 months']],
    carbon: '1.94 kg CO₂e/kg',
    summary: 'A traditional blossom-honey biscuit and the best seller in the Nacional range. Margin squeezed by butter and sugar; packaging under review for broken biscuits (new tray).',
    questions: [{ q: 'Why are there broken Alfa biscuits?', a: 'The rate of **broken biscuits per pack is 4.2%** (limit: 3%), mostly in transport. The new inner tray has been brought forward to December and should bring complaints down to 4.2 ppm.' }],
  },
  'napolitana-t00': {
    category: 'Professional flours', plant: 'Lisbon', line: 'Milling · professional packing', format: '10 kg bag',
    ytd: '€4.1M', volume: '6,900 t', margin: '41.5%', price: '€0.59/kg', share: '21.9% of professional flours (HoReCa)', shelf: '12 months',
    ingredients: 'Type 00 soft wheat flour.', allergens: 'Gluten.',
    channels: ['Independent pizzerias', 'Recheio and Makro', 'Restaurant chains', 'Export (Brazil)'],
    quality: [['Protein', '12.4%', '12–13%'], ['Strength (W)', 'W 260', '250–280'], ['Water absorption', '58%', '56–60%']],
    carbon: '0.52 kg CO₂e/kg',
    summary: 'The fastest-growing flour in the group (+19.4%), with the highest margin per tonne in the Moagens portfolio. Technical Centre pizza training generates 41% of new accounts.',
    questions: [{ q: 'How is Napolitana T00 doing?', a: '**6,900 t YTD (+19.4%)** and a €244 margin per tonne — the highest at Moagens. 41% of sales go to independent pizzerias. A 1 kg consumer pack launches in January 2027.' }],
  },
  'nacional-t65': {
    category: 'Industrial flours', plant: 'Lisbon · Porto', line: 'Soft wheat milling', format: '25 kg bag and bulk (tanker)',
    ytd: '€37.0M', volume: '96,400 t', share: '18% of PT industrial bakery', shelf: '6 months',
    ingredients: 'Type 65 soft wheat flour.', allergens: 'Gluten.',
    channels: ['Industrial bakery', 'Traditional bakery', 'Food industry', 'Cash & Carry'],
    quality: [['Protein', '12.0%', '≥ 11.5%'], ['Strength (W)', 'W 245', '230–260'], ['Falling number', '338 s', '≥ 300 s'], ['Ash', '0.64%', '0.62–0.75%']],
    carbon: '0.44 kg CO₂e/kg',
    summary: "The group's best-selling flour, with its best-ever consistency (protein standard deviation of 0.11 pp) thanks to the blend optimiser.",
    questions: [{ q: 'How consistent is T65?', a: 'The best ever: protein standard deviation of **0.11 pp**, average W of 245 and a falling number of 338 s. The current optimal blend is 40% France, 35% Romania, 15% Castile and 10% Alentejo, at a cost of **€226/t**.' }],
  },
  'adriana-torti': {
    category: '100% semolina pasta', line: 'L5 · short pasta', format: '500 g pack',
    ytd: '€3.9M', volume: '1,720 t', margin: '38.2%', price: '€2.27/kg', share: '5.4% of CZ pasta', shelf: '36 months',
    ingredients: 'Durum wheat semolina (100%), water.', allergens: 'Gluten.',
    channels: ['Albert', 'Kaufland', 'Lidl Česko', 'Slovakia', 'Other'],
    quality: [['Moisture', '12.3%', '≤ 12.5%'], ['Protein', '13.2%', '≥ 12.5%'], ['DON', '320 µg/kg', '≤ 600 µg/kg']],
    carbon: '1.15 kg CO₂e/kg',
    summary: 'The anchor SKU of Adriana, the fastest-growing brand in Czechia (+14% in volume). Successfully tested in 40 Continente stores.',
    questions: [{ q: 'Can Adriana Torti sell in Portugal?', a: 'The test in **40 Continente stores** sold **2.3×** the premium category average. Cortex recommends extending it to 150 stores in 2027, produced in Litovel.' }],
  },
  'zatkovy-kolinka': {
    category: 'Egg pasta', line: 'L3 · egg pasta', format: '250 g pack',
    ytd: '€2.6M', margin: '35.4%', price: '€2.71/kg', share: '31% of CZ egg pasta', shelf: '24 months',
    ingredients: 'Wheat flour, barn eggs (2 eggs per kg), water.', allergens: 'Gluten, egg.',
    channels: ['Kaufland', 'Albert', 'Billa', 'Penny', 'Other'],
    quality: [['Moisture', '12.4%', '≤ 12.5%'], ['Egg content', '2 eggs/kg', '≥ 2 eggs/kg']],
    carbon: '1.48 kg CO₂e/kg',
    summary: "Czechia's leading egg pasta brand, with more than 140 years of tradition (since 1884). Shelf life at risk for a lot of 12,300 units in Litovel.",
    questions: [{ q: 'Is any stock at risk of expiry?', a: 'Yes: **12,300 units** in Litovel with 37% of shelf life remaining (€11k). Cortex suggests a promotion at Penny or diverting them to HoReCa.' }],
  },
  'rosicke-fleky': {
    category: 'Soft wheat pasta', line: 'L1 · short pasta', format: '500 g pack',
    ytd: '€1.4M', volume: '1,150 t', margin: '22.7%', price: '€1.22/kg', share: '13.6% of CZ soft wheat pasta', shelf: '24 months',
    ingredients: 'Soft wheat flour, water.', allergens: 'Gluten.',
    channels: ['Albert', 'Kaufland', 'Penny', 'Tesco', 'Other'],
    quality: [['Moisture', '12.2%', '≤ 12.5%']],
    carbon: '1.02 kg CO₂e/kg',
    summary: 'A traditional Moravian brand (since 1867) under pressure from private label: the price gap widened from 18% to 26% in one year.',
    questions: [{ q: 'Why is Rosické declining?', a: 'The price gap to private label has widened from **18% to 26%** and share has fallen to **13.6%**. Cortex recommends repositioning on the "since 1867" heritage with new packaging, rather than cutting the price.' }],
  },
};
export const products: pt.Product[] = pt.products.map(p => {
  const { channels, quality, ...text }: ProductText = P[p.id] ?? {};
  return {
    ...p, ...text, channels: relabel(p.channels, channels),
    quality: p.quality.map(([l, v, s, st], i): pt.Product['quality'][number] => { const [l2, v2, s2] = quality?.[i] ?? [l, v, s]; return [l2, v2, s2, st]; }),
  };
});

/* ───────────── Employees ───────────── */
/** skills and goals: labels only; timeline: text only. `since` stays a year (the page computes tenure from it). */
type EmployeeText = Partial<Omit<pt.Employee, 'skills' | 'goals' | 'timeline'>> & { skills?: string[]; goals?: string[]; timeline?: string[] };
const E: Record<string, EmployeeText> = {
  'ana-rita-moreira': {
    role: 'Shift Supervisor', site: 'Maia II (long pasta)', unit: 'Food Products', shift: 'Night shift (rotating)',
    skills: ['Team leadership', 'Pasta drying', 'SMED', 'In-line quality', 'Health & safety (OHS)', 'Data analysis (Espiga)'],
    certs: ['Lean Six Sigma Green Belt', 'HACCP level 3', 'First aid'], safety: '0 accidents in the team in 2026', absence: '1.2%', engagement: 'High',
    goals: ['Maia II OEE ≥ 82%', 'Broken pasta ≤ 1.2%', 'Multi-skilling ≥ 3 per workstation'],
    timeline: ['Approved the shift reinforcement proposed by the agent (Monday, L3)', 'Led the correction of the L3 drying profile', 'Completed the data analysis training in Espiga'],
    summary: 'Technical reference in long pasta drying, with 15 years at the company. Leads 22 operators. A natural candidate to train future shift supervisors for Venta de Baños.',
    questions: [{ q: 'Which team does Ana Rita lead?', a: 'She leads **22 operators** on the Maia II night shift (lines L3 and L4). The team has had 0 accidents in 2026 and absenteeism of 3.1%. Watch point: the L3 dryer workstation has only 2 certified operators.' }],
  },
  'joaquim-pires': {
    role: 'Maintenance Manager', site: 'Lisbon (milling)', shift: 'Regular hours + on-call',
    skills: ['Roller mills', 'Vibration analysis', 'Pneumatics and conveying', 'SAP PM', 'Predictive maintenance'],
    certs: ['ISO 18436 Category II vibration analyst', 'Confined-space safety'], safety: 'Maintenance OHS lead', absence: '0.8%', engagement: 'High',
    goals: ['Mill availability ≥ 97%', 'Predictive work orders ≥ 45%', 'Train 2 vibration technicians'],
    timeline: ["Received the agent's proposal: replace the B3 bearing on Sunday", 'Planned replacement of plansifter 2 completed 1 h ahead of schedule'],
    summary: '28 years of experience at the Lisbon flour mill. Key to knowledge transfer: 6 millers and technicians in the team retire within the next 5 years.',
    questions: [{ q: "What is Joaquim's pending decision?", a: 'Approving the **replacement of the mill B3 bearing** during the Sunday shutdown (4 h, parts in stock). Without intervention, Cortex estimates 26 h of downtime (€118k).' }],
  },
  'sofia-carvalho': {
    site: 'Headquarters (Maia)', unit: 'Food Products',
    skills: ['Negotiation', 'Revenue management', 'Category management', 'Data analysis (Espiga)'],
    absence: '0.5%', engagement: 'Very high',
    goals: ['Jerónimo Martins sales +3%', 'Pingo Doce OTIF ≥ 95%', 'Promotional ROI ≥ 1.3'],
    timeline: ['Sent Pingo Doce the alternative promotion proposal (ROI 1.4)', 'Alert: OTIF below contract at the South DC'],
    summary: 'Manages the Jerónimo Martins account (Pingo Doce and Recheio, €30.1M). One of the most active users of the Espiga Assistant (62 questions/week).',
    questions: [{ q: "How is Sofia's account doing?", a: 'She manages **€30.1M** (Pingo Doce €23.9M + Recheio €6.2M). Sales +2.6% at Pingo Doce, but OTIF of 93.1%. She proposed an alternative promotion with an ROI of 1.4.' }],
  },
  'ines-duarte': {
    role: 'Bakery Technician', site: 'Technical Centre (Lisbon)',
    skills: ['Bakery', 'Neapolitan pizza', 'Cold dough techniques', 'Training'],
    certs: ['Master Pizzaiolo (AVPN)', 'Certified trainer (DGERT)'], absence: '1.9%', engagement: 'Very high',
    goals: ['60 training sessions in 2026', 'Post-demo conversion ≥ 35%', 'Training NPS ≥ 70'],
    timeline: ['Pizza training for 14 Recheio pizzerias', 'Baking trial for Panificação Douro scheduled'],
    summary: 'Runs the pizza training sessions (46 in 2026) that generate 41% of new Napolitana accounts.',
    questions: [{ q: "What is the impact of Inês's training sessions?", a: '**46 pizza sessions** in 2026, with an NPS of +71 and 37% conversion after demonstration. They generate 41% of new Napolitana accounts.' }],
  },
  'rui-barbosa': {
    role: 'Extrusion Operator', site: 'Trofa (cereals)', unit: 'Food Products', shift: 'Shift 2',
    skills: ['Extrusion', 'Coating and toasting', 'CIP cleaning', 'In-line quality'],
    certs: ['Clextral certified operator', 'HACCP level 2'], safety: '412 days without accidents (Trofa)', absence: '2.4%', engagement: 'High',
    goals: ['Coating certification', 'Extrusion OEE ≥ 78%'],
    timeline: ['Reported a near miss with a photo (toaster ladder)', 'Completed the Clextral certification'],
    summary: 'Multi-skilled operator on the new Trofa extrusion line, on the path to becoming a process technician.',
    questions: [{ q: "What is Rui's development plan?", a: 'Complete the **coating and toasting** certification (60%) to become the 3rd certified operator at the workstation and, in 2027, the process technician training.' }],
  },
  'lucia-fernandez': {
    role: 'Quality Manager',
    skills: ['IFS Food', 'Allergens', 'Auditing', 'LIMS'],
    certs: ['IFS auditor', 'ISO 22000 lead auditor'], absence: '1.1%', engagement: 'Medium',
    goals: ['IFS audit score ≥ 95%', 'Close 6 incomplete evidence items'],
    timeline: ['IFS preparation plan generated by Cortex (6 requirements)', 'VB3 LIMS integration into Snowflake completed'],
    summary: 'Leads quality at Venta de Baños and the first IFS audit under Cerealis management, in 9 weeks.',
    questions: [{ q: 'Is Lucía ready for the IFS audit?', a: '**6 evidence items** are still missing (allergen control and calibrations). The preparation plan is 33% complete; the audit is in **9 weeks**.' }],
  },
  'miguel-teixeira': {
    role: 'Head Miller', shift: 'Regular hours',
    skills: ['Wheat and rye milling', 'Roll adjustment', 'Flour blending', 'Mentoring'],
    certs: ['Professional miller (APIM)'], absence: '0.6%', engagement: 'High',
    goals: ['Rye extraction ≥ 71.5%', 'Mentor 2 junior millers'],
    timeline: ['Rye extraction at 71.8% (+0.6 pp vs. plan)'],
    summary: '33 years of experience; critical know-how in rye and blends. Active mentoring plan to preserve the knowledge of senior millers.',
    questions: [{ q: 'Why is Miguel critical?', a: 'He is the miller with the most experience in **rye and blends** (33 years). Rye extraction is at 71.8%, above plan. He is mentoring 2 junior millers.' }],
  },
  'tereza-kralova': {
    role: 'Planning Manager',
    skills: ['Production planning', 'S&OP', 'Helios', 'Data analysis (Espiga)'],
    absence: '1.4%', engagement: 'High',
    goals: ['Litovel utilisation ≤ 92% in December', 'Forecast accuracy ≥ 92%'],
    timeline: ['Scenario to transfer 300 t to Venta de Baños under review'],
    summary: 'Responsible for planning at Litovel and for the link to the group S&OP.',
    questions: [{ q: 'What decision is Tereza working on?', a: 'Transferring **300 t of private-label short pasta** to Venta de Baños in December, which lowers Litovel utilisation from 94% to 90% and adds €21k of margin.' }],
  },
};
export const employees: pt.Employee[] = pt.employees.map(e => {
  const { skills, goals, timeline, ...text }: EmployeeText = E[e.id] ?? {};
  return { ...e, ...text, skills: relabel(e.skills, skills), goals: relabel(e.goals, goals), timeline: retell(e.timeline, timeline) };
});

/* ───────────── Assets ───────────── */
/** sensors: [label, value] (status and schematic unit stay); workOrders: [description, status] (order number and date stay). */
type AssetText = Partial<Omit<pt.Asset, 'sensors' | 'workOrders'>> & { sensors?: [string, string][]; workOrders?: [string, string][] };
const A: Record<string, AssetText> = {
  'LIS-MOI-B3': {
    name: 'Roller mill B3', site: 'Lisbon (soft wheat mill)', rul: '6 days (non-drive-end bearing)', mtbf: '1,840 h', availability: '96.1%',
    sensors: [['Roll vibration', '4.0 mm/s'], ['Bearing temperature', '71 °C'], ['Roll gap', '0.21 mm'], ['Feed rate', '30.2 t/h'], ['Moisture after conditioning', '16.1%'], ['Plansifter load', '84%']],
    trendLabel: 'RMS vibration (mm/s) · last 12 days',
    workOrders: [['Replace the non-drive-end bearing (predictive)', 'Awaiting approval'], ['Roll adjustment B1–B5', 'Completed'], ['Scheduled lubrication', 'Completed']],
    prediction: { failProb: '81% within 6 days', driver: 'Non-drive-end bearing wear (BPFO defect frequency)', action: 'Replace the bearing during the Sunday shutdown (4 h, 2 technicians, SKF part in stock)', saving: '€118k (26 h of downtime avoided)' },
    summary: 'Critical mill at the Lisbon flour mill (720 t/24 h). The anomaly model detected the bearing-wear signature 9 days before the alarm.',
    questions: [{ q: 'When will B3 fail?', a: '**81% probability of reaching the alarm within 6 days**. Cause: non-drive-end bearing wear. Recommendation: replace it during the Sunday shutdown (4 h) — this avoids 26 h of downtime (€118k).' }],
  },
  'MAI-M2-L3': {
    name: 'Long pasta line L3', model: 'TT long pasta line 3,500 kg/h', rul: '3 weeks (zone 3 fan)', availability: '93.4%', throughput: '3,500 kg/h',
    sensors: [['Press pressure', '118 bar'], ['Die temperature', '46 °C'], ['Dryer zone 3', '84 °C · RH 71%'], ['Outlet moisture', '12.6%'], ['Z3 fan vibration', '3.1 mm/s'], ['Broken pasta (packing)', '1.8%']],
    trendLabel: 'Broken pasta (%) · weeks 36–47',
    workOrders: [['Inspect the dryer zone 3 fan', 'Planned'], ['Drying profile adjustment (Cortex agent)', 'Completed'], ['Change spaghetti die No. 5', 'Completed']],
    prediction: { failProb: '34% within 3 weeks', driver: 'Zone 3 fan imbalance affecting relative humidity', action: 'Balance the fan during the 26/11 shutdown and keep the corrected profile', saving: '€46k/month in broken pasta and complaints' },
    summary: 'Line for Milaneza Esparguete 500 g. Outlet moisture above target for 7 shifts — corrected by the agent; the probable root cause is the zone 3 fan.',
    questions: [{ q: 'Why is there broken pasta on L3?', a: '**Dryer outlet moisture** was above target for 7 shifts (12.6% vs. 12.2%). The agent corrected zone 3 (−2 °C, +4% RH). The probable root cause is **zone 3 fan imbalance** — inspection planned for 26/11.' }],
  },
  'VDB-L2': {
    name: 'Short pasta line L2', model: 'Polymatik / Ecothermatik 2,800 kg/h', rul: '5 weeks (extrusion die)', availability: '88.7%', throughput: '2,800 kg/h',
    sensors: [['Press pressure', '124 bar'], ['Die wear (estimated)', '82%'], ['Final dryer', '79 °C'], ['Outlet moisture', '12.3%'], ['Format changeovers', '2.1 h/shift']],
    trendLabel: 'OEE (%) · weeks 36–47',
    workOrders: [['Replace the macaroni die', 'Planned'], ['SMED mission (Maia II team)', 'Planned']],
    prediction: { failProb: '22% within 5 weeks', driver: 'Die wear and rising press pressure', action: 'Replace the die on 18/12 and apply the format sequencer', saving: '+6 pp OEE (€0.4M/year)' },
    summary: 'The line with the most format changeovers in the group (58 h/month). A priority for the SMED programme.',
    questions: [{ q: 'How can we improve OEE on L2?', a: 'L2 loses **58 h/month to format changeovers** (Maia benchmark: 24 h). The format sequencer and the January SMED mission can lift OEE from 74% to 80%.' }],
  },
  'TRO-EXT-01': {
    name: 'Cereal extruder', model: 'Evolum 88 (twin-screw)', rul: '11 months', availability: '95.8%', throughput: '1,600 kg/h',
    sensors: [['Screw torque', '68%'], ['Die head temperature', '162 °C'], ['Product moisture', '2.8%'], ['Cutter speed', '1,420 rpm']],
    trendLabel: 'OEE (%) · weeks 36–47',
    workOrders: [['Inspect the screw segments', 'Planned']],
    prediction: { failProb: '4% within 3 months', driver: '—', action: 'Keep the preventive plan', saving: '—' },
    summary: 'New extrusion line (€7M investment), at 92% of rated speed. Produces Corn Flakes Sem Açúcar and private-label cereals.',
    questions: [{ q: 'How is the new extruder doing?', a: 'Health of **88/100** and OEE of 79% in week 47, at 92% of rated speed. No risks expected in the next 3 months.' }],
  },
  'MAI-BOL-F1': {
    name: 'Biscuit tunnel oven F1', site: 'Maia (biscuits)', model: '72 m gas-fired tunnel oven', rul: '7 months', availability: '94.2%', energy: '1,120 kWh/t (gas)', throughput: '1,200 kg/h',
    sensors: [['Zone 1', '228 °C'], ['Zone 3', '204 °C'], ['Outlet moisture', '3.9%'], ['Broken biscuits', '4.2%']],
    trendLabel: 'Broken biscuits per pack (%)',
    workOrders: [['Adjust the stacker at the cooling outlet', 'Planned']],
    prediction: { failProb: '9% within 3 months', driver: 'Breakage at stacking (not in the oven)', action: 'New inner tray and stacker adjustment', saving: '−1.6 ppm in complaints' },
    summary: 'Oven for the Bolacha Alfa and Maria biscuits. The oven itself is healthy; breakage happens at stacking and in transport.',
    questions: [{ q: 'Is the oven causing broken biscuits?', a: 'No: the oven is healthy (82/100). Breakage (4.2% per pack) happens at **stacking and in transport**. Fix: a new inner tray and stacker adjustment on 28/11.' }],
  },
  'LIT-L5': {
    name: 'Short pasta line L5', model: 'Short pasta line 4,000 kg/h', rul: '14 months', availability: '96.4%', throughput: '4,000 kg/h',
    sensors: [['Press pressure', '112 bar'], ['Final dryer', '86 °C'], ['Outlet moisture', '12.2%']],
    trendLabel: 'OEE (%) · weeks 36–47',
    workOrders: [['Quarterly preventive maintenance', 'Planned']],
    prediction: { failProb: '3% within 3 months', driver: '—', action: 'Keep the preventive plan', saving: '—' },
    summary: 'The most efficient line in Litovel; produces Adriana Torti and Funghetto.',
    questions: [{ q: 'How is line L5 in Litovel doing?', a: 'Health of **91/100** and OEE of 81%. It produces Adriana Torti, which is growing 18% at Albert.' }],
  },
  'POR-MOI-C1': {
    name: 'Rye mill C1', rul: '4 months', mtbf: '1,260 h', availability: '95.2%',
    sensors: [['Vibration', '2.4 mm/s'], ['Bearing temperature', '58 °C'], ['Rye extraction rate', '71.8%']],
    trendLabel: 'RMS vibration (mm/s)',
    workOrders: [['Re-flute the rye rolls', 'Planned']],
    prediction: { failProb: '6% within 3 months', driver: 'Normal roll wear', action: 'Re-flute in March 2027', saving: '—' },
    summary: 'Mill dedicated to rye, with extraction above plan.',
    questions: [{ q: 'How is the rye mill doing?', a: 'Health of **79/100**, stable vibration (2.4 mm/s) and extraction of **71.8%**, above plan. Roll re-fluting is scheduled for March.' }],
  },
  'LIS-SIL': {
    name: 'Grain silo battery (27,000 t)', site: 'Lisbon', model: '12 metal cells', availability: '99.6%', energy: '3 kWh/t (aeration)', throughput: 'intake 200 t/h',
    sensors: [['Average grain temperature', '17 °C'], ['Cell 7 · hot spot', '24 °C'], ['Average moisture', '12.6%'], ['Fill level', '78%']],
    trendLabel: 'Cell 7 temperature (°C)',
    workOrders: [['Forced aeration of cell 7 (agent)', 'In progress']],
    prediction: { failProb: '12% risk of spoilage in cell 7', driver: 'Hot spot from localised moisture (Romanian lot)', action: 'Night-time aeration (off-peak tariff) and mill cell 7 first', saving: '€62k of grain protected' },
    summary: 'Silos at the Lisbon flour mill with 312 temperature probes. Hot spot in cell 7 under monitoring.',
    questions: [{ q: 'Is there a risk in the silos?', a: 'A **hot spot in cell 7** (24 °C and rising) in a lot of Romanian wheat. The agent switched on night-time aeration and recommended milling that cell first — €62k of grain protected.' }],
  },
};
export const assets: pt.Asset[] = pt.assets.map(a => {
  const { sensors, workOrders, ...text }: AssetText = A[a.id] ?? {};
  return {
    ...a, ...text,
    sensors: a.sensors.map((s, i) => { const [label, value] = sensors?.[i] ?? [s.label, s.value]; return { ...s, label, value }; }),
    workOrders: a.workOrders.map(([n, d, dt, st], i): pt.Asset['workOrders'][number] => { const [d2, st2] = workOrders?.[i] ?? [d, st]; return [n, d2, enDate(dt), st2]; }),
  };
});

export const findCustomer = (id?: string) => customers.find(c => c.id === id);
export const findProduct = (id?: string) => products.find(p => p.id === id);
export const findEmployee = (id?: string) => employees.find(e => e.id === id);
export const findAsset = (id?: string) => assets.find(a => a.id === id);
