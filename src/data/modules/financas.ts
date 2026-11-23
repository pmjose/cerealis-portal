import type { Module } from '../types';
import { k, ch, ag, ml, rows, YTD, spark } from '../gen';

const EBITDA = [2.3, 2.2, 2.5, 3.0, 3.3, 3.1, 3.4, 3.2, 3.6, 4.0];
const SALES = [26.1, 25.3, 26.9, 34.3, 35.5, 34.4, 35.4, 34.3, 36.2, 37.4];

export const financas: Module = {
  slug: 'financas', name: 'Finanças & Controlo', short: 'Finanças & Controlo', icon: 'Landmark', color: '#121210', group: 'funcoes',
  tagline: 'P&L do grupo, margem por unidade e canal, fundo de maneio, tesouraria, M&A e fecho',
  owner: 'Paulo Rebelo — CFO',
  sources: ['SAP S/4HANA FI/CO', 'Helios (Litovel)', 'SAP Venta de Baños', 'Tesouraria · bancos (SWIFT)', 'BCE · câmbios', 'Seguro de crédito'],
  sections: [
    {
      id: 'pl', label: 'P&L do grupo', icon: 'BarChart3', blocks: [
        { t: 'kpis', items: [
          k('Vendas YTD', '€325,8 M', '+1,5% vs. orçamento', true, true, spark(51, 26, 2, 0.4)),
          k('EBITDA YTD', '€30,6 M', '+27% a/a', true, true, spark(52, 2.4, 0.3, 0.6)),
          k('Margem EBITDA', '9,4%', '+0,1 pp a/a', true, true),
          k('Dívida líquida / EBITDA', '2,4×', 'após aquisição da VB3', true, false),
        ] },
        ch('fi1', 'EBITDA mensal (€ M) e margem (%)', '2026', 'combo', ['EBITDA', 'Margem EBITDA (%)'],
          rows(YTD, { EBITDA, 'Margem EBITDA (%)': EBITDA.map((e, i) => Math.round(e / SALES[i] * 1000) / 10) }),
          'A margem de outubro (10,7%) é a mais alta do ano: preço de trigo duro em queda e diluição de custos fixos na Maia.',
          'EBITDA de 2026 previsto em €37,9 M (9,5%).',
          'Fixar parte do custo de trigo do 1.º trimestre para proteger a margem de 10%.', { ratio: true }),
        ch('fi2', 'Ponte do EBITDA YTD (€ M)', '2025 → 2026', 'bar', ['Impacto'],
          [{ m: 'EBITDA 2025', Impacto: 24.1 }, { m: 'Pasta VB3', Impacto: 4.9 }, { m: 'Volume e mix', Impacto: 1.6 }, { m: 'Preço', Impacto: 2.2 }, { m: 'Matérias-primas', Impacto: 1.1 }, { m: 'Energia', Impacto: 0.9 }, { m: 'Pessoal', Impacto: -1.9 }, { m: 'Logística', Impacto: -0.6 }, { m: 'Marketing e outros', Impacto: -1.7 }, { m: 'EBITDA 2026', Impacto: 30.6 }],
          'A Pasta VB3 explica 72% do crescimento; sem ela, o EBITDA comparável cresce 6,6%.',
          'Os custos com pessoal sobem 4,8% com o acordo salarial de 2026.',
          'Acelerar a captura de sinergias da VB3 em compras de trigo (meta: €1,4 M/ano).'),
        { t: 'table', title: 'P&L por unidade de negócio (YTD)', sub: 'Em € M', span: true,
          columns: ['Unidade', 'Vendas', 'Cresc. a/a', 'Margem bruta', 'EBITDA', 'Margem EBITDA', 'Vs. orçamento'],
          rows: [
            { Unidade: 'Produtos Alimentares', Vendas: '126,0', 'Cresc. a/a': '+3,0%', 'Margem bruta': '35,9%', EBITDA: '14,1', 'Margem EBITDA': '11,2%', 'Vs. orçamento': '+2,1%' },
            { Unidade: 'Cerealis Moagens', Vendas: '79,6', 'Cresc. a/a': '+1,3%', 'Margem bruta': '19,4%', EBITDA: '5,7', 'Margem EBITDA': '7,1%', 'Vs. orçamento': '−0,8%' },
            { Unidade: 'Cerealis a.s. (CZ/SK)', Vendas: '61,4', 'Cresc. a/a': '+4,6%', 'Margem bruta': '33,0%', EBITDA: '6,4', 'Margem EBITDA': '10,4%', 'Vs. orçamento': '+1,9%' },
            { Unidade: 'Pasta VB3 (ES)', Vendas: '58,8', 'Cresc. a/a': 'perímetro novo', 'Margem bruta': '21,5%', EBITDA: '4,9', 'Margem EBITDA': '8,3%', 'Vs. orçamento': '+3,2%' },
            { Unidade: 'Estrutura corporativa', Vendas: '—', 'Cresc. a/a': '—', 'Margem bruta': '—', EBITDA: '−0,4', 'Margem EBITDA': '—', 'Vs. orçamento': '—' },
            { Unidade: 'Grupo Cerealis', Vendas: '325,8', 'Cresc. a/a': '+25,5%', 'Margem bruta': '31,2%', EBITDA: '30,6', 'Margem EBITDA': '9,4%', 'Vs. orçamento': '+1,5%' },
          ] },
      ],
    },
    {
      id: 'margem', label: 'Margem & custo', icon: 'Percent', blocks: [
        ch('fi3', 'Margem bruta por categoria (%)', 'YTD vs. 2025', 'bar', ['2025', '2026'],
          [{ m: 'Massas de marca', '2025': 38.1, '2026': 39.4 }, { m: 'Massas MDD', '2025': 18.6, '2026': 19.8 }, { m: 'Farinhas industriais', '2025': 18.9, '2026': 19.4 }, { m: 'Farinhas culinárias', '2025': 31.2, '2026': 32.0 }, { m: 'Cereais e barras', '2025': 34.8, '2026': 35.1 }, { m: 'Bolachas', '2025': 29.6, '2026': 28.9 }],
          'As bolachas são a única categoria a perder margem (−0,7 pp) — manteiga e açúcar +11% a/a.',
          'A margem das massas de marca chega a 40% no 1.º trimestre se o trigo duro ficar abaixo de €315/t.',
          'Aumento de preço de 3% nas bolachas em fevereiro (elasticidade −0,9).', { ratio: true }),
        ch('fi4', 'Custo de servir por canal (% das vendas)', 'Logística, desconto comercial, serviço e crédito', 'stack', ['Logística', 'Descontos e rappel', 'Serviço e crédito'],
          [{ m: 'Retalho moderno', 'Logística': 5.8, 'Descontos e rappel': 9.4, 'Serviço e crédito': 0.9 }, { m: 'Cash & Carry', 'Logística': 4.9, 'Descontos e rappel': 6.1, 'Serviço e crédito': 0.8 }, { m: 'Panificação & Indústria', 'Logística': 7.9, 'Descontos e rappel': 3.2, 'Serviço e crédito': 1.6 }, { m: 'HoReCa', 'Logística': 9.6, 'Descontos e rappel': 2.8, 'Serviço e crédito': 1.9 }, { m: 'Exportação', 'Logística': 8.4, 'Descontos e rappel': 1.9, 'Serviço e crédito': 2.7 }],
          'A panificação tem a logística mais cara (entregas pequenas e frequentes); o retalho é o mais caro em descontos.',
          'Consolidar entregas a padarias em rotas de 2 dias poupa 0,9 pp de custo logístico.',
          'Testar a encomenda mínima de 20 sacos com entrega gratuita na Grande Lisboa.', { ratio: true }),
        { t: 'scenario', title: 'Sensibilidade da margem ao preço do trigo', sub: 'Impacto no EBITDA anual do grupo (sem repercussão no preço de venda)',
          inputs: [
            { id: 'duro', label: 'Trigo duro (€/t)', min: 260, max: 400, step: 5, value: 318, unit: '€/t' },
            { id: 'mole', label: 'Trigo mole (€/t)', min: 180, max: 280, step: 5, value: 224, unit: '€/t' },
            { id: 'rep', label: 'Repercussão no preço de venda', min: 0, max: 100, step: 10, value: 40, unit: '%' },
          ],
          outputs: [
            { label: 'Impacto no EBITDA anual', calc: v => (-(v.duro - 318) * 0.262 - (v.mole - 224) * 0.3) * (1 - v.rep / 100), fmt: n => `${n >= 0 ? '+' : ''}€${n.toLocaleString('pt-PT', { maximumFractionDigits: 1 })} M`, good: n => n >= 0 },
            { label: 'EBITDA 2027 estimado', calc: v => 41.5 + (-(v.duro - 318) * 0.262 - (v.mole - 224) * 0.3) * (1 - v.rep / 100), fmt: n => `€${n.toLocaleString('pt-PT', { maximumFractionDigits: 1 })} M` },
          ], note: 'Base: 262 mil t de trigo duro/sêmola-equivalente e 300 mil t de trigo mole por ano; EBITDA 2027 do plano: €41,5 M.' },
      ],
    },
    {
      id: 'tesouraria', label: 'Fundo de maneio & tesouraria', icon: 'Wallet', blocks: [
        { t: 'kpis', items: [
          k('Prazo médio de recebimento (DSO)', '48 dias', '−4 dias a/a', false, true),
          k('Prazo médio de pagamento (DPO)', '61 dias', '+3 dias a/a', true, true),
          k('Ciclo de caixa', '18 dias', '−9 dias a/a', false, true),
          k('Dívida líquida', '€91 M', 'aquisição VB3 em abril', true, false),
        ] },
        ch('fi5', 'Previsão de tesouraria (€ M)', 'Próximas 13 semanas · saldo de caixa do grupo', 'area', ['Saldo previsto', 'Mínimo de política'],
          rows(['S48', 'S49', 'S50', 'S51', 'S52', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'], { 'Saldo previsto': [18.4, 16.1, 21.3, 24.9, 19.2, 14.6, 12.8, 15.9, 18.7, 17.1, 15.2, 18.9, 21.6], 'Mínimo de política': [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] }),
          'O ponto mais baixo (€12,8 M) acontece na semana 2, com o pagamento do CWAD e dos subsídios de Natal já liquidados.',
          'Probabilidade de 7% de ficar abaixo do mínimo de política.',
          'Antecipar o factoring dos recebimentos da Mercadona da semana 2 (€6 M).', { ratio: true, model: 'Previsão de tesouraria a 13 semanas · erro médio 4,2%' }),
        ch('fi6', 'Contas a receber vencidas por mercado (€ M)', 'Exportação e domésticos', 'bar', ['Até 30 dias', '31–90 dias', '> 90 dias'],
          [{ m: 'Portugal', 'Até 30 dias': 2.1, '31–90 dias': 0.6, '> 90 dias': 0.2 }, { m: 'Chéquia e Eslováquia', 'Até 30 dias': 0.9, '31–90 dias': 0.2, '> 90 dias': 0.0 }, { m: 'Espanha', 'Até 30 dias': 0.7, '31–90 dias': 0.1, '> 90 dias': 0.0 }, { m: 'Angola', 'Até 30 dias': 0.4, '31–90 dias': 0.9, '> 90 dias': 0.6 }, { m: 'Outros PALOP', 'Até 30 dias': 0.3, '31–90 dias': 0.2, '> 90 dias': 0.1 }],
          'Angola concentra 52% dos vencidos acima de 30 dias (€1,5 M de €2,9 M) por restrições cambiais.',
          'Risco de imparidade de €0,24 M em Angola no fecho do ano.',
          'Exigir carta de crédito confirmada nas novas encomendas para Angola.'),
      ],
    },
    {
      id: 'mna', label: 'Integração M&A', icon: 'Merge', blocks: [
        { t: 'kpis', items: [
          k('Sinergias anuais em regime (meta)', '€4,3 M', 'Cerealis a.s. + VB3', true, true),
          k('Sinergias já capturadas', '€2,7 M', '63% da meta', true, true),
          k('Dias até reporte consolidado (VB3)', '38', 'Cerealis a.s.: 9 semanas', false, true),
          k('Sistemas integrados no Snowflake', '27/31', 'VB3 · 87%', true, true),
        ] },
        { t: 'table', title: 'Programa de sinergias', sub: 'Em € M por ano, em regime', span: true, status: ['Estado'],
          columns: ['Iniciativa', 'Unidade', 'Meta', 'Capturado', 'Responsável', 'Estado'],
          rows: [
            { Iniciativa: 'Compra conjunta de trigo duro e sêmola', Unidade: 'Pasta VB3', Meta: '1,4', Capturado: '0,6', 'Responsável': 'Nuno Ferraz', Estado: 'Em curso' },
            { Iniciativa: 'Rede logística ibérica (camiões partilhados)', Unidade: 'Pasta VB3', Meta: '0,6', Capturado: '0,2', 'Responsável': 'Carla Vieira', Estado: 'Em curso' },
            { Iniciativa: 'Serviços partilhados (financeiro, RH, IT)', Unidade: 'Pasta VB3', Meta: '0,4', Capturado: '0,3', 'Responsável': 'Paulo Rebelo', Estado: 'No prazo' },
            { Iniciativa: 'Compras de sêmola e embalagem', Unidade: 'Cerealis a.s.', Meta: '0,9', Capturado: '0,9', 'Responsável': 'Nuno Ferraz', Estado: 'Concluído' },
            { Iniciativa: 'Transferência de práticas SMED e secagem', Unidade: 'Cerealis a.s.', Meta: '0,6', Capturado: '0,5', 'Responsável': 'Luís Magalhães', Estado: 'No prazo' },
            { Iniciativa: 'Portefólio Adriana na Ibéria (Del Mondo ↔ Adriana)', Unidade: 'Cerealis a.s.', Meta: '0,4', Capturado: '0,2', 'Responsável': 'Mariana Couto', Estado: 'Em curso' },
          ] },
        { t: 'flow', title: 'Playbook de integração de dados (Dia 1 → Dia 100)', sub: 'Aplicado à Pasta VB3 · replicável para a próxima aquisição', nodes: [
          { label: 'Dia 1', value: 'Reporte financeiro', sub: 'SAP VB3 → Snowflake (Openflow)', status: 'ok' },
          { label: 'Dia 14', value: 'Vendas e clientes', sub: 'mapa de SKUs e clientes MDD', status: 'ok' },
          { label: 'Dia 38', value: 'Consolidação total', sub: 'P&L do grupo diário', status: 'ok' },
          { label: 'Dia 60', value: 'MES e qualidade', sub: '4 linhas e LIMS ligados', status: 'ok' },
          { label: 'Dia 100', value: 'Agentes ativos', sub: '6 de 9 agentes do grupo', status: 'aviso' },
        ] },
        { t: 'insights', items: [
          { tone: 'info', title: 'Pronto para a próxima integração', text: 'O modelo de dados comum (clientes, SKUs, lotes, ativos), as políticas Horizon por país e 140 painéis estão prontos a aplicar a uma nova unidade em menos de 6 semanas.', tag: 'Playbook M&A' },
          { tone: 'warn', title: 'Parceria de moagem com a Better Foods', text: 'Anunciada em dezembro de 2025. O mapeamento de dados das moagens Ceres, Germen, Granel e Carneiro Campos está preparado para quando a operação avançar.', tag: 'Em análise' },
        ] },
      ],
    },
    {
      id: 'fecho', label: 'Fecho & reporte', icon: 'FileCheck2', blocks: [
        { t: 'kpis', items: [
          k('Dias de fecho mensal', '4,5 dias úteis', 'antes: 9 dias', false, true),
          k('Reconciliações intercompanhia automáticas', '96%', 'EUR · CZK', true, true),
          k('Lançamentos anómalos detetados (YTD)', '37', '€1,2 M corrigidos', true, true),
          k('Relatórios gerados pelo Cortex', '142', 'por mês', true, true),
        ] },
        { t: 'agents', items: [
          ag('ag-fecho', 'Fecho mensal e reconciliação intercompanhia', 'auto', 'Dia útil 1 do mês', '−4,5 dias de fecho · 3 FTE libertados', [
            ['Sinal', 'Início do fecho de outubro: 4 empresas, 2 moedas (EUR, CZK).'],
            ['Reconciliação', '1 482 transações intercompanhia emparelhadas; 61 diferenças cambiais explicadas.'],
            ['Deteção', '3 lançamentos anómalos (duplicado de frete, centro de custo errado) sinalizados ao controlo.'],
            ['Ação', 'Mapas de consolidação e comentário de gestão em rascunho entregues ao CFO.'],
          ], { domain: 'Finanças', last: '03/11 07:00' }),
          ag('ag-credito', 'Limite de crédito em exportação', 'humano', 'Cliente de exportação acima de 90% do limite segurado', 'Exposição reduzida em €0,6 M', [
            ['Sinal', 'Distribuidor de Luanda a 96% do limite segurado, com 2 faturas acima de 90 dias.'],
            ['Diagnóstico', 'Risco de crédito elevado (score 0,71) e restrição cambial AOA.'],
            ['Recomendação', 'Suspender novas cargas até carta de crédito confirmada.'],
            ['Aprovação humana', 'Decisão do CFO.'],
            ['Ação', 'Bloqueio de crédito no SAP e comunicação ao cliente.'],
          ], { approver: 'Paulo Rebelo — CFO', domain: 'Finanças', last: 'há 2 dias' }),
        ] },
        { t: 'models', items: [
          ml('Previsão de tesouraria a 13 semanas', 'Snowflake ML FORECAST + regras de pagamento', 'Erro médio 4,2%', 'carteira de encomendas, prazos, sazonalidade, pagamentos de trigo', 'Tesouraria', 'Produção', 'Estável', 'nov/26'),
          ml('Risco de crédito de clientes', 'Classificação · XGBoost', 'AUC 0,88', 'comportamento de pagamento, país, seguro, setor', 'Crédito', 'Produção', 'Estável', 'out/26'),
          ml('Deteção de anomalias em lançamentos', 'Isolation forest + regras', '37 casos · 92% confirmados', 'conta, montante, utilizador, hora, fornecedor', 'Controlo', 'Produção', 'Estável', 'contínuo'),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Qual o EBITDA até outubro?', a: '**€30,6 M** (margem de **9,4%**), **+27% a/a**. A Pasta VB3 contribui com €4,9 M; sem ela, o EBITDA comparável cresce 6,6%. Previsão para o ano: **€37,9 M (9,5%)**.' },
    { q: 'Qual o impacto de o trigo duro subir para €350/t?', a: 'Com o trigo duro a **€350/t** e repercussão de 40% no preço de venda, o EBITDA anual cai cerca de **€5,0 M**. Sem repercussão, o impacto seria de **€8,4 M**. Pode testar outros cenários no simulador do separador Margem & custo.' },
    { q: 'Como estão as sinergias das aquisições?', a: 'Capturámos **€2,7 M de €4,3 M (63%)**. A Cerealis a.s. está quase concluída (€1,6 M de €1,9 M); a Pasta VB3 vai em €1,1 M de €2,4 M, com a compra conjunta de trigo como maior alavanca (€1,4 M).' },
    { q: 'Há riscos de tesouraria nas próximas semanas?', a: 'O ponto mais baixo é na **semana 2 (€12,8 M)**, acima do mínimo de €10 M, com **7% de probabilidade** de o quebrar. O Cortex sugere antecipar o factoring dos recebimentos da Mercadona (€6 M). Em Angola há €1,5 M vencidos acima de 30 dias.' },
  ],
};
