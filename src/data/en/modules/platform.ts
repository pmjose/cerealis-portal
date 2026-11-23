import type { Module, Model, Agent } from '../../types';
import { k, ch, rows, pie, MONTHS_EN as MONTHS, spark } from '../../gen';
import { GROUP } from '../facts';

export const VALUE_CASES: [string, number, number, string][] = [
  // use case, run-rate value (€M/year), captured YTD (€M), function
  ['Smart buying of durum and soft wheat', 3.4, 2.7, 'Procurement & Grains'],
  ['Pricing, promotions and mix with retailers', 2.6, 1.4, 'Sales'],
  ['Demand forecasting and S&OP', 1.9, 1.3, 'Supply Chain'],
  ['Energy in drying and milling', 1.3, 0.9, 'Operations'],
  ['Optimal wheat blending in milling', 1.1, 0.7, 'Milling'],
  ['Predictive maintenance', 1.0, 0.5, 'Operations'],
  ['Quality and complaints', 0.6, 0.2, 'Quality'],
  ['Automated orders, closing and reporting', 0.5, 0.2, 'Finance · Customer Service'],
];

export function buildIA(models: Model[], agents: Agent[]): Module {
  const prod = models.filter(m => m.status === 'Produção').length;
  const auto = agents.filter(a => a.mode === 'auto').length;
  return {
    slug: 'ia', name: 'AI & Agents Centre', short: 'AI & Agents Centre', icon: 'Sparkles', color: '#29B5E8', group: 'plataforma',
    tagline: 'Machine learning models, Cortex agents and Snowflake Intelligence — value measured case by case',
    owner: 'Ricardo Almeida — Director of Data & AI',
    sources: ['Snowflake Model Registry', 'Cortex Agents', 'Snowflake Intelligence', 'Cortex Search', 'Agent audit log'],
    sections: [
      {
        id: 'geral', label: 'Overview', icon: 'LayoutGrid', blocks: [
          { t: 'kpis', items: [
            k('Value captured in 2026', `€${GROUP.valueYTD.toLocaleString('en-GB')}M`, `run rate: €${GROUP.valueRunRate.toLocaleString('en-GB')}M/year`, true, true, spark(121, 4, 0.6, 0.9)),
            k('ML models', String(models.length), `${prod} in production`, true, true),
            k('Cortex agents', String(agents.length), `${auto} autonomous · ${agents.length - auto} human in the loop`, true, true),
            k('Agent actions in 2026', '1,280', '97.1% not reversed', true, true),
          ] },
          ch('ia1', 'Value by use case (€M)', 'Captured in 2026 vs. annual run-rate value', 'hbar', ['Captured 2026', 'Run rate'],
            VALUE_CASES.map(([m, r, c]) => ({ m, 'Captured 2026': c, 'Run rate': r })),
            'Wheat buying has already captured 79% of its run-rate value; revenue management is halfway there (54%).',
            `Total run-rate value: €${GROUP.valueRunRate.toLocaleString('en-GB')}M/year from H2 2027.`,
            'Accelerate revenue management with the promotional calendars shared by retailers.', { colors: ['#F0A800', '#121210'], height: 300 }),
          ch('ia2', 'Actions executed by agents (per month)', 'Autonomous vs. approved by humans', 'stack', ['Autonomous', 'Human-approved'],
            rows(MONTHS.slice(2), { 'Autonomous': [44, 56, 70, 83, 97, 110, 119, 128, 141, 150], 'Human-approved': [13, 16, 21, 24, 28, 31, 33, 35, 39, 42] }),
            'Action volume has grown 3.4× since January; 22% of actions go through human approval.',
            'Forecast of 230 actions in December with the Venta de Baños agents.',
            'Make the 2 agents with 100% approval over the last 90 days autonomous.'),
          { t: 'insights', items: [
            { tone: 'ok', title: 'Measured trust', text: 'Every agent action is logged with input data, reasoning, approver and outcome — auditable by Quality, Finance and external auditors.', tag: 'Horizon · audit' },
            { tone: 'info', title: 'AI where the data lives', text: 'Models train and run inside Snowflake: no customer, recipe or people data leaves the platform.', tag: 'Snowpark · Cortex' },
            { tone: 'warn', title: 'Drift to watch', text: 'Two models with slight drift (wheat price and B2B churn risk) — retraining scheduled for December.', tag: 'Model Registry' },
          ] },
        ],
      },
      { id: 'modelos', label: 'ML models', icon: 'Cpu', blocks: [{ t: 'models', items: models, title: `Model catalogue · ${models.length} models` }] },
      {
        id: 'agentes', label: 'Agents', icon: 'Bot', blocks: [
          { t: 'table', title: 'Cortex agent catalogue', sub: 'All domains', span: true, status: ['Mode'],
            columns: ['Agent', 'Domain', 'Mode', 'Trigger', 'Impact', 'Last run'],
            rows: agents.map(a => ({ Agent: a.name, Domain: a.domain ?? '—', Mode: a.mode === 'auto' ? 'Autonomous · active' : 'Human in the loop · awaiting approval', Trigger: a.trigger, Impact: a.impact, 'Last run': a.last ?? '—' })) },
        ],
      },
      {
        id: 'intelligence', label: 'Snowflake Intelligence', icon: 'MessageSquare', blocks: [
          { t: 'kpis', items: [
            k('Active users', '214', 'across 3 countries', true, true),
            k('Questions per week', '3,900', '+18% MoM', true, true),
            k('Answers with a verified query', '94%', '412 certified queries', true, true),
            k('Semantic models', '16', 'one per domain', true, true),
          ] },
          ch('ia3', 'Questions by domain (30 days)', 'Espiga Assistant', 'pie', ['v'],
            pie([['Sales', 27], ['Supply Chain', 19], ['Operations', 16], ['Finance', 13], ['Procurement', 9], ['Quality', 7], ['People', 5], ['Other', 4]]),
            'Key account managers are the most active users (questions on sell-out and promotions).',
            'Forecast of 5,000 questions a week in January as access opens to Venta de Baños.',
            'Certify 40 more Venta de Baños queries in Spanish.', { ratio: true }),
          { t: 'table', title: 'Most asked questions this week', sub: 'With a verified query in the semantic model', columns: ['Question', 'Semantic model', 'Users'],
            rows: [
              { Question: 'What is Milaneza’s sell-out at Continente this week?', 'Semantic model': 'SV_COMERCIAL', Users: 38 },
              { Question: 'Which SKUs are at risk of a stock-out?', 'Semantic model': 'SV_SUPPLY', Users: 31 },
              { Question: 'What is Maia II’s OEE today?', 'Semantic model': 'SV_OPERACOES', Users: 27 },
              { Question: 'What is our durum wheat coverage?', 'Semantic model': 'SV_COMPRAS', Users: 19 },
              { Question: 'How much did Adriana sell at Albert?', 'Semantic model': 'SV_CEREALIS_CZ', Users: 14 },
            ] },
        ],
      },
    ],
    questions: [
      { q: 'How much value has AI generated this year?', a: `**€${GROUP.valueYTD.toLocaleString('en-GB')}M** captured in 2026, out of a run-rate value of **€${GROUP.valueRunRate.toLocaleString('en-GB')}M/year**. The largest contribution comes from smart wheat buying (€2.7M), followed by promotions (€1.4M) and demand forecasting (€1.3M).` },
      { q: 'How many agents are active?', a: `**${agents.length} agents**: ${auto} autonomous and ${agents.length - auto} with a human in the loop. They executed **1,280 actions** in 2026, 97.1% of them not reversed. Every action is audited.` },
      { q: 'Which models need retraining?', a: 'Two models with **slight drift**: the wheat price forecast (new Canadian harvest) and the B2B churn risk for bakeries. Retraining is scheduled for December.' },
    ],
  };
}

