import type { Module } from '../../types';
import { k, ch, ag, ml, pie, spark } from '../../gen';

export const sustentabilidade: Module = {
  slug: 'sustentabilidade', name: 'Sustainability & ESG', short: 'Sustainability & ESG', icon: 'Leaf', color: '#17924B', group: 'funcoes',
  tagline: 'Climate, energy, water, waste, packaging, regenerative agriculture and CSRD reporting · SDGs 3, 8, 12 and 13',
  owner: 'Rita Sampaio — Head of Sustainability',
  sources: ['Energy and water meters', 'SAP (procurement and logistics)', 'Agricultural supplier data', 'Emission factors (Marketplace)', 'TMS · transport emissions'],
  sections: [
    {
      id: 'clima', label: 'Climate & energy', icon: 'CloudSun', blocks: [
        { t: 'kpis', items: [
          k('Scope 1 + 2 emissions (12 months)', '38,400 tCO₂e', '−9% YoY', false, true, spark(71, 42000, 600, -0.09)),
          k('Carbon intensity', '92 kg CO₂e/t', '−11% YoY', false, true),
          k('Renewable electricity', '46%', 'solar PPA + self-consumption', true, true),
          k('Scope 3', '386k tCO₂e', '81% agricultural raw materials', true, false),
        ] },
        ch('es1', 'Scope 1 + 2 emissions trajectory (k tCO₂e)', 'Actual vs. 1.5 °C-aligned target (SBTi)', 'line', ['Actual', 'SBTi target'],
          [{ m: '2021', Actual: 47.9, 'SBTi target': 47.9 }, { m: '2022', Actual: 46.2, 'SBTi target': 45.7 }, { m: '2023', Actual: 44.8, 'SBTi target': 43.5 }, { m: '2024', Actual: 43.1, 'SBTi target': 41.3 }, { m: '2025', Actual: 42.2, 'SBTi target': 39.1 }, { m: '2026E', Actual: 38.4, 'SBTi target': 36.9 }, { m: '2027', 'SBTi target': 34.7 }, { m: '2028', 'SBTi target': 32.5 }, { m: '2030', 'SBTi target': 28.1 }],
          'The gap to target narrowed to 1.5k t in 2026, thanks to heat recovery in Maia and the solar PPA.',
          'With the electrification of the Litovel dryers (2027), the group returns to the SBTi trajectory in 2028.',
          'Go ahead with the industrial heat pump study for the Maia II dryers.', { ratio: true }),
        ch('es2', 'Emissions by scope (12 months)', 'k tCO₂e', 'pie', ['v'],
          pie([['Scope 1 · natural gas (drying, ovens)', 24.6], ['Scope 2 · electricity', 13.8], ['Scope 3 · wheat and semolina', 312.7], ['Scope 3 · packaging', 31.4], ['Scope 3 · transport', 26.9], ['Scope 3 · other', 15.0]]),
          'Wheat accounts for 74% of the total footprint — the biggest lever is in farming, not in the plants.',
          'The Alentejo regenerative wheat programme could cut 9k tCO₂e/year by 2028.',
          'Extend the regenerative programme to durum wheat suppliers in France (Axéréal).', { ratio: true }),
      ],
    },
    {
      id: 'agricultura', label: 'Agriculture & origins', icon: 'Sprout', blocks: [
        { t: 'kpis', items: [
          k('Farmers in the regenerative programme', '38', 'Alentejo · 6,200 ha', true, true),
          k('Emissions reduction per tonne', '−28%', 'regenerative vs. conventional wheat', false, true),
          k('Domestic wheat contracted (2026)', '31,500 t', '+22% YoY', true, true),
          k('Suppliers with primary data', '64%', 'of purchased volume', true, true),
        ] },
        ch('es3', 'Wheat footprint by origin (kg CO₂e/t, delivered)', 'Includes cultivation and transport to the plant', 'hbar', ['Cultivation', 'Transport'],
          [{ m: 'Alentejo · regenerative', Cultivation: 232, Transport: 14 }, { m: 'Alentejo · conventional', Cultivation: 318, Transport: 14 }, { m: 'Beauce (FR)', Cultivation: 334, Transport: 31 }, { m: 'Foggia (IT)', Cultivation: 352, Transport: 46 }, { m: 'Constanța (RO)', Cultivation: 341, Transport: 58 }, { m: 'Saskatchewan (CA)', Cultivation: 356, Transport: 72 }, { m: 'Sonora (MX)', Cultivation: 448, Transport: 96 }],
          'Mexican wheat has the largest footprint (intensive irrigation and freight via Panama).',
          'Replacing 10k t of Mexican wheat with CWAD or domestic wheat cuts 1.4k tCO₂e/year.',
          'Build the carbon footprint into the purchasing optimiser with a shadow price of €80/tCO₂e.', { ratio: true }),
        { t: 'table', title: 'Alentejo regenerative wheat programme', sub: '2025/26 crop year', status: ['Status'],
          columns: ['Practice', 'Area (ha)', 'Farmers', 'Impact', 'Status'],
          rows: [
            { Practice: 'Direct drilling', 'Area (ha)': 4100, Farmers: 29, Impact: '−22% diesel', Status: 'Verified' },
            { Practice: 'Cover crops', 'Area (ha)': 2800, Farmers: 21, Impact: '+0.3 t C/ha in the soil', Status: 'Under verification' },
            { Practice: 'Precision fertilisation', 'Area (ha)': 5200, Farmers: 33, Impact: '−18% nitrogen', Status: 'Verified' },
            { Practice: 'Rotation with legumes', 'Area (ha)': 1900, Farmers: 14, Impact: '−31% mineral nitrogen', Status: 'Verified' },
          ] },
      ],
    },
    {
      id: 'circular', label: 'Water, waste & packaging', icon: 'Recycle', blocks: [
        { t: 'kpis', items: [
          k('Waste recovered', '97.4%', 'bran for animal feed', true, true),
          k('Recyclable packaging', '91%', 'mono-material film on pasta', true, true),
          k('Virgin plastic', '−14%', 'vs. 2024', false, true),
          k('Food donated', '186 t', 'Food Bank and social charities', true, true),
        ] },
        ch('es4', 'Water per tonne produced (m³/t)', 'By industrial centre · 2025 vs. 2026', 'bar', ['2025', '2026'],
          [{ m: 'Maia', '2025': 1.42, '2026': 1.26 }, { m: 'Trofa', '2025': 2.31, '2026': 2.08 }, { m: 'Lisbon', '2025': 0.38, '2026': 0.35 }, { m: 'Porto', '2025': 0.41, '2026': 0.39 }, { m: 'Litovel', '2025': 1.37, '2026': 1.29 }, { m: 'Venta de Baños', '2025': 1.58, '2026': 1.51 }],
          'Trofa uses the most water per tonne (extrusion cleaning); reusing cooling water saved 11%.',
          'Forecast of 1.9 m³/t in Trofa with the new CIP cleaning.',
          'Install line-level metering in Trofa to pinpoint losses (6 meters).', { ratio: true }),
        ch('es5', 'Destination of by-products and waste (t, YTD)', 'Group', 'pie', ['v'],
          pie([['Bran · animal feed', 62400], ['Pasta rejects · animal feed', 3100], ['Cardboard and paper · recycling', 2350], ['Plastic · recycling', 610], ['Food donation', 186], ['Landfill', 1780]]),
          'Bran from milling is sold as animal feed — €6.7M of revenue YTD.',
          'Pasta rejects could move up the value chain as an ingredient for premium animal feed.',
          'Negotiate an annual bran contract indexed to the wheat price.', { ratio: true }),
      ],
    },
    {
      id: 'csrd', label: 'CSRD reporting', icon: 'FileCheck2', blocks: [
        { t: 'kpis', items: [
          k('ESRS data points covered', '92%', '1,046 of 1,137', true, true),
          k('Data with automated lineage', '84%', 'no Excel', true, true),
          k('Reporting effort', '−76%', 'vs. the 2024 report', false, true),
          k('Limited assurance (EY)', 'Ready', 'evidence in Snowflake', true, true),
        ] },
        ch('es6', 'Data coverage by ESRS standard (%)', 'Double materiality 2026', 'hbar', ['Coverage'],
          [{ m: 'G1 · Business conduct', Coverage: 97 }, { m: 'E1 · Climate change', Coverage: 96 }, { m: 'S1 · Own workforce', Coverage: 93 }, { m: 'E3 · Water', Coverage: 91 }, { m: 'E2 · Pollution', Coverage: 88 }, { m: 'E5 · Circular economy', Coverage: 84 }, { m: 'S4 · Consumers', Coverage: 82 }, { m: 'S2 · Workers in the value chain', Coverage: 71 }],
          'The largest gap is in S2 (workers in the value chain), which depends on agricultural supplier data.',
          'With the digital questionnaire sent to the 140 largest suppliers, S2 reaches 88% in March.',
          'Send the supplier questionnaire with automatic collection into Snowflake.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-csrd', 'Sustainability report (CSRD)', 'humano', 'Year-end close or auditor request', '−76% effort · 0 spreadsheets', [
            ['Signal', 'Auditor request for E1 and S1 evidence.'],
            ['Collection', '1,046 ESRS data points calculated with lineage back to the energy invoice or the time-clock record.'],
            ['Drafting', 'Cortex drafts the narrative disclosures (SDGs 3, 8, 12 and 13) with the validated metrics.'],
            ['Human approval', 'Review by Sustainability and the CFO.'],
            ['Action', 'Evidence pack shared with EY via Snowflake Data Sharing.'],
          ], { approver: 'Rita Sampaio — Head of Sustainability', domain: 'ESG', last: '15/11' }),
        ] },
        { t: 'models', items: [
          ml('Carbon footprint per SKU', 'Automated life-cycle assessment', '312 SKUs with a footprint', 'recipe, wheat origin, energy per line, packaging, transport', 'Sustainability', 'Produção', 'Estável', 'Oct 26'),
          ml('Scope 1 + 2 emissions forecast', 'Snowflake ML FORECAST', 'Error 2.8%', 'production plan, energy mix, weather', 'Sustainability', 'Produção', 'Estável', 'Nov 26'),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Are we on the SBTi trajectory?', a: 'Almost: scope 1 + 2 emissions stand at **38.4k tCO₂e (−9% YoY)**, **1.5k t above** the 2026 SBTi target. With the electrification of the Litovel dryers in 2027, the group returns to the trajectory in 2028.' },
    { q: 'Where is most of our footprint?', a: 'In **wheat: 74% of the total footprint** (312.7k tCO₂e). The plants (scopes 1 and 2) account for only 9%. Mexican wheat has the largest footprint (544 kg CO₂e/t delivered) and Alentejo regenerative wheat the smallest (246 kg).' },
    { q: 'Are we ready for the CSRD?', a: 'Yes: **92% of ESRS data points** are covered and 84% have automated lineage. The largest gap is **S2 (71%)**, which depends on agricultural supplier data. Reporting effort has fallen 76% compared with 2024.' },
  ],
};
