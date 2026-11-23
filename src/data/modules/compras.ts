import type { Module } from '../types';
import { k, ch, ag, ml, rows, pie, MONTHS, FUT, spark } from '../gen';
import { ORIGINS } from '../facts';

const R_CANADA: [number, number][] = [[-73.55, 45.5], [-61, 47.6], [-52, 46.6], [-30, 43.5], [-9.0, 41.18]];
const R_MEXICO: [number, number][] = [[-110.9, 27.9], [-105.5, 19.5], [-79.9, 9.0], [-74, 17.5], [-60, 25], [-30, 36], [-9.0, 41.18]];
const R_ROUEN: [number, number][] = [[1.08, 49.44], [-1.6, 49.8], [-5.2, 48.3], [-9.6, 43.2], [-9.2, 38.7]];
const R_BLACK: [number, number][] = [[28.65, 44.17], [29.05, 41.1], [26.2, 40.2], [23.2, 36.4], [15.2, 37.2], [10.2, 37.6], [0, 37.1], [-5.6, 35.95], [-9.2, 38.7]];

export const compras: Module = {
  slug: 'compras', name: 'Compras & Cereais', short: 'Compras & Cereais', icon: 'Wheat', color: '#D99A00', group: 'funcoes',
  tagline: 'Cerealis Internacional · trigo duro, trigo mole, centeio, milho, sêmolas, embalagens e energia',
  owner: 'Nuno Ferraz — Diretor de Compras de Cereais',
  sources: ['SAP S/4HANA MM', 'Euronext MATIF (Marketplace)', 'Câmbios BCE', 'Frete Baltic (Marketplace)', 'AIS navios', 'IPMA · meteorologia', 'LIMS'],
  sections: [
    {
      id: 'mercado', label: 'Mercado & preços', icon: 'LineChart', blocks: [
        { t: 'kpis', items: [
          k('Custo médio trigo duro (CIF Leixões)', '€318/t', '-4,2% em 10 dias', false, true, spark(3, 330, 6, -0.04)),
          k('Custo médio trigo mole (CIF Lisboa)', '€224/t', '+1,8% m/m', true, false, spark(5, 216, 4, 0.04)),
          k('Compras de cereais e sêmolas 2026E', '€166 M', '41,7% das vendas', true, false, spark(8, 160, 4)),
          k('Poupança vs. mercado (YTD)', '€2,7 M', '-2,1% no custo do trigo', true, true, spark(11, 1.8, 0.3, 0.5)),
        ] },
        ch('cp1', 'Preço do trigo duro vs. trigo mole (€/t)', 'Custo CIF médio ponderado · últimos 12 meses', 'line', ['Trigo duro', 'Trigo mole', 'Euronext EBM (referência)'],
          rows(MONTHS, { 'Trigo duro': [335, 338, 341, 337, 332, 329, 326, 330, 336, 333, 328, 318], 'Trigo mole': [212, 214, 216, 219, 221, 218, 215, 213, 216, 219, 221, 224], 'Euronext EBM (referência)': [196, 199, 201, 204, 206, 203, 199, 197, 200, 203, 205, 208] }),
          'O trigo duro caiu 4,2% nos últimos 10 dias com a revisão em alta da colheita canadiana (+9% a/a, Statistics Canada); o spread duro–mole está no mínimo de 14 meses (€94/t).',
          'Cortex prevê €309/t em dezembro (IC 80%: €293–325) e retoma para €321/t em abril com a sementeira mexicana mais curta.',
          'Antecipar a compra de 25 000 t de CWAD n.º 1 para jan–fev e fixar 60% do câmbio USD a 3 meses.', { model: 'Previsão de preço do trigo · MAPE 3,8% a 3 meses', ratio: true }),
        ch('cp2', 'Previsão Cortex do trigo duro (€/t)', 'Próximos 6 meses · intervalo de confiança 80%', 'line', ['Previsão', 'Limite inferior', 'Limite superior'],
          rows(FUT, { 'Previsão': [314, 309, 306, 310, 316, 321], 'Limite inferior': [301, 293, 287, 288, 291, 294], 'Limite superior': [327, 325, 325, 332, 341, 348] }),
          'A incerteza alarga-se a partir de fevereiro: a principal variável é a chuva em Sonora durante o enchimento do grão.',
          'Probabilidade de 68% de o preço de fevereiro ficar abaixo do atual.',
          'Comprar 40% da necessidade de jan–mar agora e deixar 60% em ordens escalonadas.', { model: 'Snowflake ML FORECAST + XGBoost multivariado', ratio: true, colors: ['#F0A800', '#9B968A', '#9B968A'] }),
        ch('cp3', 'Origem do trigo duro (YTD)', '% das toneladas compradas · 248 mil t', 'pie', ['v'],
          pie([['Canadá (CWAD)', 38], ['Occitânia (FR)', 17], ['Sonora (MX)', 14], ['Itália (Foggia)', 9], ['Alentejo (PT)', 9], ['Dakota do Norte (EUA)', 8], ['Espanha', 5]]),
          'A dependência do Canadá subiu 6 pp desde que o México passou a ter DON mais elevado; o Alentejo cobre já 9% com o programa de trigo nacional.',
          'Com a colheita canadiana recorde, o CWAD pode chegar a 44% em 2027 sem custo adicional.',
          'Manter um teto de 45% por origem (política de risco) e contratar mais 6 000 t no Alentejo para 2027.'),
        ch('cp4', 'Cobertura de necessidades (semanas)', 'Stock + contratos firmes vs. política', 'bar', ['Trigo duro', 'Trigo mole', 'Política'],
          rows(MONTHS, { 'Trigo duro': [9.2, 8.8, 8.4, 8.1, 8.6, 9.0, 8.3, 7.9, 7.4, 7.0, 6.6, 6.1], 'Trigo mole': [7.1, 7.4, 6.9, 7.2, 7.6, 7.3, 7.0, 6.8, 7.1, 7.4, 7.2, 7.5], 'Política': [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8] }),
          'A cobertura de trigo duro caiu abaixo da política em agosto e está em 6,1 semanas — decisão consciente de esperar pela colheita canadiana.',
          'Sem novas compras, a semolaria da Maia fica sem cobertura firme a 2 de fevereiro.',
          'Aprovar a recomendação do agente de cobertura (25 000 t CWAD).', { ratio: true }),
        { t: 'insights', items: [
          { tone: 'ok', title: 'Janela de compra de trigo duro', text: 'Spread CWAD vs. Occitânia no mínimo de 14 meses (€11/t). Comprar agora poupa ≈ €0,9 M face ao preço médio previsto para o 1.º trimestre.', tag: 'Agente de cobertura · aguarda aprovação' },
          { tone: 'warn', title: 'Câmbio EUR/USD', text: 'O CWAD é cotado em USD. Cada 1 cêntimo de valorização do dólar custa €0,21 M por ano à semolaria da Maia.', tag: 'Tesouraria' },
          { tone: 'info', title: 'Frete marítimo', text: 'O índice Supramax subiu 12% em 3 semanas. O frete Montreal–Leixões passou de $31 para $35/t.', tag: 'Baltic Exchange · Marketplace' },
        ] },
      ],
    },
    {
      id: 'cobertura', label: 'Cobertura & contratos', icon: 'FileSignature', blocks: [
        { t: 'kpis', items: [
          k('Contratos firmes abertos', '64 200 t', '11 contratos', true, true),
          k('Preço médio contratado vs. mercado', '-€7/t', 'abaixo do spot', false, true),
          k('Exposição USD não coberta', '$9,8 M', '42% do total', true, false),
          k('Cumprimento de especificação', '97,6%', '+1,1 pp a/a', true, true),
        ] },
        { t: 'table', title: 'Contratos de cereais em curso', sub: 'Posição a 23/11/2026', span: true, status: ['Estado'],
          columns: ['Contrato', 'Fornecedor', 'Produto', 'Toneladas', '€/t', 'Entrega', 'Destino', 'Estado'],
          rows: [
            { Contrato: 'CT-26-0418', Fornecedor: 'Viterra', Produto: 'Trigo duro CWAD n.º 1', Toneladas: 24000, '€/t': 316, Entrega: 'dez/26', Destino: 'Semolaria Maia', Estado: 'Em trânsito' },
            { Contrato: 'CT-26-0421', Fornecedor: 'Cargill', Produto: 'Trigo duro México', Toneladas: 21500, '€/t': 304, Entrega: 'dez/26', Destino: 'Semolaria Maia', Estado: 'Risco DON' },
            { Contrato: 'CT-26-0409', Fornecedor: 'Bunge', Produto: 'Trigo mole W 240', Toneladas: 28500, '€/t': 221, Entrega: 'nov/26', Destino: 'Moagem Lisboa', Estado: 'No prazo' },
            { Contrato: 'CT-26-0425', Fornecedor: 'InVivo (Soufflet)', Produto: 'Trigo mole francês', Toneladas: 16000, '€/t': 226, Entrega: 'dez/26', Destino: 'Moagem Lisboa', Estado: 'Atraso 2 dias' },
            { Contrato: 'CT-26-0402', Fornecedor: 'Axéréal', Produto: 'Trigo duro Occitânia', Toneladas: 6200, '€/t': 327, Entrega: 'nov–jan', Destino: 'Venta de Baños (sêmola)', Estado: 'Em curso' },
            { Contrato: 'CT-26-0388', Fornecedor: 'Agricultores do Alentejo', Produto: 'Trigo duro nacional', Toneladas: 4800, '€/t': 331, Entrega: 'jul–set', Destino: 'Semolaria Maia', Estado: 'Concluído' },
            { Contrato: 'CT-26-0431', Fornecedor: 'Moagem parceira (CZ)', Produto: 'Sêmola de trigo duro', Toneladas: 9600, '€/t': 428, Entrega: 'dez–fev', Destino: 'Litovel', Estado: 'Em curso' },
            { Contrato: 'CT-26-0436', Fornecedor: 'Moagem Ceres', Produto: 'Centeio', Toneladas: 2100, '€/t': 189, Entrega: 'dez/26', Destino: 'Moagem Porto', Estado: 'Em negociação' },
          ] },
        { t: 'scenario', title: 'Simulador de cobertura e margem', sub: 'Impacto de comprar agora vs. esperar · semolaria da Maia (112 000 t/ano)',
          inputs: [
            { id: 'cob', label: 'Toneladas a comprar agora', min: 0, max: 40000, step: 1000, value: 25000, unit: 't' },
            { id: 'px', label: 'Variação do preço até fevereiro', min: -12, max: 12, step: 1, value: -3, unit: '%' },
            { id: 'fx', label: 'Variação EUR/USD', min: -6, max: 6, step: 0.5, value: 0, unit: '%' },
          ],
          outputs: [
            { label: 'Custo da compra agora', calc: v => v.cob * 318 / 1e6, fmt: n => `€${n.toLocaleString('pt-PT', { maximumFractionDigits: 2 })} M` },
            { label: 'Poupança vs. comprar em fevereiro', calc: v => v.cob * 318 * (v.px / 100 + v.fx / 100) * -1 / 1e6 + v.cob * 318 * 0.026 / 1e6, fmt: n => `${n >= 0 ? '+' : ''}€${n.toLocaleString('pt-PT', { maximumFractionDigits: 2 })} M`, good: n => n >= 0 },
            { label: 'Cobertura resultante', calc: v => 6.1 + v.cob / 2150, fmt: n => `${n.toLocaleString('pt-PT', { maximumFractionDigits: 1 })} semanas`, good: n => n >= 8 },
          ],
          note: 'Inclui custo de armazenagem nos silos da Maia (9 000 t) e prémio de risco de rutura estimado em 2,6% do valor.' },
        { t: 'agents', items: [
          ag('ag-cob', 'Cobertura de trigo duro', 'humano', 'Cobertura < 8 semanas e preço abaixo da média de 90 dias', '€0,9 M de poupança · evita rutura a 2 fev', [
            ['Sinal', 'Trigo duro -4,2% em 10 dias; cobertura da semolaria em 6,1 semanas (política: 8).'],
            ['Insight', 'Janela de compra: spread CWAD vs. Occitânia no mínimo de 14 meses.'],
            ['Diagnóstico', 'Sem compra, rutura de sêmola na Maia a 2 fev; risco de DON elevado no lote mexicano.'],
            ['Recomendação', 'Comprar 25 000 t CWAD n.º 1 para jan–fev e cobrir 60% do USD a 3 meses.'],
            ['Aprovação humana', 'Decisão do Diretor de Compras (contrato > €5 M).'],
            ['Ação', 'Contrato e pedido de compra criados no SAP; cobertura cambial enviada à tesouraria.'],
          ], { approver: 'Nuno Ferraz — Diretor de Compras de Cereais', domain: 'Compras', last: 'há 2 h' }),
          ag('ag-coa', 'Leitura de certificados e conhecimentos de embarque', 'auto', 'Novo documento recebido do fornecedor ou do agente de navegação', '-6 h por navio · 0 erros de digitação', [
            ['Sinal', 'Chegaram 4 PDFs da Viterra: certificado de análise, fitossanitário, origem e B/L.'],
            ['Extração', 'Cortex AI_EXTRACT lê proteína 13,9%, humidade 12,1%, DON 290 µg/kg e peso de 24 012 t.'],
            ['Validação', 'Tudo dentro da especificação do contrato CT-26-0418.'],
            ['Ação', 'Inspeção registada no SAP QM e documentos arquivados com linhagem para o lote.'],
          ], { domain: 'Compras', last: 'há 35 min' }),
        ] },
      ],
    },
    {
      id: 'origens', label: 'Origens & navios', icon: 'Ship', blocks: [
        { t: 'map', title: 'Origens do cereal e navios a caminho de Leixões e Lisboa', points: ORIGINS, routes: [R_CANADA, R_MEXICO, R_ROUEN, R_BLACK], height: 460,
          legend: [['Trigo duro', '#D99A00'], ['Trigo mole', '#8C5A14']] },
        { t: 'table', title: 'Navios em trânsito', sub: 'Posição AIS às 09:30 · ETA calculado pelo Cortex com meteorologia', span: true, status: ['Estado'],
          columns: ['Navio', 'Rota', 'Carga', 'Toneladas', 'ETA', 'DON previsto', 'Estado'],
          rows: [
            { Navio: 'MV Black Sea Pearl', Rota: 'Constanța → Lisboa', Carga: 'Trigo mole W 240', Toneladas: 28500, ETA: '28/11', 'DON previsto': '180 µg/kg', Estado: 'No prazo' },
            { Navio: 'MV Nordic Harvest', Rota: 'Montreal → Leixões', Carga: 'Trigo duro CWAD n.º 1', Toneladas: 24000, ETA: '02/12', 'DON previsto': '290 µg/kg', Estado: 'No prazo' },
            { Navio: 'MV Seine Trader', Rota: 'Rouen → Lisboa', Carga: 'Trigo mole francês', Toneladas: 16000, ETA: '05/12', 'DON previsto': '240 µg/kg', Estado: 'Atraso 2 dias' },
            { Navio: 'MV Sonora Star', Rota: 'Guaymas → Leixões', Carga: 'Trigo duro México', Toneladas: 21500, ETA: '09/12', 'DON previsto': '980 µg/kg', Estado: 'Risco DON' },
          ] },
        ch('cp5', 'Custo de frete por rota ($/t)', 'Média mensal · Baltic Supramax', 'line', ['Montreal–Leixões', 'Constanța–Lisboa', 'Rouen–Lisboa'],
          rows(MONTHS, { 'Montreal–Leixões': [29, 30, 31, 30, 29, 30, 31, 32, 31, 32, 33, 35], 'Constanța–Lisboa': [24, 25, 26, 25, 24, 24, 25, 26, 26, 27, 28, 29], 'Rouen–Lisboa': [17, 17, 18, 18, 17, 17, 18, 18, 19, 19, 19, 20] }),
          'O frete transatlântico subiu 12% desde setembro com a procura de soja no Atlântico Norte.',
          'Modelo prevê estabilização em $34/t até fevereiro.',
          'Negociar contrato de frete (COA) para 3 navios no 1.º trimestre a $33/t.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-don', 'Gestão do risco DON no MV Sonora Star', 'humano', 'DON previsto > 750 µg/kg (limite interno de receção)', 'Evita lote fora de especificação · €0,4 M', [
            ['Sinal', 'Chuvas tardias em Sonora: modelo prevê DON de 980 µg/kg no lote do MV Sonora Star.'],
            ['Diagnóstico', 'Acima do limite interno de receção (750 µg/kg) e do perfil da massa Milaneza.'],
            ['Recomendação', 'Amostragem obrigatória à chegada e mistura máxima de 25% com CWAD de baixo DON nos silos S05–S08.'],
            ['Aprovação humana', 'Validação da Qualidade antes da descarga.'],
            ['Ação', 'Plano de receção enviado a Leixões e à semolaria; LIMS com análise prioritária.'],
          ], { approver: 'Teresa Antunes — Diretora de Qualidade', domain: 'Compras · Qualidade', last: 'hoje 08:10' }),
        ] },
      ],
    },
    {
      id: 'qualidade-rececao', label: 'Qualidade na receção', icon: 'FlaskConical', blocks: [
        { t: 'kpis', items: [
          k('Lotes recebidos (YTD)', '1 284', '+9% a/a', true, true),
          k('Lotes rejeitados ou desclassificados', '1,3%', '-0,8 pp a/a', false, true),
          k('Proteína média trigo duro', '13,7%', '+0,2 pp', true, true),
          k('DON médio à receção', '362 µg/kg', '+18% a/a', true, false),
        ] },
        { t: 'heat', title: 'DON médio por origem (µg/kg)', sub: 'Últimos 6 meses · verde = baixo risco', good: 'low', span: true,
          rows: ['Canadá (CWAD)', 'Sonora (MX)', 'Occitânia (FR)', 'Foggia (IT)', 'Alentejo (PT)', 'Dakota do Norte (EUA)'], cols: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
          values: [[260, 240, 280, 300, 290, 310], [520, 610, 700, 760, 840, 910], [380, 360, 410, 450, 420, 400], [300, 320, 340, 330, 350, 360], [210, 230, 260, 280, 250, 240], [330, 310, 350, 370, 360, 340]] },
        ch('cp6', 'Proteína do trigo duro à receção (%)', 'Média mensal ponderada vs. especificação Milaneza', 'line', ['Proteína', 'Especificação mínima'],
          rows(MONTHS, { 'Proteína': [13.4, 13.5, 13.6, 13.5, 13.4, 13.6, 13.7, 13.8, 13.6, 13.5, 13.7, 13.8], 'Especificação mínima': [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13] }),
          'A proteína está estável acima da especificação; a nova colheita canadiana traz +0,3 pp.',
          'Previsão de 13,9% em dezembro com o MV Nordic Harvest.',
          'Reduzir em 5% o glúten vital adicionado à Milaneza Integral — poupança de €38 mil/ano.', { ratio: true }),
        ch('cp7', 'Lotes rejeitados ou desclassificados por motivo (YTD)', '17 lotes em 1 284 (1,3%)', 'hbar', ['Lotes'],
          [{ m: 'DON acima do limite', Lotes: 7 }, { m: 'Humidade > 14%', Lotes: 4 }, { m: 'Proteína abaixo da especificação', Lotes: 3 }, { m: 'Peso específico baixo', Lotes: 2 }, { m: 'Grãos danificados ou insetos', Lotes: 1 }],
          'O DON explica 41% das rejeições, quase todas em trigo mexicano.',
          'Com o novo limite interno (750 µg/kg), as rejeições na receção descem para 0,9% — o risco passa a ser travado na compra.',
          'Pedir análise pré-embarque de DON em todos os contratos de origem mexicana.'),
        { t: 'models', items: [
          ml('Risco de micotoxinas (DON) por origem', 'Classificação · gradient boosting', 'AUC 0,87 · antecedência de 21 dias', 'chuva na floração, temperatura, variedade, histórico do fornecedor, lote', 'Qualidade · Compras', 'Produção', 'Estável', 'out/26', '€0,4 M/ano'),
          ml('Previsão de preço do trigo', 'Séries temporais multivariadas', 'MAPE 3,8% a 3 meses', 'Euronext, câmbio, frete, stocks IGC, meteorologia', 'Compras', 'Produção', 'Ligeiro', 'nov/26', '€2,1 M/ano'),
          ml('Otimização de compra e cobertura', 'Programação inteira mista (Snowpark)', '-€7/t vs. compra spot', 'necessidades MRP, preços previstos, armazenagem, risco', 'Compras', 'Produção', 'Estável', 'nov/26', '€1,3 M/ano'),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Devemos comprar trigo duro agora?', a: 'Sim, parcialmente. O trigo duro caiu **4,2% em 10 dias (€318/t)** e a cobertura está em **6,1 semanas** (política: 8). O modelo prevê **€309/t em dezembro**, mas com 32% de probabilidade de subir em fevereiro.\n• Recomendação: comprar **25 000 t de CWAD n.º 1** agora (40% da necessidade do 1.º trimestre)\n• Fixar **60% do USD** a 3 meses\n• Poupança estimada: **€0,9 M** face ao preço médio previsto' },
    { q: 'Qual o risco de DON nos navios a caminho?', a: 'Um navio em risco: o **MV Sonora Star** (21 500 t de trigo duro mexicano, ETA 09/12) com DON previsto de **980 µg/kg**, acima do limite interno de 750. Os restantes três navios estão abaixo de 300 µg/kg.\n• O agente propôs amostragem obrigatória à chegada e mistura máxima de 25% com CWAD\n• Aguarda validação da Diretora de Qualidade' },
    { q: 'Quanto poupámos em compras este ano?', a: 'Até outubro, **€2,7 M** face ao preço médio de mercado (-2,1% no custo do trigo). 62% vem da escolha do momento de compra, 24% da mistura de origens e 14% da negociação de frete.' },
    { q: 'Qual a exposição cambial ao dólar?', a: 'Temos **$9,8 M** de compras em USD não cobertas (42% do total). Cada cêntimo de valorização do dólar custa **€0,21 M por ano** à semolaria da Maia. O agente recomenda cobrir 60% a 3 meses.' },
  ],
};
