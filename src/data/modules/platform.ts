import type { Module, Model, Agent } from '../types';
import { k, ch, rows, pie, MONTHS, spark } from '../gen';
import { GROUP } from '../facts';

export const VALUE_CASES: [string, number, number, string][] = [
  // caso de uso, valor em regime (€ M/ano), capturado YTD (€ M), função
  ['Compra inteligente de trigo duro e mole', 3.4, 2.7, 'Compras & Cereais'],
  ['Preço, promoções e mix com os retalhistas', 2.6, 1.4, 'Comercial'],
  ['Previsão de procura e S&OP', 1.9, 1.3, 'Supply Chain'],
  ['Energia na secagem e na moagem', 1.3, 0.9, 'Operações'],
  ['Mistura ótima de trigos na moagem', 1.1, 0.7, 'Moagens'],
  ['Manutenção preditiva', 1.0, 0.5, 'Operações'],
  ['Qualidade e reclamações', 0.6, 0.2, 'Qualidade'],
  ['Encomendas, fecho e reporte automáticos', 0.5, 0.2, 'Finanças · Serviço ao Cliente'],
];

export function buildIA(models: Model[], agents: Agent[]): Module {
  const prod = models.filter(m => m.status === 'Produção').length;
  const auto = agents.filter(a => a.mode === 'auto').length;
  return {
    slug: 'ia', name: 'Centro de IA & Agentes', short: 'Centro de IA & Agentes', icon: 'Sparkles', color: '#29B5E8', group: 'plataforma',
    tagline: 'Modelos de machine learning, agentes Cortex e Snowflake Intelligence — valor medido caso a caso',
    owner: 'Ricardo Almeida — Diretor de Dados e IA',
    sources: ['Snowflake Model Registry', 'Cortex Agents', 'Snowflake Intelligence', 'Cortex Search', 'Registo de auditoria de agentes'],
    sections: [
      {
        id: 'geral', label: 'Visão geral', icon: 'LayoutGrid', blocks: [
          { t: 'kpis', items: [
            k('Valor capturado em 2026', `€${GROUP.valueYTD.toLocaleString('pt-PT')} M`, `regime: €${GROUP.valueRunRate.toLocaleString('pt-PT')} M/ano`, true, true, spark(121, 4, 0.6, 0.9)),
            k('Modelos de ML', String(models.length), `${prod} em produção`, true, true),
            k('Agentes Cortex', String(agents.length), `${auto} autónomos · ${agents.length - auto} com humano`, true, true),
            k('Ações de agentes em 2026', '1 280', '97,1% sem reversão', true, true),
          ] },
          ch('ia1', 'Valor por caso de uso (€ M)', 'Capturado em 2026 vs. valor anual em regime', 'hbar', ['Capturado 2026', 'Em regime'],
            VALUE_CASES.map(([m, r, c]) => ({ m, 'Capturado 2026': c, 'Em regime': r })),
            'A compra de trigo já capturou 79% do valor em regime; o revenue management está a meio (54%).',
            `Valor total em regime: €${GROUP.valueRunRate.toLocaleString('pt-PT')} M/ano a partir do 2.º semestre de 2027.`,
            'Acelerar o revenue management com os calendários promocionais partilhados pelos retalhistas.', { colors: ['#F0A800', '#121210'], height: 300 }),
          ch('ia2', 'Ações executadas por agentes (por mês)', 'Autónomas vs. aprovadas por humanos', 'stack', ['Autónomas', 'Aprovadas por humanos'],
            rows(MONTHS.slice(2), { 'Autónomas': [44, 56, 70, 83, 97, 110, 119, 128, 141, 150], 'Aprovadas por humanos': [13, 16, 21, 24, 28, 31, 33, 35, 39, 42] }),
            'O volume de ações cresceu 3,4× desde janeiro; 22% das ações passam por aprovação humana.',
            'Previsão de 230 ações em dezembro com os agentes de Venta de Baños.',
            'Promover a autónomos os 2 agentes com 100% de aprovação nos últimos 90 dias.'),
          { t: 'insights', items: [
            { tone: 'ok', title: 'Confiança medida', text: 'Cada ação de agente fica registada com dados de entrada, raciocínio, aprovador e resultado — auditável pela Qualidade, Finanças e auditores externos.', tag: 'Horizon · auditoria' },
            { tone: 'info', title: 'IA onde os dados estão', text: 'Os modelos treinam e correm dentro do Snowflake: nenhum dado de clientes, receitas ou pessoas sai da plataforma.', tag: 'Snowpark · Cortex' },
            { tone: 'warn', title: 'Drift a acompanhar', text: 'Dois modelos com drift ligeiro (preço do trigo e risco de abandono B2B) — re-treino agendado para dezembro.', tag: 'Model Registry' },
          ] },
        ],
      },
      { id: 'modelos', label: 'Modelos de ML', icon: 'Cpu', blocks: [{ t: 'models', items: models, title: `Catálogo de modelos · ${models.length} modelos` }] },
      {
        id: 'agentes', label: 'Agentes', icon: 'Bot', blocks: [
          { t: 'table', title: 'Catálogo de agentes Cortex', sub: 'Todos os domínios', span: true, status: ['Modo'],
            columns: ['Agente', 'Domínio', 'Modo', 'Gatilho', 'Impacto', 'Última execução'],
            rows: agents.map(a => ({ Agente: a.name, 'Domínio': a.domain ?? '—', Modo: a.mode === 'auto' ? 'Autónomo · ativo' : 'Humano no circuito · aguarda', Gatilho: a.trigger, Impacto: a.impact, 'Última execução': a.last ?? '—' })) },
        ],
      },
      {
        id: 'intelligence', label: 'Snowflake Intelligence', icon: 'MessageSquare', blocks: [
          { t: 'kpis', items: [
            k('Utilizadores ativos', '214', 'de 3 países', true, true),
            k('Perguntas por semana', '3 900', '+18% m/m', true, true),
            k('Respostas com consulta verificada', '94%', '412 consultas certificadas', true, true),
            k('Modelos semânticos', '16', 'um por domínio', true, true),
          ] },
          ch('ia3', 'Perguntas por domínio (30 dias)', 'Assistente Espiga', 'pie', ['v'],
            pie([['Comercial', 27], ['Supply Chain', 19], ['Operações', 16], ['Finanças', 13], ['Compras', 9], ['Qualidade', 7], ['Pessoas', 5], ['Outros', 4]]),
            'Os gestores de cliente são os utilizadores mais ativos (perguntas sobre sell-out e promoções).',
            'Previsão de 5 000 perguntas por semana em janeiro com a abertura a Venta de Baños.',
            'Certificar mais 40 consultas de Venta de Baños em espanhol.', { ratio: true }),
          { t: 'table', title: 'Perguntas mais feitas esta semana', sub: 'Com consulta verificada no modelo semântico', columns: ['Pergunta', 'Modelo semântico', 'Utilizadores'],
            rows: [
              { Pergunta: 'Qual o sell-out da Milaneza no Continente esta semana?', 'Modelo semântico': 'SV_COMERCIAL', Utilizadores: 38 },
              { Pergunta: 'Que SKUs estão em risco de rutura?', 'Modelo semântico': 'SV_SUPPLY', Utilizadores: 31 },
              { Pergunta: 'Qual o OEE da Maia II hoje?', 'Modelo semântico': 'SV_OPERACOES', Utilizadores: 27 },
              { Pergunta: 'Qual a cobertura de trigo duro?', 'Modelo semântico': 'SV_COMPRAS', Utilizadores: 19 },
              { Pergunta: 'Quanto vendeu a Adriana no Albert?', 'Modelo semântico': 'SV_CEREALIS_CZ', Utilizadores: 14 },
            ] },
        ],
      },
    ],
    questions: [
      { q: 'Quanto valor gerou a IA este ano?', a: `**€${GROUP.valueYTD.toLocaleString('pt-PT')} M** capturados em 2026, de um valor em regime de **€${GROUP.valueRunRate.toLocaleString('pt-PT')} M/ano**. O maior contributo é a compra inteligente de trigo (€2,7 M), seguida das promoções (€1,4 M) e da previsão de procura (€1,3 M).` },
      { q: 'Quantos agentes estão ativos?', a: `**${agents.length} agentes**: ${auto} autónomos e ${agents.length - auto} com humano no circuito. Executaram **1 280 ações** em 2026, com 97,1% sem reversão. Todas as ações ficam auditadas.` },
      { q: 'Que modelos precisam de re-treino?', a: 'Dois modelos com **drift ligeiro**: a previsão de preço do trigo (nova colheita canadiana) e o risco de abandono B2B das padarias. O re-treino está agendado para dezembro.' },
    ],
  };
}

