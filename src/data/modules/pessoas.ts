import type { Module } from '../types';
import { k, ch, ag, ml, rows, pie, MONTHS, spark } from '../gen';
import { PEOPLE_BY_SITE } from '../facts';

export const pessoas: Module = {
  slug: 'pessoas', name: 'Pessoas', short: 'Pessoas', icon: 'Users', color: '#7A5600', group: 'funcoes',
  tagline: '912 colaboradores em Portugal, Chéquia e Espanha · turnos, segurança, talento e formação',
  owner: 'Isabel Moura — Diretora de Pessoas',
  sources: ['SAP SuccessFactors', 'Sistema de ponto e turnos', 'Registo de segurança (SST)', 'Academia Cerealis · LMS', 'Inquérito de clima'],
  sections: [
    {
      id: 'forca', label: 'Força de trabalho', icon: 'Users', blocks: [
        { t: 'kpis', items: [
          k('Colaboradores', '912', '+142 com a Pasta VB3', true, true, spark(61, 760, 10, 0.2)),
          k('Rotatividade voluntária (12 meses)', '7,9%', '−1,2 pp a/a', false, true),
          k('Idade média', '44,6 anos', '31% com mais de 55 anos', true, false),
          k('Mulheres em funções de liderança', '34%', '+4 pp a/a', true, true),
        ] },
        ch('pe1', 'Colaboradores por local', 'Outubro de 2026', 'hbar', ['Colaboradores'],
          PEOPLE_BY_SITE.map(([m, v]) => ({ m, Colaboradores: v })),
          'A Maia concentra 40% das pessoas (fábricas, hub logístico e sede).',
          'Necessidade de 26 contratações em 2027 para substituir reformas na Maia e em Lisboa.',
          'Abrir a 2.ª edição da Academia de Operadores com o IEFP e a escola profissional da Maia.'),
        ch('pe2', 'Colaboradores por função', '% do total', 'pie', ['v'],
          pie([['Produção', 54], ['Logística e armazém', 14], ['Manutenção', 9], ['Qualidade e laboratório', 6], ['Comercial e marketing', 9], ['Serviços corporativos', 8]]),
          'A manutenção tem a maior escassez de talento: 3 vagas abertas há mais de 60 dias.',
          'A automação de encomendas liberta 6 pessoas do Serviço ao Cliente para funções comerciais.',
          'Reconverter 2 técnicos de encomendas para apoio técnico às padarias.', { ratio: true }),
        { t: 'heat', title: 'Pirâmide de reforma por local (n.º de pessoas com 60+ anos nos próximos 5 anos)', sub: 'Funções críticas', span: true, good: 'low',
          rows: ['Maia', 'Lisboa', 'Porto', 'Trofa', 'Litovel', 'Venta de Baños'], cols: ['Moleiros', 'Operadores de massa', 'Manutenção', 'Qualidade', 'Logística'],
          values: [[2, 21, 7, 2, 9], [6, 0, 5, 1, 6], [4, 0, 2, 1, 2], [0, 6, 2, 1, 3], [0, 12, 4, 1, 4], [0, 9, 3, 1, 5]] },
      ],
    },
    {
      id: 'turnos', label: 'Turnos & absentismo', icon: 'CalendarClock', blocks: [
        { t: 'kpis', items: [
          k('Absentismo', '4,1%', '−0,6 pp a/a', false, true, spark(62, 4.7, 0.2, -0.12)),
          k('Horas extra (YTD)', '41 300 h', '−18% a/a', false, true),
          k('Turnos cobertos sem horas extra', '94%', '+7 pp a/a', true, true),
          k('Precisão da previsão de absentismo', '89%', 'a 7 dias', true, true),
        ] },
        ch('pe3', 'Absentismo por local (%)', 'Últimos 12 meses', 'line', ['Maia', 'Lisboa', 'Litovel', 'Venta de Baños'],
          rows(MONTHS, { Maia: [4.9, 5.4, 5.8, 5.1, 4.6, 4.3, 4.1, 4.4, 4.0, 3.8, 4.1, 4.2], Lisboa: [4.1, 4.6, 5.0, 4.4, 4.0, 3.7, 3.6, 3.9, 3.5, 3.4, 3.6, 3.7], Litovel: [4.4, 5.1, 5.6, 4.9, 4.2, 3.9, 3.7, 3.8, 3.6, 3.5, 3.8, 3.9], 'Venta de Baños': [null, null, null, null, null, 5.6, 5.3, 5.5, 5.0, 4.9, 5.2, 5.1] }),
          'O pico de inverno (dezembro–janeiro) repete-se todos os anos; Venta de Baños está 1 pp acima do grupo.',
          'O Cortex prevê 5,6% de absentismo na Maia em dezembro (gripe sazonal).',
          'Planear 9 operadores polivalentes de reserva para as linhas da Maia em dezembro.', { ratio: true, model: 'Previsão de absentismo por turno · precisão 89%' }),
        { t: 'agents', items: [
          ag('ag-turno', 'Reforço de turno por previsão de absentismo', 'humano', 'Absentismo previsto > 6% num turno crítico', '−320 h extra/mês na Maia', [
            ['Sinal', 'Previsão de 4 ausências no turno da noite de 2.ª feira na Maia II (linha L3).'],
            ['Diagnóstico', 'Posto do secador com apenas 2 operadores certificados.'],
            ['Recomendação', 'Deslocar 1 operador polivalente da L4 e antecipar 1 formação de secador.'],
            ['Aprovação humana', 'Confirmação do chefe de turno.'],
            ['Ação', 'Escala atualizada no sistema de turnos e notificação enviada aos operadores.'],
          ], { approver: 'Ana Rita Moreira — Chefe de Turno, Maia II', domain: 'Pessoas', last: 'hoje 10:15' }),
        ] },
        { t: 'heat', title: 'Polivalência por linha (operadores certificados por posto)', sub: 'Maia e Trofa · alvo: 3 por posto', span: true, good: 'high',
          rows: ['Maia I · L1', 'Maia I · L2', 'Maia II · L3', 'Maia II · L4', 'Trofa · extrusão', 'Maia · bolachas'], cols: ['Prensa', 'Trefilagem', 'Secador', 'Embalamento', 'Paletização', 'Qualidade em linha'],
          values: [[4, 3, 3, 5, 4, 2], [3, 3, 2, 4, 4, 2], [3, 2, 2, 4, 3, 2], [4, 3, 3, 5, 4, 3], [2, 0, 3, 4, 3, 2], [3, 0, 2, 5, 4, 2]] },
      ],
    },
    {
      id: 'seguranca', label: 'Segurança (SST)', icon: 'HardHat', blocks: [
        { t: 'kpis', items: [
          k('Índice de frequência (TF)', '9,8', '−22% a/a', false, true, spark(63, 12.6, 0.6, -0.22)),
          k('Índice de gravidade (TG)', '0,21', '−0,06 a/a', false, true),
          k('Quase-acidentes reportados (YTD)', '1 214', '+41% (cultura de reporte)', true, true),
          k('Dias sem acidentes com baixa · Trofa', '412', 'recorde do grupo', true, true),
        ] },
        ch('pe4', 'Acidentes com baixa e quase-acidentes', 'Grupo · por mês', 'combo', ['Acidentes com baixa', 'Quase-acidentes'],
          rows(MONTHS, { 'Acidentes com baixa': [3, 2, 3, 2, 2, 3, 1, 2, 1, 2, 1, 1], 'Quase-acidentes': [74, 81, 88, 92, 98, 104, 110, 115, 118, 121, 126, 131] }),
          'Mais quase-acidentes reportados e menos acidentes: a app de reporte com fotografia triplicou a participação.',
          'Risco de acidente mais alto previsto em dezembro (pico de produção e trabalho noturno).',
          'Reforçar as rondas de segurança nos turnos noturnos da Maia em dezembro.', { model: 'Risco de acidente por turno e área' }),
        ch('pe5', 'Quase-acidentes por tipo (YTD)', 'Classificados pelo Cortex a partir do relato livre', 'hbar', ['Ocorrências'],
          [{ m: 'Empilhadores e peões', 'Ocorrências': 312 }, { m: 'Escorregamentos (farinha no chão)', 'Ocorrências': 248 }, { m: 'Máquinas em movimento', 'Ocorrências': 191 }, { m: 'Movimentação manual de sacos', 'Ocorrências': 176 }, { m: 'Trabalho em altura (silos)', 'Ocorrências': 104 }, { m: 'Outros', 'Ocorrências': 183 }],
          'Empilhadores e peões continuam a ser o principal risco, concentrado no hub da Maia entre as 6h e as 8h.',
          'Os sensores de proximidade nos empilhadores podem reduzir estas ocorrências em 40%.',
          'Instalar sensores de proximidade nos 14 empilhadores do hub (€46 mil).', { ratio: true }),
      ],
    },
    {
      id: 'talento', label: 'Talento & formação', icon: 'GraduationCap', blocks: [
        { t: 'kpis', items: [
          k('Horas de formação por pessoa', '21 h', '+6 h a/a', true, true),
          k('Vagas abertas', '14', 'manutenção, turno, produção', true, false),
          k('Tempo médio de contratação', '38 dias', '−9 dias a/a', false, true),
          k('Clima organizacional', '7,6/10', '+0,4 a/a', true, true),
        ] },
        { t: 'funnel', title: 'Recrutamento · Técnico de Manutenção (Maia)', sub: 'Candidaturas via site, LinkedIn e Net-Empregos', stages: [
          ['Candidaturas', 186, 'triadas pelo Cortex'], ['Pré-selecionados', 41, '22%'], ['Entrevista técnica', 17, '41%'], ['Proposta', 4, '24%'], ['Contratados', 3, '75% de aceitação']] },
        ch('pe6', 'Clima por valor Cerealis (0–10)', 'Inquérito de outubro · 81% de participação', 'bar', ['2025', '2026'],
          [{ m: 'Speak Up', '2025': 6.8, '2026': 7.3 }, { m: 'Own It', '2025': 7.4, '2026': 7.8 }, { m: 'Learn Forever', '2025': 7.0, '2026': 7.7 }, { m: 'Strive for Greatness', '2025': 7.1, '2026': 7.5 }],
          'Learn Forever teve a maior subida (+0,7) com a Academia Cerealis e o Centro Técnico.',
          'Speak Up é o valor mais baixo em Venta de Baños (6,4) — integração cultural em curso.',
          'Programa de embaixadores Cerealis em Venta de Baños no 1.º trimestre.', { ratio: true }),
        { t: 'table', title: 'Vagas abertas', sub: 'Publicadas em cerealis.pt/carreiras', span: true, status: ['Estado'],
          columns: ['Vaga', 'Local', 'Abertura', 'Candidatos', 'Estado'],
          rows: [
            { Vaga: 'Técnico de Manutenção (M/F/D)', Local: 'Maia', Abertura: '62 dias', Candidatos: 186, Estado: 'Proposta enviada' },
            { Vaga: 'Chefe de Turno (M/F/D)', Local: 'Maia', Abertura: '28 dias', Candidatos: 73, Estado: 'Entrevistas' },
            { Vaga: 'Operador de Produção (M/F/D)', Local: 'Lisboa', Abertura: '19 dias', Candidatos: 112, Estado: 'Triagem' },
            { Vaga: 'Operador de Produção (M/F/D)', Local: 'Maia · Trofa', Abertura: '14 dias', Candidatos: 148, Estado: 'Triagem' },
            { Vaga: 'Estágio Profissional (M/F/D)', Local: 'Lisboa · Maia · Porto', Abertura: '33 dias', Candidatos: 264, Estado: 'Entrevistas' },
          ] },
        { t: 'models', items: [
          ml('Previsão de absentismo por turno', 'Snowflake ML FORECAST', 'Precisão 89% a 7 dias', 'histórico, época gripal, escala, horas extra, meteorologia', 'Pessoas', 'Produção', 'Estável', 'nov/26'),
          ml('Triagem de candidaturas', 'Cortex AI_COMPLETE com critérios auditáveis', '−70% tempo de triagem', 'CV, requisitos da vaga (sem dados sensíveis)', 'Pessoas', 'Piloto', 'Estável', 'set/26'),
          ml('Risco de acidente por turno e área', 'Classificação · gradient boosting', 'AUC 0,79', 'quase-acidentes, horas extra, carga, rotação, temperatura', 'SST', 'Piloto', 'Estável', 'out/26'),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Quantas pessoas temos e onde?', a: '**912 colaboradores**: 618 em Portugal (Maia 312, Sede 50, Lisboa 118, Trofa 96, Porto 42), **152 em Litovel** e **142 em Venta de Baños**. 54% trabalham na produção.' },
    { q: 'Como está a segurança?', a: 'O índice de frequência caiu **22% (TF 9,8)** e houve apenas 1 acidente com baixa em outubro. Os quase-acidentes reportados subiram 41% — sinal de cultura de reporte. A Trofa leva **412 dias sem acidentes com baixa**. Principal risco: empilhadores e peões no hub da Maia.' },
    { q: 'Que risco temos de reformas?', a: 'Nos próximos 5 anos, **31% das pessoas** passam os 55 anos. O ponto crítico são os **21 operadores de massa da Maia** e os **moleiros de Lisboa (6)**. O Cortex recomenda a 2.ª edição da Academia de Operadores e mentoria com os moleiros seniores.' },
    { q: 'Qual a previsão de absentismo para dezembro?', a: 'O modelo prevê **5,6% na Maia** em dezembro (gripe sazonal e pico de produção). Recomenda **9 operadores polivalentes de reserva** e antecipar formações de secador na Maia II, onde há postos com apenas 2 operadores certificados.' },
  ],
};
