import type { Module } from '../../types';
import { k, ch, ag, ml, rows, MONTHS_EN as MONTHS, WEEKS_EN as WEEKS, spark } from '../../gen';
import { plantPoints } from '../facts';

export const operacoes: Module = {
  slug: 'operacoes', name: 'Industrial Operations', short: 'Industrial Operations', icon: 'Factory', color: '#121210', group: 'funcoes',
  tagline: '10 plants · flour mills, semolina mill, pasta, cereals, bars and biscuits · OEE, energy and maintenance',
  owner: 'Luís Magalhães — Industrial Operations Director',
  sources: ['MES (pasta lines)', 'SCADA flour mills', 'Bühler Insights', 'SAP PM', 'Energy meters', 'OMIE (Marketplace)', 'LIMS'],
  sections: [
    {
      id: 'fabricas', label: 'Plant overview', icon: 'Map', blocks: [
        { t: 'kpis', items: [
          k('Group OEE', '78.6%', '+3.4 pp YoY', true, true, spark(12, 75, 1, 0.04)),
          k('Production YTD', '402k t', 'pasta, flours, cereals, biscuits', true, true),
          k('Unplanned downtime', '-31%', 'vs. 2025', false, true),
          k('Energy per tonne of pasta', '418 kWh/t', '-7% YoY', false, true, spark(14, 449, 6, -0.07)),
        ] },
        { t: 'map', title: 'Industrial sites — real-time status', points: plantPoints, height: 420 },
        ch('op1', 'OEE by industrial site (%)', 'October · target 80%', 'bar', ['OEE', 'Target'],
          [{ m: 'Lisbon', OEE: 83.1, Target: 80 }, { m: 'Maia', OEE: 81.2, Target: 80 }, { m: 'Porto', OEE: 79.8, Target: 80 }, { m: 'Litovel', OEE: 77.9, Target: 80 }, { m: 'Trofa', OEE: 76.4, Target: 80 }, { m: 'Venta de Baños', OEE: 72.5, Target: 78 }],
          'Venta de Baños is the biggest opportunity: 2.1 h per shift lost to format changeovers, twice the figure at Maia.',
          'With Maia’s SMED practices, Venta de Baños reaches 77% in March.',
          'Send the Maia II SMED team to Venta de Baños in January (2 weeks).', { ratio: true }),
        ch('op2', 'OEE losses by cause (hours)', 'October · all lines', 'hbar', ['Hours'],
          [{ m: 'Format changeover', Hours: 312 }, { m: 'Unplanned downtime', Hours: 214 }, { m: 'Minor stops', Hours: 188 }, { m: 'Reduced speed', Hours: 141 }, { m: 'Quality (broken pasta)', Hours: 96 }, { m: 'Material shortage', Hours: 52 }],
          'Format changeovers account for 31% of losses; 62% of them happen at Venta de Baños and Litovel.',
          'Sequencing formats by family (short → long) cuts changeover time by 18%.',
          'Activate the Cortex production sequencer on the 4 Venta de Baños lines.', { ratio: true }),
      ],
    },
    {
      id: 'oee', label: 'OEE & lines', icon: 'Gauge', blocks: [
        ch('op3', 'Group OEE vs. target (%)', 'Last 12 months', 'area', ['OEE', 'Target'],
          rows(MONTHS, { OEE: [75.1, 74.6, 75.4, 76.0, 76.3, 74.9, 76.8, 77.2, 77.5, 77.9, 78.3, 78.6], Target: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80] }),
          'Bringing Venta de Baños into the group in April lowered group OEE by 1.4 pp; without that site, OEE would be 80.1%.',
          'Forecast of 79.4% in December, with the production peak.',
          'Set the Venta de Baños target at 78% for 2027 and 82% for 2028.', { ratio: true, span: true }),
        { t: 'heat', title: 'OEE by line and week (%)', sub: 'Weeks 36 to 47', span: true,
          rows: ['Maia I · L1 short pasta', 'Maia I · L2 short pasta', 'Maia II · L3 long pasta', 'Maia II · L4 long pasta', 'Trofa · extrusion', 'Maia · biscuits', 'Litovel · L5', 'Venta de Baños · L2'],
          cols: WEEKS, values: [
            [82, 83, 81, 84, 85, 83, 84, 82, 85, 84, 83, 84], [80, 79, 82, 81, 80, 83, 82, 81, 80, 82, 83, 82], [84, 83, 85, 82, 80, 78, 77, 79, 76, 74, 75, 72], [81, 82, 80, 83, 82, 84, 83, 85, 84, 83, 84, 85],
            [73, 74, 76, 75, 77, 76, 78, 77, 76, 78, 77, 79], [79, 80, 78, 81, 80, 79, 82, 81, 80, 83, 82, 81], [78, 79, 80, 79, 81, 80, 79, 82, 81, 80, 82, 81], [68, 69, 70, 71, 70, 72, 71, 73, 72, 74, 73, 74]] },
        { t: 'table', title: 'Lines with deviations', sub: 'Cortex anomaly detection · last 24 h', span: true, status: ['Status'], link: { base: '/portal/360/ativos', idCol: 'Asset' },
          columns: ['Asset', 'Line', 'Signal', 'Impact', 'Status'],
          rows: [
            { Asset: 'MAI-M2-L3', Line: 'Maia II · long pasta L3', Signal: 'Dryer outlet moisture 12.6% (target 12.2%)', Impact: 'Risk of broken pasta', Status: 'Attention' },
            { Asset: 'LIS-MOI-B3', Line: 'Lisbon · mill B3', Signal: 'Roll vibration +38% in 9 days', Impact: 'Downtime expected in 6 days', Status: 'Critical' },
            { Asset: 'VDB-L2', Line: 'Venta de Baños · L2', Signal: 'Format changeovers 2.1 h/shift', Impact: '-6 pp OEE', Status: 'Attention' },
            { Asset: 'TRO-EXT-01', Line: 'Trofa · extrusion', Signal: 'Screw torque stable', Impact: '—', Status: 'Normal' },
          ] },
        ch('op4', 'Broken pasta in Milaneza Esparguete (%)', 'Line L3 · per week', 'line', ['Broken pasta', 'Limit'],
          rows(WEEKS, { 'Broken pasta': [0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.3, 1.2, 1.4, 1.6, 1.5, 1.8], 'Limit': [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5] }),
          'Broken pasta has doubled since week 40; the model links 74% of the variation to dryer outlet moisture and ambient humidity.',
          'Without correction, it exceeds 2% in week 49 — with consumer complaints 10 days later.',
          'Adjust the zone 3 drying profile (−2 °C, +4% relative humidity).', { ratio: true, model: 'Predictive quality · long pasta drying' }),
        { t: 'agents', items: [
          ag('ag-sec', 'Drying profile correction', 'auto', 'Outlet moisture off target for > 45 min', 'Broken pasta −0.6 pp · €46k/month', [
            ['Signal', 'L3 dryer outlet moisture at 12.6% (target 12.2%) for 52 minutes.'],
            ['Diagnosis', 'Ambient humidity at Maia at 91% and dryer zone 3 running 2 °C above standard.'],
            ['Action', 'New setpoint sent to the MES within the window validated by Quality (zone 3: 82 °C).'],
            ['Verification', 'Moisture back to normal (12.2%) in 38 minutes; logged in the lot history.'],
          ], { domain: 'Operations', last: 'today 06:20' }),
        ] },
      ],
    },
    {
      id: 'moagem', label: 'Milling & semolina', icon: 'Wheat', blocks: [
        { t: 'kpis', items: [
          k('Extraction rate · soft wheat (Lisbon)', '77.4%', '+0.8 pp YoY', true, true),
          k('Extraction rate · rye (Porto)', '71.8%', '+0.6 pp vs. plan', true, true),
          k('Semolina mill yield (Maia)', '68.9%', '+0.4 pp', true, true),
          k('Wheat blend cost', '€226/t', '-€3.2/t vs. manual', false, true),
        ] },
        ch('op5', 'Flour extraction rate (%)', 'Lisbon and Porto flour mills', 'line', ['Lisbon', 'Porto', 'Target'],
          rows(MONTHS, { Lisbon: [76.4, 76.5, 76.6, 76.8, 76.7, 76.9, 77.0, 77.1, 77.2, 77.3, 77.3, 77.4], Porto: [75.4, 75.5, 75.3, 75.6, 75.8, 75.7, 75.9, 76.0, 75.9, 76.1, 76.0, 76.1], Target: [77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77] }),
          'Each 0.1 pp of extraction in Lisbon is worth €0.13M a year; the 2026 gain comes from roll tuning and the optimised blend.',
          'Lisbon reaches 77.6% in January if roll B3 is replaced in time.',
          'Approve the intervention on mill B3 during Sunday’s shutdown.', { ratio: true }),
        ch('op9', 'Current wheat blend · T65 flour (Lisbon)', '% by origin · set by the optimiser', 'pie', ['v'],
          [{ m: 'Beauce (France)', v: 40 }, { m: 'Constanța (Romania)', v: 35 }, { m: 'Castile and León (Spain)', v: 15 }, { m: 'Alentejo (Portugal)', v: 10 }],
          'The current blend meets W 245 and 12.0% protein at the minimum cost of €226/t.',
          'With the MV Black Sea Pearl (28/11), the optimiser raises Romanian wheat to 40% in December.',
          'Validate the new December blend in the Technical Centre baking trial.', { ratio: true }),
        { t: 'scenario', title: 'Optimal blend for Nacional T65 flour · Bakery', sub: 'Snowpark optimiser: minimum cost while meeting the specification (W 230–260, P/L 0.6–0.9, protein ≥ 11.5%)',
          inputs: [
            { id: 'fr', label: 'French wheat (Beauce)', min: 0, max: 70, step: 5, value: 40, unit: '%' },
            { id: 'ro', label: 'Romanian wheat (Constanța)', min: 0, max: 70, step: 5, value: 35, unit: '%' },
            { id: 'es', label: 'Castile and León wheat', min: 0, max: 40, step: 5, value: 15, unit: '%' },
          ],
          outputs: [
            { label: 'Estimated protein', calc: v => { const pt = Math.max(0, 100 - v.fr - v.ro - v.es); return (v.fr * 11.9 + v.ro * 12.4 + v.es * 11.2 + pt * 12.8) / 100; }, fmt: n => `${n.toLocaleString('en-GB', { maximumFractionDigits: 2 })}%`, good: n => n >= 11.5 },
            { label: 'Estimated strength (W)', calc: v => { const pt = Math.max(0, 100 - v.fr - v.ro - v.es); return (v.fr * 235 + v.ro * 255 + v.es * 205 + pt * 270) / 100; }, fmt: n => `W ${Math.round(n)}`, good: n => n >= 230 && n <= 260 },
            { label: 'Blend cost', calc: v => { const pt = Math.max(0, 100 - v.fr - v.ro - v.es); return (v.fr * 227 + v.ro * 221 + v.es * 219 + pt * 241) / 100; }, fmt: n => `€${n.toLocaleString('en-GB', { maximumFractionDigits: 1 })}/t` },
          ], note: 'The remainder up to 100% is Alentejo wheat. Current Cortex optimum: 40% FR · 35% RO · 15% ES · 10% PT.' },
        { t: 'models', items: [
          ml('Wheat blend optimiser', 'Linear programming · Snowpark', '-€3.2/t vs. manual blend', 'LIMS lot analyses, stock by silo, price, customer specification', 'Moagens', 'Produção', 'Estável', 'Nov 26', '€1.1M/year'),
          ml('Extraction forecast', 'Regression · gradient boosting', 'Error 0.12 pp', 'moisture, hardness, specific weight, roll setting', 'Moagens', 'Produção', 'Estável', 'Oct 26'),
          ml('In-line flour quality (NIR)', 'PLS regression on NIR spectra', 'R² 0.93 (protein and ash)', 'NIR spectra every 2 min', 'Quality', 'Piloto', 'Estável', 'Oct 26'),
        ] },
      ],
    },
    {
      id: 'energia', label: 'Energy', icon: 'Zap', blocks: [
        { t: 'kpis', items: [
          k('Energy bill 2026E', '€13.8M', '-€1.3M vs. 2025', false, true),
          k('Electricity per tonne of flour', '88 kWh/t', '-5% YoY', false, true),
          k('Gas per tonne of pasta', '61 m³/t', '-8% YoY', false, true),
          k('Solar self-consumption (Maia and Trofa)', '14%', '2.9 MWp installed', true, true),
        ] },
        ch('op6', 'Forecast consumption vs. OMIE price (tomorrow)', 'Lisbon flour mill · hour by hour', 'combo', ['Consumption (MWh)', 'OMIE price (€/MWh)'],
          Array.from({ length: 24 }, (_, h) => ({ m: `${String(h).padStart(2, '0')}:00`, 'Consumption (MWh)': [2.9, 3.0, 3.0, 3.0, 3.0, 2.9, 2.6, 2.1, 1.8, 1.7, 1.6, 1.6, 1.7, 1.8, 1.9, 2.0, 2.0, 2.1, 1.7, 1.5, 1.5, 1.9, 2.6, 2.8][h], 'OMIE price (€/MWh)': [62, 58, 55, 54, 53, 56, 71, 92, 104, 88, 61, 42, 38, 36, 41, 55, 79, 108, 126, 131, 118, 96, 81, 70][h] })),
          'The plan shifts 62% of mill consumption to off-peak hours and the solar peak (11:00–15:00), saving €1,870 tomorrow.',
          'Forecast annual savings from load shifting: €0.48M in Lisbon and Porto.',
          'Apply the same scheduling to the Maia II pasta dryers (3 h thermal inertia).', { ratio: true, height: 260, model: 'Load optimisation · OMIE + production forecast', span: true }),
        ch('op7', 'Energy intensity by plant (kWh/t)', 'October vs. 2025', 'bar', ['2025', '2026'],
          [{ m: 'Lisbon (milling)', '2025': 93, '2026': 88 }, { m: 'Porto (milling)', '2025': 101, '2026': 96 }, { m: 'Maia (pasta)', '2025': 448, '2026': 412 }, { m: 'Litovel (pasta)', '2025': 421, '2026': 398 }, { m: 'Venta de Baños', '2025': 452, '2026': 436 }, { m: 'Trofa (cereals)', '2025': 741, '2026': 688 }],
          'Every plant has cut its intensity; Maia leads thanks to heat recovery from the dryers.',
          'Replicating heat recovery at Venta de Baños saves 31 kWh/t.',
          'Include Venta de Baños heat recovery in the 2027 investment plan (€0.9M, 2.6-year payback).', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-omie', 'Load shifting to cheaper hours', 'auto', 'Day-ahead OMIE prices published (12:00)', '€0.48M/year', [
            ['Signal', 'OMIE has published tomorrow’s prices: peak of €131/MWh at 19:00.'],
            ['Optimisation', 'Milling plan rescheduled while respecting flour silos and shipments.'],
            ['Action', 'New hourly plan sent to the Lisbon mill SCADA and the shift supervisor.'],
          ], { domain: 'Energy', last: 'today 12:04' }),
        ] },
      ],
    },
    {
      id: 'manutencao', label: 'Predictive maintenance', icon: 'Wrench', blocks: [
        { t: 'kpis', items: [
          k('Monitored assets', '1,940', '18,400 sensors', true, true),
          k('Pasta line MTBF', '212 h', '+27% YoY', true, true),
          k('Predictive work orders', '41%', 'of all orders', true, true),
          k('Open critical alerts', '1', 'Lisbon mill B3', true, false),
        ] },
        { t: 'table', title: 'Critical asset health', sub: 'Health score and remaining useful life (Cortex ML)', bars: ['Health'], status: ['Status'], link: { base: '/portal/360/ativos', idCol: 'Asset' }, span: true,
          columns: ['Asset', 'Equipment', 'Plant', 'Health', 'Remaining useful life', 'Status'],
          rows: [
            { Asset: 'LIS-MOI-B3', Equipment: 'Roller mill B3', Plant: 'Lisbon', 'Health': 58, 'Remaining useful life': '6 days (roll)', Status: 'Critical' },
            { Asset: 'VDB-L2', Equipment: 'Short pasta line L2', Plant: 'Venta de Baños', 'Health': 66, 'Remaining useful life': '5 weeks (die)', Status: 'Attention' },
            { Asset: 'MAI-M2-L3', Equipment: 'Long pasta line L3', Plant: 'Maia II', 'Health': 71, 'Remaining useful life': '3 weeks (fan)', Status: 'Attention' },
            { Asset: 'POR-MOI-C1', Equipment: 'Rye mill C1', Plant: 'Porto', 'Health': 79, 'Remaining useful life': '4 months', Status: 'Normal' },
            { Asset: 'MAI-BOL-F1', Equipment: 'Biscuit tunnel oven', Plant: 'Maia', 'Health': 82, 'Remaining useful life': '7 months', Status: 'Normal' },
            { Asset: 'TRO-EXT-01', Equipment: 'Cereal extruder', Plant: 'Trofa', 'Health': 88, 'Remaining useful life': '11 months', Status: 'Normal' },
            { Asset: 'LIT-L5', Equipment: 'Short pasta line L5', Plant: 'Litovel', 'Health': 91, 'Remaining useful life': '14 months', Status: 'Normal' },
            { Asset: 'LIS-SIL', Equipment: 'Silo bank (27,000 t)', Plant: 'Lisbon', 'Health': 94, 'Remaining useful life': '—', Status: 'Normal' },
          ] },
        ch('op8', 'Roll B3 vibration · Lisbon mill (mm/s)', 'Daily RMS vs. ISO 10816 limit', 'area', ['Vibration', 'Alarm limit'],
          rows(['10/11', '11/11', '12/11', '13/11', '14/11', '15/11', '16/11', '17/11', '18/11', '19/11', '20/11', '21/11'], { 'Vibration': [2.9, 3.0, 3.0, 3.1, 3.3, 3.4, 3.6, 3.7, 3.9, 4.0, 4.1, 4.0], 'Alarm limit': [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5] }),
          'Vibration has risen 38% in 9 days, with a wear signature on the non-drive-end bearing.',
          'The alarm limit will be reached in 6 days (81% probability).',
          'Replace the bearing during Sunday’s shutdown (4 h) — parts in stock at the Lisbon warehouse.', { ratio: true, model: 'Anomaly detection · Snowflake ML ANOMALY_DETECTION' }),
        { t: 'agents', items: [
          ag('ag-b3', 'Predictive intervention on mill B3', 'humano', 'Remaining useful life < 7 days on a critical asset', 'Avoids 26 h of downtime · €118k', [
            ['Signal', 'Roll B3 vibration +38% in 9 days (4.0 mm/s).'],
            ['Diagnosis', 'Wear on the non-drive-end bearing; remaining useful life of 6 days.'],
            ['Recommendation', 'Replacement during Sunday’s shutdown (4 h); 2 technicians and an SKF bearing in stock.'],
            ['Human approval', 'Confirmation by the Lisbon Maintenance Manager.'],
            ['Action', 'Work order 4100082 created in SAP PM, parts reserved and team scheduled.'],
          ], { approver: 'Joaquim Pires — Maintenance Manager, Lisbon', domain: 'Maintenance', last: '1 h ago' }),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Which plant has the worst OEE, and why?', a: '**Venta de Baños: 72.5%** (target: 78%). The main cause is **format changeovers (2.1 h per shift)**, twice the figure at Maia. Cortex recommends bringing in the Maia II SMED team in January and activating the format sequencer — forecast OEE of **77% in March**.' },
    { q: 'Is there any downtime risk this week?', a: 'Yes: **Lisbon mill B3** shows vibration **+38% in 9 days** and a remaining useful life of **6 days**. The agent has proposed replacing the bearing during Sunday’s shutdown (4 h, parts in stock) and is awaiting confirmation from Joaquim Pires.\n• Without intervention: an estimated 26 h of downtime (€118k)' },
    { q: 'How much have we saved on energy?', a: 'The 2026 energy bill is forecast at **€13.8M (−€1.3M vs. 2025)**. Pasta uses **418 kWh/t (−7%)** and shifting milling load to cheaper hours is worth **€0.48M a year**.' },
    { q: 'Why is broken pasta increasing?', a: 'On **line L3 at Maia II**, broken pasta has risen from 0.8% to **1.8%** since week 40. 74% of the variation is explained by **dryer outlet moisture** and ambient humidity. The agent has already corrected the zone 3 setpoint and moisture returned to normal within 38 minutes.' },
  ],
};