export const dados: Module = {
  slug: 'dados', name: 'Data & Governance', short: 'Data & Governance', icon: 'Database', color: '#11567F', group: 'plataforma',
  tagline: 'Data products, integration, Snowflake Horizon, architecture and consumption — one platform for all 3 countries',
  owner: 'Ricardo Almeida — Director of Data & AI',
  sources: ['Snowflake Horizon', 'Openflow', 'Snowpipe Streaming', 'Dynamic Tables', 'Account Usage'],
  sections: [
    {
      id: 'produtos', label: 'Data products', icon: 'Boxes', blocks: [
        { t: 'kpis', items: [
          k('Certified data products', '42', '+11 since VB3', true, true),
          k('Internal consumers', '640', 'people and applications', true, true),
          k('Average freshness', '4 min', 'production and quality in real time', false, true),
          k('Data quality tests', '99.2%', 'passed · 2,870 tests/day', true, true),
        ] },
        { t: 'table', title: 'Most used data products', sub: 'Certified, each with a business owner', span: true, bars: ['Quality'], status: ['Status'],
          columns: ['Data product', 'Domain', 'Owner', 'Freshness', 'Consumers', 'Quality', 'Status'],
          rows: [
            { 'Data product': 'Consolidated daily sales (4 companies)', Domain: 'Sales', Owner: 'João Pedro Sá', Freshness: '15 min', Consumers: 188, Quality: 99, Status: 'Certified' },
            { 'Data product': 'Lot genealogy (ship → store)', Domain: 'Quality', Owner: 'Teresa Antunes', Freshness: 'real time', Consumers: 64, Quality: 100, Status: 'Certified' },
            { 'Data product': 'OEE and line events', Domain: 'Operations', Owner: 'Luís Magalhães', Freshness: '1 min', Consumers: 121, Quality: 98, Status: 'Certified' },
            { 'Data product': 'SKU × customer demand forecast', Domain: 'Supply Chain', Owner: 'Carla Vieira', Freshness: 'daily', Consumers: 97, Quality: 97, Status: 'Certified' },
            { 'Data product': 'Grain prices, FX and freight', Domain: 'Procurement', Owner: 'Nuno Ferraz', Freshness: '15 min', Consumers: 22, Quality: 99, Status: 'Certified' },
            { 'Data product': 'Shared sell-out (Sonae MC, JM)', Domain: 'Sales', Owner: 'João Pedro Sá', Freshness: 'daily', Consumers: 73, Quality: 96, Status: 'Certified' },
            { 'Data product': 'People and shifts (masked)', Domain: 'People', Owner: 'Isabel Moura', Freshness: 'hourly', Consumers: 41, Quality: 95, Status: 'Certified' },
            { 'Data product': 'ESRS metrics (CSRD)', Domain: 'ESG', Owner: 'Rita Sampaio', Freshness: 'monthly', Consumers: 18, Quality: 94, Status: 'Under review' },
          ] },
      ],
    },
    {
      id: 'integracao', label: 'Sources & integration', icon: 'Cable', blocks: [
        { t: 'flow', title: 'From source to decision', sub: 'Espiga reference architecture', nodes: [
          { label: 'Sources', value: '31 systems', sub: '3 ERPs, MES, SCADA, LIMS, EDI', status: 'ok' },
          { label: 'Ingestion', value: 'Openflow + Snowpipe', sub: 'CDC and streaming', status: 'ok' },
          { label: 'Bronze → Gold', value: 'Dynamic Tables', sub: '1,240 tables', status: 'ok' },
          { label: 'Semantic layer', value: '16 models', sub: 'semantic views by domain', status: 'ok' },
          { label: 'AI & apps', value: 'Cortex + Streamlit', sub: 'Espiga, agents, Intelligence', status: 'ok' },
        ] },
        { t: 'table', title: 'Connected sources', sub: 'Latency and daily volume', span: true, status: ['Status'],
          columns: ['Source', 'Location', 'Method', 'Latency', 'Volume/day', 'Status'],
          rows: [
            { Source: 'SAP S/4HANA (CPA and CM)', Location: 'Maia', Method: 'Openflow (CDC)', Latency: '< 5 min', 'Volume/day': '38M rows', Status: 'Normal' },
            { Source: 'Helios (Cerealis a.s.)', Location: 'Litovel', Method: 'Openflow (JDBC)', Latency: '15 min', 'Volume/day': '4.1M rows', Status: 'Normal' },
            { Source: 'SAP S/4HANA (VB3)', Location: 'Venta de Baños', Method: 'Openflow (CDC)', Latency: '< 5 min', 'Volume/day': '6.8M rows', Status: 'Normal' },
            { Source: 'MES · 19 pasta lines', Location: 'Maia, Litovel, VdB', Method: 'Snowpipe Streaming', Latency: '< 10 s', 'Volume/day': '410M events', Status: 'Normal' },
            { Source: 'Flour mill SCADA', Location: 'Lisbon and Porto', Method: 'Snowpipe Streaming', Latency: '< 10 s', 'Volume/day': '96M events', Status: 'Normal' },
            { Source: 'LIMS', Location: 'All sites', Method: 'Openflow', Latency: '5 min', 'Volume/day': '18k analyses', Status: 'Normal' },
            { Source: 'EDI (retailers)', Location: 'Group', Method: 'Snowpipe', Latency: '2 min', 'Volume/day': '31k messages', Status: 'Normal' },
            { Source: 'NielsenIQ and Kantar', Location: 'PT · CZ', Method: 'Data Sharing', Latency: 'weekly', 'Volume/day': '—', Status: 'Normal' },
            { Source: 'Euronext, weather, freight', Location: 'Marketplace', Method: 'Data Sharing', Latency: '15 min', 'Volume/day': '—', Status: 'Normal' },
            { Source: 'Energy meters (OT)', Location: '6 sites', Method: 'Snowpipe Streaming', Latency: '1 min', 'Volume/day': '22M readings', Status: 'Attention (Trofa)' },
          ] },
      ],
    },
    {
      id: 'governanca', label: 'Horizon governance', icon: 'ShieldCheck', blocks: [
        { t: 'kpis', items: [
          k('Automatically classified columns', '4,120', 'personal and sensitive data', true, true),
          k('Masking policies', '86', 'GDPR · by role and country', true, true),
          k('Lineage coverage', '100%', 'back to source', true, true),
          k('Access requests (average)', '3 h', 'before: 5 days', false, true),
        ] },
        { t: 'table', title: 'Active policies', sub: 'Snowflake Horizon', span: true, status: ['Status'],
          columns: ['Policy', 'Type', 'Applies to', 'Example', 'Status'],
          rows: [
            { Policy: 'Employee personal data', Type: 'Dynamic masking', 'Applies to': 'People · 41 tables', Example: 'Salary visible only to HR and the direct manager', Status: 'Active' },
            { Policy: 'Access by country', Type: 'Row access policies', 'Applies to': 'Sales, people, finance', Example: 'Litovel sees only CZ/SK data, except group-level roles', Status: 'Active' },
            { Policy: 'Recipes and technical data sheets', Type: 'Tags + masking', 'Applies to': 'R&D · 312 recipes', Example: 'Percentages hidden outside R&D and Quality', Status: 'Active' },
            { Policy: 'Retailer-shared data', Type: 'Sharing agreement', 'Applies to': 'Sonae MC and JM sell-out', Example: 'Use limited to key account management', Status: 'Active' },
            { Policy: 'Consumer data', Type: 'Masking + retention', 'Applies to': 'Consumer Care', Example: 'Contact details deleted after 24 months', Status: 'Active' },
            { Policy: 'Agent actions', Type: 'Audit', 'Applies to': 'All Cortex agents', Example: 'Input, decision, approver and outcome', Status: 'Active' },
          ] },
      ],
    },
    {
      id: 'consumo', label: 'Consumption & FinOps', icon: 'Gauge', blocks: [
        { t: 'kpis', items: [
          k('Monthly consumption', '€38k', '−6% vs. budget', false, true),
          k('Cost per active user', '€59/month', '−12% YoY', false, true),
          k('Warehouses with auto-suspend', '100%', '14 warehouses', true, true),
          k('Platform return', '17×', 'value captured / cost', true, true),
        ] },
        ch('dg1', 'Consumption by domain (€k/month)', 'Warehouses and Cortex services', 'stack', ['Ingestion and transformation', 'BI and Intelligence', 'ML and agents', 'Sharing and other'],
          rows(MONTHS.slice(2), { 'Ingestion and transformation': [11, 12, 12, 15, 15, 16, 15, 15, 16, 16], 'BI and Intelligence': [6, 7, 7, 8, 9, 9, 9, 9, 10, 10], 'ML and agents': [5, 6, 6, 7, 8, 8, 8, 9, 9, 9], 'Sharing and other': [2, 2, 2, 3, 3, 3, 3, 3, 3, 3] }),
          'Consumption rose with the VB3 integration in April and has stabilised at €38k/month.',
          'Forecast of €41k/month in 2027 with the Venta de Baños agents.',
          'Enable the result cache on the executive dashboards (−8% on BI).', { ratio: true, span: true }),
      ],
    },
  ],
  questions: [
    { q: 'How many sources are connected?', a: '**31 systems** across the 3 countries: SAP S/4HANA at Maia and Venta de Baños, Helios at Litovel, MES on 19 pasta lines, the flour mills’ SCADA, LIMS, retailer EDI and Marketplace data. MES and SCADA data arrive in **under 10 seconds**.' },
    { q: 'How is personal data protected?', a: 'With **Snowflake Horizon**: 4,120 automatically classified columns, **86 masking policies** and row access policies by country. For example, salary is visible only to HR and the direct manager, and Litovel only sees data for Czechia and Slovakia.' },
    { q: 'How much does the platform cost?', a: 'About **€38k a month** (−6% against budget), or €59 per active user. With €7.9M of value captured in 2026, the return is about **17×**.' },
  ],
};
