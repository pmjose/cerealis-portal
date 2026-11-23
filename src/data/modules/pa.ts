import type { Module } from '../types';
import { k, ch, ag, rows, pie, YTD, MONTHS, spark } from '../gen';
import { SALES_2026 } from '../facts';

const split = (f: number) => SALES_2026.pa.map(v => Math.round(v * f * 10) / 10);

export const pa: Module = {
  slug: 'produtos-alimentares', name: 'Produtos Alimentares', short: 'Produtos Alimentares', icon: 'ShoppingBasket', color: '#D3122E', group: 'negocio',
  tagline: 'Cerealis Produtos Alimentares · massas, cereais de pequeno-almoço, barras, bolachas e farinhas culinárias',
  owner: 'Henrique Lobo — Diretor-Geral Produtos Alimentares',
  sources: ['SAP S/4HANA (CPA)', 'MES Maia e Trofa', 'NielsenIQ', 'Kantar', 'Sell-out retalhistas (Data Sharing)'],
  sections: [
    {
      id: 'geral', label: 'Visão geral', icon: 'LayoutGrid', blocks: [
        { t: 'kpis', items: [
          k('Vendas YTD', '€126,0 M', '+3,0% a/a', true, true, spark(81, 12, 0.5, 0.05)),
          k('Margem EBITDA', '11,2%', '+0,6 pp a/a', true, true),
          k('Massa produzida na Maia (YTD)', '79,6 mil t', 'marca, MDD e exportação', true, true),
          k('Quota de valor em massas secas', '33,4%', 'Milaneza + Nacional', true, true),
        ] },
        ch('pa1', 'Vendas por categoria (€ M)', '2026', 'stack', ['Massas', 'Cereais e barras', 'Bolachas', 'Farinhas culinárias'],
          rows(YTD, { Massas: split(0.626), 'Cereais e barras': split(0.169), Bolachas: split(0.122), 'Farinhas culinárias': split(0.083) }),
          'As massas valem 63% da unidade; os cereais e barras são a categoria que mais cresce (+8,7%).',
          'Dezembro previsto em €12,9 M, com a campanha de Natal das bolachas.',
          'Reforçar a produção da Bolacha Alfa e da Torrada na semana 48.', { colors: ['#D3122E', '#0A8FD3', '#D99A00', '#8C5A14'] }),
        ch('pa2', 'Vendas por marca (YTD)', '% das vendas da unidade', 'pie', ['v'],
          pie([['Nacional', 40], ['Milaneza', 33], ['Marca do distribuidor', 15], ['Amiga (exportação)', 8], ['Del Mondo', 4]]),
          'A Del Mondo já vale 4% (€5,0 M) e tem a margem mais alta da unidade (44%).',
          'A Del Mondo pode chegar a 6% em 2027 com 3 novos formatos.',
          'Proteger a MDD como enchimento de capacidade sem ultrapassar 18% do volume da Maia.', { ratio: true }),
      ],
    },
    {
      id: 'massas', label: 'Massas', icon: 'Wheat', blocks: [
        { t: 'table', title: 'SKUs de massa mais vendidos (YTD)', sub: 'Clique para abrir o Produto 360', span: true, status: ['Tendência'], link: { base: '/portal/360/produtos', idCol: 'id' },
          columns: ['SKU', 'Marca', 'Linha', 'Vendas YTD', 'Volume', 'Margem bruta', 'Tendência'],
          rows: [
            { id: 'milaneza-esparguete', SKU: 'Milaneza Esparguete 500 g', Marca: 'Milaneza', Linha: 'Maia II · L3', 'Vendas YTD': '€9,8 M', Volume: '5 320 t', 'Margem bruta': '39,6%', 'Tendência': 'Atenção (massa partida)' },
            { id: 'milaneza-lacos', SKU: 'Milaneza Laços 500 g', Marca: 'Milaneza', Linha: 'Maia I · L1', 'Vendas YTD': '€4,1 M', Volume: '1 980 t', 'Margem bruta': '42,1%', 'Tendência': 'Em subida' },
            { id: 'nacional-macarrao', SKU: 'Nacional Macarrão Riscado 500 g', Marca: 'Nacional', Linha: 'Maia I · L2', 'Vendas YTD': '€3,7 M', Volume: '2 140 t', 'Margem bruta': '36,8%', 'Tendência': 'Estável' },
            { id: 'delmondo-penne', SKU: 'Del Mondo Penne Rigate 500 g', Marca: 'Del Mondo', Linha: 'Maia I · L1', 'Vendas YTD': '€1,6 M', Volume: '610 t', 'Margem bruta': '44,3%', 'Tendência': 'Em subida' },
            { id: 'amiga-espirais', SKU: 'Amiga Espirais 500 g', Marca: 'Amiga', Linha: 'Maia I · L2', 'Vendas YTD': '€2,2 M', Volume: '1 670 t', 'Margem bruta': '24,9%', 'Tendência': 'Estável' },
          ] },
        ch('pa3', 'Volume de massa por formato (t/mês)', 'Maia · últimos 12 meses', 'area', ['Massas longas', 'Massas curtas', 'Especiais (ninhos, sopa)'],
          rows(MONTHS, { 'Massas longas': [3480, 3820, 3600, 3510, 3740, 3560, 3650, 3420, 3510, 3600, 3780, 3920], 'Massas curtas': [3290, 3660, 3410, 3330, 3560, 3380, 3470, 3260, 3340, 3430, 3600, 3730], 'Especiais (ninhos, sopa)': [830, 920, 890, 860, 900, 860, 880, 820, 850, 870, 920, 950] }),
          'Outubro foi o mês de maior volume do ano na Maia (8 600 t).',
          'Dezembro previsto em 9 400 t: a Maia II fica a 97% de ocupação.',
          'Antecipar 2 turnos de massa longa na Maia II na semana 49.', { span: true }),
      ],
    },
    {
      id: 'cereais', label: 'Cereais & barras', icon: 'Sun', blocks: [
        { t: 'kpis', items: [
          k('Vendas cereais e barras (YTD)', '€21,3 M', '+8,7% a/a', true, true),
          k('Corn Flakes Sem Açúcar', '€2,4 M', 'lançado em 2025', true, true),
          k('Produção MDD de cereais', '38%', 'do volume da Trofa', true, true),
          k('OEE da extrusão (Trofa)', '76,4%', '92% da cadência nominal', true, false),
        ] },
        ch('pa4', 'Vendas de cereais Nacional por referência (€ mil/mês)', 'Portugal', 'line', ['Corn Flakes Sem Açúcar', 'Corn Flakes clássicos', 'Muesli e granola', 'Barras de cereais'],
          rows(MONTHS, { 'Corn Flakes Sem Açúcar': [168, 182, 196, 204, 218, 226, 238, 245, 252, 262, 274, 286], 'Corn Flakes clássicos': [248, 252, 244, 239, 236, 231, 228, 226, 224, 221, 219, 218], 'Muesli e granola': [131, 138, 142, 139, 144, 146, 148, 145, 149, 152, 155, 158], 'Barras de cereais': [236, 249, 251, 244, 252, 260, 268, 278, 262, 255, 266, 272] }),
          'O Sem Açúcar ultrapassou os clássicos em fevereiro e canibaliza apenas 31% das vendas.',
          'O Sem Açúcar chega a €310 mil/mês em março.',
          'Lançar a versão Sem Açúcar em formato familiar de 750 g.'),
        { t: 'agents', items: [
          ag('ag-mdd', 'Proposta de MDD de cereais', 'humano', 'Pedido de cotação de retalhista para marca própria', 'Margem protegida ≥ 18%', [
            ['Sinal', 'Pedido de cotação do Lidl para cereais de chocolate MDD (420 t/ano).'],
            ['Cálculo', 'Custo por kg com receita, energia da extrusora e embalagem: €2,11/kg.'],
            ['Recomendação', 'Preço de €2,58/kg (margem 18,2%), produção às terças e quartas no turno 3.'],
            ['Aprovação humana', 'Validação do Diretor-Geral de Produtos Alimentares.'],
            ['Ação', 'Proposta enviada ao Lidl com ficha técnica e calendário de produção.'],
          ], { approver: 'Henrique Lobo — Diretor-Geral Produtos Alimentares', domain: 'Produtos Alimentares', last: 'há 5 dias' }),
        ] },
      ],
    },
    {
      id: 'bolachas', label: 'Bolachas', icon: 'Cookie', blocks: [
        { t: 'kpis', items: [
          k('Vendas de bolachas (YTD)', '€15,4 M', '+3,4% a/a', true, true),
          k('Margem bruta', '28,9%', '−0,7 pp (manteiga e açúcar)', false, false),
          k('Bolacha Alfa', '€4,2 M', 'n.º 1 da gama', true, true),
          k('Reclamações por milhão de unidades', '5,8 ppm', 'embalagem danificada', true, false),
        ] },
        ch('pa5', 'Custo dos ingredientes das bolachas (índice 2025 = 100)', 'Manteiga, açúcar, óleo e farinha', 'line', ['Manteiga', 'Açúcar', 'Óleo de girassol', 'Farinha (interna)'],
          rows(MONTHS, { Manteiga: [104, 106, 108, 109, 110, 111, 112, 113, 112, 111, 112, 113], 'Açúcar': [101, 103, 104, 106, 107, 108, 109, 110, 110, 109, 110, 111], 'Óleo de girassol': [98, 99, 101, 100, 99, 98, 97, 97, 96, 96, 97, 97], 'Farinha (interna)': [100, 100, 101, 102, 102, 101, 100, 100, 101, 102, 102, 103] }),
          'Manteiga (+13%) e açúcar (+11%) explicam a perda de margem; a farinha interna amortece o impacto.',
          'Previsão de estabilização da manteiga no 1.º trimestre de 2027.',
          'Aumento de preço de 3% nas bolachas em fevereiro e reformulação da Alfa com menos açúcar.', { ratio: true, span: true }),
      ],
    },
  ],
  questions: [
    { q: 'Como está a unidade de Produtos Alimentares?', a: '**€126,0 M de vendas YTD (+3,0%)** e margem EBITDA de **11,2%**. As massas valem 63% da unidade; os cereais e barras crescem **8,7%** com o Corn Flakes Sem Açúcar. Atenção às bolachas: −0,7 pp de margem por causa da manteiga e do açúcar.' },
    { q: 'Qual o SKU mais vendido?', a: 'A **Milaneza Esparguete 500 g**: €9,8 M YTD, 5 320 t, margem bruta de 39,6%. Está em atenção por causa da massa partida na linha L3 da Maia II — já corrigida pelo agente de secagem.' },
    { q: 'O Corn Flakes Sem Açúcar está a canibalizar os clássicos?', a: 'Pouco: só **31%** das vendas do Sem Açúcar vêm dos clássicos. O Sem Açúcar já vende **€286 mil/mês** (vs. €218 mil dos clássicos) e deve chegar a €310 mil em março.' },
  ],
};
