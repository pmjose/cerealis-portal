import type { Module } from '../../types';
import { k, ch, ag, ml, rows, MONTHS_EN as MONTHS, FUT_EN as FUT, spark } from '../../gen';
import type { MapPoint } from '../../types';

const NET: MapPoint[] = [
  { id: 'n1', name: 'Maia logistics hub', type: 'Finished goods PT · 24,000 pallets', lat: 41.2016, lng: -8.5967, status: 'ok', detail: 'Occupancy 87% · 412 shipments/day', color: '#121210' },
  { id: 'n2', name: 'Lisbon logistics centre', type: 'Flours and household products · South', lat: 38.7372, lng: -9.1017, status: 'aviso', detail: 'Occupancy 94% — above target (90%)', color: '#121210' },
  { id: 'n3', name: 'Retail DCs · North', type: '4 DCs', lat: 41.45, lng: -8.3, status: 'ok', detail: 'OTIF 96.1%', color: '#29B5E8' },
  { id: 'n4', name: 'Retail DCs · Centre and South', type: 'Azambuja and others (5)', lat: 39.07, lng: -8.87, status: 'aviso', detail: 'OTIF 94.2% · unloading slots saturated on Mondays', color: '#29B5E8' },
  { id: 'n5', name: 'Port of Leixões', type: 'Exports to Portuguese-speaking Africa and the Americas', lat: 41.183, lng: -8.7, status: 'ok', detail: '38 containers/week', color: '#D99A00' },
  { id: 'n6', name: 'Litovel · automated warehouse', type: 'Cerealis a.s.', lat: 49.7046, lng: 17.0768, status: 'ok', detail: 'Czechia and Slovakia · OTIF 96.4%', color: '#121210' },
  { id: 'n7', name: 'Venta de Baños', type: 'Pasta VB3', lat: 41.9214, lng: -4.4936, status: 'ok', detail: 'Mercadona and other DCs · OTIF 97.6%', color: '#121210' },
  { id: 'n8', name: 'Mercadona DCs · Centre', type: 'Private-label customer', lat: 40.16, lng: -3.62, status: 'ok', detail: '9 lorries/day', color: '#29B5E8' },
];

