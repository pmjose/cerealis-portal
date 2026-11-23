import type { Module } from '../../types';
import { k, ch, ag, ml, rows, YTD_EN as YTD, spark } from '../../gen';

const EBITDA = [2.3, 2.2, 2.5, 3.0, 3.3, 3.1, 3.4, 3.2, 3.6, 4.0];
const SALES = [26.1, 25.3, 26.9, 34.3, 35.5, 34.4, 35.4, 34.3, 36.2, 37.4];

export const financas: Module = {
  slug: 'financas', name: 'Finance & Control', short: 'Finance & Control', icon: 'Landmark', color: '#121210', group: 'funcoes',
  tagline: 'Group P&L, margin by unit and channel, working capital, treasury, M&A and close',
  owner: 'Paulo Rebelo — CFO',
  sources: ['SAP S/4HANA FI/CO', 'Helios (Litovel)', 'SAP Venta de Baños', 'Treasury · banks (SWIFT)', 'ECB · exchange rates', 'Credit insurance'],
  sections: [
    {
      id: 'pl', label: 'Group P&L', icon: 'BarChart3', blocks: [
        { t: 'kpis', items: [
          k('Sales YTD', '€325.8M', '+1.5% vs. budget', true, true, spark(51, 26, 2, 0.4)),
          k('EBITDA YTD', '€30.6M', '+27% YoY', true, true, spark(52, 2.4, 0.3, 0.6)),
          k('EBITDA margin', '9.4%', '+0.1 pp YoY', true, true),
          k('Net debt / EBITDA', '2.4×', 'after the VB3 acquisition', true, false),
        ] },
        ch('fi1', 'Monthly EBITDA (€M) and margin (%)', '2026', 'combo', ['EBITDA', 'EBITDA margin (%)'],
          rows(YTD, { EBITDA, 'EBITDA margin (%)': EBITDA.map((e, i) => Math.round(e / SALES[i] * 1000) / 10) }),
          'The October margin (10.7%) is the highest of the year: falling durum wheat prices and fixed-cost dilution in Maia.',
          '2026 EBITDA forecast at €37.9M (9.5%).',
          'Lock in part of the Q1 wheat cost to protect the 10% margin.', { ratio: true }),
        ch('fi2', 'YTD EBITDA bridge (€M)', '2025 → 2026', 'bar', ['Impact'],
          [{ m: 'EBITDA 2025', Impact: 24.1 }, { m: 'Pasta VB3', Impact: 4.9 }, { m: 'Volume and mix', Impact: 1.6 }, { m: 'Price', Impact: 2.2 }, { m: 'Raw materials', Impact: 1.1 }, { m: 'Energy', Impact: 0.9 }, { m: 'Staff costs', Impact: -1.9 }, { m: 'Logistics', Impact: -0.6 }, { m: 'Marketing and other', Impact: -1.7 }, { m: 'EBITDA 2026', Impact: 30.6 }],
          'Pasta VB3 accounts for 72% of the growth; excluding it, like-for-like EBITDA grows 6.6%.',
          'Staff costs rise 4.8% with the 2026 pay agreement.',
          'Accelerate the capture of VB3 synergies in wheat purchasing (target: €1.4M/year).'),
        { t: 'table', title: 'P&L by business unit (YTD)', sub: 'In €M', span: true,
          columns: ['Unit', 'Sales', 'YoY growth', 'Gross margin', 'EBITDA', 'EBITDA margin', 'Vs. budget'],
          rows: [
            { Unit: 'Food Products', Sales: '126.0', 'YoY growth': '+3.0%', 'Gross margin': '35.9%', EBITDA: '14.1', 'EBITDA margin': '11.2%', 'Vs. budget': '+2.1%' },
            { Unit: 'Cerealis Moagens', Sales: '79.6', 'YoY growth': '+1.3%', 'Gross margin': '19.4%', EBITDA: '5.7', 'EBITDA margin': '7.1%', 'Vs. budget': '−0.8%' },
            { Unit: 'Cerealis a.s. (CZ/SK)', Sales: '61.4', 'YoY growth': '+4.6%', 'Gross margin': '33.0%', EBITDA: '6.4', 'EBITDA margin': '10.4%', 'Vs. budget': '+1.9%' },
            { Unit: 'Pasta VB3 (ES)', Sales: '58.8', 'YoY growth': 'newly consolidated', 'Gross margin': '21.5%', EBITDA: '4.9', 'EBITDA margin': '8.3%', 'Vs. budget': '+3.2%' },
            { Unit: 'Corporate centre', Sales: '—', 'YoY growth': '—', 'Gross margin': '—', EBITDA: '−0.4', 'EBITDA margin': '—', 'Vs. budget': '—' },
            { Unit: 'Cerealis Group', Sales: '325.8', 'YoY growth': '+25.5%', 'Gross margin': '31.2%', EBITDA: '30.6', 'EBITDA margin': '9.4%', 'Vs. budget': '+1.5%' },
          ] },
      ],
    },
    {
      id: 'margem', label: 'Margin & cost', icon: 'Percent', blocks: [
        ch('fi3', 'Gross margin by category (%)', 'YTD vs. 2025', 'bar', ['2025', '2026'],
          [{ m: 'Branded pasta', '2025': 38.1, '2026': 39.4 }, { m: 'Private-label pasta', '2025': 18.6, '2026': 19.8 }, { m: 'Industrial flours', '2025': 18.9, '2026': 19.4 }, { m: 'Household flours', '2025': 31.2, '2026': 32.0 }, { m: 'Cereals and bars', '2025': 34.8, '2026': 35.1 }, { m: 'Biscuits', '2025': 29.6, '2026': 28.9 }],
          'Biscuits are the only category losing margin (−0.7 pp) — butter and sugar +11% YoY.',
          'Branded pasta margin reaches 40% in Q1 if durum wheat stays below €315/t.',
          '3% price increase on biscuits in February (elasticity −0.9).', { ratio: true }),
        ch('fi4', 'Cost to serve by channel (% of sales)', 'Logistics, trade discounts, service and credit', 'stack', ['Logistics', 'Discounts and rebates', 'Service and credit'],
          [{ m: 'Modern retail', Logistics: 5.8, 'Discounts and rebates': 9.4, 'Service and credit': 0.9 }, { m: 'Cash & Carry', Logistics: 4.9, 'Discounts and rebates': 6.1, 'Service and credit': 0.8 }, { m: 'Bakery & Industry', Logistics: 7.9, 'Discounts and rebates': 3.2, 'Service and credit': 1.6 }, { m: 'HoReCa', Logistics: 9.6, 'Discounts and rebates': 2.8, 'Service and credit': 1.9 }, { m: 'Export', Logistics: 8.4, 'Discounts and rebates': 1.9, 'Service and credit': 2.7 }],
          'Bakery has the most expensive logistics (small, frequent deliveries); retail is the most expensive in discounts.',
          'Consolidating bakery deliveries into 2-day routes saves 0.9 pp of logistics cost.',
          'Test a 20-bag minimum order with free delivery in Greater Lisbon.', { ratio: true }),
        { t: 'scenario', title: 'Margin sensitivity to the wheat price', sub: 'Impact on annual group EBITDA (without pass-through to the selling price)',
          inputs: [
            { id: 'duro', label: 'Durum wheat (€/t)', min: 260, max: 400, step: 5, value: 318, unit: '€/t' },
            { id: 'mole', label: 'Soft wheat (€/t)', min: 180, max: 280, step: 5, value: 224, unit: '€/t' },
            { id: 'rep', label: 'Pass-through to the selling price', min: 0, max: 100, step: 10, value: 40, unit: '%' },
          ],
          outputs: [
            { label: 'Annual EBITDA impact', calc: v => (-(v.duro - 318) * 0.262 - (v.mole - 224) * 0.3) * (1 - v.rep / 100), fmt: n => `${n.toLocaleString('en-GB', { maximumFractionDigits: 1, signDisplay: 'exceptZero' }).replace(/^([+\-−]?)/, '$1€')}M`, good: n => n >= 0 },
            { label: 'Estimated 2027 EBITDA', calc: v => 41.5 + (-(v.duro - 318) * 0.262 - (v.mole - 224) * 0.3) * (1 - v.rep / 100), fmt: n => `€${n.toLocaleString('en-GB', { maximumFractionDigits: 1 })}M` },
          ], note: 'Basis: 262k t of durum wheat/semolina equivalent and 300k t of soft wheat per year; 2027 plan EBITDA: €41.5M.' },
      ],
    },
    {
      id: 'tesouraria', label: 'Working capital & treasury', icon: 'Wallet', blocks: [
        { t: 'kpis', items: [
          k('Days sales outstanding (DSO)', '48 days', '−4 days YoY', false, true),
          k('Days payable outstanding (DPO)', '61 days', '+3 days YoY', true, true),
          k('Cash conversion cycle', '18 days', '−9 days YoY', false, true),
          k('Net debt', '€91M', 'VB3 acquisition in April', true, false),
        ] },
        ch('fi5', 'Cash forecast (€M)', 'Next 13 weeks · group cash balance', 'area', ['Forecast balance', 'Policy minimum'],
          rows(['W48', 'W49', 'W50', 'W51', 'W52', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'], { 'Forecast balance': [18.4, 16.1, 21.3, 24.9, 19.2, 14.6, 12.8, 15.9, 18.7, 17.1, 15.2, 18.9, 21.6], 'Policy minimum': [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] }),
          'The low point (€12.8M) comes in week 2, once the CWAD payment and the Christmas bonuses have been paid.',
          '7% probability of falling below the policy minimum.',
          'Bring forward factoring of the week-2 Mercadona receivables (€6M).', { ratio: true, model: '13-week cash forecast · mean error 4.2%' }),
        ch('fi6', 'Overdue receivables by market (€M)', 'Export and domestic', 'bar', ['Up to 30 days', '31–90 days', '> 90 days'],
          [{ m: 'Portugal', 'Up to 30 days': 2.1, '31–90 days': 0.6, '> 90 days': 0.2 }, { m: 'Czechia and Slovakia', 'Up to 30 days': 0.9, '31–90 days': 0.2, '> 90 days': 0.0 }, { m: 'Spain', 'Up to 30 days': 0.7, '31–90 days': 0.1, '> 90 days': 0.0 }, { m: 'Angola', 'Up to 30 days': 0.4, '31–90 days': 0.9, '> 90 days': 0.6 }, { m: 'Other Lusophone Africa', 'Up to 30 days': 0.3, '31–90 days': 0.2, '> 90 days': 0.1 }],
          'Angola accounts for 52% of receivables more than 30 days overdue (€1.5M of €2.9M) because of currency restrictions.',
          'Impairment risk of €0.24M in Angola at year-end.',
          'Require a confirmed letter of credit on new orders for Angola.'),
      ],
    },
    {
      id: 'mna', label: 'M&A integration', icon: 'Merge', blocks: [
        { t: 'kpis', items: [
          k('Run-rate annual synergies (target)', '€4.3M', 'Cerealis a.s. + VB3', true, true),
          k('Synergies captured to date', '€2.7M', '63% of target', true, true),
          k('Days to consolidated reporting (VB3)', '38', 'Cerealis a.s.: 9 weeks', false, true),
          k('Systems integrated into Snowflake', '27/31', 'VB3 · 87%', true, true),
        ] },
        { t: 'table', title: 'Synergy programme', sub: 'In €M per year, at run-rate', span: true, status: ['Status'],
          columns: ['Initiative', 'Unit', 'Target', 'Captured', 'Owner', 'Status'],
          rows: [
            { Initiative: 'Joint purchasing of durum wheat and semolina', Unit: 'Pasta VB3', Target: '1.4', Captured: '0.6', Owner: 'Nuno Ferraz', Status: 'In progress' },
            { Initiative: 'Iberian logistics network (shared trucks)', Unit: 'Pasta VB3', Target: '0.6', Captured: '0.2', Owner: 'Carla Vieira', Status: 'In progress' },
            { Initiative: 'Shared services (finance, HR, IT)', Unit: 'Pasta VB3', Target: '0.4', Captured: '0.3', Owner: 'Paulo Rebelo', Status: 'On track' },
            { Initiative: 'Semolina and packaging purchasing', Unit: 'Cerealis a.s.', Target: '0.9', Captured: '0.9', Owner: 'Nuno Ferraz', Status: 'Completed' },
            { Initiative: 'Transfer of SMED and drying practices', Unit: 'Cerealis a.s.', Target: '0.6', Captured: '0.5', Owner: 'Luís Magalhães', Status: 'On track' },
            { Initiative: 'Adriana portfolio in Iberia (Del Mondo ↔ Adriana)', Unit: 'Cerealis a.s.', Target: '0.4', Captured: '0.2', Owner: 'Mariana Couto', Status: 'In progress' },
          ] },
        { t: 'flow', title: 'Data integration playbook (Day 1 → Day 100)', sub: 'Applied to Pasta VB3 · repeatable for the next acquisition', nodes: [
          { label: 'Day 1', value: 'Financial reporting', sub: 'SAP VB3 → Snowflake (Openflow)', status: 'ok' },
          { label: 'Day 14', value: 'Sales and customers', sub: 'SKU and private-label customer mapping', status: 'ok' },
          { label: 'Day 38', value: 'Full consolidation', sub: 'daily group P&L', status: 'ok' },
          { label: 'Day 60', value: 'MES and quality', sub: '4 lines and LIMS connected', status: 'ok' },
          { label: 'Day 100', value: 'Agents live', sub: '6 of 9 group agents', status: 'aviso' },
        ] },
        { t: 'insights', items: [
          { tone: 'info', title: 'Ready for the next integration', text: 'The common data model (customers, SKUs, lots, assets), Horizon policies by country and 140 dashboards are ready to roll out to a new unit in under 6 weeks.', tag: 'M&A playbook' },
          { tone: 'warn', title: 'Milling partnership with Better Foods', text: 'Announced in December 2025. Data mapping for the Ceres, Germen, Granel and Carneiro Campos mills is prepared for when the deal goes ahead.', tag: 'Under review' },
        ] },
      ],
    },
    {
      id: 'fecho', label: 'Close & reporting', icon: 'FileCheck2', blocks: [
        { t: 'kpis', items: [
          k('Month-end close', '4.5 working days', 'previously: 9 days', false, true),
          k('Automated intercompany reconciliations', '96%', 'EUR · CZK', true, true),
          k('Anomalous entries detected (YTD)', '37', '€1.2M corrected', true, true),
          k('Reports generated by Cortex', '142', 'per month', true, true),
        ] },
        { t: 'agents', items: [
          ag('ag-fecho', 'Month-end close and intercompany reconciliation', 'auto', 'Working day 1 of the month', '−4.5 days to close · 3 FTE freed up', [
            ['Signal', 'October close starts: 4 companies, 2 currencies (EUR, CZK).'],
            ['Reconciliation', '1,482 intercompany transactions matched; 61 FX differences explained.'],
            ['Detection', '3 anomalous entries (duplicate freight, wrong cost centre) flagged to Control.'],
            ['Action', 'Consolidation schedules and draft management commentary delivered to the CFO.'],
          ], { domain: 'Finance', last: '03/11 07:00' }),
          ag('ag-credito', 'Export credit limit', 'humano', 'Export customer above 90% of the insured limit', 'Exposure reduced by €0.6M', [
            ['Signal', 'Luanda distributor at 96% of the insured limit, with 2 invoices more than 90 days overdue.'],
            ['Diagnosis', 'High credit risk (score 0.71) and AOA currency restrictions.'],
            ['Recommendation', 'Suspend new shipments until a confirmed letter of credit is in place.'],
            ['Human approval', 'CFO decision.'],
            ['Action', 'Credit block in SAP and customer notified.'],
          ], { approver: 'Paulo Rebelo — CFO', domain: 'Finance', last: '2 days ago' }),
        ] },
        { t: 'models', items: [
          ml('13-week cash forecast', 'Snowflake ML FORECAST + payment rules', 'Mean error 4.2%', 'order book, payment terms, seasonality, wheat payments', 'Treasury', 'Produção', 'Estável', 'Nov 26'),
          ml('Customer credit risk', 'Classification · XGBoost', 'AUC 0.88', 'payment behaviour, country, insurance, sector', 'Credit', 'Produção', 'Estável', 'Oct 26'),
          ml('Journal entry anomaly detection', 'Isolation forest + rules', '37 cases · 92% confirmed', 'account, amount, user, time, supplier', 'Control', 'Produção', 'Estável', 'continuous'),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'What is EBITDA up to October?', a: '**€30.6M** (margin of **9.4%**), **+27% YoY**. Pasta VB3 contributes €4.9M; excluding it, like-for-like EBITDA grows 6.6%. Full-year forecast: **€37.9M (9.5%)**.' },
    { q: 'What is the impact if durum wheat rises to €350/t?', a: 'With durum wheat at **€350/t** and 40% pass-through to the selling price, annual EBITDA falls by about **€5.0M**. Without pass-through, the impact would be **€8.4M**. You can test other scenarios in the simulator on the Margin & cost tab.' },
    { q: 'How are the acquisition synergies going?', a: 'We have captured **€2.7M of €4.3M (63%)**. Cerealis a.s. is almost complete (€1.6M of €1.9M); Pasta VB3 stands at €1.1M of €2.4M, with joint wheat purchasing as the biggest lever (€1.4M).' },
    { q: 'Are there any treasury risks in the coming weeks?', a: 'The low point is in **week 2 (€12.8M)**, above the €10M minimum, with a **7% probability** of breaching it. Cortex suggests bringing forward factoring of the Mercadona receivables (€6M). In Angola, €1.5M is more than 30 days overdue.' },
  ],
};
