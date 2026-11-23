import type { Module } from '../types';
import { k, ch, ag, ml, rows, pie, MONTHS, spark } from '../gen';

export const qualidade: Module = {
  slug: 'qualidade', name: 'Qualidade & Segurança Alimentar', short: 'Qualidade & Seg. Alimentar', icon: 'ShieldCheck', color: '#17924B', group: 'funcoes',
  tagline: 'Laboratório, HACCP, rastreabilidade lote a lote, certificações IFS/BRCGS e voz do consumidor',
  owner: 'Teresa Antunes — Diretora de Qualidade e Segurança Alimentar',
  sources: ['LIMS', 'MES', 'SAP QM', 'CRM Apoio ao Consumidor', 'Detetores de metais e raio-X', 'Calendário de auditorias'],
  sections: [
    {
      id: 'indicadores', label: 'Indicadores', icon: 'Activity', blocks: [
        { t: 'kpis', items: [
          k('Reclamações por milhão de unidades', '4,1 ppm', '-24% a/a', false, true, spark(21, 5.4, 0.3, -0.24)),
          k('Lotes retidos', '0,9%', '-0,4 pp a/a', false, true),
          k('Tempo de rastreabilidade total', '4 min 12 s', 'antes: 2 dias úteis', false, true),
          k('Auditorias externas aprovadas', '11/11', 'IFS · BRCGS · ISO', true, true),
        ] },
        ch('q1', 'Reclamações de consumidores por milhão de unidades', 'Grupo · últimos 12 meses', 'area', ['ppm', 'Objetivo 2026'],
          rows(MONTHS, { ppm: [5.6, 5.4, 5.3, 5.1, 4.9, 5.0, 4.7, 4.5, 4.4, 4.2, 4.0, 4.1], 'Objetivo 2026': [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5] }),
          'O ligeiro aumento de outubro concentra-se na Milaneza Esparguete (massa partida) — ligado à linha L3 da Maia II.',
          'Com a correção do secador, novembro deve fechar em 3,8 ppm.',
          'Manter o alerta do lote L26312 até as reclamações regressarem ao padrão.', { ratio: true }),
        ch('q2', 'Reclamações por motivo (YTD)', 'Classificadas pelo Cortex AI_CLASSIFY · 1 146 casos', 'pie', ['v'],
          pie([['Massa partida ou quebradiça', 27], ['Embalagem danificada', 19], ['Cozedura (empapa, cola)', 14], ['Sabor ou cheiro', 11], ['Corpo estranho', 9], ['Insetos (traça)', 7], ['Informação de alergénios', 5], ['Outros', 8]]),
          'A massa partida subiu de 19% para 27% das reclamações desde setembro, concentrada em formatos longos.',
          'As reclamações por traça sobem habitualmente em julho–setembro; em 2026 caíram 31% com a monitorização de armadilhas.',
          'Abrir CAPA para a linha L3 e rever a caixa de cartão da Milaneza longa (resistência à compressão).', { ratio: true }),
        { t: 'insights', items: [
          { tone: 'warn', title: 'Cluster de reclamações · Milaneza Esparguete 500 g', text: '23 reclamações em 9 dias com o mesmo motivo (massa partida) e lotes L26310 a L26313 da linha L3. Ligação confirmada com a humidade do secador.', tag: 'CAPA-26-114 · aberta' },
          { tone: 'ok', title: 'Traça: -31% de reclamações', text: 'A rede de 640 armadilhas com leitura por imagem detetou 2 focos no armazém de Lisboa antes de chegarem ao produto.', tag: 'Controlo de pragas' },
          { tone: 'info', title: 'Novo limite interno de DON', text: 'O limite de receção de trigo duro passou de 900 para 750 µg/kg; impacto estimado de 4% nas compras ao México.', tag: 'Compras & Cereais' },
        ] },
      ],
    },
    {
      id: 'rastreabilidade', label: 'Rastreabilidade', icon: 'GitBranch', blocks: [
        { t: 'kpis', items: [
          k('Lotes com genealogia completa', '100%', 'navio → palete → cliente', true, true),
          k('Simulações de recolha (YTD)', '14', 'todas < 5 min', true, true),
          k('Destinos por lote (média)', '31', 'retalho, C&C, exportação', true, true),
          k('Recolhas reais (YTD)', '0', 'última: nenhuma desde 2023', false, true),
        ] },
        { t: 'trace' },
        ch('q6', 'Simulações de recolha em 2026 · tempo até genealogia completa', 'Minutos por simulação (objetivo interno: 5 min; requisito: 4 h)', 'bar', ['Minutos', 'Objetivo'],
          ['14/01', '11/02', '18/03', '15/04', '13/05', '10/06', '15/07', '12/08', '16/09', '14/10', '04/11', '09/11', '13/11', '18/11'].map((m, i) => ({ m, Minutos: [4.9, 4.7, 4.8, 4.6, 4.5, 4.6, 4.4, 4.5, 4.3, 4.4, 4.3, 4.2, 4.3, 4.2][i], Objetivo: 5 })),
          'Todas as 14 simulações ficaram abaixo de 5 minutos, incluindo uma em Venta de Baños 52 dias após o fecho.',
          'Com o LIMS de Litovel em tempo real, o tempo médio desce para 3,8 minutos.',
          'Agendar uma simulação não anunciada em Litovel em dezembro.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-recall', 'Preparação de recolha preventiva', 'humano', 'Resultado laboratorial fora de limite num lote expedido', 'Notificação em < 1 h (requisito: 24 h)', [
            ['Sinal', 'LIMS: amostra de retenção do lote L26312-M2L3-03 com resultado a confirmar.'],
            ['Rastreio', 'Genealogia completa em 4 min 12 s: 38 destinos, 126 paletes, 9 clientes.'],
            ['Recomendação', 'Bloqueio no hub da Maia e em Lisboa; rascunho de notificação DGAV/ASAE e aviso aos clientes por EDI.'],
            ['Aprovação humana', 'Decisão da Diretora de Qualidade e do CEO.'],
            ['Ação', 'Comunicações enviadas e stock bloqueado no SAP; Apoio ao Consumidor com guião preparado.'],
          ], { approver: 'Teresa Antunes — Diretora de Qualidade', domain: 'Qualidade', last: 'simulação 18/11' }),
        ] },
      ],
    },
    {
      id: 'laboratorio', label: 'Laboratório & SPC', icon: 'FlaskConical', blocks: [
        ch('q3', 'Humidade da massa seca à embalagem (%) · carta de controlo', 'Maia II · linha L3 · média por turno', 'line', ['Humidade', 'Limite superior', 'Limite inferior', 'Alvo'],
          rows(['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'], { Humidade: [12.1, 12.2, 12.0, 12.2, 12.3, 12.4, 12.4, 12.5, 12.6, 12.5, 12.3, 12.2], 'Limite superior': [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5], 'Limite inferior': [11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6, 11.6], Alvo: [12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1] }),
          'Sete turnos consecutivos acima do alvo e um ponto fora do limite superior (T9) — regra de Western Electric violada.',
          'Após a correção do secador, os próximos turnos devem voltar ao alvo (12,1%).',
          'Reforçar a amostragem para 1 por hora na L3 durante 72 h.', { ratio: true }),
        ch('q4', 'Proteína e cinzas das farinhas industriais', 'Média semanal · Nacional T65 e T55', 'line', ['Proteína T65 (%)', 'Proteína T55 (%)', 'Cinzas T65 (% × 10)'],
          rows(['S36', 'S37', 'S38', 'S39', 'S40', 'S41', 'S42', 'S43', 'S44', 'S45', 'S46', 'S47'], { 'Proteína T65 (%)': [11.8, 11.9, 11.8, 11.7, 11.9, 12.0, 11.9, 11.8, 11.9, 12.0, 12.1, 12.0], 'Proteína T55 (%)': [11.2, 11.3, 11.2, 11.2, 11.3, 11.4, 11.3, 11.2, 11.3, 11.4, 11.4, 11.4], 'Cinzas T65 (% × 10)': [6.4, 6.5, 6.4, 6.3, 6.4, 6.5, 6.4, 6.4, 6.3, 6.4, 6.5, 6.4] }),
          'Estabilidade elevada: desvio-padrão da proteína da T65 em 0,11 pp, o melhor de sempre.',
          'Sem desvios previstos com a mistura atual.',
          'Partilhar o certificado de consistência com os 40 maiores clientes de panificação.', { ratio: true }),
        { t: 'table', title: 'Últimas análises de lote', sub: 'LIMS · hoje', status: ['Resultado'], span: true,
          columns: ['Lote', 'Produto', 'Fábrica', 'Humidade', 'Proteína', 'DON', 'Microbiologia', 'Resultado'],
          rows: [
            { Lote: 'L26327-M2L3-01', Produto: 'Milaneza Esparguete 500 g', Fábrica: 'Maia II', Humidade: '12,2%', 'Proteína': '13,1%', DON: '290 µg/kg', Microbiologia: 'Conforme', Resultado: 'Aprovado' },
            { Lote: 'L26327-M1L1-04', Produto: 'Milaneza Laços 500 g', Fábrica: 'Maia I', Humidade: '12,0%', 'Proteína': '13,0%', DON: '270 µg/kg', Microbiologia: 'Conforme', Resultado: 'Aprovado' },
            { Lote: 'F26327-LIS-T65-12', Produto: 'Nacional T65 Panificação 25 kg', Fábrica: 'Lisboa', Humidade: '14,1%', 'Proteína': '12,0%', DON: '210 µg/kg', Microbiologia: 'Conforme', Resultado: 'Aprovado' },
            { Lote: 'C26326-TRO-CF-02', Produto: 'Nacional Corn Flakes Sem Açúcar', Fábrica: 'Trofa', Humidade: '2,8%', 'Proteína': '7,4%', DON: '< 100 µg/kg', Microbiologia: 'Conforme', Resultado: 'Aprovado' },
            { Lote: 'B26326-MAI-AL-03', Produto: 'Nacional Bolacha Alfa 200 g', Fábrica: 'Maia', Humidade: '3,9%', 'Proteína': '7,1%', DON: '< 100 µg/kg', Microbiologia: 'Em análise', Resultado: 'Retido (análise)' },
            { Lote: 'LT26326-L5-07', Produto: 'Adriana Torti 500 g', Fábrica: 'Litovel', Humidade: '12,3%', 'Proteína': '13,2%', DON: '320 µg/kg', Microbiologia: 'Conforme', Resultado: 'Aprovado' },
          ] },
      ],
    },
    {
      id: 'consumidor', label: 'Voz do consumidor', icon: 'MessageSquareHeart', blocks: [
        { t: 'kpis', items: [
          k('Contactos do Apoio ao Consumidor (YTD)', '6 480', '1 146 reclamações', true, true),
          k('Tempo médio de resolução', '2,3 dias', 'antes: 6,8 dias', false, true),
          k('Sentimento médio (redes e contactos)', '+0,46', 'escala −1 a +1', true, true),
          k('Resposta redigida pelo Cortex', '71%', 'revista por humano', true, true),
        ] },
        ch('q5', 'Reclamações classificadas por marca (YTD)', 'Por milhão de unidades vendidas', 'bar', ['ppm'],
          [{ m: 'Milaneza', ppm: 4.6 }, { m: 'Nacional massas', ppm: 3.9 }, { m: 'Nacional cereais', ppm: 3.2 }, { m: 'Nacional bolachas', ppm: 5.8 }, { m: 'Del Mondo', ppm: 2.1 }, { m: 'Amiga', ppm: 3.4 }, { m: 'Adriana', ppm: 3.0 }, { m: 'Zátkovy', ppm: 4.4 }],
          'As bolachas Nacional têm o rácio mais alto, sobretudo por embalagem danificada (bolacha partida no transporte).',
          'Com o novo tabuleiro interno da Bolacha Alfa (janeiro), a previsão é de 4,2 ppm.',
          'Acelerar a substituição do tabuleiro para dezembro nas referências de 200 g.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-capa', 'Cluster de reclamações ligado à produção', 'humano', '≥ 15 reclamações semelhantes em 10 dias', 'Problema isolado em 2 dias (antes: 3 semanas)', [
            ['Sinal', '23 reclamações de "massa partida" na Milaneza Esparguete 500 g em 9 dias.'],
            ['Correlação', 'Lotes L26310–L26313 da linha L3; humidade do secador acima do alvo em 7 turnos.'],
            ['Recomendação', 'Abrir CAPA, reforçar amostragem e responder aos consumidores com reposição.'],
            ['Aprovação humana', 'Validação da Diretora de Qualidade.'],
            ['Ação', 'CAPA-26-114 criada; 23 respostas personalizadas enviadas com vale de reposição.'],
          ], { approver: 'Teresa Antunes — Diretora de Qualidade', domain: 'Qualidade', last: 'ontem 17:40' }),
        ] },
        { t: 'models', items: [
          ml('Classificação de reclamações', 'Cortex AI_CLASSIFY + AI_SENTIMENT', 'Concordância de 94% com analistas', 'texto, fotografias, lote, canal', 'Qualidade', 'Produção', 'Estável', 'out/26'),
          ml('Previsão de vida útil (bolachas e cereais)', 'Regressão de sobrevivência', 'Erro médio 9 dias', 'atividade da água, gordura, embalagem, temperatura de armazém', 'I&D', 'Piloto', 'Estável', 'set/26'),
          ml('Inspeção visual de embalagem', 'Visão computacional na linha EMB-07', 'Recall 97,8% de selagens defeituosas', 'imagens de câmara a 120 fps', 'Qualidade', 'Piloto', 'Estável', 'nov/26'),
        ] },
      ],
    },
    {
      id: 'certificacoes', label: 'Certificações & auditorias', icon: 'BadgeCheck', blocks: [
        { t: 'table', title: 'Certificações por centro industrial', sub: 'Estado a 23/11/2026', status: ['Estado'], span: true,
          columns: ['Centro', 'Referencial', 'Resultado', 'Última auditoria', 'Próxima', 'Estado'],
          rows: [
            { Centro: 'Maia (massas e bolachas)', Referencial: 'IFS Food v8', Resultado: 'Higher Level · 97,1%', 'Última auditoria': 'mar/26', 'Próxima': 'mar/27', Estado: 'Certificado' },
            { Centro: 'Trofa (cereais e barras)', Referencial: 'IFS Food v8', Resultado: 'Higher Level · 96,4%', 'Última auditoria': 'mai/26', 'Próxima': 'mai/27', Estado: 'Certificado' },
            { Centro: 'Lisboa (moagem)', Referencial: 'ISO 22000 · FSSC 22000', Resultado: 'Sem não conformidades maiores', 'Última auditoria': 'jun/26', 'Próxima': 'jun/27', Estado: 'Certificado' },
            { Centro: 'Porto (moagem)', Referencial: 'ISO 22000', Resultado: '2 não conformidades menores', 'Última auditoria': 'set/26', 'Próxima': 'set/27', Estado: 'Em curso (ações)' },
            { Centro: 'Litovel', Referencial: 'BRCGS Food Safety v9', Resultado: 'Grau AA', 'Última auditoria': 'abr/26', 'Próxima': 'abr/27', Estado: 'Certificado' },
            { Centro: 'Venta de Baños', Referencial: 'IFS Food v8', Resultado: 'Higher Level · 95,8%', 'Última auditoria': 'jan/26', 'Próxima': 'jan/27', Estado: 'Auditoria em 9 semanas' },
            { Centro: 'Grupo', Referencial: 'ISO 9001 · ISO 14001 · ISO 45001', Resultado: 'Multi-site', 'Última auditoria': 'out/26', 'Próxima': 'out/27', Estado: 'Certificado' },
          ] },
        { t: 'insights', items: [
          { tone: 'warn', title: 'Venta de Baños: auditoria IFS em 9 semanas', text: 'Primeira auditoria sob gestão Cerealis. O Cortex comparou os 41 requisitos com os registos atuais: 6 com evidência incompleta (sobretudo controlo de alergénios e calibrações).', tag: 'Plano de preparação gerado' },
          { tone: 'ok', title: 'Evidências recolhidas automaticamente', text: 'Registos HACCP, calibrações e formação ligados no Snowflake: o tempo de preparação de auditorias caiu de 3 semanas para 4 dias.', tag: 'Horizon · linhagem' },
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Quanto tempo demora a rastrear um lote?', a: '**4 minutos e 12 segundos** para a genealogia completa — do navio de trigo à loja — contra 2 dias úteis antes da Espiga. Para o lote **L26312-M2L3-03** da Milaneza Esparguete 500 g: **38 destinos, 126 paletes, 9 clientes**, com 8 paletes ainda em trânsito para Cabo Verde.' },
    { q: 'Porque subiram as reclamações de massa partida?', a: 'Há um **cluster de 23 reclamações em 9 dias** na Milaneza Esparguete 500 g, ligado aos lotes **L26310 a L26313 da linha L3** da Maia II. A causa é a **humidade à saída do secador** (7 turnos acima do alvo). O secador já foi corrigido, a CAPA-26-114 está aberta e os consumidores receberam resposta com reposição.' },
    { q: 'Estamos prontos para a auditoria IFS de Venta de Baños?', a: 'Quase. A auditoria é daqui a **9 semanas** e o Cortex encontrou **6 requisitos com evidência incompleta** em 41 (controlo de alergénios e calibrações). O plano de preparação já tem responsáveis e datas; a evidência automática reduziu a preparação de 3 semanas para 4 dias.' },
    { q: 'Qual a marca com mais reclamações?', a: 'Em rácio, as **bolachas Nacional (5,8 ppm)**, sobretudo por embalagem danificada no transporte. Seguem-se Milaneza (4,6 ppm) e Zátkovy (4,4 ppm). A Del Mondo tem o melhor resultado (2,1 ppm).' },
  ],
};
