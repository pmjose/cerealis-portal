import type { QA } from './types';

export type Tone = 'ok' | 'warn' | 'crit' | 'info';
export type Customer = {
  id: string; name: string; group: string; segment: string; unit: string; country: string; city: string; since: string;
  kam: string; buyer: string; ytd: number; growth: string; margin: string; otif: number; risk: 'Baixo' | 'Médio' | 'Alto';
  dso: number; skus: number; promoRoi: string; claims: string; shareOfWallet: string; color: string;
  monthly: number[]; mix: [string, number][]; topSkus: [string, string, string][];
  timeline: [string, string, Tone][]; actions: [string, string][]; summary: string; dataShare: string; questions: QA[];
};
export type Product = {
  id: string; name: string; brand: string; category: string; ean: string; plant: string; line: string; format: string; img?: string;
  ytd: string; volume: string; margin: string; price: string; nutri: 'A' | 'B' | 'C' | 'D'; share: string; ppm: number; shelf: string;
  ingredients: string; allergens: string; /** vendas mensais em € mil (nov/25–out/26) */ monthly: number[]; /** previsão em € mil (nov/26–abr/27) */ forecast: number[]; channels: [string, number][];
  quality: [string, string, string, 'ok' | 'warn'][]; carbon: string; trace?: boolean; summary: string; questions: QA[];
};
export type Employee = {
  id: string; name: string; role: string; site: string; unit: string; since: string; shift: string; manager: string;
  skills: [string, number][]; training: number; certs: string[]; safety: string; absence: string; engagement: string;
  goals: [string, number][]; timeline: [string, string, Tone][]; summary: string; questions: QA[];
};
export type Sensor = { label: string; value: string; status: 'ok' | 'aviso' | 'critico'; unit: number };
export type Asset = {
  id: string; name: string; kind: 'moinho' | 'linha' | 'extrusora' | 'forno' | 'silo'; site: string; maker: string; model: string; year: number;
  health: number; rul: string; status: 'ok' | 'aviso' | 'critico'; mtbf: string; availability: string; energy: string; throughput: string;
  sensors: Sensor[]; trend: number[]; trendLabel: string; trendLimit: number;
  workOrders: [string, string, string, string][]; prediction: { failProb: string; driver: string; action: string; saving: string };
  summary: string; questions: QA[];
};