export const supply: Module = {
  slug: 'supply', name: 'Supply Chain & S&OP', short: 'Supply Chain & S&OP', icon: 'Network', color: '#121210', group: 'funcoes',
  tagline: 'Demand forecasting, S&OP, inventory, logistics and customer service — Portugal, Czechia and Spain',
  owner: 'Carla Vieira — Supply Chain Director',
  sources: ['SAP S/4HANA SD/MM', 'SAP IBP', 'WMS Maia hub', 'TMS', 'Sell-out Sonae MC · JM (Data Sharing)', 'EDI Mercadona', 'NielsenIQ'],
  sections: [
    {
      id: 'procura', label: 'Demand & forecasting', icon: 'TrendingUp', blocks: [
        { t: 'kpis', items: [
          k('Forecast accuracy (SKU × customer × week)', '92.2%', '+4.6 pp vs. 2025', true, true, spark(2, 88, 1.5, 0.04)),
          k('Forecast bias', '+1.4%', 'slight over-forecast', true, false),
          k('Group OTIF', '95.8%', '+2.3 pp YoY', true, true, spark(4, 93.5, 0.8, 0.02)),
          k('SKUs managed by Cortex', '1,412', 'PT · CZ · ES', true, true),
        ] },
        ch('sc1', 'Pasta Portugal: actual vs. forecast (k t)', 'Maia I and II · last 12 months', 'area', ['Actual', 'Cortex forecast', 'Previous plan (Excel)'],
          rows(MONTHS, { 'Actual': [7.6, 8.4, 7.9, 7.7, 8.2, 7.8, 8.0, 7.5, 7.7, 7.9, 8.3, 8.6], 'Cortex forecast': [7.8, 8.2, 8.0, 7.9, 8.1, 7.9, 7.9, 7.7, 7.8, 8.0, 8.2, 8.5], 'Previous plan (Excel)': [8.1, 8.6, 7.4, 7.2, 8.6, 8.3, 7.6, 7.1, 8.2, 7.5, 7.8, 8.9] }),
          'The Cortex forecast missed by 2.1% a month on average against 6.8% for the Excel plan; the October peak (+4% YoY) was anticipated using the sell-out shared by Continente.',
          'November and December: 8.9k and 9.4k t (Christmas and the leaflet campaign).',
          'Bring forward 2 long-pasta shifts at Maia II in week 49.', { model: 'Hierarchical forecast · Snowflake ML FORECAST', span: true }),
        ch('sc2', 'Forecast accuracy by family (%)', 'Last 13 weeks', 'hbar', ['Accuracy'],
          [{ m: 'Industrial flours', 'Accuracy': 95.2 }, { m: 'Private-label pasta (Spain)', 'Accuracy': 94.1 }, { m: 'Long pasta', 'Accuracy': 93.8 }, { m: 'Short pasta', 'Accuracy': 92.9 }, { m: 'Pasta (Czechia)', 'Accuracy': 91.6 }, { m: 'Household flours', 'Accuracy': 90.7 }, { m: 'Breakfast cereals', 'Accuracy': 88.4 }, { m: 'Biscuits', 'Accuracy': 86.1 }],
          'Biscuits and cereals are the least predictable families because of promotions and launches (Corn Flakes Sem Açúcar).',
          'With retailers’ promotional calendars integrated, biscuit accuracy rises to 90% within 8 weeks.',
          'Ask Pingo Doce and Lidl to share their leaflet calendar via Snowflake Data Sharing.', { ratio: true }),
        ch('sc3', 'Forecast demand by plant (k t)', 'Next 6 months', 'stack', ['Maia', 'Litovel', 'Venta de Baños'],
          rows(FUT, { 'Maia': [8.9, 9.4, 8.1, 7.8, 8.3, 8.0], 'Litovel': [5.7, 6.1, 5.2, 5.0, 5.4, 5.3], 'Venta de Baños': [7.3, 7.6, 7.0, 6.8, 7.1, 7.2] }),
          'December is the group’s peak: 23.1k t of pasta (+6% YoY).',
          'Litovel reaches 94% of capacity in December.',
          'Move 300 t of private-label short pasta for Iberian customers from Litovel to Venta de Baños in December.'),
        { t: 'models', items: [
          ml('Hierarchical demand forecast', 'Snowflake ML FORECAST · 1,412 series', 'MAPE 7.8% (before: 14.9%)', 'sell-out, promotional leaflets, weather, public holidays, price, stock-outs', 'Supply Chain', 'Produção', 'Estável', 'Nov 26', '€1.9M/year'),
          ml('In-store stock-out forecast', 'Classification · LightGBM', 'Precision 84% at 7 days', 'shared store stock, daily sales, deliveries, promotions', 'Supply Chain', 'Produção', 'Estável', 'Nov 26'),
          ml('Delivery ETA', 'Regression · road transport', 'Mean error 11 min', 'TMS, traffic, unloading slot, driver', 'Logistics', 'Piloto', 'Estável', 'Oct 26'),
        ] },
      ],
    },
    {
      id: 'sop', label: 'S&OP', icon: 'CalendarRange', blocks: [
        { t: 'flow', title: 'November S&OP cycle', sub: 'From demand signal to the plan approved at the executive meeting on 27/11', nodes: [
          { label: 'Demand', value: '23.1k t', sub: 'Dec 26 consensus', status: 'ok' },
          { label: 'Capacity', value: '24.4k t', sub: '3 pasta plants', status: 'ok' },
          { label: 'Semolina', value: '6.1 weeks', sub: 'durum wheat coverage', status: 'aviso' },
          { label: 'Target stock', value: '31 days', sub: 'finished goods', status: 'ok' },
          { label: 'Plan', value: 'Approval 27/11', sub: 'Executive Committee', status: 'aviso' },
        ] },
        { t: 'heat', title: 'Planned utilisation by line (%)', sub: 'S&OP plan · next 6 months', span: true,
          rows: ['Maia I · short pasta', 'Maia II · long pasta', 'Trofa · cereal extrusion', 'Maia · biscuits', 'Litovel L1–L3 (short)', 'Litovel L4–L5 (long)', 'Venta de Baños L1–L4', 'Lisbon · milling', 'Porto · milling'],
          cols: FUT, values: [[88, 93, 82, 79, 84, 82], [91, 97, 85, 81, 86, 84], [84, 86, 78, 75, 80, 79], [92, 98, 74, 70, 76, 77], [89, 94, 83, 80, 85, 83], [86, 91, 80, 77, 82, 81], [81, 84, 78, 76, 79, 80], [90, 92, 88, 87, 89, 90], [78, 80, 76, 74, 77, 78]], unit: '%', good: 'low' },
        { t: 'scenario', title: 'Scenario: reallocate private-label production between plants', sub: 'Private-label short pasta · December',
          inputs: [
            { id: 't', label: 'Tonnes moved from Litovel to Venta de Baños', min: 0, max: 800, step: 50, value: 300, unit: 't' },
            { id: 'frete', label: 'Freight savings (Iberian customers)', min: 0, max: 80, step: 2, value: 32, unit: '€/t' },
          ],
          outputs: [
            { label: 'Litovel utilisation in December', calc: v => 94 - v.t / 85, fmt: n => `${n.toLocaleString('en-GB', { maximumFractionDigits: 1 })}%`, good: n => n <= 92 },
            { label: 'Venta de Baños utilisation', calc: v => 84 + v.t / 75, fmt: n => `${n.toLocaleString('en-GB', { maximumFractionDigits: 1 })}%`, good: n => n <= 92 },
            { label: 'Margin impact', calc: v => (v.t * 38 + v.t * v.frete) / 1000, fmt: n => `${n >= 0 ? '+' : ''}€${n.toLocaleString('en-GB', { maximumFractionDigits: 1 })}k`, good: n => n >= 0 },
          ], note: 'Conversion cost: Litovel €212/t on overtime vs. Venta de Baños €174/t on a normal shift. The pasta moved is for private-label customers in Portugal and Spain.' },
      ],
    },
    {
      id: 'inventario', label: 'Inventory', icon: 'Boxes', blocks: [
        { t: 'kpis', items: [
          k('Finished goods stock', '31 days', '-16% YoY (37 days)', false, true, spark(6, 36, 1, -0.15)),
          k('Stock value (group)', '€41.8M', '-€6.9M YoY', false, true),
          k('Stock at shelf-life risk', '€0.62M', 'biscuits and cereals', true, false),
          k('Working capital released', '€6.9M', 'since Jan 26', true, true),
        ] },
        ch('sc4', 'Days of stock by family', 'Finished goods · last 12 months', 'line', ['Pasta', 'Flours', 'Cereals and bars', 'Biscuits', 'Target'],
          rows(MONTHS, { 'Pasta': [38, 37, 37, 36, 35, 34, 33, 33, 32, 31, 31, 30], 'Flours': [12, 12, 11, 11, 11, 10, 10, 10, 9, 9, 9, 9], 'Cereals and bars': [46, 45, 47, 44, 43, 42, 41, 40, 41, 39, 38, 38], 'Biscuits': [41, 40, 42, 41, 39, 38, 37, 38, 36, 35, 36, 34], 'Target': [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32] }),
          'Pasta hit target in September; cereals and biscuits remain above it because of launches.',
          'With SKU-level forecasting, biscuits reach 32 days in February.',
          'Reduce the minimum lot size for Bolacha Alfa from 9 to 6 tonnes.', { ratio: true }),
        { t: 'table', title: 'Stock at shelf-life risk', sub: 'Remaining shelf life < 40% · action suggested by Cortex', status: ['Action'],
          columns: ['SKU', 'Warehouse', 'Units', 'Remaining shelf life', 'Value', 'Action'],
          rows: [
            { SKU: 'Nacional Corn Flakes Sem Açúcar 375 g', Warehouse: 'Maia hub', Units: 18400, 'Remaining shelf life': '34%', Value: '€41k', 'Action': 'Recheio promotion' },
            { SKU: 'Nacional Bolacha Alfa 200 g', Warehouse: 'Maia hub', Units: 26900, 'Remaining shelf life': '31%', Value: '€37k', 'Action': 'Divert to Cape Verde export' },
            { SKU: 'Barras Nacional Aveia & Mel 6×22 g', Warehouse: 'Maia hub', Units: 9800, 'Remaining shelf life': '28%', Value: '€19k', 'Action': 'Donation · Banco Alimentar' },
            { SKU: 'Zátkovy Vaječné Kolínka 250 g', Warehouse: 'Litovel', Units: 12300, 'Remaining shelf life': '37%', Value: '€11k', 'Action': 'Pending review' },
          ] },
        ch('sc5', 'Working capital in stock (€M)', 'Group · month-end', 'bar', ['Stock'],
          rows(MONTHS, { 'Stock': [48.7, 49.2, 47.9, 47.1, 46.4, 52.3, 50.8, 48.1, 45.6, 43.9, 42.7, 41.8] }),
          'The April jump is the consolidation of Pasta VB3 (+€6.1M); since then stock has fallen by €10.5M.',
          'Year-end forecast at €40.2M.',
          'Extend the dynamic safety-stock policy to Venta de Baños.', { span: true }),
      ],
    },
    {
      id: 'logistica', label: 'Logistics & deliveries', icon: 'Truck', blocks: [
        { t: 'kpis', items: [
          k('OTIF', '95.8%', '+2.3 pp YoY', true, true),
          k('Logistics cost', '6.4% of sales', '-0.5 pp YoY', false, true),
          k('Shipments per day (PT)', '412', '+5%', true, true),
          k('Transport emissions', '41 g CO₂e/kg', '-9% YoY', false, true),
        ] },
        { t: 'map', title: 'Group logistics network', points: NET, height: 420, legend: [['Own warehouse', '#121210'], ['Customer', '#29B5E8'], ['Port', '#D99A00']],
          routes: [[[-8.5967, 41.2016], [-8.87, 39.07]], [[-8.5967, 41.2016], [-8.3, 41.45]], [[-9.1017, 38.7372], [-8.87, 39.07]], [[-4.4936, 41.9214], [-3.62, 40.16]], [[-8.5967, 41.2016], [-8.7, 41.183]]] },
        { t: 'table', title: 'Stock-out risks in the next 14 days', sub: 'In-store stock-out forecast using stock shared by retailers', span: true, status: ['Status'],
          columns: ['SKU', 'Customer', 'Coverage', 'Cause', 'Status'],
          rows: [
            { SKU: 'Milaneza Esparguete 500 g', Customer: 'Pingo Doce', Coverage: '4 days', Cause: '26/11 leaflet + L3 downtime', Status: 'In progress' },
            { SKU: 'Napolitana T00 10 kg', Customer: 'Recheio', Coverage: '6 days', Cause: 'HoReCa demand +22%', Status: 'In progress' },
            { SKU: 'Adriana Torti 500 g', Customer: 'Kaufland CZ', Coverage: '7 days', Cause: 'New store in Brno', Status: 'Normal' },
            { SKU: 'Nacional Macarrão Riscado 500 g', Customer: 'Continente', Coverage: '9 days', Cause: 'Promotion: 2nd unit -50%', Status: 'Normal' },
          ] },
        ch('sc6', 'OTIF by customer (%)', 'YTD · deliveries in full and on time', 'hbar', ['OTIF'],
          [{ m: 'Mercadona (private label)', OTIF: 97.8 }, { m: 'Panificação Douro', OTIF: 97.1 }, { m: 'Albert (CZ)', OTIF: 96.9 }, { m: 'Continente', OTIF: 96.4 }, { m: 'Kaufland (CZ)', OTIF: 95.6 }, { m: 'Lidl Portugal', OTIF: 95.2 }, { m: 'Recheio', OTIF: 94.7 }, { m: 'Pingo Doce', OTIF: 93.1 }],
          'Pingo Doce is below contract (95%) because of missed unloading slots on Mondays at the southern DC.',
          'If Monday deliveries move to Sunday night, OTIF rises to 95.6%.',
          'Propose a fixed Sunday-night slot to Pingo Doce.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-rut', 'In-store stock-out prevention', 'auto', 'Forecast coverage < 5 days at a strategic customer', 'Avoids €84k of lost sales', [
            ['Signal', 'Pingo Doce shared stock: Milaneza Esparguete 500 g with 4 days of coverage.'],
            ['Diagnosis', '26/11 leaflet (+38% sales) and off-standard moisture on line L3 at Maia II.'],
            ['Action', '6 pallets transferred from the Lisbon warehouse and Thursday’s load brought forward.'],
            ['Confirmation', 'DESADV sent to Pingo Doce via EDI; coverage rises to 11 days.'],
          ], { domain: 'Supply Chain', last: 'today 07:55' }),
        ] },
      ],
    },
    {
      id: 'servico', label: 'Customer Service', icon: 'Headset', blocks: [
        { t: 'kpis', items: [
          k('Orders per day', '1,860', 'CPA + Moagens + CZ + ES', true, true),
          k('Orders with no manual intervention', '78%', '+21 pp YoY', true, true, spark(9, 62, 3, 0.25)),
          k('Average response time (WhatsApp)', '6 min', 'before: 2 h 10 min', false, true),
          k('Logistics complaints per thousand orders', '3.2', '-28% YoY', false, true),
        ] },
        { t: 'funnel', title: 'Orders by channel (October)', sub: 'CPA and CM Customer Service', stages: [
          ['EDI (modern retail)', 31400, '54%'], ['Customer Portal', 11900, '20%'], ['AI-assisted WhatsApp (bakeries)', 8300, '14%'], ['AI-assisted email', 4600, '8%'], ['Phone', 2300, '4%']] },
        ch('sc7', 'Orders handled by the agent (WhatsApp + email)', 'Per week · Cerealis Moagens', 'bar', ['Automatic', 'With human review'],
          rows(['W36', 'W37', 'W38', 'W39', 'W40', 'W41', 'W42', 'W43', 'W44', 'W45', 'W46', 'W47'], { 'Automatic': [1610, 1680, 1745, 1810, 1902, 1964, 2020, 2085, 2140, 2198, 2265, 2310], 'With human review': [610, 590, 560, 540, 515, 488, 462, 440, 421, 404, 390, 371] }),
          '86% of bakery messages are turned into SAP orders with no intervention; the rest mention ambiguous products ("the usual flour").',
          'With per-customer history, automation reaches 90% in January.',
          'Connect the agent to each bakery’s 24-month order history.'),
        { t: 'agents', items: [
          ag('ag-wapp', 'Bakery WhatsApp orders', 'auto', 'Message received on the CM Customer Service WhatsApp', '1 h 50 min faster · 0 code errors', [
            ['Signal', '"Good morning, for tomorrow 40 bags of T65 and 10 of Napolitana T00 for the Gaia bakery." — Panificação Douro.'],
            ['Interpretation', 'Cortex identifies the customer, delivery address and SKUs (Nacional T65 25 kg; Napolitana T00 10 kg).'],
            ['Validation', 'Credit available, stock in Porto and space on Thursday’s route.'],
            ['Action', 'Order 4512887 created in SAP and confirmation sent by WhatsApp with the 07:00–09:00 slot.'],
          ], { domain: 'Customer Service', last: '4 min ago' }),
          ag('ag-recl', 'Logistics complaint with refund', 'humano', 'Complaint with a credit request > €2,500', 'Resolved in 1 day (before: 9)', [
            ['Signal', 'Recheio Braga reports 3 pallets of Milaneza with damaged stretch film.'],
            ['Diagnosis', 'Photos analysed by Cortex: transport damage, carrier T-17.'],
            ['Recommendation', 'Credit note of €2,980 to the customer, charged back to the carrier.'],
            ['Human approval', 'Sign-off by the Customer Service manager.'],
            ['Action', 'Credit note issued in SAP and carrier debit recorded.'],
          ], { approver: 'Rui Matos — Customer Service Manager, CPA', domain: 'Customer Service', last: 'yesterday' }),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Is there a stock-out risk this week?', a: 'Yes, on one strategic SKU: **Milaneza Esparguete 500 g at Pingo Doce** with **4 days of coverage** (26/11 leaflet and downtime on line L3). The stock-out agent has already transferred **6 pallets from Lisbon** and coverage rises to **11 days**. Two other cases are being monitored: Napolitana T00 at Recheio and Adriana Torti at Kaufland.' },
    { q: 'How accurate is the forecast?', a: 'Accuracy stands at **92.2%** (MAPE 7.8%) at SKU × customer × week level, **+4.6 pp** vs. 2025.\n• Best family: industrial flours (95.2%)\n• Worst: biscuits (86.1%) because of promotions\n• The Excel plan had a 6.8% monthly error vs. 2.1% for Cortex' },
    { q: 'How much working capital have we released?', a: 'Since January we have released **€6.9M** from stock: finished-goods days fell from **37 to 31**. Stock stands at **€41.8M**, including €6.1M from Pasta VB3, consolidated in April.' },
    { q: 'How many orders are automated?', a: '**78%** of the 1,860 daily orders come in with no manual intervention: EDI (54%), portal (20%) and the WhatsApp and email agents (22%). Response time to bakeries has dropped from 2 h 10 min to **6 minutes**.' },
  ],
};
