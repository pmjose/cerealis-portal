import type { Module } from '../../types';
import { k, ch, ag, ml, rows, pie, MONTHS_EN as MONTHS, spark } from '../../gen';

export const moagens: Module = {
  slug: 'moagens', name: 'Cerealis Moagens', short: 'Cerealis Moagens', icon: 'Wheat', color: '#8C5A14', group: 'negocio',
  tagline: 'Wheat and rye flours for bakery, patisserie and food service · Nacional, BIG and Napolitana · Technical Centre',
  owner: 'Fernando Calheiros — General Manager, Cerealis Moagens',
  sources: ['SAP S/4HANA (CM)', 'SCADA Lisbon and Porto', 'Customer Portal', 'WhatsApp Business', 'Technical Centre · CRM'],
  sections: [
    {
      id: 'geral', label: 'Overview', icon: 'LayoutGrid', blocks: [
        { t: 'kpis', items: [
          k('Sales YTD', '€79.6M', '+1.3% YoY', true, true, spark(91, 7.8, 0.3, 0.02)),
          k('Flour sold (YTD)', '181k t', '+0.7% YoY', true, true),
          k('Margin per tonne', '€117/t', '+€9/t YoY', true, true),
          k('Active customers', '2,340', '142 at high risk', true, false),
        ] },
        ch('mo1', 'Flour price vs. wheat cost (€/t)', 'Nacional T65 bakery flour · milling margin', 'area', ['Selling price', 'Wheat cost in flour'],
          rows(MONTHS, { 'Selling price': [376, 378, 380, 383, 386, 386, 386, 386, 388, 391, 394, 397], 'Wheat cost in flour': [268, 270, 272, 276, 279, 276, 273, 271, 273, 276, 278, 280] }),
          'The milling margin rose from €108 to €117/t thanks to the optimal wheat blend and better returns on bran.',
          'With soft wheat up 1.8%, the margin falls to €113/t in January without a price adjustment.',
          'Update the industrial flour price list by +1.5% on 1 January.', { ratio: true }),
        ch('mo2', 'Volume by segment (YTD)', '% of tonnes', 'pie', ['v'],
          pie([['Industrial bakery', 41], ['Traditional bakery', 29], ['Patisserie', 11], ['Food service and pizzerias', 8], ['Food industry', 7], ['Cash & Carry', 4]]),
          'Pizzerias are the fastest-growing segment (+19%) thanks to Napolitana T00.',
          'Traditional bakery is losing 2% a year as small bakeries close.',
          'Offer traditional bakeries the "sourdough + Technical Centre" package to build loyalty.', { ratio: true }),
      ],
    },
    {
      id: 'clientes', label: 'Bakery customers', icon: 'Store', blocks: [
        ch('mo3', 'Customers by churn risk level', 'Cortex model · 2,340 active customers', 'bar', ['Customers'],
          [{ m: 'Low risk', Customers: 1712 }, { m: 'Medium risk', Customers: 486 }, { m: 'High risk', Customers: 142 }],
          '142 high-risk bakeries are worth €7.3M a year. Main signal: order frequency down 30% over 8 weeks.',
          'Without action, 38% of high-risk bakeries will leave in the next 6 months (€2.8M).',
          'Technical Centre visits to the 40 highest-value bakeries, with a Napolitana proposal.', { ratio: true, model: 'B2B churn risk · AUC 0.84' }),
        { t: 'agents', items: [
          ag('ag-retencao', 'At-risk bakery retention', 'humano', 'Churn risk > 0.7 for a customer worth more than €0.5M/year', '€2.1M retained in 2026', [
            ['Signal', 'Panificação Douro: order frequency −22% and a request for quotation sent to a competitor.'],
            ['Diagnosis', 'Price 2.1% above market on T65 and 2 complaints about flour strength (W) in October.'],
            ['Recommendation', 'Technical visit with a baking trial, a 1.2% price adjustment and a 12-month contract.'],
            ['Human approval', 'Sign-off by the General Manager of Moagens.'],
            ['Action', 'Visit booked at the Technical Centre and proposal sent to the customer.'],
          ], { approver: 'Fernando Calheiros — General Manager, Cerealis Moagens', domain: 'Moagens', last: 'yesterday' }),
        ] },
        { t: 'table', title: 'Highest-value high-risk customers', sub: 'Action recommended by Cortex', span: true, status: ['Risk'],
          columns: ['Customer', 'Region', 'Sales 12M', 'Change in frequency', 'Main signal', 'Risk'],
          rows: [
            { Customer: 'Panificação Douro, S.A.', Region: 'Greater Porto', 'Sales 12M': '€5.6M', 'Change in frequency': '−22%', 'Main signal': 'Quotation requested from a competitor', Risk: 'High' },
            { Customer: 'Padarias Ribatejo, Lda.', Region: 'Santarém', 'Sales 12M': '€0.9M', 'Change in frequency': '−34%', 'Main signal': 'Complaint about flour strength', Risk: 'High' },
            { Customer: 'Forno Lusitano', Region: 'Greater Lisbon', 'Sales 12M': '€0.7M', 'Change in frequency': '−29%', 'Main signal': 'Late payments', Risk: 'High' },
            { Customer: 'Pastelaria Real Bakery Group', Region: 'Lisbon and Setúbal', 'Sales 12M': '€0.6M', 'Change in frequency': '−18%', 'Main signal': 'New head of production', Risk: 'Medium' },
            { Customer: 'Pizzarias Forno di Napoli (12 stores)', Region: 'Porto and Braga', 'Sales 12M': '€0.4M', 'Change in frequency': '+41%', 'Main signal': 'Growth with Napolitana T00', Risk: 'Low' },
          ] },
      ],
    },
    {
      id: 'centro-tecnico', label: 'Technical Centre', icon: 'ChefHat', blocks: [
        { t: 'kpis', items: [
          k('Training sessions and demos (YTD)', '184', '+26% YoY', true, true),
          k('Professionals trained', '1,460', 'bakers, pastry chefs, pizza makers', true, true),
          k('Conversion to new products', '37%', 'after a demonstration', true, true),
          k('Training NPS', '+71', '+6 YoY', true, true),
        ] },
        ch('mo4', 'Training sessions by topic (YTD)', 'Cerealis Technical Centre · Lisbon', 'hbar', ['Sessions'],
          [{ m: 'Neapolitan pizza (T00)', Sessions: 46 }, { m: 'Sourdough and slow fermentation', Sessions: 38 }, { m: 'Retarding and freezing', Sessions: 31 }, { m: 'Portuguese patisserie', Sessions: 27 }, { m: 'Rye and mixed-flour bread', Sessions: 22 }, { m: 'Food safety', Sessions: 20 }],
          'Pizza courses sell out 3 weeks in advance and generate 41% of new Napolitana accounts.',
          'Forecast demand of 60 pizza sessions in 2027.',
          'Open a second training room in Porto (Freixo) for the North.', { ratio: true, span: true }),
      ],
    },
    {
      id: 'portefolio', label: 'Portfolio', icon: 'Package', blocks: [
        { t: 'table', title: 'Flour portfolio (YTD)', sub: 'Industrial and professional', span: true,
          columns: ['Product', 'Brand', 'Mill', 'Volume', 'Average price', 'Margin/t', 'YoY growth'],
          rows: [
            { Product: 'T65 bakery flour, 25 kg and bulk', Brand: 'Nacional', Mill: 'Lisbon · Porto', Volume: '96,400 t', 'Average price': '€384/t', 'Margin/t': '€112', 'YoY growth': '+0.4%' },
            { Product: 'T55 patisserie flour', Brand: 'Nacional', Mill: 'Lisbon', Volume: '31,800 t', 'Average price': '€400/t', 'Margin/t': '€124', 'YoY growth': '+1.2%' },
            { Product: 'Strong flours W 300+', Brand: 'BIG', Mill: 'Lisbon', Volume: '24,100 t', 'Average price': '€414/t', 'Margin/t': '€131', 'YoY growth': '+2.6%' },
            { Product: 'T00 pizza flour 10 kg', Brand: 'Napolitana', Mill: 'Lisbon', Volume: '6,900 t', 'Average price': '€588/t', 'Margin/t': '€244', 'YoY growth': '+19.4%' },
            { Product: 'Fine durum wheat semolina', Brand: 'Napolitana', Mill: 'Maia (semolina mill)', Volume: '2,300 t', 'Average price': '€562/t', 'Margin/t': '€201', 'YoY growth': '+11.0%' },
            { Product: 'Rye and mixed flour', Brand: 'Nacional', Mill: 'Porto', Volume: '12,600 t', 'Average price': '€368/t', 'Margin/t': '€97', 'YoY growth': '−1.8%' },
            { Product: 'Composite flours and premixes', Brand: 'Nacional', Mill: 'Lisbon', Volume: '6,900 t', 'Average price': '€476/t', 'Margin/t': '€162', 'YoY growth': '+4.1%' },
          ] },
        { t: 'models', items: [
          ml('Next best offer for bakeries', 'Recommendation · collaborative filtering', '+14% cross-selling', 'purchase history, bakery type, region, training sessions attended', 'Moagens', 'Produção', 'Estável', 'Oct 26', '€0.6M/year'),
          ml('Bulk tanker route optimiser', 'Routing with time windows', '−11% km per tonne', 'orders, customer silos, traffic', 'Logistics', 'Piloto', 'Estável', 'Nov 26'),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'How is the milling margin doing?', a: 'The margin per tonne stands at **€117/t (+€9/t YoY)**, thanks to the optimal wheat blend and better returns on bran. With soft wheat +1.8% in October, it falls to **€113/t in January** without an adjustment — Cortex recommends +1.5% on the price list on 1 January.' },
    { q: 'Which bakeries are at risk?', a: '**142 customers at high risk** (€7.3M/year). The largest is **Panificação Douro** (€5.6M over 12 months, frequency −22%, requested a quotation from a competitor). The retention agent proposed a technical visit, a 1.2% price adjustment and a 12-month contract.' },
    { q: 'How is Napolitana doing?', a: '**Napolitana T00** is growing **19.4%** (6,900 t YTD) with the highest margin in the portfolio (**€244/t**). The Technical Centre pizza courses generate 41% of new accounts. The 1 kg consumer pack is due to launch in January 2027.' },
  ],
};