/* ───────────── Clientes ───────────── */
export const customers: Customer[] = [
  {
    id: 'continente', name: 'Continente (Sonae MC)', group: 'Sonae MC', segment: 'Retalho moderno', unit: 'Produtos Alimentares', country: 'Portugal', city: 'Maia · plataforma da Azambuja',
    since: '1985', kam: 'Pedro Gonçalves', buyer: 'Direção de Compras Mercearia', ytd: 30.2, growth: '+4,1%', margin: '28,4%', otif: 96.4, risk: 'Baixo', dso: 52, skus: 184, promoRoi: '1,7', claims: '0,8 por mil encomendas', shareOfWallet: '31% da mercearia de massas', color: '#D3122E',
    monthly: [2.71, 2.98, 2.82, 2.79, 2.98, 2.86, 3.05, 2.94, 2.97, 3.04, 3.21, 3.54],
    mix: [['Massas Milaneza', 38], ['Massas Nacional', 12], ['Cereais e barras', 17], ['Bolachas', 13], ['Farinhas culinárias', 9], ['Del Mondo', 6], ['MDD', 5]],
    topSkus: [['Milaneza Esparguete 500 g', '€3,1 M', '+3%'], ['Milaneza Laços 500 g', '€1,4 M', '+9%'], ['Nacional Corn Flakes Sem Açúcar', '€0,9 M', '+46%'], ['Nacional Bolacha Alfa 200 g', '€0,8 M', '+2%'], ['Del Mondo Penne Rigate 500 g', '€0,6 M', '+31%']],
    timeline: [['20/11', 'Sell-out partilhado: Milaneza longas +18% com a promoção 2.ª unidade −50%', 'ok'], ['14/11', 'Reunião de plano de negócio 2027 — proposta de 3 novas referências Del Mondo', 'info'], ['06/11', 'OTIF de 98,1% na plataforma da Azambuja em outubro', 'ok'], ['28/10', 'Pedido de entregas noturnas para o Natal', 'warn']],
    actions: [['Plano de Natal', 'Garantir 2 turnos extra de massa longa na Maia II (semana 49)'], ['Del Mondo', 'Propor paccheri e orecchiette em 120 lojas'], ['Sell-out', 'Alargar a partilha de dados a stock por loja (hoje: por plataforma)']],
    summary: 'Cliente estratégico n.º 2 do grupo e n.º 1 em Portugal. Crescimento sólido (+4,1%) puxado pela Milaneza e pelo Corn Flakes Sem Açúcar. A partilha diária de sell-out via Snowflake Data Sharing melhorou a previsão em 4 pp e o OTIF para 96,4%.',
    dataShare: 'Sell-out diário por plataforma e stock de loja via Snowflake Data Sharing desde março de 2026',
    questions: [
      { q: 'Como está a relação com o Continente?', a: 'Muito sólida: **€30,2 M YTD (+4,1%)**, margem de 28,4% e OTIF de **96,4%**. O sell-out partilhado mostra a Milaneza longas a crescer 18% com a promoção 2.ª unidade −50% (ROI 1,9).' },
      { q: 'Que oportunidades temos no Continente?', a: '• **Del Mondo** em mais 120 lojas (paccheri e orecchiette)\n• **Corn Flakes Sem Açúcar 750 g** (formato familiar)\n• Partilha de stock **por loja** para reduzir ruturas no Natal' },
      { q: 'Há riscos para o Natal?', a: 'O Continente pediu entregas noturnas e a Maia II estará a **97% de ocupação** na semana 49. O plano S&OP prevê 2 turnos extra de massa longa.' },
    ],
  },
  {
    id: 'mercadona', name: 'Mercadona (MDD)', group: 'Mercadona', segment: 'Retalho moderno · marca do distribuidor', unit: 'Pasta VB3 · Produtos Alimentares', country: 'Espanha · Portugal', city: 'Plataformas Mercadona (Centro) · Póvoa de Varzim',
    since: 'abr/2026 (via VB3)', kam: 'Javier Ortega', buyer: 'Proveedor Totaler · categoria pasta', ytd: 33.9, growth: 'perímetro novo', margin: '17,9%', otif: 97.8, risk: 'Médio', dso: 38, skus: 46, promoRoi: '—', claims: '0,4 por mil encomendas', shareOfWallet: 'fornecedor principal de massa MDD', color: '#17924B',
    monthly: [0.55, 0.58, 0.56, 0.55, 0.58, 4.55, 4.66, 4.62, 4.71, 4.48, 4.72, 4.47],
    mix: [['Massas curtas MDD', 46], ['Massas longas MDD', 31], ['Massas especiais MDD', 11], ['Massas Portugal (MDD)', 12]],
    topSkus: [['Macarrón MDD 1 kg', '€6,8 M', '—'], ['Espagueti MDD 1 kg', '€5,9 M', '—'], ['Hélices MDD 500 g', '€3,2 M', '—'], ['Fideos MDD 500 g', '€2,6 M', '—'], ['Massa MDD Portugal 500 g', '€4,1 M', '—']],
    timeline: [['18/11', 'Auditoria de fornecedor aprovada sem desvios', 'ok'], ['04/11', 'Pedido de capacidade adicional de 4 000 t para 2027', 'info'], ['22/10', 'Revisão de preço indexada ao trigo duro aplicada (−1,8%)', 'warn']],
    actions: [['Capacidade 2027', 'Reservar 4 000 t na L4 de Venta de Baños'], ['Concentração', 'Equilibrar com 2 novos clientes MDD (Carrefour, DIA)'], ['Integração', 'Ligar o EDI Mercadona ao agente de previsão do grupo']],
    summary: 'Maior cliente do grupo desde a integração da Pasta VB3 (10,4% das vendas). Relação de parceria de longo prazo com preço indexado ao trigo duro. Risco médio por concentração: 48% das vendas de Venta de Baños.',
    dataShare: 'Previsões e encomendas por EDI; partilha de dados de procura em avaliação',
    questions: [
      { q: 'Quanto pesa a Mercadona no grupo?', a: '**€33,9 M YTD (10,4% do grupo)** — é o maior cliente desde abril. Em Venta de Baños representa **48% das vendas**. A margem é de 17,9%, típica da MDD, com preço indexado ao trigo duro.' },
      { q: 'Que pedido temos para 2027?', a: 'A Mercadona pediu **4 000 t de capacidade adicional** para 2027. O Cortex recomenda reservar a linha L4 de Venta de Baños e, em paralelo, abrir 2 novos clientes MDD para reduzir a concentração.' },
    ],
  },
  {
    id: 'pingo-doce', name: 'Pingo Doce (Jerónimo Martins)', group: 'Jerónimo Martins', segment: 'Retalho moderno', unit: 'Produtos Alimentares', country: 'Portugal', city: 'Plataformas Norte e Sul',
    since: '1980', kam: 'Sofia Carvalho', buyer: 'Direção de Compras Mercearia Salgada e Doce', ytd: 23.9, growth: '+2,6%', margin: '27,1%', otif: 93.1, risk: 'Médio', dso: 58, skus: 152, promoRoi: '1,2', claims: '1,9 por mil encomendas', shareOfWallet: '27% da mercearia de massas', color: '#17924B',
    monthly: [2.18, 2.34, 2.30, 2.28, 2.37, 2.34, 2.40, 2.36, 2.38, 2.42, 2.50, 2.55],
    mix: [['Massas Milaneza', 35], ['Massas Nacional', 14], ['Cereais e barras', 19], ['Bolachas', 15], ['Farinhas culinárias', 10], ['Outros', 7]],
    topSkus: [['Milaneza Esparguete 500 g', '€2,6 M', '+1%'], ['Nacional Corn Flakes Sem Açúcar', '€0,8 M', '+52%'], ['Milaneza Laços 500 g', '€0,8 M', '+4%'], ['Nacional Macarrão Riscado 500 g', '€0,7 M', '−2%'], ['Nacional Bolacha Alfa 200 g', '€0,7 M', '+3%']],
    timeline: [['23/11', 'Rutura evitada: 6 paletes de Milaneza Esparguete transferidas de Lisboa', 'warn'], ['19/11', 'Promoção Corn Flakes −30% com ROI previsto de 0,7 — proposta alternativa enviada', 'warn'], ['10/11', 'OTIF de outubro: 92,8% (contrato: 95%)', 'crit'], ['02/11', 'Folheto de 26/11 confirmado com Milaneza longas', 'info']],
    actions: [['OTIF', 'Propor janela noturna fixa ao domingo na plataforma do Sul'], ['Promoção', 'Trocar −30% por 2.ª unidade −50% com degustação (ROI 1,4)'], ['Dados', 'Pedir partilha do calendário de folhetos via Data Sharing']],
    summary: 'Cliente n.º 3 do grupo. Crescimento de 2,6% mas com OTIF abaixo do contrato (93,1% vs. 95%) por falhas de janela de descarga à segunda-feira. Promoção de cereais com ROI negativo em revisão.',
    dataShare: 'Sell-out semanal partilhado via Snowflake Data Sharing desde junho de 2026',
    questions: [
      { q: 'Porque está o OTIF do Pingo Doce baixo?', a: 'O OTIF está em **93,1%** (contrato: 95%). 71% das falhas acontecem **à segunda-feira na plataforma do Sul**, por saturação das janelas de descarga. Com entregas ao domingo à noite, o OTIF previsto sobe para **95,6%**.' },
      { q: 'Que promoção devemos rever?', a: 'A promoção de **Corn Flakes Sem Açúcar a −30%** tem ROI previsto de **0,7** (canibalização de 41% da versão clássica). A alternativa "2.ª unidade −50% com degustação" tem ROI de **1,4** e foi enviada pela Sofia Carvalho.' },
      { q: 'Há risco de rutura no Pingo Doce?', a: 'Havia: **Milaneza Esparguete 500 g** com 4 dias de cobertura antes do folheto de 26/11. O agente transferiu **6 paletes de Lisboa** e a cobertura passou para 11 dias.' },
    ],
  },
  {
    id: 'lidl-pt', name: 'Lidl Portugal', group: 'Schwarz Gruppe', segment: 'Retalho moderno', unit: 'Produtos Alimentares', country: 'Portugal', city: 'Plataformas Norte e Centro',
    since: '1995', kam: 'Marta Leite', buyer: 'Compras Mercearia (Lidl PT)', ytd: 15.1, growth: '+7,9%', margin: '22,6%', otif: 95.2, risk: 'Baixo', dso: 30, skus: 41, promoRoi: '0,9', claims: '0,7 por mil encomendas', shareOfWallet: 'MDD e marcas Cerealis', color: '#0A8FD3',
    monthly: [1.31, 1.42, 1.42, 1.41, 1.45, 1.41, 1.49, 1.47, 1.55, 1.58, 1.62, 1.70],
    mix: [['MDD (massas e cereais)', 52], ['Milaneza', 24], ['Bolachas Nacional', 12], ['Cereais Nacional', 8], ['Outros', 4]],
    topSkus: [['Massas MDD 500 g (6 formatos)', '€5,4 M', '+9%'], ['Milaneza Esparguete 500 g', '€1,7 M', '+6%'], ['Cereais MDD 500 g', '€1,9 M', '+12%'], ['Nacional Bolacha Alfa 200 g', '€0,9 M', '+4%']],
    timeline: [['21/11', 'Pedido de cotação: cereais de chocolate MDD (420 t/ano)', 'info'], ['12/11', 'Promoção Bolacha Alfa leve 3 pague 2 com ROI de 0,9', 'warn'], ['03/11', 'Avaliação anual de fornecedor: A', 'ok']],
    actions: [['MDD cereais', 'Responder à cotação com €2,58/kg (margem 18,2%)'], ['Bolachas', 'Rever a mecânica promocional da Bolacha Alfa']],
    summary: 'Cliente em crescimento (+7,9%), com forte componente de MDD (52%). Pedido de cotação de cereais MDD em análise pelo agente de propostas.',
    dataShare: 'Encomendas por EDI; sem partilha de sell-out',
    questions: [{ q: 'Como está o Lidl?', a: '**€15,1 M YTD (+7,9%)**, com 52% em MDD e margem de 22,6%. Há uma cotação aberta para **420 t/ano de cereais de chocolate MDD**: o agente propôs €2,58/kg (margem 18,2%).' }],
  },
  {
    id: 'albert', name: 'Albert (Ahold Delhaize)', group: 'Ahold Delhaize', segment: 'Retalho moderno', unit: 'Cerealis a.s.', country: 'Chéquia', city: 'Praga · centros de distribuição de Jirny e Brno',
    since: '2004', kam: 'Petra Dvořáková', buyer: 'Kategorie trvanlivé potraviny', ytd: 9.8, growth: '+6,3%', margin: '26,8%', otif: 96.9, risk: 'Baixo', dso: 45, skus: 63, promoRoi: '1,6', claims: '0,5 por mil encomendas', shareOfWallet: '34% da categoria de massas', color: '#121210',
    monthly: [0.86, 0.94, 0.93, 0.90, 0.97, 0.94, 0.99, 0.97, 1.00, 1.01, 1.03, 1.06],
    mix: [['Adriana', 41], ['Zátkovy', 29], ['Rosické', 16], ['MDD', 14]],
    topSkus: [['Adriana Torti 500 g', '€1,3 M', '+18%'], ['Zátkovy Vaječné Kolínka 250 g', '€0,9 M', '+3%'], ['Adriana Funghetto 500 g', '€0,7 M', '+14%'], ['Rosické Fleky Velké 500 g', '€0,6 M', '−4%']],
    timeline: [['16/11', 'Adriana em topo de gôndola em 120 lojas — uplift de 117%', 'ok'], ['30/10', 'Plano conjunto 2027 com a Adriana Bronze', 'info']],
    actions: [['Adriana Bronze', 'Lançamento em março de 2027 com 120 lojas'], ['Rosické', 'Reposicionamento com embalagem nova']],
    summary: 'Principal cliente da Cerealis a.s. A Adriana cresce 18% com a execução em loja; a Rosické perde terreno para a MDD.',
    dataShare: 'Sell-out semanal (portal do retalhista) integrado no Snowflake',
    questions: [{ q: 'Como está a Adriana no Albert?', a: 'A Adriana vale **41% das nossas vendas no Albert** e cresce **18%** com o topo de gôndola em 120 lojas (uplift de 117%, ROI 1,6). Próximo passo: a Adriana Bronze em março de 2027.' }],
  },
  {
    id: 'kaufland-cz', name: 'Kaufland Česko', group: 'Schwarz Gruppe', segment: 'Retalho moderno', unit: 'Cerealis a.s.', country: 'Chéquia', city: 'Modřice (Brno)',
    since: '2006', kam: 'Petra Dvořáková', buyer: 'Nákup trvanlivé potraviny', ytd: 8.6, growth: '+3,2%', margin: '24,9%', otif: 95.6, risk: 'Baixo', dso: 40, skus: 48, promoRoi: '1,3', claims: '0,6 por mil encomendas', shareOfWallet: '29% da categoria de massas', color: '#C8102E',
    monthly: [0.78, 0.84, 0.82, 0.80, 0.85, 0.83, 0.86, 0.84, 0.86, 0.90, 0.91, 0.93],
    mix: [['Zátkovy', 36], ['Adriana', 31], ['Rosické', 19], ['MDD', 14]],
    topSkus: [['Zátkovy Vaječné Kolínka 250 g', '€1,1 M', '+2%'], ['Adriana Torti 500 g', '€0,9 M', '+11%'], ['Rosické Abeceda 500 g', '€0,5 M', '−3%']],
    timeline: [['15/11', 'Nova loja em Brno: Adriana Torti com 7 dias de cobertura', 'warn'], ['01/11', 'Acordo anual 2027 em negociação', 'info']],
    actions: [['Brno', 'Reforçar stock da nova loja'], ['Acordo 2027', 'Defender o preço da Zátkovy com dados de quota']],
    summary: 'Cliente estável (+3,2%), com a Zátkovy como marca principal. Nova loja em Brno com procura acima do previsto.',
    dataShare: 'Encomendas por EDI',
    questions: [{ q: 'Como está o Kaufland?', a: '**€8,6 M YTD (+3,2%)**. A Zátkovy é a marca principal (36%). A nova loja de Brno tem a Adriana Torti com 7 dias de cobertura — em acompanhamento.' }],
  },
  {
    id: 'recheio', name: 'Recheio Cash & Carry', group: 'Jerónimo Martins', segment: 'Cash & Carry', unit: 'Produtos Alimentares · Moagens', country: 'Portugal', city: '40 lojas',
    since: '1990', kam: 'Nuno Pacheco', buyer: 'Compras Alimentar e Food Service', ytd: 6.2, growth: '+5,5%', margin: '25,3%', otif: 94.7, risk: 'Baixo', dso: 44, skus: 96, promoRoi: '2,4', claims: '1,1 por mil encomendas', shareOfWallet: 'farinhas profissionais e massas', color: '#D99A00',
    monthly: [0.54, 0.58, 0.56, 0.57, 0.60, 0.59, 0.61, 0.60, 0.65, 0.62, 0.67, 0.73],
    mix: [['Napolitana', 28], ['Massas Milaneza (5 kg e 1 kg)', 31], ['Farinhas Nacional', 22], ['Outros', 19]],
    topSkus: [['Napolitana T00 10 kg', '€1,3 M', '+22%'], ['Milaneza Esparguete 5 kg (HoReCa)', '€0,7 M', '+6%'], ['Nacional T65 25 kg', '€0,6 M', '+1%']],
    timeline: [['22/11', 'Napolitana T00 com 6 dias de cobertura — procura HoReCa +22%', 'warn'], ['09/11', 'Promoção 1 por cada 10 com ROI de 2,4', 'ok'], ['30/10', 'Reclamação de 3 paletes com filme danificado (Braga) — crédito de €2 980', 'warn']],
    actions: [['Napolitana', 'Antecipar reposição de T00 10 kg'], ['HoReCa', 'Formações de pizza do Centro Técnico para clientes Recheio']],
    summary: 'Canal estratégico para a Napolitana e para o HoReCa. Promoções com o melhor ROI do grupo (2,4).',
    dataShare: 'Encomendas pelo Portal de Clientes',
    questions: [{ q: 'Como está a Napolitana no Recheio?', a: 'A **Napolitana T00 10 kg** cresce **22%** (€1,3 M YTD) puxada pelas pizzarias. A promoção "1 por cada 10" teve ROI de **2,4**. Atenção: cobertura de 6 dias — reposição antecipada em curso.' }],
  },
  {
    id: 'panificacao-douro', name: 'Panificação Douro, S.A.', group: 'Independente', segment: 'Panificação & Indústria', unit: 'Cerealis Moagens', country: 'Portugal', city: 'Vila Nova de Gaia · 4 fábricas',
    since: '2002', kam: 'Carlos Brandão', buyer: 'Direção de Produção e Compras', ytd: 4.7, growth: '−3,8%', margin: '12,4%', otif: 97.1, risk: 'Alto', dso: 61, skus: 9, promoRoi: '—', claims: '2 reclamações de força (out)', shareOfWallet: '64% (era 78%)', color: '#8C5A14',
    monthly: [0.46, 0.46, 0.49, 0.48, 0.50, 0.47, 0.48, 0.46, 0.47, 0.46, 0.44, 0.43],
    mix: [['Nacional T65 Panificação', 71], ['BIG W 300+', 17], ['Napolitana T00', 7], ['Centeio', 5]],
    topSkus: [['Nacional T65 granel', '€3,3 M', '−5%'], ['BIG W 320 25 kg', '€0,8 M', '+1%'], ['Napolitana T00 10 kg', '€0,3 M', '+12%']],
    timeline: [['21/11', 'Pedido de cotação a concorrente detetado pela equipa comercial', 'crit'], ['14/11', 'Encomenda por WhatsApp: 40 sacos T65 + 10 Napolitana T00', 'info'], ['28/10', '2 reclamações de força (W) da farinha T65', 'warn']],
    actions: [['Retenção', 'Visita técnica com ensaio de panificação no Centro Técnico'], ['Preço', 'Ajuste de 1,2% na T65 com contrato de 12 meses'], ['Qualidade', 'Mistura dedicada W 240–250 para as 4 fábricas']],
    summary: 'Maior cliente de panificação da Moagens, em risco alto de abandono: frequência de encomenda −22% e pedido de cotação a um concorrente. Preço 2,1% acima do mercado na T65.',
    dataShare: 'Encomendas por WhatsApp com agente Cortex e Portal de Clientes',
    questions: [
      { q: 'Porque está a Panificação Douro em risco?', a: 'Três sinais: **frequência de encomenda −22%** em 8 semanas, **pedido de cotação a um concorrente** e **2 reclamações de força** da T65 em outubro. O nosso preço está **2,1% acima do mercado**. Risco de abandono: **0,78**.' },
      { q: 'O que propõe o agente de retenção?', a: '• Visita técnica com ensaio de panificação no Centro Técnico\n• Ajuste de **1,2%** no preço da T65 com contrato de 12 meses\n• Mistura dedicada W 240–250 para as 4 fábricas\nAguarda aprovação de Fernando Calheiros.' },
    ],
  },
];

