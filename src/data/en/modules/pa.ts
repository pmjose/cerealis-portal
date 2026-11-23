import type { Module } from '../../types';
import { k, ch, ag, rows, pie, YTD_EN as YTD, MONTHS_EN as MONTHS, spark } from '../../gen';
import { SALES_2026 } from '../facts';

const split = (f: number) => SALES_2026.pa.map(v => Math.round(v * f * 10) / 10);

export const pa: Module = {
  slug: 'produtos-alimentares', name: 'Food Products', short: 'Food Products', icon: 'ShoppingBasket', color: '#D3122E', group: 'negocio',
  tagline: 'Cerealis Food Products · pasta, breakfast cereals, cereal bars, biscuits and household flours',
  owner: 'Henrique Lobo — General Manager, Food Products',
  sources: ['SAP S/4HANA (CPA)', 'MES Maia and Trofa', 'NielsenIQ', 'Kantar', 'Retailer sell-out (Data Sharing)'],
  sections: [
    {
      id: 'geral', label: 'Overview', icon: 'LayoutGrid', blocks: [
        { t: 'kpis', items: [
          k('Sales YTD', '€126.0M', '+3.0% YoY', true, true, spark(81, 12, 0.5, 0.05)),
          k('EBITDA margin', '11.2%', '+0.6 pp YoY', true, true),
          k('Pasta produced in Maia (YTD)', '79.6k t', 'brand, private label and export', true, true),
          k('Value share in dry pasta', '33.4%', 'Milaneza + Nacional', true, true),
        ] },
        ch('pa1', 'Sales by category (€M)', '2026', 'stack', ['Pasta', 'Cereals and bars', 'Biscuits', 'Household flours'],
          rows(YTD, { Pasta: split(0.626), 'Cereals and bars': split(0.169), Biscuits: split(0.122), 'Household flours': split(0.083) }),
          'Pasta accounts for 63% of the unit; cereals and bars are the fastest-growing category (+8.7%).',
          'December forecast at €12.9M, with the Christmas biscuit campaign.',
          'Step up production of Bolacha Alfa and Torrada in week 48.', { colors: ['#D3122E', '#0A8FD3', '#D99A00', '#8C5A14'] }),
        ch('pa2', 'Sales by brand (YTD)', '% of unit sales', 'pie', ['v'],
          pie([['Nacional', 40], ['Milaneza', 33], ['Private label', 15], ['Amiga (export)', 8], ['Del Mondo', 4]]),
          'Del Mondo already accounts for 4% (€5.0M) and has the highest margin in the unit (44%).',
          'Del Mondo could reach 6% in 2027 with 3 new formats.',
          'Protect private label as capacity fill without exceeding 18% of Maia volume.', { ratio: true }),
      ],
    },
    {
      id: 'massas', label: 'Pasta', icon: 'Wheat', blocks: [
        { t: 'table', title: 'Best-selling pasta SKUs (YTD)', sub: 'Click to open Product 360', span: true, status: ['Trend'], link: { base: '/portal/360/produtos', idCol: 'id' },
          columns: ['SKU', 'Brand', 'Line', 'Sales YTD', 'Volume', 'Gross margin', 'Trend'],
          rows: [
            { id: 'milaneza-esparguete', SKU: 'Milaneza Esparguete 500 g', Brand: 'Milaneza', Line: 'Maia II · L3', 'Sales YTD': '€9.8M', Volume: '5,320 t', 'Gross margin': '39.6%', Trend: 'Attention (broken pasta)' },
            { id: 'milaneza-lacos', SKU: 'Milaneza Laços 500 g', Brand: 'Milaneza', Line: 'Maia I · L1', 'Sales YTD': '€4.1M', Volume: '1,980 t', 'Gross margin': '42.1%', Trend: 'Rising' },
            { id: 'nacional-macarrao', SKU: 'Nacional Macarrão Riscado 500 g', Brand: 'Nacional', Line: 'Maia I · L2', 'Sales YTD': '€3.7M', Volume: '2,140 t', 'Gross margin': '36.8%', Trend: 'Stable' },
            { id: 'delmondo-penne', SKU: 'Del Mondo Penne Rigate 500 g', Brand: 'Del Mondo', Line: 'Maia I · L1', 'Sales YTD': '€1.6M', Volume: '610 t', 'Gross margin': '44.3%', Trend: 'Rising' },
            { id: 'amiga-espirais', SKU: 'Amiga Espirais 500 g', Brand: 'Amiga', Line: 'Maia I · L2', 'Sales YTD': '€2.2M', Volume: '1,670 t', 'Gross margin': '24.9%', Trend: 'Stable' },
          ] },
        ch('pa3', 'Pasta volume by format (t/month)', 'Maia · last 12 months', 'area', ['Long pasta', 'Short pasta', 'Specialities (nests, soup)'],
          rows(MONTHS, { 'Long pasta': [3480, 3820, 3600, 3510, 3740, 3560, 3650, 3420, 3510, 3600, 3780, 3920], 'Short pasta': [3290, 3660, 3410, 3330, 3560, 3380, 3470, 3260, 3340, 3430, 3600, 3730], 'Specialities (nests, soup)': [830, 920, 890, 860, 900, 860, 880, 820, 850, 870, 920, 950] }),
          'October was the highest-volume month of the year in Maia (8,600 t).',
          'December forecast at 9,400 t: Maia II reaches 97% utilisation.',
          'Bring forward 2 long-pasta shifts on Maia II in week 49.', { span: true }),
      ],
    },
    {
      id: 'cereais', label: 'Cereals & bars', icon: 'Sun', blocks: [
        { t: 'kpis', items: [
          k('Cereal and bar sales (YTD)', '€21.3M', '+8.7% YoY', true, true),
          k('Corn Flakes Sem Açúcar', '€2.4M', 'launched in 2025', true, true),
          k('Private-label cereal production', '38%', 'of Trofa volume', true, true),
          k('Extrusion OEE (Trofa)', '76.4%', '92% of rated speed', true, false),
        ] },
        ch('pa4', 'Nacional cereal sales by product (€k/month)', 'Portugal', 'line', ['Corn Flakes Sem Açúcar', 'Classic Corn Flakes', 'Muesli and granola', 'Cereal bars'],
          rows(MONTHS, { 'Corn Flakes Sem Açúcar': [168, 182, 196, 204, 218, 226, 238, 245, 252, 262, 274, 286], 'Classic Corn Flakes': [248, 252, 244, 239, 236, 231, 228, 226, 224, 221, 219, 218], 'Muesli and granola': [131, 138, 142, 139, 144, 146, 148, 145, 149, 152, 155, 158], 'Cereal bars': [236, 249, 251, 244, 252, 260, 268, 278, 262, 255, 266, 272] }),
          'Sem Açúcar overtook the classic version in February; only 31% of its sales come at the expense of the classic.',
          'Sem Açúcar reaches €310k/month in March.',
          'Launch Sem Açúcar in a 750 g family-size pack.'),
        { t: 'agents', items: [
          ag('ag-mdd', 'Private-label cereal proposal', 'humano', 'Retailer request for quotation for a private-label product', 'Margin protected ≥ 18%', [
            ['Signal', 'Lidl request for quotation for private-label chocolate cereals (420 t/year).'],
            ['Calculation', 'Cost per kg including recipe, extruder energy and packaging: €2.11/kg.'],
            ['Recommendation', 'Price of €2.58/kg (18.2% margin), produced on Tuesdays and Wednesdays on shift 3.'],
            ['Human approval', 'Sign-off by the General Manager of Food Products.'],
            ['Action', 'Proposal sent to Lidl with the technical data sheet and production schedule.'],
          ], { approver: 'Henrique Lobo — General Manager, Food Products', domain: 'Food Products', last: '5 days ago' }),
        ] },
      ],
    },
    {
      id: 'bolachas', label: 'Biscuits', icon: 'Cookie', blocks: [
        { t: 'kpis', items: [
          k('Biscuit sales (YTD)', '€15.4M', '+3.4% YoY', true, true),
          k('Gross margin', '28.9%', '−0.7 pp (butter and sugar)', false, false),
          k('Bolacha Alfa', '€4.2M', 'No. 1 in the range', true, true),
          k('Complaints per million units', '5.8 ppm', 'damaged packaging', true, false),
        ] },
        ch('pa5', 'Biscuit ingredient costs (index 2025 = 100)', 'Butter, sugar, oil and flour', 'line', ['Butter', 'Sugar', 'Sunflower oil', 'Flour (in-house)'],
          rows(MONTHS, { Butter: [104, 106, 108, 109, 110, 111, 112, 113, 112, 111, 112, 113], Sugar: [101, 103, 104, 106, 107, 108, 109, 110, 110, 109, 110, 111], 'Sunflower oil': [98, 99, 101, 100, 99, 98, 97, 97, 96, 96, 97, 97], 'Flour (in-house)': [100, 100, 101, 102, 102, 101, 100, 100, 101, 102, 102, 103] }),
          'Butter (+13%) and sugar (+11%) explain the margin loss; in-house flour cushions the impact.',
          'Butter prices are forecast to stabilise in Q1 2027.',
          'Raise biscuit prices by 3% in February and reformulate Alfa with less sugar.', { ratio: true, span: true }),
      ],
    },
  ],
  questions: [
    { q: 'How is the Food Products unit doing?', a: '**€126.0M in sales YTD (+3.0%)** and an EBITDA margin of **11.2%**. Pasta accounts for 63% of the unit; cereals and bars are growing **8.7%** with Corn Flakes Sem Açúcar. Watch out for biscuits: −0.7 pp of margin because of butter and sugar.' },
    { q: 'What is the best-selling SKU?', a: '**Milaneza Esparguete 500 g**: €9.8M YTD, 5,320 t and a 39.6% gross margin. It is flagged for attention because of broken pasta on line L3 at Maia II — already corrected by the drying agent.' },
    { q: 'Is Corn Flakes Sem Açúcar cannibalising the classic version?', a: 'Only slightly: just **31%** of Sem Açúcar sales come from the classic version. Sem Açúcar already sells **€286k/month** (vs. €218k for the classic) and should reach €310k in March.' },
  ],
};
