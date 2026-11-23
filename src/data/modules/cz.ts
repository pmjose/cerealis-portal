import type { Module } from '../types';
import { k, ch, ag, rows, pie, MONTHS, WEEKS, spark } from '../gen';

export const cz: Module = {
  slug: 'cerealis-cz', name: 'Cerealis a.s. · Chéquia & Eslováquia', short: 'Cerealis a.s. (CZ/SK)', icon: 'Castle', color: '#121210', group: 'negocio',
  tagline: 'Ex-Europasta · fábrica de Litovel (5 linhas, 100 000 t/ano) · Adriana, Zátkovy, Rosické e Ideál',
  owner: 'Tomáš Novák — Generální ředitel, Cerealis a.s.',
  sources: ['Helios (ERP Litovel)', 'MES Litovel', 'NielsenIQ CZ/SK', 'Sell-out Albert e Kaufland', 'ČHMÚ · hidrologia'],
  sections: [
    {
      id: 'geral', label: 'Visão geral', icon: 'LayoutGrid', blocks: [
        { t: 'kpis', items: [
          k('Vendas YTD', '€61,4 M', '+4,6% a/a', true, true, spark(101, 6, 0.2, 0.05)),
          k('Volume YTD', '55,0 mil t', '+3,1% a/a', true, true),
          k('Margem EBITDA', '10,4%', '+0,8 pp a/a', true, true),
          k('Câmbio médio', '24,9 CZK/EUR', 'coroa +1,2% a/a', false, true),
        ] },
        ch('cz1', 'Vendas por marca (YTD)', '% das vendas da Cerealis a.s.', 'pie', ['v'],
          pie([['Adriana', 34], ['Zátkovy', 27], ['Rosické', 14], ['Ideál (Eslováquia)', 13], ['Marca do distribuidor', 12]]),
          'A Adriana (100% sêmola) é a marca que mais cresce (+14% em volume) e já é a maior da unidade.',
          'A Adriana pode chegar a 38% das vendas da unidade em 2027.',
          'Levar a Adriana Bronze à Hungria e à Roménia no 2.º trimestre.', { ratio: true }),
        ch('cz2', 'Vendas por cliente (€ M, YTD)', 'Chéquia e Eslováquia', 'hbar', ['Vendas'],
          [{ m: 'Albert', Vendas: 9.8 }, { m: 'Kaufland', Vendas: 8.6 }, { m: 'Eslováquia (vários)', Vendas: 7.9 }, { m: 'Lidl Česko', Vendas: 7.2 }, { m: 'Tesco', Vendas: 5.9 }, { m: 'Billa', Vendas: 5.1 }, { m: 'Penny', Vendas: 4.4 }, { m: 'Globus', Vendas: 3.0 }, { m: 'Outros e HoReCa', Vendas: 9.5 }],
          'O Albert lidera, com a Adriana em topo de gôndola em 120 lojas.',
          'A nova loja do Kaufland em Brno acrescenta €0,3 M por ano.',
          'Propor ao Billa a gama Zátkovy em embalagem de 1 kg.'),
      ],
    },
    {
      id: 'mercado', label: 'Marcas & mercado', icon: 'PieChart', blocks: [
        ch('cz3', 'Quota de valor por segmento na Chéquia (%)', 'NielsenIQ CZ · últimos 12 meses', 'line', ['Zátkovy · massa com ovo', 'Adriana · 100% sêmola', 'Rosické · trigo mole'],
          rows(MONTHS, { 'Zátkovy · massa com ovo': [30.2, 30.4, 30.1, 30.6, 30.8, 30.7, 30.9, 31.0, 30.8, 31.1, 31.2, 31.0], 'Adriana · 100% sêmola': [17.8, 18.0, 18.3, 18.4, 18.7, 18.9, 19.0, 19.2, 19.3, 19.4, 19.5, 19.6], 'Rosické · trigo mole': [14.8, 14.6, 14.5, 14.3, 14.4, 14.1, 14.0, 13.9, 13.8, 13.8, 13.7, 13.6] }),
          'A Rosické perde quota para a MDD nas massas de trigo mole mais baratas.',
          'Sem ação, a Rosické cai para 12,9% em junho.',
          'Reposicionar a Rosické com a herança "desde 1867" e embalagem nova.', { ratio: true, span: true }),
        { t: 'insights', items: [
          { tone: 'ok', title: 'Adriana: +1,8 pp de quota', text: 'A Adriana ganhou quota às marcas italianas no segmento de sêmola com preço 12% abaixo da Barilla.', tag: 'NielsenIQ CZ' },
          { tone: 'warn', title: 'Rosické sob pressão', text: 'A diferença de preço para a MDD passou de 18% para 26% num ano; os consumidores mais sensíveis ao preço estão a mudar.', tag: 'Revenue Management' },
          { tone: 'info', title: 'Oportunidade ibérica', text: 'O teste da Adriana em 40 lojas Continente vendeu 2,3× a média da categoria premium.', tag: 'Sinergia de portefólio' },
        ] },
      ],
    },
    {
      id: 'litovel', label: 'Fábrica de Litovel', icon: 'Factory', blocks: [
        { t: 'kpis', items: [
          k('OEE de Litovel', '77,9%', '+2,4 pp a/a', true, true),
          k('Ocupação prevista em dezembro', '94%', 'pico de procura', true, false),
          k('Armazém automático', '98,6%', 'disponibilidade', true, true),
          k('Risco de cheia (rio Morava)', 'Baixo', 'previsão ČHMÚ 7 dias', false, true),
        ] },
        { t: 'heat', title: 'OEE por linha e semana (%)', sub: 'Litovel · 5 linhas', span: true,
          rows: ['L1 · massa curta', 'L2 · massa curta', 'L3 · massa com ovo', 'L4 · massa longa', 'L5 · massa curta'], cols: WEEKS,
          values: [[77, 78, 76, 79, 78, 80, 79, 78, 80, 81, 79, 80], [75, 76, 77, 76, 78, 77, 79, 78, 77, 79, 80, 79], [72, 73, 74, 73, 75, 74, 76, 75, 76, 77, 76, 77], [79, 80, 79, 81, 80, 82, 81, 80, 82, 81, 82, 83], [78, 79, 80, 79, 81, 80, 79, 82, 81, 80, 82, 81]] },
        ch('cz4', 'Nível do rio Morava junto a Litovel (cm)', 'Medição ČHMÚ e previsão a 7 dias vs. níveis de alerta', 'line', ['Nível medido', 'Previsão', 'Alerta 1', 'Alerta 2'],
          ['17/11', '18/11', '19/11', '20/11', '21/11', '22/11', '23/11', '24/11', '25/11', '26/11', '27/11', '28/11', '29/11', '30/11'].map((m, i) => ({ m, ...(i <= 6 ? { 'Nível medido': [142, 139, 141, 146, 151, 149, 147][i] } : {}), ...(i >= 6 ? { 'Previsão': [147, 152, 158, 161, 157, 150, 146, 143][i - 6] } : {}), 'Alerta 1': 230, 'Alerta 2': 280 })),
          'O nível está estável e muito abaixo do 1.º alerta (230 cm); em setembro de 2024 o pico ultrapassou o 3.º alerta.',
          'A previsão a 7 dias não ultrapassa 161 cm (risco baixo).',
          'Manter o agente em vigilância horária durante o inverno.', { ratio: true, colors: ['#29B5E8', '#11567F', '#E08600', '#D92D20'] }),
        { t: 'agents', items: [
          ag('ag-cheia', 'Prevenção de cheia em Litovel', 'humano', 'Previsão hidrológica do rio Morava acima do nível 2 de alerta', 'Protege €3,4 M de stock e 5 linhas', [
            ['Sinal', 'ČHMÚ prevê subida do rio Morava para o nível 2 dentro de 72 h (chuva intensa nos Jeseníky).'],
            ['Diagnóstico', 'Cenário semelhante ao de setembro de 2024, que parou a produção.'],
            ['Recomendação', 'Subir o stock dos níveis 1–2 do armazém, antecipar expedições e preparar a produção em Venta de Baños para 3 SKUs críticos.'],
            ['Aprovação humana', 'Decisão do diretor-geral da Cerealis a.s.'],
            ['Ação', 'Ordens de movimentação no armazém automático, expedições antecipadas e plano de contingência ativado.'],
          ], { approver: 'Tomáš Novák — Generální ředitel, Cerealis a.s.', domain: 'Cerealis a.s.', last: 'simulação 02/10' }),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Como está a Cerealis a.s.?', a: '**€61,4 M de vendas YTD (+4,6%)**, **55,0 mil t** e margem EBITDA de **10,4% (+0,8 pp)**. A Adriana é a marca que mais cresce (+14% em volume, quota de 19,6% no segmento de sêmola). Ponto de atenção: a Rosické perde quota para a MDD.' },
    { q: 'Litovel aguenta o pico de dezembro?', a: 'Sim, mas no limite: ocupação prevista de **94%**. O Cortex recomenda transferir **300 t de massa curta MDD** para Venta de Baños em dezembro (destinada a clientes ibéricos: **+€21 mil** de margem e ocupação de Litovel a 90%).' },
    { q: 'Qual o risco de cheia em Litovel?', a: 'Atualmente **baixo** (previsão ČHMÚ a 7 dias). O agente de prevenção monitoriza o rio Morava de hora a hora e foi testado em simulação a 2 de outubro com o cenário de setembro de 2024.' },
  ],
};
