import type { Module } from '../../types';
import { k, ch, ag, rows, pie, MONTHS_EN as MONTHS, WEEKS_EN as WEEKS, spark } from '../../gen';

export const cz: Module = {
  slug: 'cerealis-cz', name: 'Cerealis a.s. · Czechia & Slovakia', short: 'Cerealis a.s. (CZ/SK)', icon: 'Castle', color: '#121210', group: 'negocio',
  tagline: 'Formerly Europasta · Litovel plant (5 lines, 100,000 t/year) · Adriana, Zátkovy, Rosické and Ideál',
  owner: 'Tomáš Novák — General Manager, Cerealis a.s.',
  sources: ['Helios (Litovel ERP)', 'MES Litovel', 'NielsenIQ CZ/SK', 'Albert and Kaufland sell-out', 'ČHMÚ · hydrology'],
  sections: [
    {
      id: 'geral', label: 'Overview', icon: 'LayoutGrid', blocks: [
        { t: 'kpis', items: [
          k('Sales YTD', '€61.4M', '+4.6% YoY', true, true, spark(101, 6, 0.2, 0.05)),
          k('Volume YTD', '55.0k t', '+3.1% YoY', true, true),
          k('EBITDA margin', '10.4%', '+0.8 pp YoY', true, true),
          k('Average exchange rate', '24.9 CZK/EUR', 'koruna +1.2% YoY', false, true),
        ] },
        ch('cz1', 'Sales by brand (YTD)', '% of Cerealis a.s. sales', 'pie', ['v'],
          pie([['Adriana', 34], ['Zátkovy', 27], ['Rosické', 14], ['Ideál (Slovakia)', 13], ['Private label', 12]]),
          'Adriana (100% semolina) is the fastest-growing brand (+14% in volume) and is already the largest in the unit.',
          'Adriana could reach 38% of unit sales in 2027.',
          'Take Adriana Bronze to Hungary and Romania in Q2.', { ratio: true }),
        ch('cz2', 'Sales by customer (€M, YTD)', 'Czechia and Slovakia', 'hbar', ['Sales'],
          [{ m: 'Albert', Sales: 9.8 }, { m: 'Kaufland', Sales: 8.6 }, { m: 'Slovakia (various)', Sales: 7.9 }, { m: 'Lidl Česko', Sales: 7.2 }, { m: 'Tesco', Sales: 5.9 }, { m: 'Billa', Sales: 5.1 }, { m: 'Penny', Sales: 4.4 }, { m: 'Globus', Sales: 3.0 }, { m: 'Other and HoReCa', Sales: 9.5 }],
          'Albert leads, with Adriana on gondola ends in 120 stores.',
          'The new Kaufland store in Brno adds €0.3M a year.',
          'Propose the Zátkovy range in 1 kg packs to Billa.'),
      ],
    },
    {
      id: 'mercado', label: 'Brands & market', icon: 'PieChart', blocks: [
        ch('cz3', 'Value share by segment in Czechia (%)', 'NielsenIQ CZ · last 12 months', 'line', ['Zátkovy · egg pasta', 'Adriana · 100% semolina', 'Rosické · soft wheat'],
          rows(MONTHS, { 'Zátkovy · egg pasta': [30.2, 30.4, 30.1, 30.6, 30.8, 30.7, 30.9, 31.0, 30.8, 31.1, 31.2, 31.0], 'Adriana · 100% semolina': [17.8, 18.0, 18.3, 18.4, 18.7, 18.9, 19.0, 19.2, 19.3, 19.4, 19.5, 19.6], 'Rosické · soft wheat': [14.8, 14.6, 14.5, 14.3, 14.4, 14.1, 14.0, 13.9, 13.8, 13.8, 13.7, 13.6] }),
          'Rosické is losing share to private label in the cheapest soft-wheat pasta.',
          'Without action, Rosické falls to 12.9% in June.',
          'Reposition Rosické on its "since 1867" heritage with new packaging.', { ratio: true, span: true }),
        { t: 'insights', items: [
          { tone: 'ok', title: 'Adriana: +1.8 pp of share', text: 'Adriana has taken share from the Italian brands in the semolina segment, priced 12% below Barilla.', tag: 'NielsenIQ CZ' },
          { tone: 'warn', title: 'Rosické under pressure', text: 'The price gap to private label widened from 18% to 26% in a year; the most price-sensitive consumers are switching.', tag: 'Revenue Management' },
          { tone: 'info', title: 'Iberian opportunity', text: 'The Adriana test in 40 Continente stores sold 2.3× the premium category average.', tag: 'Portfolio synergy' },
        ] },
      ],
    },
    {
      id: 'litovel', label: 'Litovel plant', icon: 'Factory', blocks: [
        { t: 'kpis', items: [
          k('Litovel OEE', '77.9%', '+2.4 pp YoY', true, true),
          k('Forecast utilisation in December', '94%', 'demand peak', true, false),
          k('Automated warehouse', '98.6%', 'availability', true, true),
          k('Flood risk (River Morava)', 'Low', 'ČHMÚ 7-day forecast', false, true),
        ] },
        { t: 'heat', title: 'OEE by line and week (%)', sub: 'Litovel · 5 lines', span: true,
          rows: ['L1 · short pasta', 'L2 · short pasta', 'L3 · egg pasta', 'L4 · long pasta', 'L5 · short pasta'], cols: WEEKS,
          values: [[77, 78, 76, 79, 78, 80, 79, 78, 80, 81, 79, 80], [75, 76, 77, 76, 78, 77, 79, 78, 77, 79, 80, 79], [72, 73, 74, 73, 75, 74, 76, 75, 76, 77, 76, 77], [79, 80, 79, 81, 80, 82, 81, 80, 82, 81, 82, 83], [78, 79, 80, 79, 81, 80, 79, 82, 81, 80, 82, 81]] },
        ch('cz4', 'River Morava level at Litovel (cm)', 'ČHMÚ measurement and 7-day forecast vs. alert levels', 'line', ['Measured level', 'Forecast', 'Alert 1', 'Alert 2'],
          ['17/11', '18/11', '19/11', '20/11', '21/11', '22/11', '23/11', '24/11', '25/11', '26/11', '27/11', '28/11', '29/11', '30/11'].map((m, i) => ({ m, ...(i <= 6 ? { 'Measured level': [142, 139, 141, 146, 151, 149, 147][i] } : {}), ...(i >= 6 ? { 'Forecast': [147, 152, 158, 161, 157, 150, 146, 143][i - 6] } : {}), 'Alert 1': 230, 'Alert 2': 280 })),
          'The level is stable and well below alert level 1 (230 cm); in September 2024 the peak exceeded alert level 3.',
          'The 7-day forecast does not exceed 161 cm (low risk).',
          'Keep the agent on hourly watch throughout the winter.', { ratio: true, colors: ['#29B5E8', '#11567F', '#E08600', '#D92D20'] }),
        { t: 'agents', items: [
          ag('ag-cheia', 'Litovel flood prevention', 'humano', 'Hydrological forecast for the River Morava above alert level 2', 'Protects €3.4M of stock and 5 lines', [
            ['Signal', 'ČHMÚ forecasts the River Morava rising to level 2 within 72 h (heavy rain in the Jeseníky mountains).'],
            ['Diagnosis', 'Scenario similar to September 2024, which stopped production.'],
            ['Recommendation', 'Move stock up from warehouse levels 1–2, bring shipments forward and prepare production at Venta de Baños for 3 critical SKUs.'],
            ['Human approval', 'Decision by the General Manager of Cerealis a.s.'],
            ['Action', 'Movement orders in the automated warehouse, shipments brought forward and contingency plan activated.'],
          ], { approver: 'Tomáš Novák — General Manager, Cerealis a.s.', domain: 'Cerealis a.s.', last: 'simulation 02/10' }),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'How is Cerealis a.s. doing?', a: '**€61.4M in sales YTD (+4.6%)**, **55.0k t** and an EBITDA margin of **10.4% (+0.8 pp)**. Adriana is the fastest-growing brand (+14% in volume, 19.6% share of the semolina segment). Point of attention: Rosické is losing share to private label.' },
    { q: 'Can Litovel cope with the December peak?', a: 'Yes, but only just: forecast utilisation of **94%**. Cortex recommends transferring **300 t of private-label short pasta** to Venta de Baños in December (for Iberian customers: **+€21k** of margin and Litovel utilisation at 90%).' },
    { q: 'What is the flood risk at Litovel?', a: 'Currently **low** (ČHMÚ 7-day forecast). The prevention agent monitors the River Morava hourly and was tested in a simulation on 2 October using the September 2024 scenario.' },
  ],
};
