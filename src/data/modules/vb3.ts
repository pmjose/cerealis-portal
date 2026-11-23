import type { Module } from '../types';
import { k, ch, ag, rows, pie, spark } from '../gen';
import { SALES_2026 } from '../facts';

const M7 = ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];

export const vb3: Module = {
  slug: 'vb3', name: 'Cerealis Pasta VB3 · Espanha', short: 'Pasta VB3 (ES)', icon: 'Flag', color: '#29B5E8', group: 'negocio',
  tagline: 'Ex-Cerealto Pasta VB3 · Venta de Baños (Palência) · 4 linhas, 90 000 t/ano · marcas do distribuidor para o mercado espanhol',
  owner: 'Javier Ortega — Director General, Cerealis Pasta VB3',
  sources: ['SAP S/4HANA (VB3)', 'MES Venta de Baños', 'EDI Mercadona', 'Circana España', 'LIMS VB3'],
  sections: [
    {
      id: 'geral', label: 'Visão geral', icon: 'LayoutGrid', blocks: [
        { t: 'kpis', items: [
          k('Vendas (abr–out)', '€58,8 M', '+3,2% vs. plano de negócio', true, true, spark(111, 8.3, 0.2, 0.03)),
          k('Volume (abr–out)', '49,8 mil t', '79% da capacidade', true, true),
          k('Margem EBITDA', '8,3%', 'plano: 8,0%', true, true),
          k('Peso da Mercadona', '48%', 'das vendas da unidade', true, false),
        ] },
        ch('vb1', 'Vendas mensais vs. plano de negócio (€ M)', 'Desde a consolidação (abril de 2026)', 'bar', ['Real', 'Plano de negócio'],
          rows(M7, { Real: SALES_2026.es.slice(3), 'Plano de negócio': [8.0, 8.2, 8.1, 8.2, 7.9, 8.2, 8.4] }),
          'Acima do plano em todos os meses; outubro (€8,8 M) foi o melhor mês da fábrica nos últimos 3 anos.',
          'Fecho do ano previsto em €76,7 M (9 meses).',
          'Usar a capacidade livre (21%) para MDD de massas curtas para Portugal.'),
        ch('vb2', 'Vendas por tipo de cliente (abr–out)', '% das vendas', 'pie', ['v'],
          pie([['Mercadona (MDD)', 48], ['Outros retalhistas (MDD)', 24], ['Co-packing para marcas', 16], ['Exportação', 12]]),
          'A concentração na Mercadona (48%) é o principal risco comercial da unidade.',
          'Com 2 novos clientes MDD, a Mercadona desce para 41% em 2027.',
          'Apresentar a proposta MDD ao Carrefour España e ao DIA no 1.º trimestre.', { ratio: true }),
      ],
    },
    {
      id: 'fabrica', label: 'Fábrica', icon: 'Factory', blocks: [
        ch('vb3', 'OEE de Venta de Baños (%)', 'Evolução desde a integração', 'line', ['OEE', 'Meta 2026'],
          rows(M7, { OEE: [69.8, 70.4, 70.9, 71.2, 71.6, 72.1, 72.5], 'Meta 2026': [78, 78, 78, 78, 78, 78, 78] }),
          'O OEE sobe 0,5 pp por mês desde a integração; a maior perda são as mudanças de formato (2,1 h por turno).',
          'Com SMED e o sequenciador de formatos, 77% em março.',
          'Missão SMED da Maia II em janeiro (2 semanas).', { ratio: true }),
        ch('vb4', 'Horas de mudança de formato por linha (outubro)', 'Venta de Baños vs. referência da Maia', 'bar', ['Venta de Baños', 'Referência Maia'],
          [{ m: 'L1', 'Venta de Baños': 46, 'Referência Maia': 22 }, { m: 'L2', 'Venta de Baños': 58, 'Referência Maia': 24 }, { m: 'L3', 'Venta de Baños': 41, 'Referência Maia': 21 }, { m: 'L4', 'Venta de Baños': 37, 'Referência Maia': 20 }],
          'A L2 tem 58 h de mudanças por mês — mais do dobro da referência.',
          'Sequenciar formatos por família poupa 18% das horas.',
          'Ativar o sequenciador de produção do Cortex na L2 primeiro.', { ratio: true }),
      ],
    },
    {
      id: 'integracao', label: 'Dia 1 → Dia 100', icon: 'Merge', blocks: [
        { t: 'kpis', items: [
          k('Dias desde o fecho', '216', 'abril de 2026', true, true),
          k('Sistemas integrados', '27/31', '87%', true, true),
          k('Reporte consolidado', 'Dia 38', 'meta: dia 60', false, true),
          k('Agentes ativos', '6/9', 'do catálogo do grupo', true, true),
        ] },
        { t: 'table', title: 'Plano de integração de dados', sub: 'Playbook M&A da Espiga', span: true, status: ['Estado'],
          columns: ['Domínio', 'Sistema de origem', 'Ligação ao Snowflake', 'Dia', 'Estado'],
          rows: [
            { 'Domínio': 'Finanças', 'Sistema de origem': 'SAP S/4HANA FI/CO', 'Ligação ao Snowflake': 'Openflow (CDC)', Dia: 1, Estado: 'Concluído' },
            { 'Domínio': 'Vendas e clientes', 'Sistema de origem': 'SAP SD + EDI Mercadona', 'Ligação ao Snowflake': 'Openflow + Snowpipe', Dia: 14, Estado: 'Concluído' },
            { 'Domínio': 'Qualidade', 'Sistema de origem': 'LIMS VB3', 'Ligação ao Snowflake': 'Snowpipe Streaming', Dia: 47, Estado: 'Concluído' },
            { 'Domínio': 'Produção', 'Sistema de origem': 'MES das 4 linhas', 'Ligação ao Snowflake': 'Snowpipe Streaming', Dia: 60, Estado: 'Concluído' },
            { 'Domínio': 'Governança', 'Sistema de origem': 'Políticas Horizon (ES)', 'Ligação ao Snowflake': 'Tags e mascaramento', Dia: 30, Estado: 'Concluído' },
            { 'Domínio': 'Manutenção', 'Sistema de origem': 'SAP PM', 'Ligação ao Snowflake': 'Openflow', Dia: 120, Estado: 'Em curso' },
            { 'Domínio': 'Pessoas', 'Sistema de origem': 'Ponto e turnos local', 'Ligação ao Snowflake': 'Ficheiros → Snowpipe', Dia: 150, Estado: 'Em curso' },
            { 'Domínio': 'Cibersegurança', 'Sistema de origem': 'Registos OT/IT (NIS2)', 'Ligação ao Snowflake': 'Snowpipe', Dia: 180, Estado: 'Em curso' },
          ] },
        ch('vb5', 'Sistemas ligados ao Snowflake desde o fecho', 'N.º acumulado de 31 sistemas · playbook M&A', 'area', ['Sistemas ligados', 'Plano'],
          [1, 14, 30, 38, 47, 60, 100, 150, 216].map((d, i) => ({ m: `Dia ${d}`, 'Sistemas ligados': [4, 11, 16, 19, 21, 24, 26, 27, 27][i], Plano: [3, 8, 13, 16, 19, 23, 27, 30, 31][i] })),
          'A integração andou à frente do plano até ao dia 60; desde então estabilizou nos 27 sistemas.',
          'Os 4 sistemas em falta (manutenção, pessoas e registos NIS2) ficam ligados até ao dia 240.',
          'Priorizar o SAP PM para ativar a manutenção preditiva nas 4 linhas.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-vb3', 'Mapeamento de SKUs e clientes na integração', 'auto', 'Novo código de artigo ou cliente no SAP de Venta de Baños', 'Integração 3× mais rápida', [
            ['Sinal', '214 novos códigos de artigo MDD chegaram do SAP de Venta de Baños.'],
            ['Correspondência', 'Cortex AI_SIMILARITY sugere o equivalente no catálogo do grupo (formato, gramagem, receita).'],
            ['Validação', '201 correspondências com confiança > 95%; 13 enviadas para revisão.'],
            ['Ação', 'Dimensão de produto do grupo atualizada; relatórios consolidados recalculados.'],
          ], { domain: 'Integração', last: 'hoje 05:00' }),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Como está a Pasta VB3 face ao plano?', a: 'Acima do plano: **€58,8 M** de abril a outubro (**+3,2%**) e margem EBITDA de **8,3%** (plano: 8,0%). Volume de **49,8 mil t** (79% da capacidade). O OEE (72,5%) continua abaixo da meta de 78%.' },
    { q: 'Quanto pesa a Mercadona?', a: 'A Mercadona representa **48% das vendas** da unidade (e 10,4% do grupo). O Cortex recomenda abrir 2 novos clientes MDD (Carrefour España e DIA) para descer para 41% em 2027.' },
    { q: 'Em que ponto está a integração?', a: '**27 de 31 sistemas** integrados (87%). O reporte consolidado ficou pronto ao **dia 38** (meta: 60). Faltam manutenção (SAP PM), pessoas e os registos de cibersegurança NIS2. **6 de 9 agentes** do grupo já estão ativos em Venta de Baños.' },
  ],
};
