import type { Module } from '../types';
import { k, ch, ag, ml, rows, MONTHS, FUT, spark } from '../gen';
import type { MapPoint } from '../types';

const NET: MapPoint[] = [
  { id: 'n1', name: 'Hub logístico da Maia', type: 'Produto acabado PT · 24 000 paletes', lat: 41.2016, lng: -8.5967, status: 'ok', detail: 'Ocupação 87% · 412 expedições/dia', color: '#121210' },
  { id: 'n2', name: 'Centro logístico de Lisboa', type: 'Farinhas e culinária · Sul', lat: 38.7372, lng: -9.1017, status: 'aviso', detail: 'Ocupação 94% — acima do alvo (90%)', color: '#121210' },
  { id: 'n3', name: 'Plataformas de retalho · Norte', type: '4 plataformas', lat: 41.45, lng: -8.3, status: 'ok', detail: 'OTIF 96,1%', color: '#29B5E8' },
  { id: 'n4', name: 'Plataformas de retalho · Centro e Sul', type: 'Azambuja e outras (5)', lat: 39.07, lng: -8.87, status: 'aviso', detail: 'OTIF 94,2% · janelas de descarga saturadas às 2.as', color: '#29B5E8' },
  { id: 'n5', name: 'Porto de Leixões', type: 'Exportação PALOP e Américas', lat: 41.183, lng: -8.7, status: 'ok', detail: '38 contentores/semana', color: '#D99A00' },
  { id: 'n6', name: 'Litovel · armazém automático', type: 'Cerealis a.s.', lat: 49.7046, lng: 17.0768, status: 'ok', detail: 'Chéquia e Eslováquia · OTIF 96,4%', color: '#121210' },
  { id: 'n7', name: 'Venta de Baños', type: 'Pasta VB3', lat: 41.9214, lng: -4.4936, status: 'ok', detail: 'Plataformas Mercadona e outras · OTIF 97,6%', color: '#121210' },
  { id: 'n8', name: 'Plataformas Mercadona · Centro', type: 'Cliente MDD', lat: 40.16, lng: -3.62, status: 'ok', detail: '9 camiões/dia', color: '#29B5E8' },
];