/* ───────────── Produtos ───────────── */
export const products: Product[] = [
  {
    id: 'milaneza-esparguete', name: 'Milaneza Esparguete 500 g', brand: 'Milaneza', category: 'Massas longas', ean: '5601021 004128', plant: 'Maia II', line: 'L3 · massa longa', format: 'Pacote 500 g · 20 un./caixa', img: 'milaneza.webp',
    ytd: '€9,8 M', volume: '5 320 t', margin: '39,6%', price: '€1,84/kg', nutri: 'A', share: '7,9% das massas secas PT', ppm: 6.1, shelf: '36 meses',
    ingredients: 'Sêmola de trigo duro, água.', allergens: 'Glúten. Pode conter vestígios de ovo.',
    monthly: [920, 1010, 960, 940, 980, 950, 990, 940, 960, 970, 1010, 1060], forecast: [1110, 1180, 980, 950, 1000, 970],
    channels: [['Continente', 32], ['Pingo Doce', 27], ['Lidl', 17], ['Intermarché', 8], ['Auchan', 6], ['Exportação', 6], ['Outros', 4]],
    quality: [['Humidade', '12,2%', '≤ 12,5%', 'ok'], ['Proteína', '13,1%', '≥ 12,5%', 'ok'], ['DON', '290 µg/kg', '≤ 600 µg/kg', 'ok'], ['Massa partida', '1,8%', '≤ 1,5%', 'warn'], ['Tempo de cozedura', '9 min', '8–10 min', 'ok']],
    carbon: '1,21 kg CO₂e/kg', trace: true,
    summary: 'O SKU mais vendido do grupo em Portugal. Em atenção pela massa partida na linha L3 (1,8% vs. limite de 1,5%), já corrigida pelo agente de secagem. Cluster de 23 reclamações em 9 dias com CAPA aberta.',
    questions: [
      { q: 'Porque há reclamações deste produto?', a: '23 reclamações de **massa partida** em 9 dias, ligadas aos lotes **L26310–L26313 da linha L3** (humidade do secador acima do alvo). O agente corrigiu o setpoint e a CAPA-26-114 está aberta.' },
      { q: 'Onde está o lote L26312-M2L3-03?', a: '**126 paletes em 38 destinos**: Continente (34), Pingo Doce (28), Lidl, Recheio e Intermarché (40) e Auchan, Cabo Verde e outros (24, das quais 8 em trânsito marítimo). Rastreio completo em 4 min 12 s.' },
      { q: 'Qual a previsão para dezembro?', a: 'Previsão de **€1,18 M** em dezembro (+17% a/a) com os folhetos de Natal do Continente e do Pingo Doce. A Maia II estará a 97% de ocupação.' },
    ],
  },
  {
    id: 'milaneza-lacos', name: 'Milaneza Laços 500 g', brand: 'Milaneza', category: 'Massas curtas especiais', ean: '5601021 004319', plant: 'Maia I', line: 'L1 · massa curta', format: 'Pacote 500 g · 20 un./caixa', img: 'milaneza.webp',
    ytd: '€4,1 M', volume: '1 980 t', margin: '42,1%', price: '€2,07/kg', nutri: 'A', share: '3,1% das massas secas PT', ppm: 2.9, shelf: '36 meses',
    ingredients: 'Sêmola de trigo duro, água.', allergens: 'Glúten. Pode conter vestígios de ovo.',
    monthly: [373, 406, 389, 383, 402, 393, 412, 406, 416, 422, 435, 453], forecast: [472, 499, 426, 412, 435, 424],
    channels: [['Continente', 34], ['Pingo Doce', 20], ['Lidl', 14], ['Exportação', 12], ['Outros', 20]],
    quality: [['Humidade', '12,0%', '≤ 12,5%', 'ok'], ['Proteína', '13,0%', '≥ 12,5%', 'ok'], ['DON', '270 µg/kg', '≤ 600 µg/kg', 'ok'], ['Integridade da forma', '98,7%', '≥ 97%', 'ok']],
    carbon: '1,18 kg CO₂e/kg',
    summary: 'Formato em crescimento (+9% no Continente), ganha quota à Barilla nos formatos especiais. Margem acima da média da Milaneza.',
    questions: [{ q: 'Porque cresce a Milaneza Laços?', a: 'Cresce **+9% no Continente** e ganha quota à Barilla nos formatos especiais. É um dos formatos preferidos das famílias com crianças, segundo o painel Kantar.' }],
  },
  {
    id: 'nacional-macarrao', name: 'Nacional Macarrão Riscado 500 g', brand: 'Nacional', category: 'Massas curtas', ean: '5601109 002214', plant: 'Maia I', line: 'L2 · massa curta', format: 'Pacote 500 g', img: 'nacional.webp',
    ytd: '€3,7 M', volume: '2 140 t', margin: '36,8%', price: '€1,73/kg', nutri: 'A', share: '2,8% das massas secas PT', ppm: 3.4, shelf: '36 meses',
    ingredients: 'Sêmola de trigo duro, água.', allergens: 'Glúten.',
    monthly: [363, 384, 370, 363, 377, 367, 379, 363, 368, 372, 379, 391], forecast: [400, 422, 370, 362, 374, 367],
    channels: [['Continente', 29], ['Pingo Doce', 26], ['Intermarché', 13], ['Exportação (PALOP)', 14], ['Outros', 18]],
    quality: [['Humidade', '12,1%', '≤ 12,5%', 'ok'], ['Proteína', '12,9%', '≥ 12,5%', 'ok'], ['DON', '310 µg/kg', '≤ 600 µg/kg', 'ok']],
    carbon: '1,19 kg CO₂e/kg',
    summary: 'Referência clássica da Nacional ("A Companhia Original dos Cereais, desde 1849"), estável e com forte presença nos PALOP.',
    questions: [{ q: 'Como está o Macarrão Riscado?', a: 'Estável: **€3,7 M YTD** e margem de 36,8%. 14% das vendas vêm da exportação para os PALOP.' }],
  },
  {
    id: 'delmondo-penne', name: 'Del Mondo Penne Rigate 500 g', brand: 'Del Mondo', category: 'Massas premium', ean: '5601021 008812', plant: 'Maia I', line: 'L1 · massa curta (trefila de bronze)', format: 'Pacote 500 g', img: 'delmondo.webp',
    ytd: '€1,6 M', volume: '610 t', margin: '44,3%', price: '€2,62/kg', nutri: 'A', share: '1,2% das massas secas PT', ppm: 2.1, shelf: '36 meses',
    ingredients: 'Sêmola de trigo duro, água.', allergens: 'Glúten.',
    monthly: [115, 128, 123, 128, 139, 144, 155, 162, 173, 181, 191, 204], forecast: [218, 239, 224, 229, 242, 252],
    channels: [['Continente', 41], ['El Corte Inglés e gourmet', 19], ['Pingo Doce', 17], ['Exportação (Reino Unido, Brasil)', 14], ['Outros', 9]],
    quality: [['Humidade', '11,9%', '≤ 12,5%', 'ok'], ['Rugosidade (trefila de bronze)', 'Conforme', 'Padrão Del Mondo', 'ok'], ['DON', '240 µg/kg', '≤ 600 µg/kg', 'ok']],
    carbon: '1,24 kg CO₂e/kg',
    summary: 'A marca premium que mais cresce no grupo (penetração de 4,1% para 6,0% em 12 meses), sem canibalizar a Milaneza.',
    questions: [{ q: 'A Del Mondo canibaliza a Milaneza?', a: 'Pouco: a sobreposição de compradores é de apenas **22%**. A Del Mondo capta lares premium e já tem **6,0% de penetração** (era 4,1%).' }],
  },
  {
    id: 'amiga-espirais', name: 'Amiga Espirais 500 g', brand: 'Amiga', category: 'Massas · exportação', ean: '5601021 006405', plant: 'Maia I', line: 'L2 · massa curta', format: 'Pacote 500 g · fardo de 20', img: 'amiga.webp',
    ytd: '€2,2 M', volume: '1 670 t', margin: '24,9%', price: '€1,32/kg', nutri: 'A', share: 'n.º 1 em Cabo Verde (41%)', ppm: 3.4, shelf: '36 meses',
    ingredients: 'Sêmola de trigo duro, farinha de trigo, água.', allergens: 'Glúten.',
    monthly: [198, 214, 209, 199, 219, 211, 226, 223, 227, 231, 239, 248], forecast: [251, 259, 240, 235, 246, 243],
    channels: [['Cabo Verde', 38], ['Angola', 22], ['Guiné-Bissau', 13], ['São Tomé e Príncipe', 11], ['Moçambique', 10], ['Outros', 6]],
    quality: [['Humidade', '12,3%', '≤ 12,5%', 'ok'], ['Resistência do fardo (transporte marítimo)', 'Conforme', 'Norma exportação', 'ok']],
    carbon: '1,33 kg CO₂e/kg (inclui frete marítimo)',
    summary: 'Marca líder em Cabo Verde, São Tomé e Príncipe e Guiné, com receita "amiga" de trigo duro e mole a preço acessível.',
    questions: [{ q: 'Onde se vende a Amiga?', a: 'Sobretudo nos PALOP: **Cabo Verde (38%)**, Angola (22%), Guiné-Bissau (13%), São Tomé e Príncipe (11%) e Moçambique (10%). É **n.º 1 em Cabo Verde** com 41% de quota estimada.' }],
  },
  {
    id: 'nacional-cornflakes', name: 'Nacional Corn Flakes Sem Açúcar 375 g', brand: 'Nacional', category: 'Cereais de pequeno-almoço', ean: '5601109 012879', plant: 'Trofa', line: 'Extrusão e laminação', format: 'Caixa 375 g', img: 'nacional.webp',
    ytd: '€2,4 M', volume: '760 t', margin: '37,2%', price: '€3,16/kg', nutri: 'A', share: '1,4% dos cereais de pequeno-almoço PT', ppm: 2.6, shelf: '12 meses',
    ingredients: 'Milho (97%), sal, extrato de malte de cevada, vitaminas e ferro. 0% açúcares adicionados.', allergens: 'Glúten (cevada).',
    monthly: [168, 182, 196, 204, 218, 226, 238, 245, 252, 262, 274, 286], forecast: [298, 304, 306, 310, 312, 318],
    channels: [['Continente', 38], ['Pingo Doce', 33], ['Intermarché', 11], ['Auchan', 9], ['Outros', 9]],
    quality: [['Humidade', '2,8%', '≤ 3,5%', 'ok'], ['Crocância (teste instrumental)', 'Conforme', 'Padrão Nacional', 'ok'], ['Açúcares', '1,1 g/100 g', '≤ 1,5 g', 'ok']],
    carbon: '1,62 kg CO₂e/kg',
    summary: 'Lançamento de maior sucesso dos últimos 3 anos: ultrapassou os Corn Flakes clássicos em fevereiro. Promoção no Pingo Doce em revisão (ROI 0,7).',
    questions: [{ q: 'Quanto vende o Corn Flakes Sem Açúcar?', a: '**€286 mil em outubro** (€2,4 M YTD), acima dos clássicos desde fevereiro. Só **31%** das vendas canibalizam a versão clássica. Previsão: €310 mil/mês em março.' }],
  },
  {
    id: 'nacional-alfa', name: 'Nacional Bolacha Alfa 200 g', brand: 'Nacional', category: 'Bolachas', ean: '5601109 020331', plant: 'Maia · bolachas', line: 'Forno túnel F1', format: 'Pacote 200 g', img: 'nacional.webp',
    ytd: '€4,2 M', volume: '1 340 t', margin: '30,4%', price: '€3,13/kg', nutri: 'C', share: '1,1% das bolachas PT', ppm: 6.4, shelf: '9 meses',
    ingredients: 'Farinha de trigo, açúcar, óleo de girassol, mel de flores (3%), ovo, levedantes, sal.', allergens: 'Glúten, ovo. Pode conter leite e frutos de casca rija.',
    monthly: [404, 431, 413, 409, 418, 411, 426, 417, 412, 422, 431, 441], forecast: [487, 545, 417, 411, 421, 416],
    channels: [['Continente', 27], ['Pingo Doce', 24], ['Lidl', 21], ['Exportação', 9], ['Outros', 19]],
    quality: [['Humidade', '3,9%', '≤ 4,5%', 'ok'], ['Bolachas partidas por pacote', '4,2%', '≤ 3%', 'warn'], ['Rancidez prevista (vida útil)', '9 meses', '≥ 8 meses', 'ok']],
    carbon: '1,94 kg CO₂e/kg',
    summary: 'Bolacha tradicional com mel de flores, n.º 1 da gama Nacional. Margem pressionada pela manteiga e pelo açúcar; embalagem com bolachas partidas em revisão (novo tabuleiro).',
    questions: [{ q: 'Porque há bolachas Alfa partidas?', a: 'A taxa de **bolachas partidas por pacote é de 4,2%** (limite de 3%), sobretudo no transporte. O novo tabuleiro interno está antecipado para dezembro e deve baixar as reclamações para 4,2 ppm.' }],
  },
  {
    id: 'napolitana-t00', name: 'Napolitana T00 Farinha para Pizza 10 kg', brand: 'Napolitana', category: 'Farinhas profissionais', ean: '5601109 031207', plant: 'Lisboa', line: 'Moagem · embalamento profissional', format: 'Saco 10 kg', img: 'napolitana.webp',
    ytd: '€4,1 M', volume: '6 900 t', margin: '41,5%', price: '€0,59/kg', nutri: 'A', share: '21,9% das farinhas profissionais (HoReCa)', ppm: 1.2, shelf: '12 meses',
    ingredients: 'Farinha de trigo mole tipo 00.', allergens: 'Glúten.',
    monthly: [346, 364, 370, 374, 382, 388, 400, 406, 414, 426, 440, 458], forecast: [467, 486, 459, 464, 479, 493],
    channels: [['Pizzarias independentes', 41], ['Recheio e Makro', 33], ['Cadeias de restauração', 16], ['Exportação (Brasil)', 10]],
    quality: [['Proteína', '12,4%', '12–13%', 'ok'], ['Força (W)', 'W 260', '250–280', 'ok'], ['Absorção de água', '58%', '56–60%', 'ok']],
    carbon: '0,52 kg CO₂e/kg',
    summary: 'A farinha que mais cresce no grupo (+19,4%), com a margem por tonelada mais alta do portefólio das Moagens. Formações de pizza do Centro Técnico geram 41% das novas contas.',
    questions: [{ q: 'Como está a Napolitana T00?', a: '**6 900 t YTD (+19,4%)** e €244 de margem por tonelada — a mais alta das Moagens. 41% das vendas vão para pizzarias independentes. Lançamento de 1 kg para o consumidor em janeiro de 2027.' }],
  },
  {
    id: 'nacional-t65', name: 'Nacional Farinha T65 Panificação', brand: 'Nacional', category: 'Farinhas industriais', ean: '—', plant: 'Lisboa · Porto', line: 'Moagem de trigo mole', format: 'Saco 25 kg e granel (cisterna)', img: 'nacional.webp',
    ytd: '€37,0 M', volume: '96 400 t', margin: '€112/t', price: '€384/t', nutri: 'A', share: '18% da panificação industrial PT', ppm: 0.9, shelf: '6 meses',
    ingredients: 'Farinha de trigo mole tipo 65.', allergens: 'Glúten.',
    monthly: [3571, 3648, 3533, 3610, 3725, 3648, 3763, 3686, 3648, 3725, 3763, 3840], forecast: [3878, 3763, 3610, 3648, 3763, 3802],
    channels: [['Panificação industrial', 46], ['Panificação tradicional', 38], ['Indústria alimentar', 9], ['Cash & Carry', 7]],
    quality: [['Proteína', '12,0%', '≥ 11,5%', 'ok'], ['Força (W)', 'W 245', '230–260', 'ok'], ['Falling number', '338 s', '≥ 300 s', 'ok'], ['Cinzas', '0,64%', '0,62–0,75%', 'ok']],
    carbon: '0,44 kg CO₂e/kg',
    summary: 'A farinha mais vendida do grupo, com a melhor consistência de sempre (desvio-padrão da proteína de 0,11 pp) graças ao otimizador de mistura.',
    questions: [{ q: 'Como está a consistência da T65?', a: 'A melhor de sempre: desvio-padrão da proteína de **0,11 pp**, W médio de 245 e falling number de 338 s. A mistura ótima atual é 40% França, 35% Roménia, 15% Castela e 10% Alentejo, com custo de **€226/t**.' }],
  },
  {
    id: 'adriana-torti', name: 'Adriana Torti 500 g', brand: 'Adriana', category: 'Massas 100% sêmola', ean: '8594005 010112', plant: 'Litovel', line: 'L5 · massa curta', format: 'Pacote 500 g', img: 'adriana.webp',
    ytd: '€3,9 M', volume: '1 720 t', margin: '38,2%', price: '€2,27/kg', nutri: 'A', share: '5,4% das massas CZ', ppm: 2.8, shelf: '36 meses',
    ingredients: 'Sêmola de trigo duro (100%), água.', allergens: 'Glúten.',
    monthly: [336, 354, 357, 362, 380, 375, 389, 384, 398, 407, 416, 434], forecast: [449, 477, 413, 409, 427, 431],
    channels: [['Albert', 34], ['Kaufland', 23], ['Lidl Česko', 14], ['Eslováquia', 12], ['Outros', 17]],
    quality: [['Humidade', '12,3%', '≤ 12,5%', 'ok'], ['Proteína', '13,2%', '≥ 12,5%', 'ok'], ['DON', '320 µg/kg', '≤ 600 µg/kg', 'ok']],
    carbon: '1,15 kg CO₂e/kg',
    summary: 'Referência âncora da Adriana, a marca que mais cresce na Chéquia (+14% em volume). Testada com sucesso em 40 lojas Continente.',
    questions: [{ q: 'A Adriana Torti pode vender em Portugal?', a: 'O teste em **40 lojas Continente** vendeu **2,3×** a média da categoria premium. O Cortex recomenda alargar a 150 lojas em 2027, produzindo em Litovel.' }],
  },
  {
    id: 'zatkovy-kolinka', name: 'Zátkovy Vaječné Kolínka 250 g', brand: 'Zátkovy', category: 'Massas com ovo', ean: '8594005 020418', plant: 'Litovel', line: 'L3 · massa com ovo', format: 'Pacote 250 g',
    ytd: '€2,6 M', volume: '960 t', margin: '35,4%', price: '€2,71/kg', nutri: 'A', share: '31% das massas com ovo CZ', ppm: 4.4, shelf: '24 meses',
    ingredients: 'Farinha de trigo, ovos de galinhas criadas no solo (2 ovos por kg), água.', allergens: 'Glúten, ovo.',
    monthly: [252, 265, 258, 255, 261, 258, 264, 258, 261, 264, 267, 270], forecast: [284, 303, 264, 258, 264, 261],
    channels: [['Kaufland', 29], ['Albert', 26], ['Billa', 15], ['Penny', 12], ['Outros', 18]],
    quality: [['Humidade', '12,4%', '≤ 12,5%', 'ok'], ['Teor de ovo', '2 ovos/kg', '≥ 2 ovos/kg', 'ok']],
    carbon: '1,48 kg CO₂e/kg',
    summary: 'Marca n.º 1 em massa com ovo na Chéquia, com mais de 140 anos de tradição (desde 1884). Vida útil em risco num lote de 12 300 unidades em Litovel.',
    questions: [{ q: 'Há stock em risco de validade?', a: 'Sim: **12 300 unidades** em Litovel com 37% de validade restante (€11 mil). O Cortex sugere promoção no Penny ou desvio para HoReCa.' }],
  },
  {
    id: 'rosicke-fleky', name: 'Rosické Fleky Velké 500 g', brand: 'Rosické', category: 'Massas de trigo mole', ean: '8594005 030506', plant: 'Litovel', line: 'L1 · massa curta', format: 'Pacote 500 g', img: 'rosicke.webp',
    ytd: '€1,4 M', volume: '1 150 t', margin: '22,7%', price: '€1,22/kg', nutri: 'A', share: '13,6% das massas de trigo mole CZ', ppm: 3.8, shelf: '24 meses',
    ingredients: 'Farinha de trigo mole, água.', allergens: 'Glúten.',
    monthly: [150, 148, 146, 144, 145, 142, 141, 139, 138, 137, 135, 134], forecast: [133, 135, 130, 128, 129, 128],
    channels: [['Albert', 31], ['Kaufland', 27], ['Penny', 18], ['Tesco', 13], ['Outros', 11]],
    quality: [['Humidade', '12,2%', '≤ 12,5%', 'ok']],
    carbon: '1,02 kg CO₂e/kg',
    summary: 'Marca tradicional da Morávia (desde 1867) sob pressão da MDD: a diferença de preço passou de 18% para 26% num ano.',
    questions: [{ q: 'Porque está a Rosické a cair?', a: 'A diferença de preço para a MDD passou de **18% para 26%** e a quota caiu para **13,6%**. O Cortex recomenda reposicionar com a herança "desde 1867" e uma embalagem nova, em vez de baixar o preço.' }],
  },
];

