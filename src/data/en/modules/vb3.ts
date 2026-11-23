import type { Module } from '../../types';
import { k, ch, ag, rows, pie, spark } from '../../gen';
import { SALES_2026 } from '../facts';

const M7 = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

export const vb3: Module = {
  slug: 'vb3', name: 'Cerealis Pasta VB3 · Spain', short: 'Pasta VB3 (ES)', icon: 'Flag', color: '#29B5E8', group: 'negocio',
  tagline: 'Formerly Cerealto Pasta VB3 · Venta de Baños (Palencia) · 4 lines, 90,000 t/year · private label for the Spanish market',
  owner: 'Javier Ortega — General Manager, Cerealis Pasta VB3',
  sources: ['SAP S/4HANA (VB3)', 'MES Venta de Baños', 'EDI Mercadona', 'Circana España', 'LIMS VB3'],
  sections: [
    {
      id: 'geral', label: 'Overview', icon: 'LayoutGrid', blocks: [
        { t: 'kpis', items: [
          k('Sales (Apr–Oct)', '€58.8M', '+3.2% vs. business plan', true, true, spark(111, 8.3, 0.2, 0.03)),
          k('Volume (Apr–Oct)', '49.8k t', '79% of capacity', true, true),
          k('EBITDA margin', '8.3%', 'plan: 8.0%', true, true),
          k('Mercadona share', '48%', 'of the unit’s sales', true, false),
        ] },
        ch('vb1', 'Monthly sales vs. business plan (€M)', 'Since consolidation (April 2026)', 'bar', ['Actual', 'Business plan'],
          rows(M7, { Actual: SALES_2026.es.slice(3), 'Business plan': [8.0, 8.2, 8.1, 8.2, 7.9, 8.2, 8.4] }),
          'Above plan every month; October (€8.8M) was the plant’s best month in the last 3 years.',
          'Full-year close forecast at €76.7M (9 months).',
          'Use the spare capacity (21%) for private-label short pasta for Portugal.'),
        ch('vb2', 'Sales by customer type (Apr–Oct)', '% of sales', 'pie', ['v'],
          pie([['Mercadona (private label)', 48], ['Other retailers (private label)', 24], ['Co-packing for brands', 16], ['Exports', 12]]),
          'Concentration on Mercadona (48%) is the unit’s main commercial risk.',
          'With 2 new private-label customers, Mercadona falls to 41% in 2027.',
          'Present the private-label proposal to Carrefour España and DIA in Q1.', { ratio: true }),
      ],
    },
    {
      id: 'fabrica', label: 'Plant', icon: 'Factory', blocks: [
        ch('vb3', 'Venta de Baños OEE (%)', 'Trend since integration', 'line', ['OEE', '2026 target'],
          rows(M7, { OEE: [69.8, 70.4, 70.9, 71.2, 71.6, 72.1, 72.5], '2026 target': [78, 78, 78, 78, 78, 78, 78] }),
          'OEE has risen 0.5 pp a month since integration; the biggest loss is format changeovers (2.1 h per shift).',
          'With SMED and the format sequencer, 77% in March.',
          'Maia II SMED mission in January (2 weeks).', { ratio: true }),
        ch('vb4', 'Format changeover hours by line (October)', 'Venta de Baños vs. Maia benchmark', 'bar', ['Venta de Baños', 'Maia benchmark'],
          [{ m: 'L1', 'Venta de Baños': 46, 'Maia benchmark': 22 }, { m: 'L2', 'Venta de Baños': 58, 'Maia benchmark': 24 }, { m: 'L3', 'Venta de Baños': 41, 'Maia benchmark': 21 }, { m: 'L4', 'Venta de Baños': 37, 'Maia benchmark': 20 }],
          'L2 has 58 h of changeovers a month — more than double the benchmark.',
          'Sequencing formats by family saves 18% of the hours.',
          'Activate the Cortex production sequencer on L2 first.', { ratio: true }),
      ],
    },
    {
      id: 'integracao', label: 'Day 1 → Day 100', icon: 'Merge', blocks: [
        { t: 'kpis', items: [
          k('Days since closing', '216', 'April 2026', true, true),
          k('Systems integrated', '27/31', '87%', true, true),
          k('Consolidated reporting', 'Day 38', 'target: day 60', false, true),
          k('Active agents', '6/9', 'from the group catalogue', true, true),
        ] },
        { t: 'table', title: 'Data integration plan', sub: 'Espiga M&A playbook', span: true, status: ['Status'],
          columns: ['Domain', 'Source system', 'Snowflake connection', 'Day', 'Status'],
          rows: [
            { Domain: 'Finance', 'Source system': 'SAP S/4HANA FI/CO', 'Snowflake connection': 'Openflow (CDC)', Day: 1, Status: 'Completed' },
            { Domain: 'Sales and customers', 'Source system': 'SAP SD + EDI Mercadona', 'Snowflake connection': 'Openflow + Snowpipe', Day: 14, Status: 'Completed' },
            { Domain: 'Quality', 'Source system': 'LIMS VB3', 'Snowflake connection': 'Snowpipe Streaming', Day: 47, Status: 'Completed' },
            { Domain: 'Production', 'Source system': 'MES for the 4 lines', 'Snowflake connection': 'Snowpipe Streaming', Day: 60, Status: 'Completed' },
            { Domain: 'Governance', 'Source system': 'Horizon policies (ES)', 'Snowflake connection': 'Tags and masking', Day: 30, Status: 'Completed' },
            { Domain: 'Maintenance', 'Source system': 'SAP PM', 'Snowflake connection': 'Openflow', Day: 120, Status: 'In progress' },
            { Domain: 'People', 'Source system': 'Local time & attendance and shifts', 'Snowflake connection': 'Files → Snowpipe', Day: 150, Status: 'In progress' },
            { Domain: 'Cybersecurity', 'Source system': 'OT/IT logs (NIS2)', 'Snowflake connection': 'Snowpipe', Day: 180, Status: 'In progress' },
          ] },
        ch('vb5', 'Systems connected to Snowflake since closing', 'Cumulative count of 31 systems · M&A playbook', 'area', ['Systems connected', 'Plan'],
          [1, 14, 30, 38, 47, 60, 100, 150, 216].map((d, i) => ({ m: `Day ${d}`, 'Systems connected': [4, 11, 16, 19, 21, 24, 26, 27, 27][i], Plan: [3, 8, 13, 16, 19, 23, 27, 30, 31][i] })),
          'Integration ran ahead of plan until day 60; since then it has levelled off at 27 systems.',
          'The 4 remaining systems (maintenance, people and NIS2 logs) will be connected by day 240.',
          'Prioritise SAP PM to enable predictive maintenance on the 4 lines.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-vb3', 'SKU and customer mapping during integration', 'auto', 'New item or customer code in the Venta de Baños SAP', '3× faster integration', [
            ['Signal', '214 new private-label item codes arrived from the Venta de Baños SAP.'],
            ['Matching', 'Cortex AI_SIMILARITY suggests the equivalent in the group catalogue (format, pack weight, recipe).'],
            ['Validation', '201 matches with confidence > 95%; 13 sent for review.'],
            ['Action', 'Group product dimension updated; consolidated reports recalculated.'],
          ], { domain: 'Integration', last: 'today 05:00' }),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'How is Pasta VB3 doing against plan?', a: 'Ahead of plan: **€58.8M** from April to October (**+3.2%**) and an EBITDA margin of **8.3%** (plan: 8.0%). Volume of **49.8k t** (79% of capacity). OEE (72.5%) remains below the 78% target.' },
    { q: 'How big is Mercadona’s share?', a: 'Mercadona accounts for **48% of the unit’s sales** (and 10.4% of the group’s). Cortex recommends opening 2 new private-label customers (Carrefour España and DIA) to bring this down to 41% in 2027.' },
    { q: 'Where does the integration stand?', a: '**27 of 31 systems** integrated (87%). Consolidated reporting was ready on **day 38** (target: 60). Still to go: maintenance (SAP PM), people and the NIS2 cybersecurity logs. **6 of 9 group agents** are already active in Venta de Baños.' },
  ],
};