export const supply: Module = {
  slug: 'supply', name: 'Supply Chain & S&OP', short: 'Supply Chain & S&OP', icon: 'Network', color: '#121210', group: 'funcoes',
  tagline: 'Previsão de procura, S&OP, inventário, logística e serviço ao cliente — Portugal, Chéquia e Espanha',
  owner: 'Carla Vieira — Diretora de Supply Chain',
  sources: ['SAP S/4HANA SD/MM', 'SAP IBP', 'WMS hub Maia', 'TMS', 'Sell-out Sonae MC · JM (Data Sharing)', 'EDI Mercadona', 'NielsenIQ'],
  sections: [
    {
      id: 'procura', label: 'Procura & previsão', icon: 'TrendingUp', blocks: [
        { t: 'kpis', items: [
          k('Precisão da previsão (SKU × cliente × semana)', '92,2%', '+4,6 pp vs. 2025', true, true, spark(2, 88, 1.5, 0.04)),
          k('Viés da previsão', '+1,4%', 'ligeiro excesso', true, false),
          k('OTIF do grupo', '95,8%', '+2,3 pp a/a', true, true, spark(4, 93.5, 0.8, 0.02)),
          k('SKUs geridos pelo Cortex', '1 412', 'PT · CZ · ES', true, true),
        ] },
        ch('sc1', 'Massas Portugal: real vs. previsão (mil t)', 'Maia I e II · últimos 12 meses', 'area', ['Real', 'Previsão Cortex', 'Plano anterior (Excel)'],
          rows(MONTHS, { 'Real': [7.6, 8.4, 7.9, 7.7, 8.2, 7.8, 8.0, 7.5, 7.7, 7.9, 8.3, 8.6], 'Previsão Cortex': [7.8, 8.2, 8.0, 7.9, 8.1, 7.9, 7.9, 7.7, 7.8, 8.0, 8.2, 8.5], 'Plano anterior (Excel)': [8.1, 8.6, 7.4, 7.2, 8.6, 8.3, 7.6, 7.1, 8.2, 7.5, 7.8, 8.9] }),
          'A previsão Cortex errou em média 2,1% por mês contra 6,8% do plano em Excel; o pico de outubro (+4% a/a) foi antecipado com o sell-out partilhado pelo Continente.',
          'Novembro e dezembro: 8,9 e 9,4 mil t (Natal e campanha de folhetos).',
          'Antecipar 2 turnos de massa longa na Maia II na semana 49.', { model: 'Previsão hierárquica · Snowflake ML FORECAST', span: true }),
        ch('sc2', 'Precisão da previsão por família (%)', 'Últimas 13 semanas', 'hbar', ['Precisão'],
          [{ m: 'Farinhas industriais', 'Precisão': 95.2 }, { m: 'Massas MDD (Espanha)', 'Precisão': 94.1 }, { m: 'Massas longas', 'Precisão': 93.8 }, { m: 'Massas curtas', 'Precisão': 92.9 }, { m: 'Massas (Chéquia)', 'Precisão': 91.6 }, { m: 'Farinhas culinárias', 'Precisão': 90.7 }, { m: 'Cereais de pequeno-almoço', 'Precisão': 88.4 }, { m: 'Bolachas', 'Precisão': 86.1 }],
          'Bolachas e cereais são as famílias menos previsíveis por causa das promoções e dos lançamentos (Corn Flakes Sem Açúcar).',
          'Com os calendários promocionais dos retalhistas integrados, a precisão das bolachas sobe para 90% em 8 semanas.',
          'Pedir ao Pingo Doce e ao Lidl a partilha do calendário de folhetos via Snowflake Data Sharing.', { ratio: true }),
        ch('sc3', 'Procura prevista por unidade (mil t)', 'Próximos 6 meses', 'stack', ['Maia', 'Litovel', 'Venta de Baños'],
          rows(FUT, { 'Maia': [8.9, 9.4, 8.1, 7.8, 8.3, 8.0], 'Litovel': [5.7, 6.1, 5.2, 5.0, 5.4, 5.3], 'Venta de Baños': [7.3, 7.6, 7.0, 6.8, 7.1, 7.2] }),
          'Dezembro é o pico do grupo: 23,1 mil t de massa (+6% a/a).',
          'Litovel chega a 94% da capacidade em dezembro.',
          'Transferir 300 t de massa curta MDD para clientes ibéricos de Litovel para Venta de Baños em dezembro.'),
        { t: 'models', items: [
          ml('Previsão de procura hierárquica', 'Snowflake ML FORECAST · 1 412 séries', 'MAPE 7,8% (antes: 14,9%)', 'sell-out, folhetos, meteorologia, feriados, preço, quebras de stock', 'Supply Chain', 'Produção', 'Estável', 'nov/26', '€1,9 M/ano'),
          ml('Previsão de rutura em loja', 'Classificação · LightGBM', 'Precisão 84% a 7 dias', 'stock de loja partilhado, vendas diárias, entregas, promoções', 'Supply Chain', 'Produção', 'Estável', 'nov/26'),
          ml('ETA de entregas', 'Regressão · transporte rodoviário', 'Erro médio 11 min', 'TMS, trânsito, janela de descarga, motorista', 'Logística', 'Piloto', 'Estável', 'out/26'),
        ] },
      ],
    },
    {
      id: 'sop', label: 'S&OP', icon: 'CalendarRange', blocks: [
        { t: 'flow', title: 'Ciclo S&OP de novembro', sub: 'Do sinal de procura ao plano aprovado na reunião executiva de 27/11', nodes: [
          { label: 'Procura', value: '23,1 mil t', sub: 'consenso dez/26', status: 'ok' },
          { label: 'Capacidade', value: '24,4 mil t', sub: '3 fábricas de massa', status: 'ok' },
          { label: 'Sêmola', value: '6,1 semanas', sub: 'cobertura trigo duro', status: 'aviso' },
          { label: 'Stock alvo', value: '31 dias', sub: 'produto acabado', status: 'ok' },
          { label: 'Plano', value: 'Aprovação 27/11', sub: 'Comissão Executiva', status: 'aviso' },
        ] },
        { t: 'heat', title: 'Ocupação planeada por linha (%)', sub: 'Plano S&OP · próximos 6 meses', span: true,
          rows: ['Maia I · massa curta', 'Maia II · massa longa', 'Trofa · extrusão de cereais', 'Maia · bolachas', 'Litovel L1–L3 (curta)', 'Litovel L4–L5 (longa)', 'Venta de Baños L1–L4', 'Lisboa · moagem', 'Porto · moagem'],
          cols: FUT, values: [[88, 93, 82, 79, 84, 82], [91, 97, 85, 81, 86, 84], [84, 86, 78, 75, 80, 79], [92, 98, 74, 70, 76, 77], [89, 94, 83, 80, 85, 83], [86, 91, 80, 77, 82, 81], [81, 84, 78, 76, 79, 80], [90, 92, 88, 87, 89, 90], [78, 80, 76, 74, 77, 78]], unit: '%', good: 'low' },
        { t: 'scenario', title: 'Cenário: realocar produção MDD entre fábricas', sub: 'Massa curta MDD · dezembro',
          inputs: [
            { id: 't', label: 'Toneladas movidas de Litovel para Venta de Baños', min: 0, max: 800, step: 50, value: 300, unit: 't' },
            { id: 'frete', label: 'Poupança de frete (clientes ibéricos)', min: 0, max: 80, step: 2, value: 32, unit: '€/t' },
          ],
          outputs: [
            { label: 'Ocupação de Litovel em dezembro', calc: v => 94 - v.t / 85, fmt: n => `${n.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}%`, good: n => n <= 92 },
            { label: 'Ocupação de Venta de Baños', calc: v => 84 + v.t / 75, fmt: n => `${n.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}%`, good: n => n <= 92 },
            { label: 'Impacto na margem', calc: v => (v.t * 38 + v.t * v.frete) / 1000, fmt: n => `${n >= 0 ? '+' : ''}€${n.toLocaleString('pt-PT', { maximumFractionDigits: 1 })} mil`, good: n => n >= 0 },
          ], note: 'Custo de conversão: Litovel €212/t em horas extra vs. Venta de Baños €174/t em turno normal. A massa movida destina-se a clientes MDD em Portugal e Espanha.' },
      ],
    },
    {
      id: 'inventario', label: 'Inventário', icon: 'Boxes', blocks: [
        { t: 'kpis', items: [
          k('Stock de produto acabado', '31 dias', '-16% a/a (37 dias)', false, true, spark(6, 36, 1, -0.15)),
          k('Valor em stock (grupo)', '€41,8 M', '-€6,9 M a/a', false, true),
          k('Stock com risco de validade', '€0,62 M', 'bolachas e cereais', true, false),
          k('Fundo de maneio libertado', '€6,9 M', 'desde jan/26', true, true),
        ] },
        ch('sc4', 'Dias de stock por família', 'Produto acabado · últimos 12 meses', 'line', ['Massas', 'Farinhas', 'Cereais e barras', 'Bolachas', 'Alvo'],
          rows(MONTHS, { 'Massas': [38, 37, 37, 36, 35, 34, 33, 33, 32, 31, 31, 30], 'Farinhas': [12, 12, 11, 11, 11, 10, 10, 10, 9, 9, 9, 9], 'Cereais e barras': [46, 45, 47, 44, 43, 42, 41, 40, 41, 39, 38, 38], 'Bolachas': [41, 40, 42, 41, 39, 38, 37, 38, 36, 35, 36, 34], 'Alvo': [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32] }),
          'As massas atingiram o alvo em setembro; cereais e bolachas continuam acima por causa dos lançamentos.',
          'Com a previsão por SKU, as bolachas chegam a 32 dias em fevereiro.',
          'Reduzir o lote mínimo da Bolacha Alfa de 9 para 6 toneladas.', { ratio: true }),
        { t: 'table', title: 'Stock em risco de validade', sub: 'Validade remanescente < 40% · ação sugerida pelo Cortex', status: ['Ação'],
          columns: ['SKU', 'Armazém', 'Unidades', 'Validade restante', 'Valor', 'Ação'],
          rows: [
            { SKU: 'Nacional Corn Flakes Sem Açúcar 375 g', Armazém: 'Hub Maia', Unidades: 18400, 'Validade restante': '34%', Valor: '€41 mil', 'Ação': 'Promoção Recheio' },
            { SKU: 'Nacional Bolacha Alfa 200 g', Armazém: 'Hub Maia', Unidades: 26900, 'Validade restante': '31%', Valor: '€37 mil', 'Ação': 'Desvio para exportação Cabo Verde' },
            { SKU: 'Barras Nacional Aveia & Mel 6×22 g', Armazém: 'Hub Maia', Unidades: 9800, 'Validade restante': '28%', Valor: '€19 mil', 'Ação': 'Doação · Banco Alimentar' },
            { SKU: 'Zátkovy Vaječné Kolínka 250 g', Armazém: 'Litovel', Unidades: 12300, 'Validade restante': '37%', Valor: '€11 mil', 'Ação': 'Em análise' },
          ] },
        ch('sc5', 'Fundo de maneio em stock (€ M)', 'Grupo · fim de mês', 'bar', ['Stock'],
          rows(MONTHS, { 'Stock': [48.7, 49.2, 47.9, 47.1, 46.4, 52.3, 50.8, 48.1, 45.6, 43.9, 42.7, 41.8] }),
          'O salto de abril é a consolidação da Pasta VB3 (+€6,1 M); desde então o stock caiu €10,5 M.',
          'Fecho do ano previsto em €40,2 M.',
          'Aplicar a política de stock de segurança dinâmica também a Venta de Baños.', { span: true }),
      ],
    },
    {
      id: 'logistica', label: 'Logística & entregas', icon: 'Truck', blocks: [
        { t: 'kpis', items: [
          k('OTIF', '95,8%', '+2,3 pp a/a', true, true),
          k('Custo logístico', '6,4% das vendas', '-0,5 pp a/a', false, true),
          k('Expedições por dia (PT)', '412', '+5%', true, true),
          k('Emissões de transporte', '41 g CO₂e/kg', '-9% a/a', false, true),
        ] },
        { t: 'map', title: 'Rede logística do grupo', points: NET, height: 420, legend: [['Armazém próprio', '#121210'], ['Cliente', '#29B5E8'], ['Porto', '#D99A00']],
          routes: [[[-8.5967, 41.2016], [-8.87, 39.07]], [[-8.5967, 41.2016], [-8.3, 41.45]], [[-9.1017, 38.7372], [-8.87, 39.07]], [[-4.4936, 41.9214], [-3.62, 40.16]], [[-8.5967, 41.2016], [-8.7, 41.183]]] },
        { t: 'table', title: 'Riscos de rutura nos próximos 14 dias', sub: 'Previsão de rutura em loja com stock partilhado pelos retalhistas', span: true, status: ['Estado'],
          columns: ['SKU', 'Cliente', 'Cobertura', 'Causa', 'Estado'],
          rows: [
            { SKU: 'Milaneza Esparguete 500 g', Cliente: 'Pingo Doce', Cobertura: '4 dias', Causa: 'Folheto de 26/11 + paragem da L3', Estado: 'Em curso' },
            { SKU: 'Napolitana T00 10 kg', Cliente: 'Recheio', Cobertura: '6 dias', Causa: 'Procura HoReCa +22%', Estado: 'Em curso' },
            { SKU: 'Adriana Torti 500 g', Cliente: 'Kaufland CZ', Cobertura: '7 dias', Causa: 'Nova loja em Brno', Estado: 'Normal' },
            { SKU: 'Nacional Macarrão Riscado 500 g', Cliente: 'Continente', Cobertura: '9 dias', Causa: 'Promoção 2.ª unidade -50%', Estado: 'Normal' },
          ] },
        ch('sc6', 'OTIF por cliente (%)', 'YTD · entregas completas e a horas', 'hbar', ['OTIF'],
          [{ m: 'Mercadona (MDD)', OTIF: 97.8 }, { m: 'Panificação Douro', OTIF: 97.1 }, { m: 'Albert (CZ)', OTIF: 96.9 }, { m: 'Continente', OTIF: 96.4 }, { m: 'Kaufland (CZ)', OTIF: 95.6 }, { m: 'Lidl Portugal', OTIF: 95.2 }, { m: 'Recheio', OTIF: 94.7 }, { m: 'Pingo Doce', OTIF: 93.1 }],
          'O Pingo Doce está abaixo do contrato (95%) por falhas de janela de descarga à segunda-feira na plataforma do Sul.',
          'Se as entregas de segunda passarem para domingo à noite, o OTIF sobe para 95,6%.',
          'Propor ao Pingo Doce uma janela noturna fixa ao domingo.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-rut', 'Prevenção de rutura em loja', 'auto', 'Cobertura prevista < 5 dias num cliente estratégico', 'Evita €84 mil de venda perdida', [
            ['Sinal', 'Stock partilhado do Pingo Doce: Milaneza Esparguete 500 g com 4 dias de cobertura.'],
            ['Diagnóstico', 'Folheto de 26/11 (+38% de vendas) e humidade fora de padrão na linha L3 da Maia II.'],
            ['Ação', 'Transferidas 6 paletes do armazém de Lisboa e antecipada a carga de quinta-feira.'],
            ['Confirmação', 'DESADV enviado por EDI ao Pingo Doce; cobertura passa a 11 dias.'],
          ], { domain: 'Supply Chain', last: 'hoje 07:55' }),
        ] },
      ],
    },
    {
      id: 'servico', label: 'Serviço ao Cliente', icon: 'Headset', blocks: [
        { t: 'kpis', items: [
          k('Encomendas por dia', '1 860', 'CPA + Moagens + CZ + ES', true, true),
          k('Encomendas sem intervenção manual', '78%', '+21 pp a/a', true, true, spark(9, 62, 3, 0.25)),
          k('Tempo médio de resposta (WhatsApp)', '6 min', 'antes: 2 h 10 min', false, true),
          k('Reclamações logísticas por mil encomendas', '3,2', '-28% a/a', false, true),
        ] },
        { t: 'funnel', title: 'Encomendas por canal (outubro)', sub: 'Serviço ao Cliente CPA e CM', stages: [
          ['EDI (retalho moderno)', 31400, '54%'], ['Portal de Clientes', 11900, '20%'], ['WhatsApp com IA (padarias)', 8300, '14%'], ['E-mail com IA', 4600, '8%'], ['Telefone', 2300, '4%']] },
        ch('sc7', 'Encomendas tratadas pelo agente (WhatsApp + e-mail)', 'Por semana · Cerealis Moagens', 'bar', ['Automáticas', 'Com revisão humana'],
          rows(['S36', 'S37', 'S38', 'S39', 'S40', 'S41', 'S42', 'S43', 'S44', 'S45', 'S46', 'S47'], { 'Automáticas': [1610, 1680, 1745, 1810, 1902, 1964, 2020, 2085, 2140, 2198, 2265, 2310], 'Com revisão humana': [610, 590, 560, 540, 515, 488, 462, 440, 421, 404, 390, 371] }),
          '86% das mensagens de padarias são convertidas em encomenda SAP sem intervenção; as restantes têm produtos ambíguos ("a farinha do costume").',
          'Com o histórico por cliente, a automação chega a 90% em janeiro.',
          'Ligar o agente ao histórico de 24 meses de cada padaria.'),
        { t: 'agents', items: [
          ag('ag-wapp', 'Encomendas WhatsApp das padarias', 'auto', 'Mensagem recebida no WhatsApp do Serviço ao Cliente CM', '1 h 50 min mais rápido · 0 erros de código', [
            ['Sinal', '"Bom dia, para amanhã 40 sacos de T65 e 10 de Napolitana T00 para a padaria de Gaia." — Panificação Douro.'],
            ['Interpretação', 'Cortex identifica cliente, morada de entrega e SKUs (Nacional T65 25 kg; Napolitana T00 10 kg).'],
            ['Validação', 'Crédito disponível, stock no Porto e rota de quinta-feira com espaço.'],
            ['Ação', 'Encomenda 4512887 criada no SAP e confirmação enviada por WhatsApp com a janela 7h–9h.'],
          ], { domain: 'Serviço ao Cliente', last: 'há 4 min' }),
          ag('ag-recl', 'Reclamação logística com reembolso', 'humano', 'Reclamação com pedido de crédito > €2 500', 'Resolução em 1 dia (antes: 9)', [
            ['Sinal', 'Recheio de Braga reporta 3 paletes de Milaneza com filme danificado.'],
            ['Diagnóstico', 'Fotografias analisadas pelo Cortex: dano no transporte, transportadora T-17.'],
            ['Recomendação', 'Nota de crédito de €2 980 ao cliente e imputação à transportadora.'],
            ['Aprovação humana', 'Validação do responsável do Serviço ao Cliente.'],
            ['Ação', 'Nota de crédito emitida no SAP e débito à transportadora registado.'],
          ], { approver: 'Rui Matos — Responsável Serviço ao Cliente CPA', domain: 'Serviço ao Cliente', last: 'ontem' }),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Há risco de rutura esta semana?', a: 'Sim, num SKU estratégico: **Milaneza Esparguete 500 g no Pingo Doce** com **4 dias de cobertura** (folheto de 26/11 e paragem da linha L3). O agente de rutura já transferiu **6 paletes de Lisboa** e a cobertura passa a **11 dias**. Outros dois casos estão em acompanhamento: Napolitana T00 no Recheio e Adriana Torti no Kaufland.' },
    { q: 'Como está a precisão da previsão?', a: 'A precisão está em **92,2%** (MAPE 7,8%) ao nível SKU × cliente × semana, **+4,6 pp** face a 2025.\n• Melhor família: farinhas industriais (95,2%)\n• Pior: bolachas (86,1%) por causa das promoções\n• O plano em Excel tinha 6,8% de erro mensal vs. 2,1% do Cortex' },
    { q: 'Quanto fundo de maneio libertámos?', a: 'Desde janeiro libertámos **€6,9 M** em stock: os dias de produto acabado caíram de **37 para 31**. O stock está em **€41,8 M**, incluindo €6,1 M da Pasta VB3 consolidada em abril.' },
    { q: 'Quantas encomendas são automáticas?', a: '**78%** das 1 860 encomendas diárias entram sem intervenção manual: EDI (54%), portal (20%) e os agentes de WhatsApp e e-mail (22%). O tempo de resposta às padarias caiu de 2 h 10 min para **6 minutos**.' },
  ],
};