/* ───────────── Colaboradores ───────────── */
export const employees: Employee[] = [
  {
    id: 'ana-rita-moreira', name: 'Ana Rita Moreira', role: 'Chefe de Turno', site: 'Maia II (massa longa)', unit: 'Produtos Alimentares', since: '2011', shift: 'Turno da noite (rotativo)', manager: 'Luís Magalhães',
    skills: [['Liderança de equipas', 5], ['Secagem de massa', 5], ['SMED', 4], ['Qualidade em linha', 4], ['Segurança (SST)', 5], ['Análise de dados (Espiga)', 3]],
    training: 34, certs: ['Lean Six Sigma Green Belt', 'HACCP nível 3', 'Primeiros socorros'], safety: '0 acidentes na equipa em 2026', absence: '1,2%', engagement: 'Alto',
    goals: [['OEE da Maia II ≥ 82%', 84], ['Massa partida ≤ 1,2%', 52], ['Polivalência ≥ 3 por posto', 71]],
    timeline: [['23/11', 'Aprovou o reforço de turno proposto pelo agente (2.ª feira, L3)', 'info'], ['18/11', 'Liderou a correção do diagrama de secagem da L3', 'ok'], ['02/10', 'Concluiu a formação de análise de dados na Espiga', 'ok']],
    summary: 'Referência técnica em secagem de massa longa, com 15 anos de casa. Lidera 22 operadores. Candidata natural à formação de futuros chefes de turno de Venta de Baños.',
    questions: [{ q: 'Que equipa lidera a Ana Rita?', a: 'Lidera **22 operadores** no turno da noite da Maia II (linhas L3 e L4). A equipa tem 0 acidentes em 2026 e absentismo de 3,1%. Ponto de atenção: o posto do secador da L3 tem só 2 operadores certificados.' }],
  },
  {
    id: 'joaquim-pires', name: 'Joaquim Pires', role: 'Chefe de Manutenção', site: 'Lisboa (moagem)', unit: 'Cerealis Moagens', since: '1998', shift: 'Horário normal + prevenção', manager: 'Luís Magalhães',
    skills: [['Moinhos de cilindros', 5], ['Análise de vibrações', 4], ['Pneumática e transporte', 5], ['SAP PM', 4], ['Manutenção preditiva', 3]],
    training: 22, certs: ['Técnico de vibrações ISO 18436 nível II', 'Segurança em espaços confinados'], safety: 'Responsável SST da manutenção', absence: '0,8%', engagement: 'Alto',
    goals: [['Disponibilidade da moagem ≥ 97%', 92], ['Ordens preditivas ≥ 45%', 78], ['Formar 2 técnicos em vibrações', 50]],
    timeline: [['23/11', 'Recebeu proposta do agente: substituição do rolamento do B3 no domingo', 'warn'], ['05/11', 'Substituição planeada do plansichter 2 concluída 1 h antes do previsto', 'ok']],
    summary: '28 anos de experiência na moagem de Lisboa. Peça-chave para a transferência de conhecimento: 6 moleiros e técnicos da equipa reformam-se nos próximos 5 anos.',
    questions: [{ q: 'Qual a decisão pendente do Joaquim?', a: 'Aprovar a **substituição do rolamento do moinho B3** na paragem de domingo (4 h, peças em stock). Sem intervenção, o Cortex estima 26 h de paragem (€118 mil).' }],
  },
  {
    id: 'sofia-carvalho', name: 'Sofia Carvalho', role: 'Key Account Manager', site: 'Sede (Maia)', unit: 'Produtos Alimentares', since: '2017', shift: '—', manager: 'João Pedro Sá',
    skills: [['Negociação', 5], ['Revenue management', 4], ['Category management', 4], ['Análise de dados (Espiga)', 5]],
    training: 28, certs: ['Category Management (ECR Portugal)'], safety: '—', absence: '0,5%', engagement: 'Muito alto',
    goals: [['Vendas Jerónimo Martins +3%', 87], ['OTIF Pingo Doce ≥ 95%', 40], ['ROI promocional ≥ 1,3', 62]],
    timeline: [['19/11', 'Enviou ao Pingo Doce a proposta alternativa de promoção (ROI 1,4)', 'ok'], ['10/11', 'Alerta de OTIF abaixo do contrato na plataforma do Sul', 'warn']],
    summary: 'Gestora da conta Jerónimo Martins (Pingo Doce e Recheio, €30,1 M). Uma das utilizadoras mais ativas do Assistente Espiga (62 perguntas/semana).',
    questions: [{ q: 'Como está a conta da Sofia?', a: 'Gere **€30,1 M** (Pingo Doce €23,9 M + Recheio €6,2 M). Vendas +2,6% no Pingo Doce, mas OTIF de 93,1%. Propôs uma promoção alternativa com ROI de 1,4.' }],
  },
  {
    id: 'ines-duarte', name: 'Inês Duarte', role: 'Técnica de Panificação', site: 'Centro Técnico (Lisboa)', unit: 'Cerealis Moagens', since: '2019', shift: '—', manager: 'Fernando Calheiros',
    skills: [['Panificação', 5], ['Pizza napolitana', 5], ['Técnicas de frio', 4], ['Formação', 5]],
    training: 41, certs: ['Mestre Pizzaiolo (AVPN)', 'Formadora certificada (DGERT)'], safety: '—', absence: '1,9%', engagement: 'Muito alto',
    goals: [['60 formações em 2026', 92], ['Conversão pós-demonstração ≥ 35%', 100], ['NPS das formações ≥ 70', 100]],
    timeline: [['20/11', 'Formação de pizza para 14 pizzarias Recheio', 'ok'], ['12/11', 'Ensaio de panificação para a Panificação Douro agendado', 'info']],
    summary: 'Responsável pelas formações de pizza (46 sessões em 2026) que geram 41% das novas contas Napolitana.',
    questions: [{ q: 'Qual o impacto das formações da Inês?', a: '**46 sessões de pizza** em 2026, com NPS de +71 e conversão de 37% após demonstração. Geram 41% das novas contas Napolitana.' }],
  },
  {
    id: 'rui-barbosa', name: 'Rui Barbosa', role: 'Operador de Extrusão', site: 'Trofa (cereais)', unit: 'Produtos Alimentares', since: '2021', shift: 'Turno 2', manager: 'Carla Fontes',
    skills: [['Extrusão', 4], ['Revestimento e tostagem', 3], ['Limpeza CIP', 4], ['Qualidade em linha', 3]],
    training: 26, certs: ['Operador certificado Clextral', 'HACCP nível 2'], safety: '412 dias sem acidentes (Trofa)', absence: '2,4%', engagement: 'Alto',
    goals: [['Certificação em revestimento', 60], ['OEE da extrusão ≥ 78%', 64]],
    timeline: [['17/11', 'Reportou quase-acidente com fotografia (escada do tostador)', 'info'], ['30/09', 'Concluiu a certificação Clextral', 'ok']],
    summary: 'Operador polivalente da nova linha de extrusão da Trofa, em percurso para técnico de processo.',
    questions: [{ q: 'Qual o plano de desenvolvimento do Rui?', a: 'Concluir a certificação em **revestimento e tostagem** (60%) para ser o 3.º operador certificado no posto e, em 2027, a formação de técnico de processo.' }],
  },
  {
    id: 'lucia-fernandez', name: 'Lucía Fernández', role: 'Responsable de Calidad', site: 'Venta de Baños', unit: 'Pasta VB3', since: '2014', shift: '—', manager: 'Teresa Antunes',
    skills: [['IFS Food', 5], ['Alergénios', 4], ['Auditoria', 5], ['LIMS', 4]],
    training: 30, certs: ['Auditora IFS', 'Lead auditor ISO 22000'], safety: '—', absence: '1,1%', engagement: 'Médio',
    goals: [['Auditoria IFS ≥ 95%', 70], ['Fechar 6 evidências incompletas', 33]],
    timeline: [['21/11', 'Plano de preparação IFS gerado pelo Cortex (6 requisitos)', 'warn'], ['03/10', 'Integração do LIMS de VB3 no Snowflake concluída', 'ok']],
    summary: 'Lidera a qualidade de Venta de Baños e a primeira auditoria IFS sob gestão Cerealis, daqui a 9 semanas.',
    questions: [{ q: 'A Lucía está pronta para a auditoria IFS?', a: 'Faltam **6 evidências** (controlo de alergénios e calibrações). O plano de preparação está a 33%; a auditoria é daqui a **9 semanas**.' }],
  },
  {
    id: 'miguel-teixeira', name: 'Miguel Teixeira', role: 'Moleiro-Chefe', site: 'Porto (Freixo)', unit: 'Cerealis Moagens', since: '1993', shift: 'Horário normal', manager: 'Fernando Calheiros',
    skills: [['Moagem de trigo e centeio', 5], ['Afinação de cilindros', 5], ['Misturas de farinha', 5], ['Mentoria', 4]],
    training: 18, certs: ['Moleiro profissional (APIM)'], safety: '—', absence: '0,6%', engagement: 'Alto',
    goals: [['Extração de centeio ≥ 71,5%', 100], ['Mentoria de 2 moleiros júnior', 50]],
    timeline: [['14/11', 'Extração de centeio em 71,8% (+0,6 pp vs. plano)', 'ok']],
    summary: '33 anos de experiência; conhecimento crítico em centeio e misturas. Plano de mentoria ativo para preservar o saber dos moleiros seniores.',
    questions: [{ q: 'Porque é o Miguel crítico?', a: 'É o moleiro com mais experiência em **centeio e misturas** (33 anos). A extração de centeio está em 71,8%, acima do plano. Está a orientar 2 moleiros júnior.' }],
  },
  {
    id: 'tereza-kralova', name: 'Tereza Králová', role: 'Vedoucí plánování (Planeamento)', site: 'Litovel', unit: 'Cerealis a.s.', since: '2016', shift: '—', manager: 'Tomáš Novák',
    skills: [['Planeamento de produção', 5], ['S&OP', 4], ['Helios', 5], ['Análise de dados (Espiga)', 4]],
    training: 24, certs: ['APICS CPIM'], safety: '—', absence: '1,4%', engagement: 'Alto',
    goals: [['Ocupação de Litovel ≤ 92% em dezembro', 40], ['Precisão da previsão ≥ 92%', 96]],
    timeline: [['22/11', 'Cenário de transferência de 300 t para Venta de Baños em análise', 'info']],
    summary: 'Responsável pelo planeamento de Litovel e pela ligação ao S&OP do grupo.',
    questions: [{ q: 'Que decisão tem a Tereza em mãos?', a: 'A transferência de **300 t de massa curta MDD** para Venta de Baños em dezembro, que baixa a ocupação de Litovel de 94% para 90% e acrescenta €21 mil de margem.' }],
  },
];

