import type { Module } from '../types';
import { k, ch, ag, ml, rows, MONTHS, WEEKS, spark } from '../gen';
import { plantPoints } from '../facts';

export const operacoes: Module = {
  slug: 'operacoes', name: 'Operações Industriais', short: 'Operações Industriais', icon: 'Factory', color: '#121210', group: 'funcoes',
  tagline: '10 fábricas · moagens, semolaria, massas, cereais, barras e bolachas · OEE, energia e manutenção',
  owner: 'Luís Magalhães — Diretor Industrial',
  sources: ['MES (linhas de massa)', 'SCADA moagens', 'Bühler Insights', 'SAP PM', 'Contadores de energia', 'OMIE (Marketplace)', 'LIMS'],
  sections: [
    {
      id: 'fabricas', label: 'Visão das fábricas', icon: 'Map', blocks: [
        { t: 'kpis', items: [
          k('OEE do grupo', '78,6%', '+3,4 pp a/a', true, true, spark(12, 75, 1, 0.04)),
          k('Produção YTD', '402 mil t', 'massas, farinhas, cereais, bolachas', true, true),
          k('Paragens não planeadas', '-31%', 'vs. 2025', false, true),
          k('Energia por tonelada de massa', '418 kWh/t', '-7% a/a', false, true, spark(14, 449, 6, -0.07)),
        ] },
        { t: 'map', title: 'Centros industriais — estado em tempo real', points: plantPoints, height: 420 },
        ch('op1', 'OEE por centro industrial (%)', 'Outubro · meta 80%', 'bar', ['OEE', 'Meta'],
          [{ m: 'Lisboa', OEE: 83.1, Meta: 80 }, { m: 'Maia', OEE: 81.2, Meta: 80 }, { m: 'Porto', OEE: 79.8, Meta: 80 }, { m: 'Litovel', OEE: 77.9, Meta: 80 }, { m: 'Trofa', OEE: 76.4, Meta: 80 }, { m: 'Venta de Baños', OEE: 72.5, Meta: 78 }],
          'Venta de Baños é a maior oportunidade: 2,1 h por turno em mudanças de formato, o dobro da Maia.',
          'Com as práticas SMED da Maia, Venta de Baños chega a 77% em março.',
          'Enviar a equipa SMED da Maia II a Venta de Baños em janeiro (2 semanas).', { ratio: true }),
        ch('op2', 'Perdas de OEE por causa (horas)', 'Outubro · todas as linhas', 'hbar', ['Horas'],
          [{ m: 'Mudança de formato', Horas: 312 }, { m: 'Paragem não planeada', Horas: 214 }, { m: 'Microparagens', Horas: 188 }, { m: 'Velocidade reduzida', Horas: 141 }, { m: 'Qualidade (massa partida)', Horas: 96 }, { m: 'Falta de material', Horas: 52 }],
          'As mudanças de formato representam 31% das perdas; 62% acontecem em Venta de Baños e Litovel.',
          'Sequenciar formatos por família (curtas → longas) reduz 18% do tempo de mudança.',
          'Ativar o sequenciador de produção do Cortex nas 4 linhas de Venta de Baños.', { ratio: true }),
      ],
    },
    {
      id: 'oee', label: 'OEE & linhas', icon: 'Gauge', blocks: [
        ch('op3', 'OEE do grupo vs. meta (%)', 'Últimos 12 meses', 'area', ['OEE', 'Meta'],
          rows(MONTHS, { OEE: [75.1, 74.6, 75.4, 76.0, 76.3, 74.9, 76.8, 77.2, 77.5, 77.9, 78.3, 78.6], Meta: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80] }),
          'A entrada de Venta de Baños em abril baixou o OEE do grupo 1,4 pp; sem essa unidade, o OEE estaria em 80,1%.',
          'Previsão de 79,4% em dezembro, com o pico de produção.',
          'Fixar a meta de Venta de Baños em 78% para 2027 e 82% para 2028.', { ratio: true, span: true }),
        { t: 'heat', title: 'OEE por linha e semana (%)', sub: 'Semanas 36 a 47', span: true,
          rows: ['Maia I · L1 massa curta', 'Maia I · L2 massa curta', 'Maia II · L3 massa longa', 'Maia II · L4 massa longa', 'Trofa · extrusão', 'Maia · bolachas', 'Litovel · L5', 'Venta de Baños · L2'],
          cols: WEEKS, values: [
            [82, 83, 81, 84, 85, 83, 84, 82, 85, 84, 83, 84], [80, 79, 82, 81, 80, 83, 82, 81, 80, 82, 83, 82], [84, 83, 85, 82, 80, 78, 77, 79, 76, 74, 75, 72], [81, 82, 80, 83, 82, 84, 83, 85, 84, 83, 84, 85],
            [73, 74, 76, 75, 77, 76, 78, 77, 76, 78, 77, 79], [79, 80, 78, 81, 80, 79, 82, 81, 80, 83, 82, 81], [78, 79, 80, 79, 81, 80, 79, 82, 81, 80, 82, 81], [68, 69, 70, 71, 70, 72, 71, 73, 72, 74, 73, 74]] },
        { t: 'table', title: 'Linhas com desvio', sub: 'Deteção de anomalias Cortex · últimas 24 h', span: true, status: ['Estado'], link: { base: '/portal/360/ativos', idCol: 'Ativo' },
          columns: ['Ativo', 'Linha', 'Sinal', 'Impacto', 'Estado'],
          rows: [
            { Ativo: 'MAI-M2-L3', Linha: 'Maia II · massa longa L3', Sinal: 'Humidade à saída do secador 12,6% (alvo 12,2%)', Impacto: 'Risco de massa partida', Estado: 'Atenção' },
            { Ativo: 'LIS-MOI-B3', Linha: 'Lisboa · moinho B3', Sinal: 'Vibração do rolo +38% em 9 dias', Impacto: 'Paragem estimada em 6 dias', Estado: 'Crítico' },
            { Ativo: 'VDB-L2', Linha: 'Venta de Baños · L2', Sinal: 'Mudanças de formato 2,1 h/turno', Impacto: '-6 pp de OEE', Estado: 'Atenção' },
            { Ativo: 'TRO-EXT-01', Linha: 'Trofa · extrusão', Sinal: 'Binário do parafuso estável', Impacto: '—', Estado: 'Normal' },
          ] },
        ch('op4', 'Massa partida na Milaneza Esparguete (%)', 'Linha L3 · por semana', 'line', ['Massa partida', 'Limite'],
          rows(WEEKS, { 'Massa partida': [0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.3, 1.2, 1.4, 1.6, 1.5, 1.8], 'Limite': [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5] }),
          'A massa partida duplicou desde a semana 40; o modelo liga 74% da variação à humidade à saída do secador e à humidade ambiente.',
          'Sem correção, ultrapassa 2% na semana 49 — com reclamações de consumidores 10 dias depois.',
          'Ajustar o diagrama de secagem da zona 3 (−2 °C, +4% humidade relativa).', { ratio: true, model: 'Qualidade preditiva · secagem de massa longa' }),
        { t: 'agents', items: [
          ag('ag-sec', 'Correção do diagrama de secagem', 'auto', 'Humidade à saída fora do alvo durante > 45 min', 'Massa partida −0,6 pp · €46 mil/mês', [
            ['Sinal', 'Humidade à saída do secador da L3 em 12,6% (alvo 12,2%) durante 52 minutos.'],
            ['Diagnóstico', 'Humidade ambiente na Maia a 91% e zona 3 do secador 2 °C acima do padrão.'],
            ['Ação', 'Novo setpoint enviado ao MES dentro da janela validada pela Qualidade (zona 3: 82 °C).'],
            ['Verificação', 'Humidade normalizada (12,2%) em 38 minutos; registado no histórico do lote.'],
          ], { domain: 'Operações', last: 'hoje 06:20' }),
        ] },
      ],
    },
    {
      id: 'moagem', label: 'Moagem & semolaria', icon: 'Wheat', blocks: [
        { t: 'kpis', items: [
          k('Taxa de extração · trigo mole (Lisboa)', '77,4%', '+0,8 pp a/a', true, true),
          k('Taxa de extração · centeio (Porto)', '71,8%', '+0,6 pp vs. plano', true, true),
          k('Rendimento da semolaria (Maia)', '68,9%', '+0,4 pp', true, true),
          k('Custo da mistura de trigos', '€226/t', '-€3,2/t vs. manual', false, true),
        ] },
        ch('op5', 'Taxa de extração de farinha (%)', 'Moagens de Lisboa e Porto', 'line', ['Lisboa', 'Porto', 'Meta'],
          rows(MONTHS, { Lisboa: [76.4, 76.5, 76.6, 76.8, 76.7, 76.9, 77.0, 77.1, 77.2, 77.3, 77.3, 77.4], Porto: [75.4, 75.5, 75.3, 75.6, 75.8, 75.7, 75.9, 76.0, 75.9, 76.1, 76.0, 76.1], Meta: [77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77] }),
          'Cada 0,1 pp de extração em Lisboa vale €0,13 M por ano; o ganho de 2026 vem da afinação dos rolos e da mistura otimizada.',
          'Lisboa chega a 77,6% em janeiro, se o rolo B3 for substituído a tempo.',
          'Aprovar a intervenção no moinho B3 na paragem de domingo.', { ratio: true }),
        ch('op9', 'Mistura atual de trigos · farinha T65 (Lisboa)', '% por origem · definida pelo otimizador', 'pie', ['v'],
          [{ m: 'Beauce (França)', v: 40 }, { m: 'Constanța (Roménia)', v: 35 }, { m: 'Castela e Leão (Espanha)', v: 15 }, { m: 'Alentejo (Portugal)', v: 10 }],
          'A mistura atual cumpre W 245 e proteína de 12,0% ao custo mínimo de €226/t.',
          'Com o MV Black Sea Pearl (28/11), o otimizador sobe o trigo romeno para 40% em dezembro.',
          'Validar a nova mistura de dezembro no ensaio de panificação do Centro Técnico.', { ratio: true }),
        { t: 'scenario', title: 'Mistura ótima para farinha Nacional T65 · Panificação', sub: 'Otimizador Snowpark: custo mínimo cumprindo a especificação (W 230–260, P/L 0,6–0,9, proteína ≥ 11,5%)',
          inputs: [
            { id: 'fr', label: 'Trigo francês (Beauce)', min: 0, max: 70, step: 5, value: 40, unit: '%' },
            { id: 'ro', label: 'Trigo romeno (Constanța)', min: 0, max: 70, step: 5, value: 35, unit: '%' },
            { id: 'es', label: 'Trigo de Castela e Leão', min: 0, max: 40, step: 5, value: 15, unit: '%' },
          ],
          outputs: [
            { label: 'Proteína estimada', calc: v => { const pt = Math.max(0, 100 - v.fr - v.ro - v.es); return (v.fr * 11.9 + v.ro * 12.4 + v.es * 11.2 + pt * 12.8) / 100; }, fmt: n => `${n.toLocaleString('pt-PT', { maximumFractionDigits: 2 })}%`, good: n => n >= 11.5 },
            { label: 'Força (W) estimada', calc: v => { const pt = Math.max(0, 100 - v.fr - v.ro - v.es); return (v.fr * 235 + v.ro * 255 + v.es * 205 + pt * 270) / 100; }, fmt: n => `W ${Math.round(n)}`, good: n => n >= 230 && n <= 260 },
            { label: 'Custo da mistura', calc: v => { const pt = Math.max(0, 100 - v.fr - v.ro - v.es); return (v.fr * 227 + v.ro * 221 + v.es * 219 + pt * 241) / 100; }, fmt: n => `€${n.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}/t` },
          ], note: 'O restante até 100% é trigo do Alentejo. Ótimo atual do Cortex: 40% FR · 35% RO · 15% ES · 10% PT.' },
        { t: 'models', items: [
          ml('Otimizador de mistura de trigos', 'Programação linear · Snowpark', '-€3,2/t vs. mistura manual', 'análises LIMS do lote, stock por silo, preço, especificação do cliente', 'Moagens', 'Produção', 'Estável', 'nov/26', '€1,1 M/ano'),
          ml('Previsão de extração', 'Regressão · gradient boosting', 'Erro 0,12 pp', 'humidade, dureza, peso específico, afinação dos rolos', 'Moagens', 'Produção', 'Estável', 'out/26'),
          ml('Qualidade da farinha em linha (NIR)', 'Regressão PLS sobre espectros NIR', 'R² 0,93 (proteína e cinzas)', 'espectros NIR a cada 2 min', 'Qualidade', 'Piloto', 'Estável', 'out/26'),
        ] },
      ],
    },
    {
      id: 'energia', label: 'Energia', icon: 'Zap', blocks: [
        { t: 'kpis', items: [
          k('Fatura energética 2026E', '€13,8 M', '-€1,3 M vs. 2025', false, true),
          k('Eletricidade por tonelada de farinha', '88 kWh/t', '-5% a/a', false, true),
          k('Gás por tonelada de massa', '61 m³/t', '-8% a/a', false, true),
          k('Autoconsumo solar (Maia e Trofa)', '14%', '2,9 MWp instalados', true, true),
        ] },
        ch('op6', 'Consumo previsto vs. preço OMIE (amanhã)', 'Moagem de Lisboa · hora a hora', 'combo', ['Consumo (MWh)', 'Preço OMIE (€/MWh)'],
          Array.from({ length: 24 }, (_, h) => ({ m: `${String(h).padStart(2, '0')}h`, 'Consumo (MWh)': [2.9, 3.0, 3.0, 3.0, 3.0, 2.9, 2.6, 2.1, 1.8, 1.7, 1.6, 1.6, 1.7, 1.8, 1.9, 2.0, 2.0, 2.1, 1.7, 1.5, 1.5, 1.9, 2.6, 2.8][h], 'Preço OMIE (€/MWh)': [62, 58, 55, 54, 53, 56, 71, 92, 104, 88, 61, 42, 38, 36, 41, 55, 79, 108, 126, 131, 118, 96, 81, 70][h] })),
          'O plano desloca 62% do consumo da moagem para as horas de vazio e para o pico solar (11h–15h), poupando €1 870 amanhã.',
          'Poupança anual prevista com a deslocação de carga: €0,48 M em Lisboa e no Porto.',
          'Aplicar o mesmo planeamento aos secadores de massa da Maia II (inércia térmica de 3 h).', { ratio: true, height: 260, model: 'Otimização de carga · OMIE + previsão de produção', span: true }),
        ch('op7', 'Intensidade energética por fábrica (kWh/t)', 'Outubro vs. 2025', 'bar', ['2025', '2026'],
          [{ m: 'Lisboa (moagem)', '2025': 93, '2026': 88 }, { m: 'Porto (moagem)', '2025': 101, '2026': 96 }, { m: 'Maia (massa)', '2025': 448, '2026': 412 }, { m: 'Litovel (massa)', '2025': 421, '2026': 398 }, { m: 'Venta de Baños', '2025': 452, '2026': 436 }, { m: 'Trofa (cereais)', '2025': 741, '2026': 688 }],
          'Todas as fábricas reduziram a intensidade; a Maia lidera com a recuperação de calor dos secadores.',
          'Replicar a recuperação de calor em Venta de Baños poupa 31 kWh/t.',
          'Incluir a recuperação de calor de Venta de Baños no plano de investimento de 2027 (€0,9 M, payback 2,6 anos).', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-omie', 'Deslocação de carga para horas baratas', 'auto', 'Preços OMIE do dia seguinte publicados (12h)', '€0,48 M/ano', [
            ['Sinal', 'OMIE publicou os preços de amanhã: pico de €131/MWh às 19h.'],
            ['Otimização', 'Plano de moagem reajustado respeitando silos de farinha e expedições.'],
            ['Ação', 'Novo plano horário enviado ao SCADA da moagem de Lisboa e ao chefe de turno.'],
          ], { domain: 'Energia', last: 'hoje 12:04' }),
        ] },
      ],
    },
    {
      id: 'manutencao', label: 'Manutenção preditiva', icon: 'Wrench', blocks: [
        { t: 'kpis', items: [
          k('Ativos monitorizados', '1 940', '18 400 sensores', true, true),
          k('MTBF das linhas de massa', '212 h', '+27% a/a', true, true),
          k('Ordens de trabalho preditivas', '41%', 'do total de ordens', true, true),
          k('Alertas críticos abertos', '1', 'moinho B3 de Lisboa', true, false),
        ] },
        { t: 'table', title: 'Saúde dos ativos críticos', sub: 'Pontuação de saúde e vida útil remanescente (Cortex ML)', bars: ['Saúde'], status: ['Estado'], link: { base: '/portal/360/ativos', idCol: 'Ativo' }, span: true,
          columns: ['Ativo', 'Equipamento', 'Fábrica', 'Saúde', 'Vida útil remanescente', 'Estado'],
          rows: [
            { Ativo: 'LIS-MOI-B3', Equipamento: 'Moinho de cilindros B3', Fábrica: 'Lisboa', 'Saúde': 58, 'Vida útil remanescente': '6 dias (rolo)', Estado: 'Crítico' },
            { Ativo: 'VDB-L2', Equipamento: 'Linha de massa curta L2', Fábrica: 'Venta de Baños', 'Saúde': 66, 'Vida útil remanescente': '5 semanas (matriz)', Estado: 'Atenção' },
            { Ativo: 'MAI-M2-L3', Equipamento: 'Linha de massa longa L3', Fábrica: 'Maia II', 'Saúde': 71, 'Vida útil remanescente': '3 semanas (ventilador)', Estado: 'Atenção' },
            { Ativo: 'POR-MOI-C1', Equipamento: 'Moinho de centeio C1', Fábrica: 'Porto', 'Saúde': 79, 'Vida útil remanescente': '4 meses', Estado: 'Normal' },
            { Ativo: 'MAI-BOL-F1', Equipamento: 'Forno túnel de bolachas', Fábrica: 'Maia', 'Saúde': 82, 'Vida útil remanescente': '7 meses', Estado: 'Normal' },
            { Ativo: 'TRO-EXT-01', Equipamento: 'Extrusora de cereais', Fábrica: 'Trofa', 'Saúde': 88, 'Vida útil remanescente': '11 meses', Estado: 'Normal' },
            { Ativo: 'LIT-L5', Equipamento: 'Linha de massa curta L5', Fábrica: 'Litovel', 'Saúde': 91, 'Vida útil remanescente': '14 meses', Estado: 'Normal' },
            { Ativo: 'LIS-SIL', Equipamento: 'Bateria de silos (27 000 t)', Fábrica: 'Lisboa', 'Saúde': 94, 'Vida útil remanescente': '—', Estado: 'Normal' },
          ] },
        ch('op8', 'Vibração do rolo B3 · moinho de Lisboa (mm/s)', 'RMS diário vs. limite ISO 10816', 'area', ['Vibração', 'Limite de alarme'],
          rows(['10/11', '11/11', '12/11', '13/11', '14/11', '15/11', '16/11', '17/11', '18/11', '19/11', '20/11', '21/11'], { 'Vibração': [2.9, 3.0, 3.0, 3.1, 3.3, 3.4, 3.6, 3.7, 3.9, 4.0, 4.1, 4.0], 'Limite de alarme': [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5] }),
          'A vibração subiu 38% em 9 dias, com assinatura de desgaste do rolamento do lado livre.',
          'O limite de alarme é atingido em 6 dias (probabilidade de 81%).',
          'Substituir o rolamento na paragem de domingo (4 h) — peças em stock no armazém de Lisboa.', { ratio: true, model: 'Deteção de anomalias · Snowflake ML ANOMALY_DETECTION' }),
        { t: 'agents', items: [
          ag('ag-b3', 'Intervenção preditiva no moinho B3', 'humano', 'Vida útil remanescente < 7 dias num ativo crítico', 'Evita 26 h de paragem · €118 mil', [
            ['Sinal', 'Vibração do rolo B3 +38% em 9 dias (4,0 mm/s).'],
            ['Diagnóstico', 'Desgaste do rolamento do lado livre; vida útil remanescente de 6 dias.'],
            ['Recomendação', 'Substituição na paragem de domingo (4 h); 2 técnicos e rolamento SKF em stock.'],
            ['Aprovação humana', 'Confirmação do Chefe de Manutenção de Lisboa.'],
            ['Ação', 'Ordem de trabalho 4100082 criada no SAP PM, peças reservadas e equipa escalada.'],
          ], { approver: 'Joaquim Pires — Chefe de Manutenção, Lisboa', domain: 'Manutenção', last: 'há 1 h' }),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Qual a fábrica com pior OEE e porquê?', a: '**Venta de Baños: 72,5%** (meta: 78%). A causa principal são as **mudanças de formato (2,1 h por turno)**, o dobro da Maia. O Cortex recomenda levar a equipa SMED da Maia II em janeiro e ativar o sequenciador de formatos — OEE previsto de **77% em março**.' },
    { q: 'Há algum risco de paragem esta semana?', a: 'Sim: o **moinho B3 de Lisboa** tem vibração **+38% em 9 dias** e vida útil remanescente de **6 dias**. O agente propôs substituir o rolamento na paragem de domingo (4 h, peças em stock) e aguarda a confirmação de Joaquim Pires.\n• Sem intervenção: 26 h de paragem estimada (€118 mil)' },
    { q: 'Quanto poupámos em energia?', a: 'A fatura energética de 2026 está prevista em **€13,8 M (−€1,3 M face a 2025)**. A massa consome **418 kWh/t (−7%)** e a deslocação de carga da moagem para horas baratas vale **€0,48 M por ano**.' },
    { q: 'Porque está a subir a massa partida?', a: 'Na **linha L3 da Maia II** a massa partida passou de 0,8% para **1,8%** desde a semana 40. 74% da variação explica-se pela **humidade à saída do secador** e pela humidade ambiente. O agente já corrigiu o setpoint da zona 3 e a humidade normalizou em 38 minutos.' },
  ],
};
