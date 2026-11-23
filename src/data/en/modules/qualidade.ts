import type { Module } from '../../types';
import { k, ch, ag, ml, rows, pie, MONTHS_EN as MONTHS, spark } from '../../gen';

export const qualidade: Module = {
  slug: 'qualidade', name: 'Quality & Food Safety', short: 'Quality & Food Safety', icon: 'ShieldCheck', color: '#17924B', group: 'funcoes',
  tagline: 'Laboratory, HACCP, lot-by-lot traceability, IFS/BRCGS certifications and the voice of the consumer',
  owner: 'Teresa Antunes — Quality and Food Safety Director',
  sources: ['LIMS', 'MES', 'SAP QM', 'Consumer Care CRM', 'Metal detectors and X-ray', 'Audit calendar'],
  sections: [
    {
      id: 'indicadores', label: 'Indicators', icon: 'Activity', blocks: [
        { t: 'kpis', items: [
          k('Complaints per million units', '4.1 ppm', '-24% YoY', false, true, spark(21, 5.4, 0.3, -0.24)),
          k('Lots on hold', '0.9%', '-0.4 pp YoY', false, true),
          k('Full traceability time', '4 min 12 s', 'before: 2 working days', false, true),
          k('External audits passed', '11/11', 'IFS · BRCGS · ISO', true, true),
        ] },
        ch('q1', 'Consumer complaints per million units', 'Group · last 12 months', 'area', ['ppm', '2026 target'],
          rows(MONTHS, { ppm: [5.6, 5.4, 5.3, 5.1, 4.9, 5.0, 4.7, 4.5, 4.4, 4.2, 4.0, 4.1], '2026 target': [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5] }),
          'The slight rise in October is concentrated in Milaneza Esparguete (broken pasta) — linked to line L3 at Maia II.',
          'With the dryer fix, November should close at 3.8 ppm.',
          'Keep the alert on lot L26312 until complaints return to normal.', { ratio: true }),
        ch('q2', 'Complaints by reason (YTD)', 'Classified by Cortex AI_CLASSIFY · 1,146 cases', 'pie', ['v'],
          pie([['Broken or brittle pasta', 27], ['Damaged packaging', 19], ['Cooking (mushy, sticky)', 14], ['Taste or smell', 11], ['Foreign body', 9], ['Insects (moths)', 7], ['Allergen information', 5], ['Other', 8]]),
          'Broken pasta has risen from 19% to 27% of complaints since September, concentrated in long formats.',
          'Moth complaints usually rise in July–September; in 2026 they fell 31% thanks to trap monitoring.',
          'Open a CAPA for line L3 and review the Milaneza long-pasta carton (compression strength).', { ratio: true }),
        { t: 'insights', items: [
          { tone: 'warn', title: 'Complaint cluster · Milaneza Esparguete 500 g', text: '23 complaints in 9 days with the same reason (broken pasta), from lots L26310 to L26313 on line L3. Link to dryer moisture confirmed.', tag: 'CAPA-26-114 · open' },
          { tone: 'ok', title: 'Moths: -31% complaints', text: 'The network of 640 image-read traps detected 2 hotspots in the Lisbon warehouse before they reached the product.', tag: 'Pest control' },
          { tone: 'info', title: 'New internal DON limit', text: 'The durum wheat intake limit has dropped from 900 to 750 µg/kg; estimated impact of 4% on purchases from Mexico.', tag: 'Procurement & Grains' },
        ] },
      ],
    },
    {
      id: 'rastreabilidade', label: 'Traceability', icon: 'GitBranch', blocks: [
        { t: 'kpis', items: [
          k('Lots with full genealogy', '100%', 'ship → pallet → customer', true, true),
          k('Recall simulations (YTD)', '14', 'all < 5 min', true, true),
          k('Destinations per lot (average)', '31', 'retail, C&C, export', true, true),
          k('Actual recalls (YTD)', '0', 'none since 2023', false, true),
        ] },
        { t: 'trace' },
        ch('q6', '2026 recall simulations · time to full genealogy', 'Minutes per simulation (internal target: 5 min; requirement: 4 h)', 'bar', ['Minutes', 'Target'],
          ['14/01', '11/02', '18/03', '15/04', '13/05', '10/06', '15/07', '12/08', '16/09', '14/10', '04/11', '09/11', '13/11', '18/11'].map((m, i) => ({ m, Minutes: [4.9, 4.7, 4.8, 4.6, 4.5, 4.6, 4.4, 4.5, 4.3, 4.4, 4.3, 4.2, 4.3, 4.2][i], Target: 5 })),
          'All 14 simulations came in under 5 minutes, including one at Venta de Baños 52 days after the deal closed.',
          'With the Litovel LIMS in real time, the average time drops to 3.8 minutes.',
          'Schedule an unannounced simulation at Litovel in December.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-recall', 'Preventive recall preparation', 'humano', 'Out-of-limit lab result on a shipped lot', 'Notification in < 1 h (requirement: 24 h)', [
            ['Signal', 'LIMS: retention sample from lot L26312-M2L3-03 with a result awaiting confirmation.'],
            ['Trace', 'Full genealogy in 4 min 12 s: 38 destinations, 126 pallets, 9 customers.'],
            ['Recommendation', 'Block stock at the Maia hub and in Lisbon; draft DGAV/ASAE notification and customer notice via EDI.'],
            ['Human approval', 'Decision by the Quality Director and the CEO.'],
            ['Action', 'Communications sent and stock blocked in SAP; Consumer Care briefed with a prepared script.'],
          ], { approver: 'Teresa Antunes — Quality Director', domain: 'Quality', last: 'simulation 18/11' }),
        ] },
      ],
    },
    {
      id: 'laboratorio', label: 'Laboratory & SPC', icon: 'FlaskConical', blocks: [
        ch('q3', 'Dry pasta moisture at packing (%) · control chart', 'Maia II · line L3 · average per shift', 'line', ['Moisture', 'Upper limit', 'Lower limit', 'Target'],
          rows(['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12'], { Moisture: [12.1, 12.2, 12.0, 12.2, 12.3, 12.4, 12.4, 12.5, 12.6, 12.5, 12.3, 12.2], 'Upper limit': [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5], 'Lower limit': [11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6], Target: [12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1] }),
          'Seven consecutive shifts above target and one point beyond the upper limit (S9) — Western Electric rule violated.',
          'After the dryer fix, the next shifts should return to target (12.1%).',
          'Step up sampling to 1 per hour on L3 for 72 h.', { ratio: true }),
        ch('q4', 'Protein and ash in industrial flours', 'Weekly average · Nacional T65 and T55', 'line', ['Protein T65 (%)', 'Protein T55 (%)', 'Ash T65 (% × 10)'],
          rows(['W36', 'W37', 'W38', 'W39', 'W40', 'W41', 'W42', 'W43', 'W44', 'W45', 'W46', 'W47'], { 'Protein T65 (%)': [11.8, 11.9, 11.8, 11.7, 11.9, 12.0, 11.9, 11.8, 11.9, 12.0, 12.1, 12.0], 'Protein T55 (%)': [11.2, 11.3, 11.2, 11.2, 11.3, 11.4, 11.3, 11.2, 11.3, 11.4, 11.4, 11.4], 'Ash T65 (% × 10)': [6.4, 6.5, 6.4, 6.3, 6.4, 6.5, 6.4, 6.4, 6.3, 6.4, 6.5, 6.4] }),
          'High stability: T65 protein standard deviation at 0.11 pp, the best ever.',
          'No deviations expected with the current blend.',
          'Share the consistency certificate with the 40 largest bakery customers.', { ratio: true }),
        { t: 'table', title: 'Latest lot analyses', sub: 'LIMS · today', status: ['Result'], span: true,
          columns: ['Lot', 'Product', 'Plant', 'Moisture', 'Protein', 'DON', 'Microbiology', 'Result'],
          rows: [
            { Lot: 'L26327-M2L3-01', Product: 'Milaneza Esparguete 500 g', Plant: 'Maia II', Moisture: '12.2%', Protein: '13.1%', DON: '290 µg/kg', Microbiology: 'Compliant', Result: 'Approved' },
            { Lot: 'L26327-M1L1-04', Product: 'Milaneza Laços 500 g', Plant: 'Maia I', Moisture: '12.0%', Protein: '13.0%', DON: '270 µg/kg', Microbiology: 'Compliant', Result: 'Approved' },
            { Lot: 'F26327-LIS-T65-12', Product: 'Nacional T65 Panificação 25 kg', Plant: 'Lisbon', Moisture: '14.1%', Protein: '12.0%', DON: '210 µg/kg', Microbiology: 'Compliant', Result: 'Approved' },
            { Lot: 'C26326-TRO-CF-02', Product: 'Nacional Corn Flakes Sem Açúcar', Plant: 'Trofa', Moisture: '2.8%', Protein: '7.4%', DON: '< 100 µg/kg', Microbiology: 'Compliant', Result: 'Approved' },
            { Lot: 'B26326-MAI-AL-03', Product: 'Nacional Bolacha Alfa 200 g', Plant: 'Maia', Moisture: '3.9%', Protein: '7.1%', DON: '< 100 µg/kg', Microbiology: 'Under analysis', Result: 'On hold (pending analysis)' },
            { Lot: 'LT26326-L5-07', Product: 'Adriana Torti 500 g', Plant: 'Litovel', Moisture: '12.3%', Protein: '13.2%', DON: '320 µg/kg', Microbiology: 'Compliant', Result: 'Approved' },
          ] },
      ],
    },
    {
      id: 'consumidor', label: 'Voice of the consumer', icon: 'MessageSquareHeart', blocks: [
        { t: 'kpis', items: [
          k('Consumer Care contacts (YTD)', '6,480', '1,146 complaints', true, true),
          k('Average resolution time', '2.3 days', 'before: 6.8 days', false, true),
          k('Average sentiment (social and contacts)', '+0.46', 'scale −1 to +1', true, true),
          k('Replies drafted by Cortex', '71%', 'reviewed by a person', true, true),
        ] },
        ch('q5', 'Classified complaints by brand (YTD)', 'Per million units sold', 'bar', ['ppm'],
          [{ m: 'Milaneza', ppm: 4.6 }, { m: 'Nacional pasta', ppm: 3.9 }, { m: 'Nacional cereals', ppm: 3.2 }, { m: 'Nacional biscuits', ppm: 5.8 }, { m: 'Del Mondo', ppm: 2.1 }, { m: 'Amiga', ppm: 3.4 }, { m: 'Adriana', ppm: 3.0 }, { m: 'Zátkovy', ppm: 4.4 }],
          'Nacional biscuits have the highest ratio, mainly due to damaged packaging (biscuits broken in transit).',
          'With the new inner tray for Bolacha Alfa (January), the forecast is 4.2 ppm.',
          'Bring the tray changeover forward to December for the 200 g SKUs.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-capa', 'Production-linked complaint cluster', 'humano', '≥ 15 similar complaints in 10 days', 'Issue isolated in 2 days (before: 3 weeks)', [
            ['Signal', '23 "broken pasta" complaints about Milaneza Esparguete 500 g in 9 days.'],
            ['Correlation', 'Lots L26310–L26313 from line L3; dryer moisture above target for 7 shifts.'],
            ['Recommendation', 'Open a CAPA, step up sampling and reply to consumers with a replacement.'],
            ['Human approval', 'Validation by the Quality Director.'],
            ['Action', 'CAPA-26-114 created; 23 personalised replies sent with a replacement voucher.'],
          ], { approver: 'Teresa Antunes — Quality Director', domain: 'Quality', last: 'yesterday 17:40' }),
        ] },
        { t: 'models', items: [
          ml('Complaint classification', 'Cortex AI_CLASSIFY + AI_SENTIMENT', '94% agreement with analysts', 'text, photos, lot, channel', 'Quality', 'Produção', 'Estável', 'Oct 26'),
          ml('Shelf-life prediction (biscuits and cereals)', 'Survival regression', 'Mean error 9 days', 'water activity, fat, packaging, warehouse temperature', 'R&D', 'Piloto', 'Estável', 'Sep 26'),
          ml('Visual packaging inspection', 'Computer vision on line EMB-07', '97.8% recall on defective seals', 'camera images at 120 fps', 'Quality', 'Piloto', 'Estável', 'Nov 26'),
        ] },
      ],
    },
    {
      id: 'certificacoes', label: 'Certifications & audits', icon: 'BadgeCheck', blocks: [
        { t: 'table', title: 'Certifications by industrial centre', sub: 'Status at 23/11/2026', status: ['Status'], span: true,
          columns: ['Centre', 'Standard', 'Result', 'Last audit', 'Next', 'Status'],
          rows: [
            { Centre: 'Maia (pasta and biscuits)', Standard: 'IFS Food v8', Result: 'Higher Level · 97.1%', 'Last audit': 'Mar 26', Next: 'Mar 27', Status: 'Certified' },
            { Centre: 'Trofa (cereals and bars)', Standard: 'IFS Food v8', Result: 'Higher Level · 96.4%', 'Last audit': 'May 26', Next: 'May 27', Status: 'Certified' },
            { Centre: 'Lisbon (milling)', Standard: 'ISO 22000 · FSSC 22000', Result: 'No major non-conformities', 'Last audit': 'Jun 26', Next: 'Jun 27', Status: 'Certified' },
            { Centre: 'Porto (milling)', Standard: 'ISO 22000', Result: '2 minor non-conformities', 'Last audit': 'Sep 26', Next: 'Sep 27', Status: 'In progress (actions)' },
            { Centre: 'Litovel', Standard: 'BRCGS Food Safety v9', Result: 'Grade AA', 'Last audit': 'Apr 26', Next: 'Apr 27', Status: 'Certified' },
            { Centre: 'Venta de Baños', Standard: 'IFS Food v8', Result: 'Higher Level · 95.8%', 'Last audit': 'Jan 26', Next: 'Jan 27', Status: 'Audit in 9 weeks' },
            { Centre: 'Group', Standard: 'ISO 9001 · ISO 14001 · ISO 45001', Result: 'Multi-site', 'Last audit': 'Oct 26', Next: 'Oct 27', Status: 'Certified' },
          ] },
        { t: 'insights', items: [
          { tone: 'warn', title: 'Venta de Baños: IFS audit in 9 weeks', text: 'First audit under Cerealis management. Cortex compared the 41 requirements with current records: 6 have incomplete evidence (mainly allergen control and calibrations).', tag: 'Preparation plan generated' },
          { tone: 'ok', title: 'Evidence collected automatically', text: 'HACCP records, calibrations and training linked in Snowflake: audit preparation time fell from 3 weeks to 4 days.', tag: 'Horizon · lineage' },
        ] },
      ],
    },
  ],
  questions: [
    { q: 'How long does it take to trace a lot?', a: '**4 minutes and 12 seconds** for the full genealogy — from the wheat vessel to the shop — versus 2 working days before Espiga. For lot **L26312-M2L3-03** of Milaneza Esparguete 500 g: **38 destinations, 126 pallets, 9 customers**, with 8 pallets still in transit to Cape Verde.' },
    { q: 'Why have broken-pasta complaints gone up?', a: 'There is a **cluster of 23 complaints in 9 days** about Milaneza Esparguete 500 g, linked to lots **L26310 to L26313 from line L3** at Maia II. The cause is **moisture at the dryer outlet** (7 shifts above target). The dryer has already been corrected, CAPA-26-114 is open and consumers have received a reply with a replacement.' },
    { q: 'Are we ready for the Venta de Baños IFS audit?', a: 'Almost. The audit is **9 weeks** away and Cortex found **6 requirements with incomplete evidence** out of 41 (allergen control and calibrations). The preparation plan already has owners and dates; automatic evidence collection cut preparation from 3 weeks to 4 days.' },
    { q: 'Which brand has the most complaints?', a: 'By ratio, **Nacional biscuits (5.8 ppm)**, mainly due to packaging damaged in transit. Next come Milaneza (4.6 ppm) and Zátkovy (4.4 ppm). Del Mondo has the best result (2.1 ppm).' },
  ],
};
