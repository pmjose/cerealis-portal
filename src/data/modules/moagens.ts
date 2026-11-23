import type { Module } from '../types';
import { k, ch, ag, ml, rows, pie, MONTHS, spark } from '../gen';

export const moagens: Module = {
  slug: 'moagens', name: 'Cerealis Moagens', short: 'Cerealis Moagens', icon: 'Wheat', color: '#8C5A14', group: 'negocio',
  tagline: 'Farinhas de trigo e centeio para panificação, pastelaria e restauração · Nacional, BIG e Napolitana · Centro Técnico',
  owner: 'Fernando Calheiros — Diretor-Geral Cerealis Moagens',
  sources: ['SAP S/4HANA (CM)', 'SCADA Lisboa e Porto', 'Portal de Clientes', 'WhatsApp Business', 'Centro Técnico · CRM'],
  sections: [
    {
      id: 'geral', label: 'Visão geral', icon: 'LayoutGrid', blocks: [
        { t: 'kpis', items: [
          k('Vendas YTD', '€79,6 M', '+1,3% a/a', true, true, spark(91, 7.8, 0.3, 0.02)),
          k('Farinha vendida (YTD)', '181 mil t', '+0,7% a/a', true, true),
          k('Margem por tonelada', '€117/t', '+€9/t a/a', true, true),
          k('Clientes ativos', '2 340', '142 em risco alto', true, false),
        ] },
        ch('mo1', 'Preço da farinha vs. custo do trigo (€/t)', 'Nacional T65 Panificação · margem de moagem', 'area', ['Preço de venda', 'Custo do trigo na farinha'],
          rows(MONTHS, { 'Preço de venda': [376, 378, 380, 383, 386, 386, 386, 386, 388, 391, 394, 397], 'Custo do trigo na farinha': [268, 270, 272, 276, 279, 276, 273, 271, 273, 276, 278, 280] }),
          'A margem de moagem subiu de €108 para €117/t com a mistura ótima de trigos e a valorização das sêmeas.',
          'Com o trigo mole a subir 1,8%, a margem cai para €113/t em janeiro sem ajuste de preço.',
          'Atualizar a tabela de preços das farinhas industriais em +1,5% a 1 de janeiro.', { ratio: true }),
        ch('mo2', 'Volume por segmento (YTD)', '% das toneladas', 'pie', ['v'],
          pie([['Panificação industrial', 41], ['Panificação tradicional', 29], ['Pastelaria', 11], ['Restauração e pizzarias', 8], ['Indústria alimentar', 7], ['Cash & Carry', 4]]),
          'As pizzarias são o segmento que mais cresce (+19%) graças à Napolitana T00.',
          'A panificação tradicional perde 2% ao ano por encerramento de padarias pequenas.',
          'Oferecer às padarias tradicionais o pacote "massa-mãe + Centro Técnico" para fidelizar.', { ratio: true }),
      ],
    },
    {
      id: 'clientes', label: 'Clientes de panificação', icon: 'Store', blocks: [
        ch('mo3', 'Clientes por nível de risco de abandono', 'Modelo Cortex · 2 340 clientes ativos', 'bar', ['Clientes'],
          [{ m: 'Risco baixo', Clientes: 1712 }, { m: 'Risco médio', Clientes: 486 }, { m: 'Risco alto', Clientes: 142 }],
          '142 padarias em risco alto valem €7,3 M por ano. Sinal principal: menos 30% de frequência de encomenda em 8 semanas.',
          'Sem ação, 38% das padarias em risco alto saem nos próximos 6 meses (€2,8 M).',
          'Visitas do Centro Técnico às 40 padarias de maior valor, com proposta Napolitana.', { ratio: true, model: 'Risco de abandono B2B · AUC 0,84' }),
        { t: 'agents', items: [
          ag('ag-retencao', 'Retenção de padaria em risco', 'humano', 'Risco de abandono > 0,7 num cliente com mais de €0,5 M/ano', '€2,1 M retidos em 2026', [
            ['Sinal', 'Panificação Douro: frequência −22% e pedido de cotação a um concorrente.'],
            ['Diagnóstico', 'Preço 2,1% acima do mercado na T65 e 2 reclamações de força (W) em outubro.'],
            ['Recomendação', 'Visita técnica com ensaio de panificação, ajuste de 1,2% no preço e contrato de 12 meses.'],
            ['Aprovação humana', 'Validação do Diretor-Geral da Moagens.'],
            ['Ação', 'Visita agendada no Centro Técnico e proposta enviada ao cliente.'],
          ], { approver: 'Fernando Calheiros — Diretor-Geral Cerealis Moagens', domain: 'Moagens', last: 'ontem' }),
        ] },
        { t: 'table', title: 'Clientes em risco alto com maior valor', sub: 'Ação recomendada pelo Cortex', span: true, status: ['Risco'],
          columns: ['Cliente', 'Região', 'Vendas 12M', 'Variação de frequência', 'Sinal principal', 'Risco'],
          rows: [
            { Cliente: 'Panificação Douro, S.A.', 'Região': 'Grande Porto', 'Vendas 12M': '€5,6 M', 'Variação de frequência': '−22%', 'Sinal principal': 'Cotação pedida a concorrente', Risco: 'Alto' },
            { Cliente: 'Padarias Ribatejo, Lda.', 'Região': 'Santarém', 'Vendas 12M': '€0,9 M', 'Variação de frequência': '−34%', 'Sinal principal': 'Reclamação de força da farinha', Risco: 'Alto' },
            { Cliente: 'Forno Lusitano', 'Região': 'Grande Lisboa', 'Vendas 12M': '€0,7 M', 'Variação de frequência': '−29%', 'Sinal principal': 'Atrasos de pagamento', Risco: 'Alto' },
            { Cliente: 'Pastelaria Real Bakery Group', 'Região': 'Lisboa e Setúbal', 'Vendas 12M': '€0,6 M', 'Variação de frequência': '−18%', 'Sinal principal': 'Mudança de chefe de produção', Risco: 'Médio' },
            { Cliente: 'Pizzarias Forno di Napoli (12 lojas)', 'Região': 'Porto e Braga', 'Vendas 12M': '€0,4 M', 'Variação de frequência': '+41%', 'Sinal principal': 'Crescimento com Napolitana T00', Risco: 'Baixo' },
          ] },
      ],
    },
    {
      id: 'centro-tecnico', label: 'Centro Técnico', icon: 'ChefHat', blocks: [
        { t: 'kpis', items: [
          k('Formações e demonstrações (YTD)', '184', '+26% a/a', true, true),
          k('Profissionais formados', '1 460', 'padeiros, pasteleiros, pizzaiolos', true, true),
          k('Conversão para novos produtos', '37%', 'após demonstração', true, true),
          k('NPS das formações', '+71', '+6 a/a', true, true),
        ] },
        ch('mo4', 'Formações por tema (YTD)', 'Centro Técnico Cerealis · Lisboa', 'hbar', ['Sessões'],
          [{ m: 'Pizza napolitana (T00)', 'Sessões': 46 }, { m: 'Massa-mãe e fermentação lenta', 'Sessões': 38 }, { m: 'Técnicas de frio', 'Sessões': 31 }, { m: 'Pastelaria portuguesa', 'Sessões': 27 }, { m: 'Pão de centeio e mistura', 'Sessões': 22 }, { m: 'Segurança alimentar', 'Sessões': 20 }],
          'As formações de pizza esgotam com 3 semanas de antecedência e geram 41% das novas contas Napolitana.',
          'Procura prevista de 60 sessões de pizza em 2027.',
          'Abrir uma segunda sala de formação no Porto (Freixo) para o Norte.', { ratio: true, span: true }),
      ],
    },
    {
      id: 'portefolio', label: 'Portefólio', icon: 'Package', blocks: [
        { t: 'table', title: 'Portefólio de farinhas (YTD)', sub: 'Industriais e profissionais', span: true,
          columns: ['Produto', 'Marca', 'Moagem', 'Volume', 'Preço médio', 'Margem/t', 'Cresc. a/a'],
          rows: [
            { Produto: 'Farinha T65 Panificação 25 kg e granel', Marca: 'Nacional', Moagem: 'Lisboa · Porto', Volume: '96 400 t', 'Preço médio': '€384/t', 'Margem/t': '€112', 'Cresc. a/a': '+0,4%' },
            { Produto: 'Farinha T55 Pastelaria', Marca: 'Nacional', Moagem: 'Lisboa', Volume: '31 800 t', 'Preço médio': '€400/t', 'Margem/t': '€124', 'Cresc. a/a': '+1,2%' },
            { Produto: 'Farinhas de força W 300+', Marca: 'BIG', Moagem: 'Lisboa', Volume: '24 100 t', 'Preço médio': '€414/t', 'Margem/t': '€131', 'Cresc. a/a': '+2,6%' },
            { Produto: 'Farinha T00 para pizza 10 kg', Marca: 'Napolitana', Moagem: 'Lisboa', Volume: '6 900 t', 'Preço médio': '€588/t', 'Margem/t': '€244', 'Cresc. a/a': '+19,4%' },
            { Produto: 'Sêmola de trigo duro fina', Marca: 'Napolitana', Moagem: 'Maia (semolaria)', Volume: '2 300 t', 'Preço médio': '€562/t', 'Margem/t': '€201', 'Cresc. a/a': '+11,0%' },
            { Produto: 'Farinha de centeio e mistura', Marca: 'Nacional', Moagem: 'Porto', Volume: '12 600 t', 'Preço médio': '€368/t', 'Margem/t': '€97', 'Cresc. a/a': '−1,8%' },
            { Produto: 'Farinhas compostas e pré-misturas', Marca: 'Nacional', Moagem: 'Lisboa', Volume: '6 900 t', 'Preço médio': '€476/t', 'Margem/t': '€162', 'Cresc. a/a': '+4,1%' },
          ] },
        { t: 'models', items: [
          ml('Próxima melhor oferta para padarias', 'Recomendação · filtragem colaborativa', '+14% de vendas cruzadas', 'histórico de compra, tipo de padaria, região, formações frequentadas', 'Moagens', 'Produção', 'Estável', 'out/26', '€0,6 M/ano'),
          ml('Otimizador de rotas de cisternas', 'Roteamento com janelas temporais', '−11% km por tonelada', 'encomendas, silos dos clientes, trânsito', 'Logística', 'Piloto', 'Estável', 'nov/26'),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Como está a margem de moagem?', a: 'A margem por tonelada está em **€117/t (+€9/t a/a)**, com a mistura ótima de trigos e a valorização das sêmeas. Com o trigo mole +1,8% em outubro, desce para **€113/t em janeiro** se não houver ajuste — o Cortex recomenda +1,5% na tabela a 1 de janeiro.' },
    { q: 'Quais as padarias em risco?', a: '**142 clientes em risco alto** (€7,3 M/ano). O maior é a **Panificação Douro** (€5,6 M em 12 meses, frequência −22%, pediu cotação a um concorrente). O agente de retenção propôs visita técnica, ajuste de 1,2% no preço e contrato de 12 meses.' },
    { q: 'Como está a Napolitana?', a: 'A **Napolitana T00** cresce **19,4%** (6 900 t YTD) com a margem mais alta do portefólio (**€244/t**). As formações de pizza do Centro Técnico geram 41% das novas contas. O lançamento de 1 kg para o consumidor está previsto para janeiro de 2027.' },
  ],
};