export const dados: Module = {
  slug: 'dados', name: 'Dados & Governança', short: 'Dados & Governança', icon: 'Database', color: '#11567F', group: 'plataforma',
  tagline: 'Produtos de dados, integração, Snowflake Horizon, arquitetura e consumo — uma só plataforma para os 3 países',
  owner: 'Ricardo Almeida — Diretor de Dados e IA',
  sources: ['Snowflake Horizon', 'Openflow', 'Snowpipe Streaming', 'Dynamic Tables', 'Account Usage'],
  sections: [
    {
      id: 'produtos', label: 'Produtos de dados', icon: 'Boxes', blocks: [
        { t: 'kpis', items: [
          k('Produtos de dados certificados', '42', '+11 desde a VB3', true, true),
          k('Consumidores internos', '640', 'pessoas e aplicações', true, true),
          k('Frescura média', '4 min', 'produção e qualidade em tempo real', false, true),
          k('Testes de qualidade de dados', '99,2%', 'aprovados · 2 870 testes/dia', true, true),
        ] },
        { t: 'table', title: 'Produtos de dados mais usados', sub: 'Certificados e com dono de negócio', span: true, bars: ['Qualidade'], status: ['Estado'],
          columns: ['Produto de dados', 'Domínio', 'Dono', 'Frescura', 'Consumidores', 'Qualidade', 'Estado'],
          rows: [
            { 'Produto de dados': 'Vendas diárias consolidadas (4 empresas)', 'Domínio': 'Comercial', Dono: 'João Pedro Sá', Frescura: '15 min', Consumidores: 188, Qualidade: 99, Estado: 'Certificado' },
            { 'Produto de dados': 'Genealogia de lote (navio → loja)', 'Domínio': 'Qualidade', Dono: 'Teresa Antunes', Frescura: 'tempo real', Consumidores: 64, Qualidade: 100, Estado: 'Certificado' },
            { 'Produto de dados': 'OEE e eventos de linha', 'Domínio': 'Operações', Dono: 'Luís Magalhães', Frescura: '1 min', Consumidores: 121, Qualidade: 98, Estado: 'Certificado' },
            { 'Produto de dados': 'Previsão de procura SKU × cliente', 'Domínio': 'Supply Chain', Dono: 'Carla Vieira', Frescura: 'diária', Consumidores: 97, Qualidade: 97, Estado: 'Certificado' },
            { 'Produto de dados': 'Preços de cereais, câmbio e frete', 'Domínio': 'Compras', Dono: 'Nuno Ferraz', Frescura: '15 min', Consumidores: 22, Qualidade: 99, Estado: 'Certificado' },
            { 'Produto de dados': 'Sell-out partilhado (Sonae MC, JM)', 'Domínio': 'Comercial', Dono: 'João Pedro Sá', Frescura: 'diária', Consumidores: 73, Qualidade: 96, Estado: 'Certificado' },
            { 'Produto de dados': 'Pessoas e turnos (mascarado)', 'Domínio': 'Pessoas', Dono: 'Isabel Moura', Frescura: 'horária', Consumidores: 41, Qualidade: 95, Estado: 'Certificado' },
            { 'Produto de dados': 'Métricas ESRS (CSRD)', 'Domínio': 'ESG', Dono: 'Rita Sampaio', Frescura: 'mensal', Consumidores: 18, Qualidade: 94, Estado: 'Em revisão' },
          ] },
      ],
    },
    {
      id: 'integracao', label: 'Fontes & integração', icon: 'Cable', blocks: [
        { t: 'flow', title: 'Da fonte à decisão', sub: 'Arquitetura de referência da Espiga', nodes: [
          { label: 'Fontes', value: '31 sistemas', sub: '3 ERPs, MES, SCADA, LIMS, EDI', status: 'ok' },
          { label: 'Ingestão', value: 'Openflow + Snowpipe', sub: 'CDC e streaming', status: 'ok' },
          { label: 'Bronze → Gold', value: 'Dynamic Tables', sub: '1 240 tabelas', status: 'ok' },
          { label: 'Semântica', value: '16 modelos', sub: 'semantic views por domínio', status: 'ok' },
          { label: 'IA & apps', value: 'Cortex + Streamlit', sub: 'Espiga, agentes, Intelligence', status: 'ok' },
        ] },
        { t: 'table', title: 'Fontes ligadas', sub: 'Latência e volume diário', span: true, status: ['Estado'],
          columns: ['Fonte', 'Local', 'Método', 'Latência', 'Volume/dia', 'Estado'],
          rows: [
            { Fonte: 'SAP S/4HANA (CPA e CM)', Local: 'Maia', 'Método': 'Openflow (CDC)', 'Latência': '< 5 min', 'Volume/dia': '38 M linhas', Estado: 'Normal' },
            { Fonte: 'Helios (Cerealis a.s.)', Local: 'Litovel', 'Método': 'Openflow (JDBC)', 'Latência': '15 min', 'Volume/dia': '4,1 M linhas', Estado: 'Normal' },
            { Fonte: 'SAP S/4HANA (VB3)', Local: 'Venta de Baños', 'Método': 'Openflow (CDC)', 'Latência': '< 5 min', 'Volume/dia': '6,8 M linhas', Estado: 'Normal' },
            { Fonte: 'MES · 19 linhas de massa', Local: 'Maia, Litovel, VdB', 'Método': 'Snowpipe Streaming', 'Latência': '< 10 s', 'Volume/dia': '410 M eventos', Estado: 'Normal' },
            { Fonte: 'SCADA das moagens', Local: 'Lisboa e Porto', 'Método': 'Snowpipe Streaming', 'Latência': '< 10 s', 'Volume/dia': '96 M eventos', Estado: 'Normal' },
            { Fonte: 'LIMS', Local: 'Todos os centros', 'Método': 'Openflow', 'Latência': '5 min', 'Volume/dia': '18 mil análises', Estado: 'Normal' },
            { Fonte: 'EDI (retalhistas)', Local: 'Grupo', 'Método': 'Snowpipe', 'Latência': '2 min', 'Volume/dia': '31 mil mensagens', Estado: 'Normal' },
            { Fonte: 'NielsenIQ e Kantar', Local: 'PT · CZ', 'Método': 'Data Sharing', 'Latência': 'semanal', 'Volume/dia': '—', Estado: 'Normal' },
            { Fonte: 'Euronext, meteorologia, frete', Local: 'Marketplace', 'Método': 'Data Sharing', 'Latência': '15 min', 'Volume/dia': '—', Estado: 'Normal' },
            { Fonte: 'Contadores de energia (OT)', Local: '6 centros', 'Método': 'Snowpipe Streaming', 'Latência': '1 min', 'Volume/dia': '22 M leituras', Estado: 'Atenção (Trofa)' },
          ] },
      ],
    },
    {
      id: 'governanca', label: 'Governança Horizon', icon: 'ShieldCheck', blocks: [
        { t: 'kpis', items: [
          k('Colunas classificadas automaticamente', '4 120', 'dados pessoais e sensíveis', true, true),
          k('Políticas de mascaramento', '86', 'RGPD · por função e país', true, true),
          k('Cobertura de linhagem', '100%', 'até à fonte', true, true),
          k('Pedidos de acesso (média)', '3 h', 'antes: 5 dias', false, true),
        ] },
        { t: 'table', title: 'Políticas ativas', sub: 'Snowflake Horizon', span: true, status: ['Estado'],
          columns: ['Política', 'Tipo', 'Aplica-se a', 'Exemplo', 'Estado'],
          rows: [
            { 'Política': 'Dados pessoais de colaboradores', Tipo: 'Mascaramento dinâmico', 'Aplica-se a': 'Pessoas · 41 tabelas', Exemplo: 'Salário visível só para RH e chefia direta', Estado: 'Ativa' },
            { 'Política': 'Acesso por país', Tipo: 'Políticas de linha', 'Aplica-se a': 'Vendas, pessoas, finanças', Exemplo: 'Litovel só vê dados CZ/SK, salvo grupo', Estado: 'Ativa' },
            { 'Política': 'Receitas e fichas técnicas', Tipo: 'Etiquetas + mascaramento', 'Aplica-se a': 'I&D · 312 receitas', Exemplo: 'Percentagens ocultas fora de I&D e Qualidade', Estado: 'Ativa' },
            { 'Política': 'Dados partilhados por retalhistas', Tipo: 'Contrato de partilha', 'Aplica-se a': 'Sell-out Sonae MC e JM', Exemplo: 'Uso limitado à gestão de cliente', Estado: 'Ativa' },
            { 'Política': 'Dados de consumidores', Tipo: 'Mascaramento + retenção', 'Aplica-se a': 'Apoio ao Consumidor', Exemplo: 'Contactos apagados ao fim de 24 meses', Estado: 'Ativa' },
            { 'Política': 'Ações de agentes', Tipo: 'Auditoria', 'Aplica-se a': 'Todos os agentes Cortex', Exemplo: 'Entrada, decisão, aprovador e resultado', Estado: 'Ativa' },
          ] },
      ],
    },
    {
      id: 'consumo', label: 'Consumo & FinOps', icon: 'Gauge', blocks: [
        { t: 'kpis', items: [
          k('Consumo mensal', '€38 mil', '−6% vs. orçamento', false, true),
          k('Custo por utilizador ativo', '€59/mês', '−12% a/a', false, true),
          k('Warehouses com auto-suspensão', '100%', '14 warehouses', true, true),
          k('Retorno da plataforma', '17×', 'valor capturado / custo', true, true),
        ] },
        ch('dg1', 'Consumo por domínio (€ mil/mês)', 'Warehouses e serviços Cortex', 'stack', ['Ingestão e transformação', 'BI e Intelligence', 'ML e agentes', 'Partilha e outros'],
          rows(MONTHS.slice(2), { 'Ingestão e transformação': [11, 12, 12, 15, 15, 16, 15, 15, 16, 16], 'BI e Intelligence': [6, 7, 7, 8, 9, 9, 9, 9, 10, 10], 'ML e agentes': [5, 6, 6, 7, 8, 8, 8, 9, 9, 9], 'Partilha e outros': [2, 2, 2, 3, 3, 3, 3, 3, 3, 3] }),
          'O consumo subiu com a integração da VB3 em abril e estabilizou em €38 mil/mês.',
          'Previsão de €41 mil/mês em 2027 com os agentes de Venta de Baños.',
          'Ativar o cache de resultados nos painéis executivos (−8% em BI).', { ratio: true, span: true }),
      ],
    },
  ],
  questions: [
    { q: 'Quantas fontes estão ligadas?', a: '**31 sistemas** nos 3 países: SAP S/4HANA da Maia e de Venta de Baños, Helios de Litovel, MES de 19 linhas de massa, SCADA das moagens, LIMS, EDI dos retalhistas e dados do Marketplace. O MES e o SCADA chegam em **menos de 10 segundos**.' },
    { q: 'Como estão protegidos os dados pessoais?', a: 'Com **Snowflake Horizon**: 4 120 colunas classificadas automaticamente, **86 políticas de mascaramento** e políticas de linha por país. Por exemplo, o salário só é visível para RH e chefia direta, e Litovel só vê dados da Chéquia e da Eslováquia.' },
    { q: 'Quanto custa a plataforma?', a: 'Cerca de **€38 mil por mês** (−6% face ao orçamento), ou €59 por utilizador ativo. Com €7,9 M de valor capturado em 2026, o retorno é de cerca de **17×**.' },
  ],
};