/* ───────────── Ativos ───────────── */
export const assets: Asset[] = [
  {
    id: 'LIS-MOI-B3', name: 'Moinho de cilindros B3', kind: 'moinho', site: 'Lisboa (moagem de trigo mole)', maker: 'Bühler', model: 'Antares MDDY 1000/250', year: 2012,
    health: 58, rul: '6 dias (rolamento do lado livre)', status: 'critico', mtbf: '1 840 h', availability: '96,1%', energy: '41 kWh/t', throughput: '30 t/h',
    sensors: [{ label: 'Vibração do rolo', value: '4,0 mm/s', status: 'critico', unit: 3 }, { label: 'Temperatura do rolamento', value: '71 °C', status: 'aviso', unit: 3 }, { label: 'Afastamento dos cilindros', value: '0,21 mm', status: 'ok', unit: 3 }, { label: 'Caudal de entrada', value: '30,2 t/h', status: 'ok', unit: 1 }, { label: 'Humidade após condicionamento', value: '16,1%', status: 'ok', unit: 2 }, { label: 'Carga do plansichter', value: '84%', status: 'ok', unit: 4 }],
    trend: [2.9, 3.0, 3.0, 3.1, 3.3, 3.4, 3.6, 3.7, 3.9, 4.0, 4.1, 4.0], trendLabel: 'Vibração RMS (mm/s) · últimos 12 dias', trendLimit: 4.5,
    workOrders: [['4100082', 'Substituição do rolamento do lado livre (preditiva)', '29/11', 'Aguarda aprovação'], ['4100031', 'Afinação dos cilindros B1–B5', '08/11', 'Concluída'], ['4099874', 'Lubrificação programada', '24/10', 'Concluída']],
    prediction: { failProb: '81% em 6 dias', driver: 'Desgaste do rolamento do lado livre (frequência de defeito BPFO)', action: 'Substituir o rolamento na paragem de domingo (4 h, 2 técnicos, peça SKF em stock)', saving: '€118 mil (26 h de paragem evitadas)' },
    summary: 'Moinho crítico da moagem de Lisboa (720 t/24 h). Assinatura de desgaste do rolamento detetada 9 dias antes do alarme pelo modelo de anomalias.',
    questions: [{ q: 'Quando vai falhar o B3?', a: 'Probabilidade de **81% de atingir o alarme em 6 dias**. Causa: desgaste do rolamento do lado livre. Recomendação: substituir na paragem de domingo (4 h) — evita 26 h de paragem (€118 mil).' }],
  },
  {
    id: 'MAI-M2-L3', name: 'Linha de massa longa L3', kind: 'linha', site: 'Maia II', maker: 'Pavan', model: 'Linha de massa longa TT 3 500 kg/h', year: 2016,
    health: 71, rul: '3 semanas (ventilador da zona 3)', status: 'aviso', mtbf: '212 h', availability: '93,4%', energy: '402 kWh/t', throughput: '3 500 kg/h',
    sensors: [{ label: 'Pressão da prensa', value: '118 bar', status: 'ok', unit: 1 }, { label: 'Temperatura da trefila', value: '46 °C', status: 'ok', unit: 2 }, { label: 'Secador zona 3', value: '84 °C · HR 71%', status: 'aviso', unit: 4 }, { label: 'Humidade à saída', value: '12,6%', status: 'aviso', unit: 5 }, { label: 'Vibração do ventilador Z3', value: '3,1 mm/s', status: 'aviso', unit: 4 }, { label: 'Massa partida (embalamento)', value: '1,8%', status: 'aviso', unit: 6 }],
    trend: [0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.3, 1.2, 1.4, 1.6, 1.5, 1.8], trendLabel: 'Massa partida (%) · semanas 36–47', trendLimit: 1.5,
    workOrders: [['4100077', 'Inspeção do ventilador da zona 3 do secador', '26/11', 'Planeada'], ['4100054', 'Ajuste do diagrama de secagem (agente Cortex)', '23/11', 'Concluída'], ['4099902', 'Troca de trefila de esparguete n.º 5', '30/10', 'Concluída']],
    prediction: { failProb: '34% em 3 semanas', driver: 'Desequilíbrio do ventilador da zona 3 a afetar a humidade relativa', action: 'Equilibrar o ventilador na paragem de 26/11 e manter o diagrama corrigido', saving: '€46 mil/mês em massa partida e reclamações' },
    summary: 'Linha da Milaneza Esparguete 500 g. Humidade à saída acima do alvo durante 7 turnos — corrigida pelo agente; causa raiz provável no ventilador da zona 3.',
    questions: [{ q: 'Porque há massa partida na L3?', a: 'A **humidade à saída do secador** esteve acima do alvo durante 7 turnos (12,6% vs. 12,2%). O agente corrigiu a zona 3 (−2 °C, +4% HR). A causa raiz provável é o **desequilíbrio do ventilador da zona 3** — inspeção planeada para 26/11.' }],
  },
  {
    id: 'VDB-L2', name: 'Linha de massa curta L2', kind: 'linha', site: 'Venta de Baños', maker: 'Bühler', model: 'Polymatik / Ecothermatik 2 800 kg/h', year: 2009,
    health: 66, rul: '5 semanas (matriz de trefilagem)', status: 'aviso', mtbf: '146 h', availability: '88,7%', energy: '441 kWh/t', throughput: '2 800 kg/h',
    sensors: [{ label: 'Pressão da prensa', value: '124 bar', status: 'aviso', unit: 1 }, { label: 'Desgaste da trefila (estimado)', value: '82%', status: 'aviso', unit: 2 }, { label: 'Secador final', value: '79 °C', status: 'ok', unit: 4 }, { label: 'Humidade à saída', value: '12,3%', status: 'ok', unit: 5 }, { label: 'Mudanças de formato', value: '2,1 h/turno', status: 'aviso', unit: 3 }],
    trend: [68, 69, 70, 71, 70, 72, 71, 73, 72, 74, 73, 74], trendLabel: 'OEE (%) · semanas 36–47', trendLimit: 78,
    workOrders: [['VB-22104', 'Substituição da matriz de macarrão', '18/12', 'Planeada'], ['VB-22077', 'Missão SMED (equipa da Maia II)', 'jan/27', 'Planeada']],
    prediction: { failProb: '22% em 5 semanas', driver: 'Desgaste da matriz e pressão da prensa a subir', action: 'Substituir a matriz a 18/12 e aplicar o sequenciador de formatos', saving: '+6 pp de OEE (€0,4 M/ano)' },
    summary: 'A linha com mais mudanças de formato do grupo (58 h/mês). Prioridade do programa SMED.',
    questions: [{ q: 'Como melhorar o OEE da L2?', a: 'A L2 perde **58 h/mês em mudanças de formato** (referência da Maia: 24 h). O sequenciador de formatos e a missão SMED de janeiro podem levar o OEE de 74% para 80%.' }],
  },
  {
    id: 'TRO-EXT-01', name: 'Extrusora de cereais', kind: 'extrusora', site: 'Trofa', maker: 'Clextral', model: 'Evolum 88 (dupla rosca)', year: 2023,
    health: 88, rul: '11 meses', status: 'ok', mtbf: '640 h', availability: '95,8%', energy: '612 kWh/t', throughput: '1 600 kg/h',
    sensors: [{ label: 'Binário do parafuso', value: '68%', status: 'ok', unit: 2 }, { label: 'Temperatura da cabeça', value: '162 °C', status: 'ok', unit: 2 }, { label: 'Humidade do produto', value: '2,8%', status: 'ok', unit: 4 }, { label: 'Velocidade de corte', value: '1 420 rpm', status: 'ok', unit: 3 }],
    trend: [73, 74, 76, 75, 77, 76, 78, 77, 76, 78, 77, 79], trendLabel: 'OEE (%) · semanas 36–47', trendLimit: 80,
    workOrders: [['4100061', 'Inspeção dos segmentos da rosca', '12/01', 'Planeada']],
    prediction: { failProb: '4% em 3 meses', driver: '—', action: 'Manter o plano preventivo', saving: '—' },
    summary: 'Nova linha de extrusão (investimento de €7 M), a 92% da cadência nominal. Produz o Corn Flakes Sem Açúcar e cereais MDD.',
    questions: [{ q: 'Como está a nova extrusora?', a: 'Saúde de **88/100** e OEE de 79% na semana 47, a 92% da cadência nominal. Sem riscos previstos nos próximos 3 meses.' }],
  },
  {
    id: 'MAI-BOL-F1', name: 'Forno túnel de bolachas F1', kind: 'forno', site: 'Maia (bolachas)', maker: 'Werner & Pfleiderer', model: 'Forno túnel a gás 72 m', year: 2008,
    health: 82, rul: '7 meses', status: 'ok', mtbf: '410 h', availability: '94,2%', energy: '1 120 kWh/t (gás)', throughput: '1 200 kg/h',
    sensors: [{ label: 'Zona 1', value: '228 °C', status: 'ok', unit: 3 }, { label: 'Zona 3', value: '204 °C', status: 'ok', unit: 3 }, { label: 'Humidade à saída', value: '3,9%', status: 'ok', unit: 4 }, { label: 'Bolachas partidas', value: '4,2%', status: 'aviso', unit: 6 }],
    trend: [3.1, 3.3, 3.4, 3.6, 3.5, 3.8, 3.9, 4.0, 4.1, 4.0, 4.2, 4.2], trendLabel: 'Bolachas partidas por pacote (%)', trendLimit: 3,
    workOrders: [['4100070', 'Ajuste do empilhador à saída do arrefecimento', '28/11', 'Planeada']],
    prediction: { failProb: '9% em 3 meses', driver: 'Quebras no empilhamento (não no forno)', action: 'Novo tabuleiro interno e ajuste do empilhador', saving: '−1,6 ppm de reclamações' },
    summary: 'Forno da Bolacha Alfa e da Maria. Estado do forno saudável; as quebras acontecem no empilhamento e no transporte.',
    questions: [{ q: 'O forno está a causar bolachas partidas?', a: 'Não: o forno está saudável (82/100). As quebras (4,2% por pacote) acontecem no **empilhamento e no transporte**. Solução: novo tabuleiro interno e ajuste do empilhador a 28/11.' }],
  },
  {
    id: 'LIT-L5', name: 'Linha de massa curta L5', kind: 'linha', site: 'Litovel', maker: 'Pavan', model: 'Linha de massa curta 4 000 kg/h', year: 2019,
    health: 91, rul: '14 meses', status: 'ok', mtbf: '520 h', availability: '96,4%', energy: '391 kWh/t', throughput: '4 000 kg/h',
    sensors: [{ label: 'Pressão da prensa', value: '112 bar', status: 'ok', unit: 1 }, { label: 'Secador final', value: '86 °C', status: 'ok', unit: 4 }, { label: 'Humidade à saída', value: '12,2%', status: 'ok', unit: 5 }],
    trend: [78, 79, 80, 79, 81, 80, 79, 82, 81, 80, 82, 81], trendLabel: 'OEE (%) · semanas 36–47', trendLimit: 80,
    workOrders: [['CZ-8812', 'Preventiva trimestral', '05/12', 'Planeada']],
    prediction: { failProb: '3% em 3 meses', driver: '—', action: 'Manter o plano preventivo', saving: '—' },
    summary: 'A linha mais eficiente de Litovel; produz a Adriana Torti e o Funghetto.',
    questions: [{ q: 'Como está a L5 de Litovel?', a: 'Saúde de **91/100** e OEE de 81%. Produz a Adriana Torti, que cresce 18% no Albert.' }],
  },
  {
    id: 'POR-MOI-C1', name: 'Moinho de centeio C1', kind: 'moinho', site: 'Porto (Freixo)', maker: 'Bühler', model: 'MDDK 1000/250', year: 2004,
    health: 79, rul: '4 meses', status: 'ok', mtbf: '1 260 h', availability: '95,2%', energy: '96 kWh/t', throughput: '8 t/h',
    sensors: [{ label: 'Vibração', value: '2,4 mm/s', status: 'ok', unit: 3 }, { label: 'Temperatura do rolamento', value: '58 °C', status: 'ok', unit: 3 }, { label: 'Extração de centeio', value: '71,8%', status: 'ok', unit: 4 }],
    trend: [2.1, 2.2, 2.1, 2.2, 2.3, 2.2, 2.3, 2.4, 2.3, 2.4, 2.4, 2.4], trendLabel: 'Vibração RMS (mm/s)', trendLimit: 4.5,
    workOrders: [['4100044', 'Recartilhar cilindros de centeio', 'mar/27', 'Planeada']],
    prediction: { failProb: '6% em 3 meses', driver: 'Desgaste normal dos cilindros', action: 'Recartilhar em março de 2027', saving: '—' },
    summary: 'Moinho dedicado ao centeio, com extração acima do plano.',
    questions: [{ q: 'Como está o moinho de centeio?', a: 'Saúde de **79/100**, vibração estável (2,4 mm/s) e extração de **71,8%**, acima do plano. Recartilhagem dos cilindros prevista para março.' }],
  },
  {
    id: 'LIS-SIL', name: 'Bateria de silos de cereal (27 000 t)', kind: 'silo', site: 'Lisboa', maker: 'Silos Córdoba', model: '12 células metálicas', year: 2013,
    health: 94, rul: '—', status: 'ok', mtbf: '—', availability: '99,6%', energy: '3 kWh/t (arejamento)', throughput: 'receção 200 t/h',
    sensors: [{ label: 'Temperatura média do grão', value: '17 °C', status: 'ok', unit: 1 }, { label: 'Célula 7 · ponto quente', value: '24 °C', status: 'aviso', unit: 3 }, { label: 'Humidade média', value: '12,6%', status: 'ok', unit: 2 }, { label: 'Ocupação', value: '78%', status: 'ok', unit: 4 }],
    trend: [16, 16, 17, 17, 17, 18, 18, 19, 20, 21, 23, 24], trendLabel: 'Temperatura da célula 7 (°C)', trendLimit: 25,
    workOrders: [['4100079', 'Arejamento forçado da célula 7 (agente)', '23/11', 'Em curso']],
    prediction: { failProb: '12% de risco de deterioração na célula 7', driver: 'Ponto quente por humidade localizada (lote romeno)', action: 'Arejamento noturno (tarifa de vazio) e moer a célula 7 primeiro', saving: '€62 mil de grão protegido' },
    summary: 'Silos da moagem de Lisboa com 312 sondas de temperatura. Ponto quente na célula 7 em acompanhamento.',
    questions: [{ q: 'Há risco nos silos?', a: 'Um **ponto quente na célula 7** (24 °C, a subir) num lote de trigo romeno. O agente ativou arejamento noturno e recomendou moer essa célula primeiro — €62 mil de grão protegido.' }],
  },
];

export const findCustomer = (id?: string) => customers.find(c => c.id === id);
export const findProduct = (id?: string) => products.find(p => p.id === id);
export const findEmployee = (id?: string) => employees.find(e => e.id === id);
export const findAsset = (id?: string) => assets.find(a => a.id === id);
