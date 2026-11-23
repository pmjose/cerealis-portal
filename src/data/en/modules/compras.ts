import type { Module } from '../../types';
import { k, ch, ag, ml, rows, pie, MONTHS_EN as MONTHS, FUT_EN as FUT, spark } from '../../gen';
import { ORIGINS } from '../facts';

const R_CANADA: [number, number][] = [[-73.55, 45.5], [-61, 47.6], [-52, 46.6], [-30, 43.5], [-9.0, 41.18]];
const R_MEXICO: [number, number][] = [[-110.9, 27.9], [-105.5, 19.5], [-79.9, 9.0], [-74, 17.5], [-60, 25], [-30, 36], [-9.0, 41.18]];
const R_ROUEN: [number, number][] = [[1.08, 49.44], [-1.6, 49.8], [-5.2, 48.3], [-9.6, 43.2], [-9.2, 38.7]];
const R_BLACK: [number, number][] = [[28.65, 44.17], [29.05, 41.1], [26.2, 40.2], [23.2, 36.4], [15.2, 37.2], [10.2, 37.6], [0, 37.1], [-5.6, 35.95], [-9.2, 38.7]];

export const compras: Module = {
  slug: 'compras', name: 'Procurement & Grains', short: 'Procurement & Grains', icon: 'Wheat', color: '#D99A00', group: 'funcoes',
  tagline: 'Cerealis Internacional · durum wheat, soft wheat, rye, maize, semolinas, packaging and energy',
  owner: 'Nuno Ferraz — Grain Procurement Director',
  sources: ['SAP S/4HANA MM', 'Euronext MATIF (Marketplace)', 'ECB exchange rates', 'Baltic freight (Marketplace)', 'AIS vessel tracking', 'IPMA · weather', 'LIMS'],
  sections: [
    {
      id: 'mercado', label: 'Market & prices', icon: 'LineChart', blocks: [
        { t: 'kpis', items: [
          k('Average durum wheat cost (CIF Leixões)', '€318/t', '-4.2% in 10 days', false, true, spark(3, 330, 6, -0.04)),
          k('Average soft wheat cost (CIF Lisbon)', '€224/t', '+1.8% MoM', true, false, spark(5, 216, 4, 0.04)),
          k('Grain and semolina purchases 2026E', '€166M', '41.7% of sales', true, false, spark(8, 160, 4)),
          k('Savings vs. market (YTD)', '€2.7M', '-2.1% on wheat cost', true, true, spark(11, 1.8, 0.3, 0.5)),
        ] },
        ch('cp1', 'Durum vs. soft wheat price (€/t)', 'Weighted average CIF cost · last 12 months', 'line', ['Durum wheat', 'Soft wheat', 'Euronext EBM (benchmark)'],
          rows(MONTHS, { 'Durum wheat': [335, 338, 341, 337, 332, 329, 326, 330, 336, 333, 328, 318], 'Soft wheat': [212, 214, 216, 219, 221, 218, 215, 213, 216, 219, 221, 224], 'Euronext EBM (benchmark)': [196, 199, 201, 204, 206, 203, 199, 197, 200, 203, 205, 208] }),
          'Durum wheat fell 4.2% over the last 10 days on the upward revision to the Canadian harvest (+9% YoY, Statistics Canada); the durum–soft spread is at a 14-month low (€94/t).',
          'Cortex forecasts €309/t in December (80% CI: €293–325), rebounding to €321/t in April on a smaller Mexican planting.',
          'Bring forward the purchase of 25,000 t of CWAD No. 1 for Jan–Feb and hedge 60% of the USD exposure at 3 months.', { model: 'Wheat price forecast · MAPE 3.8% at 3 months', ratio: true }),
        ch('cp2', 'Cortex durum wheat forecast (€/t)', 'Next 6 months · 80% confidence interval', 'line', ['Forecast', 'Lower limit', 'Upper limit'],
          rows(FUT, { 'Forecast': [314, 309, 306, 310, 316, 321], 'Lower limit': [301, 293, 287, 288, 291, 294], 'Upper limit': [327, 325, 325, 332, 341, 348] }),
          'Uncertainty widens from February: the main driver is rainfall in Sonora during grain fill.',
          '68% probability that the February price ends below today’s.',
          'Buy 40% of the Jan–Mar requirement now and leave 60% in staggered orders.', { model: 'Snowflake ML FORECAST + multivariate XGBoost', ratio: true, colors: ['#F0A800', '#9B968A', '#9B968A'] }),
        ch('cp3', 'Durum wheat origin (YTD)', '% of tonnes purchased · 248k t', 'pie', ['v'],
          pie([['Canada (CWAD)', 38], ['Occitania (FR)', 17], ['Sonora (MX)', 14], ['Italy (Foggia)', 9], ['Alentejo (PT)', 9], ['North Dakota (USA)', 8], ['Spain', 5]]),
          'Reliance on Canada has risen 6 pp since Mexico started showing higher DON; the Alentejo already covers 9% through the national wheat programme.',
          'With the record Canadian harvest, CWAD could reach 44% in 2027 at no extra cost.',
          'Keep a 45% cap per origin (risk policy) and contract a further 6,000 t in the Alentejo for 2027.'),
        ch('cp4', 'Requirement coverage (weeks)', 'Stock + firm contracts vs. policy', 'bar', ['Durum wheat', 'Soft wheat', 'Policy'],
          rows(MONTHS, { 'Durum wheat': [9.2, 8.8, 8.4, 8.1, 8.6, 9.0, 8.3, 7.9, 7.4, 7.0, 6.6, 6.1], 'Soft wheat': [7.1, 7.4, 6.9, 7.2, 7.6, 7.3, 7.0, 6.8, 7.1, 7.4, 7.2, 7.5], 'Policy': [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8] }),
          'Durum wheat coverage fell below policy in August and stands at 6.1 weeks — a deliberate decision to wait for the Canadian harvest.',
          'Without new purchases, the Maia semolina mill runs out of firm coverage on 2 February.',
          'Approve the coverage agent’s recommendation (25,000 t CWAD).', { ratio: true }),
        { t: 'insights', items: [
          { tone: 'ok', title: 'Durum wheat buying window', text: 'CWAD vs. Occitania spread at a 14-month low (€11/t). Buying now saves ≈ €0.9M against the average price forecast for Q1.', tag: 'Coverage agent · awaiting approval' },
          { tone: 'warn', title: 'EUR/USD exchange rate', text: 'CWAD is priced in USD. Every 1-cent rise in the dollar costs the Maia semolina mill €0.21M a year.', tag: 'Treasury' },
          { tone: 'info', title: 'Ocean freight', text: 'The Supramax index has risen 12% in 3 weeks. Montreal–Leixões freight has gone from $31 to $35/t.', tag: 'Baltic Exchange · Marketplace' },
        ] },
      ],
    },
    {
      id: 'cobertura', label: 'Coverage & contracts', icon: 'FileSignature', blocks: [
        { t: 'kpis', items: [
          k('Open firm contracts', '64,200 t', '11 contracts', true, true),
          k('Average contract price vs. market', '-€7/t', 'below spot', false, true),
          k('Unhedged USD exposure', '$9.8M', '42% of total', true, false),
          k('Specification compliance', '97.6%', '+1.1 pp YoY', true, true),
        ] },
        { t: 'table', title: 'Active grain contracts', sub: 'Position at 23/11/2026', span: true, status: ['Status'],
          columns: ['Contract', 'Supplier', 'Product', 'Tonnes', '€/t', 'Delivery', 'Destination', 'Status'],
          rows: [
            { Contract: 'CT-26-0418', Supplier: 'Viterra', Product: 'Durum wheat CWAD No. 1', Tonnes: 24000, '€/t': 316, Delivery: 'Dec 26', Destination: 'Maia semolina mill', Status: 'In transit' },
            { Contract: 'CT-26-0421', Supplier: 'Cargill', Product: 'Mexican durum wheat', Tonnes: 21500, '€/t': 304, Delivery: 'Dec 26', Destination: 'Maia semolina mill', Status: 'DON risk' },
            { Contract: 'CT-26-0409', Supplier: 'Bunge', Product: 'Soft wheat W 240', Tonnes: 28500, '€/t': 221, Delivery: 'Nov 26', Destination: 'Lisbon flour mill', Status: 'On track' },
            { Contract: 'CT-26-0425', Supplier: 'InVivo (Soufflet)', Product: 'French soft wheat', Tonnes: 16000, '€/t': 226, Delivery: 'Dec 26', Destination: 'Lisbon flour mill', Status: '2-day delay' },
            { Contract: 'CT-26-0402', Supplier: 'Axéréal', Product: 'Occitania durum wheat', Tonnes: 6200, '€/t': 327, Delivery: 'Nov–Jan', Destination: 'Venta de Baños (semolina)', Status: 'In progress' },
            { Contract: 'CT-26-0388', Supplier: 'Alentejo farmers', Product: 'Portuguese durum wheat', Tonnes: 4800, '€/t': 331, Delivery: 'Jul–Sep', Destination: 'Maia semolina mill', Status: 'Completed' },
            { Contract: 'CT-26-0431', Supplier: 'Partner mill (CZ)', Product: 'Durum wheat semolina', Tonnes: 9600, '€/t': 428, Delivery: 'Dec–Feb', Destination: 'Litovel', Status: 'In progress' },
            { Contract: 'CT-26-0436', Supplier: 'Moagem Ceres', Product: 'Rye', Tonnes: 2100, '€/t': 189, Delivery: 'Dec 26', Destination: 'Porto flour mill', Status: 'In negotiation' },
          ] },
        { t: 'scenario', title: 'Coverage and margin simulator', sub: 'Impact of buying now vs. waiting · Maia semolina mill (112,000 t/year)',
          inputs: [
            { id: 'cob', label: 'Tonnes to buy now', min: 0, max: 40000, step: 1000, value: 25000, unit: 't' },
            { id: 'px', label: 'Price change to February', min: -12, max: 12, step: 1, value: -3, unit: '%' },
            { id: 'fx', label: 'EUR/USD change', min: -6, max: 6, step: 0.5, value: 0, unit: '%' },
          ],
          outputs: [
            { label: 'Cost of buying now', calc: v => v.cob * 318 / 1e6, fmt: n => `€${n.toLocaleString('en-GB', { maximumFractionDigits: 2 })}M` },
            { label: 'Savings vs. buying in February', calc: v => v.cob * 318 * (v.px / 100 + v.fx / 100) * -1 / 1e6 + v.cob * 318 * 0.026 / 1e6, fmt: n => `${n >= 0 ? '+' : ''}€${n.toLocaleString('en-GB', { maximumFractionDigits: 2 })}M`, good: n => n >= 0 },
            { label: 'Resulting coverage', calc: v => 6.1 + v.cob / 2150, fmt: n => `${n.toLocaleString('en-GB', { maximumFractionDigits: 1 })} weeks`, good: n => n >= 8 },
          ],
          note: 'Includes storage cost in the Maia silos (9,000 t) and a stock-out risk premium estimated at 2.6% of value.' },
        { t: 'agents', items: [
          ag('ag-cob', 'Durum wheat coverage', 'humano', 'Coverage < 8 weeks and price below the 90-day average', '€0.9M savings · avoids a stock-out on 2 Feb', [
            ['Signal', 'Durum wheat -4.2% in 10 days; semolina mill coverage at 6.1 weeks (policy: 8).'],
            ['Insight', 'Buying window: CWAD vs. Occitania spread at a 14-month low.'],
            ['Diagnosis', 'Without a purchase, Maia runs out of semolina on 2 Feb; high DON risk in the Mexican lot.'],
            ['Recommendation', 'Buy 25,000 t of CWAD No. 1 for Jan–Feb and hedge 60% of the USD at 3 months.'],
            ['Human approval', 'Decision by the Procurement Director (contract > €5M).'],
            ['Action', 'Contract and purchase order created in SAP; FX hedge sent to Treasury.'],
          ], { approver: 'Nuno Ferraz — Grain Procurement Director', domain: 'Procurement', last: '2 h ago' }),
          ag('ag-coa', 'Reading certificates and bills of lading', 'auto', 'New document received from the supplier or the shipping agent', '-6 h per vessel · 0 keying errors', [
            ['Signal', '4 PDFs arrived from Viterra: certificate of analysis, phytosanitary certificate, certificate of origin and B/L.'],
            ['Extraction', 'Cortex AI_EXTRACT reads protein 13.9%, moisture 12.1%, DON 290 µg/kg and weight 24,012 t.'],
            ['Validation', 'Everything within the specification of contract CT-26-0418.'],
            ['Action', 'Inspection recorded in SAP QM and documents archived with lineage to the lot.'],
          ], { domain: 'Procurement', last: '35 min ago' }),
        ] },
      ],
    },
    {
      id: 'origens', label: 'Origins & vessels', icon: 'Ship', blocks: [
        { t: 'map', title: 'Grain origins and vessels bound for Leixões and Lisbon', points: ORIGINS, routes: [R_CANADA, R_MEXICO, R_ROUEN, R_BLACK], height: 460,
          legend: [['Durum wheat', '#D99A00'], ['Soft wheat', '#8C5A14']] },
        { t: 'table', title: 'Vessels in transit', sub: 'AIS position at 09:30 · ETA calculated by Cortex with weather data', span: true, status: ['Status'],
          columns: ['Vessel', 'Route', 'Cargo', 'Tonnes', 'ETA', 'Forecast DON', 'Status'],
          rows: [
            { Vessel: 'MV Black Sea Pearl', Route: 'Constanța → Lisbon', Cargo: 'Soft wheat W 240', Tonnes: 28500, ETA: '28/11', 'Forecast DON': '180 µg/kg', Status: 'On track' },
            { Vessel: 'MV Nordic Harvest', Route: 'Montreal → Leixões', Cargo: 'Durum wheat CWAD No. 1', Tonnes: 24000, ETA: '02/12', 'Forecast DON': '290 µg/kg', Status: 'On track' },
            { Vessel: 'MV Seine Trader', Route: 'Rouen → Lisbon', Cargo: 'French soft wheat', Tonnes: 16000, ETA: '05/12', 'Forecast DON': '240 µg/kg', Status: '2-day delay' },
            { Vessel: 'MV Sonora Star', Route: 'Guaymas → Leixões', Cargo: 'Mexican durum wheat', Tonnes: 21500, ETA: '09/12', 'Forecast DON': '980 µg/kg', Status: 'DON risk' },
          ] },
        ch('cp5', 'Freight cost by route ($/t)', 'Monthly average · Baltic Supramax', 'line', ['Montreal–Leixões', 'Constanța–Lisbon', 'Rouen–Lisbon'],
          rows(MONTHS, { 'Montreal–Leixões': [29, 30, 31, 30, 29, 30, 31, 32, 31, 32, 33, 35], 'Constanța–Lisbon': [24, 25, 26, 25, 24, 24, 25, 26, 26, 27, 28, 29], 'Rouen–Lisbon': [17, 17, 18, 18, 17, 17, 18, 18, 19, 19, 19, 20] }),
          'Transatlantic freight has risen 12% since September on soybean demand in the North Atlantic.',
          'The model forecasts freight stabilising at $34/t until February.',
          'Negotiate a contract of affreightment (COA) for 3 vessels in Q1 at $33/t.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-don', 'DON risk management on the MV Sonora Star', 'humano', 'Forecast DON > 750 µg/kg (internal intake limit)', 'Avoids an off-spec lot · €0.4M', [
            ['Signal', 'Late rains in Sonora: the model forecasts DON of 980 µg/kg in the MV Sonora Star lot.'],
            ['Diagnosis', 'Above the internal intake limit (750 µg/kg) and the Milaneza pasta profile.'],
            ['Recommendation', 'Mandatory sampling on arrival and a maximum 25% blend with low-DON CWAD in silos S05–S08.'],
            ['Human approval', 'Quality sign-off before unloading.'],
            ['Action', 'Intake plan sent to Leixões and the semolina mill; priority analysis in LIMS.'],
          ], { approver: 'Teresa Antunes — Quality Director', domain: 'Procurement · Quality', last: 'today 08:10' }),
        ] },
      ],
    },
    {
      id: 'qualidade-rececao', label: 'Intake quality', icon: 'FlaskConical', blocks: [
        { t: 'kpis', items: [
          k('Lots received (YTD)', '1,284', '+9% YoY', true, true),
          k('Lots rejected or downgraded', '1.3%', '-0.8 pp YoY', false, true),
          k('Average durum wheat protein', '13.7%', '+0.2 pp', true, true),
          k('Average DON at intake', '362 µg/kg', '+18% YoY', true, false),
        ] },
        { t: 'heat', title: 'Average DON by origin (µg/kg)', sub: 'Last 6 months · green = low risk', good: 'low', span: true,
          rows: ['Canada (CWAD)', 'Sonora (MX)', 'Occitania (FR)', 'Foggia (IT)', 'Alentejo (PT)', 'North Dakota (USA)'], cols: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          values: [[260, 240, 280, 300, 290, 310], [520, 610, 700, 760, 840, 910], [380, 360, 410, 450, 420, 400], [300, 320, 340, 330, 350, 360], [210, 230, 260, 280, 250, 240], [330, 310, 350, 370, 360, 340]] },
        ch('cp6', 'Durum wheat protein at intake (%)', 'Weighted monthly average vs. Milaneza specification', 'line', ['Protein', 'Minimum specification'],
          rows(MONTHS, { 'Protein': [13.4, 13.5, 13.6, 13.5, 13.4, 13.6, 13.7, 13.8, 13.6, 13.5, 13.7, 13.8], 'Minimum specification': [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13] }),
          'Protein is stable above specification; the new Canadian harvest adds +0.3 pp.',
          'Forecast of 13.9% in December with the MV Nordic Harvest.',
          'Cut the vital gluten added to Milaneza Integral by 5% — saving €38k/year.', { ratio: true }),
        ch('cp7', 'Lots rejected or downgraded by reason (YTD)', '17 lots out of 1,284 (1.3%)', 'hbar', ['Lots'],
          [{ m: 'DON above limit', Lots: 7 }, { m: 'Moisture > 14%', Lots: 4 }, { m: 'Protein below specification', Lots: 3 }, { m: 'Low specific weight', Lots: 2 }, { m: 'Damaged grains or insects', Lots: 1 }],
          'DON accounts for 41% of rejections, almost all in Mexican wheat.',
          'With the new internal limit (750 µg/kg), intake rejections fall to 0.9% — the risk is now stopped at purchase.',
          'Require pre-shipment DON analysis on all Mexican-origin contracts.'),
        { t: 'models', items: [
          ml('Mycotoxin (DON) risk by origin', 'Classification · gradient boosting', 'AUC 0.87 · 21 days ahead', 'rainfall at flowering, temperature, variety, supplier history, lot', 'Quality · Procurement', 'Produção', 'Estável', 'Oct 26', '€0.4M/year'),
          ml('Wheat price forecast', 'Multivariate time series', 'MAPE 3.8% at 3 months', 'Euronext, FX, freight, IGC stocks, weather', 'Procurement', 'Produção', 'Ligeiro', 'Nov 26', '€2.1M/year'),
          ml('Purchasing and coverage optimisation', 'Mixed-integer programming (Snowpark)', '-€7/t vs. spot buying', 'MRP requirements, forecast prices, storage, risk', 'Procurement', 'Produção', 'Estável', 'Nov 26', '€1.3M/year'),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Should we buy durum wheat now?', a: 'Yes, partially. Durum wheat has fallen **4.2% in 10 days (€318/t)** and coverage stands at **6.1 weeks** (policy: 8). The model forecasts **€309/t in December**, but with a 32% probability of rising in February.\n• Recommendation: buy **25,000 t of CWAD No. 1** now (40% of the Q1 requirement)\n• Hedge **60% of the USD** at 3 months\n• Estimated savings: **€0.9M** against the average forecast price' },
    { q: 'What is the DON risk on the vessels en route?', a: 'One vessel at risk: the **MV Sonora Star** (21,500 t of Mexican durum wheat, ETA 09/12) with forecast DON of **980 µg/kg**, above the internal limit of 750. The other three vessels are below 300 µg/kg.\n• The agent proposed mandatory sampling on arrival and a maximum 25% blend with CWAD\n• Awaiting sign-off from the Quality Director' },
    { q: 'How much have we saved on purchasing this year?', a: 'Up to October, **€2.7M** against the average market price (-2.1% on wheat cost). 62% comes from purchase timing, 24% from the origin mix and 14% from freight negotiation.' },
    { q: 'What is our FX exposure to the dollar?', a: 'We have **$9.8M** of unhedged USD purchases (42% of the total). Every cent the dollar gains costs the Maia semolina mill **€0.21M a year**. The agent recommends hedging 60% at 3 months.' },
  ],
};
