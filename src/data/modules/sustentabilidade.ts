import type { Module } from '../types';
import { k, ch, ag, ml, pie, spark } from '../gen';

export const sustentabilidade: Module = {
  slug: 'sustentabilidade', name: 'Sustentabilidade & ESG', short: 'Sustentabilidade & ESG', icon: 'Leaf', color: '#17924B', group: 'funcoes',
  tagline: 'Clima, energia, água, resíduos, embalagem, agricultura regenerativa e reporte CSRD · ODS 3, 8, 12 e 13',
  owner: 'Rita Sampaio — Responsável de Sustentabilidade',
  sources: ['Contadores de energia e água', 'SAP (compras e logística)', 'Dados de fornecedores agrícolas', 'Fatores de emissão (Marketplace)', 'TMS · emissões de transporte'],
  sections: [
    {
      id: 'clima', label: 'Clima & energia', icon: 'CloudSun', blocks: [
        { t: 'kpis', items: [
          k('Emissões âmbito 1 + 2 (12 meses)', '38 400 tCO₂e', '−9% a/a', false, true, spark(71, 42000, 600, -0.09)),
          k('Intensidade carbónica', '92 kg CO₂e/t', '−11% a/a', false, true),
          k('Eletricidade renovável', '46%', 'PPA solar + autoconsumo', true, true),
          k('Âmbito 3', '386 mil tCO₂e', '81% matérias-primas agrícolas', true, false),
        ] },
        ch('es1', 'Trajetória de emissões âmbito 1 + 2 (mil tCO₂e)', 'Real vs. objetivo alinhado com 1,5 °C (SBTi)', 'line', ['Real', 'Objetivo SBTi'],
          [{ m: '2021', Real: 47.9, 'Objetivo SBTi': 47.9 }, { m: '2022', Real: 46.2, 'Objetivo SBTi': 45.7 }, { m: '2023', Real: 44.8, 'Objetivo SBTi': 43.5 }, { m: '2024', Real: 43.1, 'Objetivo SBTi': 41.3 }, { m: '2025', Real: 42.2, 'Objetivo SBTi': 39.1 }, { m: '2026E', Real: 38.4, 'Objetivo SBTi': 36.9 }, { m: '2027', 'Objetivo SBTi': 34.7 }, { m: '2028', 'Objetivo SBTi': 32.5 }, { m: '2030', 'Objetivo SBTi': 28.1 }],
          'O fosso face ao objetivo fechou para 1,5 mil t em 2026, com a recuperação de calor na Maia e o PPA solar.',
          'Com a eletrificação dos secadores de Litovel (2027), o grupo volta à trajetória SBTi em 2028.',
          'Avançar com o estudo de bomba de calor industrial para os secadores da Maia II.', { ratio: true }),
        ch('es2', 'Emissões por âmbito (12 meses)', 'mil tCO₂e', 'pie', ['v'],
          pie([['Âmbito 1 · gás natural (secagem, fornos)', 24.6], ['Âmbito 2 · eletricidade', 13.8], ['Âmbito 3 · trigo e sêmola', 312.7], ['Âmbito 3 · embalagem', 31.4], ['Âmbito 3 · transporte', 26.9], ['Âmbito 3 · outros', 15.0]]),
          'O trigo representa 74% da pegada total — a maior alavanca está na agricultura, não nas fábricas.',
          'O programa de trigo regenerativo do Alentejo pode reduzir 9 mil tCO₂e/ano até 2028.',
          'Alargar o programa regenerativo a fornecedores de trigo duro em França (Axéréal).', { ratio: true }),
      ],
    },
    {
      id: 'agricultura', label: 'Agricultura & origens', icon: 'Sprout', blocks: [
        { t: 'kpis', items: [
          k('Agricultores no programa regenerativo', '38', 'Alentejo · 6 200 ha', true, true),
          k('Redução de emissões por tonelada', '−28%', 'trigo regenerativo vs. convencional', false, true),
          k('Trigo nacional contratado (2026)', '31 500 t', '+22% a/a', true, true),
          k('Fornecedores com dados primários', '64%', 'do volume comprado', true, true),
        ] },
        ch('es3', 'Pegada do trigo por origem (kg CO₂e/t, entregue)', 'Inclui cultivo e transporte até à fábrica', 'hbar', ['Cultivo', 'Transporte'],
          [{ m: 'Alentejo · regenerativo', Cultivo: 232, Transporte: 14 }, { m: 'Alentejo · convencional', Cultivo: 318, Transporte: 14 }, { m: 'Beauce (FR)', Cultivo: 334, Transporte: 31 }, { m: 'Foggia (IT)', Cultivo: 352, Transporte: 46 }, { m: 'Constanța (RO)', Cultivo: 341, Transporte: 58 }, { m: 'Saskatchewan (CA)', Cultivo: 356, Transporte: 72 }, { m: 'Sonora (MX)', Cultivo: 448, Transporte: 96 }],
          'O trigo mexicano tem a maior pegada (rega intensiva e frete via Panamá).',
          'Substituir 10 mil t de trigo mexicano por CWAD ou nacional reduz 1,4 mil tCO₂e/ano.',
          'Integrar a pegada de carbono no otimizador de compras com preço-sombra de €80/tCO₂e.', { ratio: true }),
        { t: 'table', title: 'Programa de trigo regenerativo do Alentejo', sub: 'Campanha 2025/26', status: ['Estado'],
          columns: ['Prática', 'Área (ha)', 'Agricultores', 'Impacto', 'Estado'],
          rows: [
            { 'Prática': 'Sementeira direta', 'Área (ha)': 4100, Agricultores: 29, Impacto: '−22% gasóleo', Estado: 'Verificado' },
            { 'Prática': 'Culturas de cobertura', 'Área (ha)': 2800, Agricultores: 21, Impacto: '+0,3 t C/ha no solo', Estado: 'Em verificação' },
            { 'Prática': 'Fertilização de precisão', 'Área (ha)': 5200, Agricultores: 33, Impacto: '−18% azoto', Estado: 'Verificado' },
            { 'Prática': 'Rotação com leguminosas', 'Área (ha)': 1900, Agricultores: 14, Impacto: '−31% azoto mineral', Estado: 'Verificado' },
          ] },
      ],
    },
    {
      id: 'circular', label: 'Água, resíduos & embalagem', icon: 'Recycle', blocks: [
        { t: 'kpis', items: [
          k('Resíduos valorizados', '97,4%', 'sêmeas para alimentação animal', true, true),
          k('Embalagem reciclável', '91%', 'filme mono-material nas massas', true, true),
          k('Plástico virgem', '−14%', 'vs. 2024', false, true),
          k('Alimentos doados', '186 t', 'Banco Alimentar e IPSS', true, true),
        ] },
        ch('es4', 'Água por tonelada produzida (m³/t)', 'Por centro industrial · 2025 vs. 2026', 'bar', ['2025', '2026'],
          [{ m: 'Maia', '2025': 1.42, '2026': 1.26 }, { m: 'Trofa', '2025': 2.31, '2026': 2.08 }, { m: 'Lisboa', '2025': 0.38, '2026': 0.35 }, { m: 'Porto', '2025': 0.41, '2026': 0.39 }, { m: 'Litovel', '2025': 1.37, '2026': 1.29 }, { m: 'Venta de Baños', '2025': 1.58, '2026': 1.51 }],
          'A Trofa consome mais água por tonelada (limpezas de extrusão); a reutilização da água de arrefecimento poupou 11%.',
          'Previsão de 1,9 m³/t na Trofa com a nova lavagem CIP.',
          'Instalar medição por linha na Trofa para identificar perdas (6 contadores).', { ratio: true }),
        ch('es5', 'Destino dos subprodutos e resíduos (t, YTD)', 'Grupo', 'pie', ['v'],
          pie([['Sêmeas · alimentação animal', 62400], ['Massa de refugo · alimentação animal', 3100], ['Cartão e papel · reciclagem', 2350], ['Plástico · reciclagem', 610], ['Doação alimentar', 186], ['Aterro', 1780]]),
          'As sêmeas da moagem são vendidas como alimento animal — €6,7 M de receita YTD.',
          'O refugo de massa pode subir para valorização como ingrediente de rações premium.',
          'Negociar contrato anual de sêmeas indexado ao preço do trigo.', { ratio: true }),
      ],
    },
    {
      id: 'csrd', label: 'Reporte CSRD', icon: 'FileCheck2', blocks: [
        { t: 'kpis', items: [
          k('Pontos de dados ESRS cobertos', '92%', '1 046 de 1 137', true, true),
          k('Dados com linhagem automática', '84%', 'sem Excel', true, true),
          k('Esforço de reporte', '−76%', 'vs. relatório de 2024', false, true),
          k('Auditoria limitada (EY)', 'Pronta', 'evidências no Snowflake', true, true),
        ] },
        ch('es6', 'Cobertura de dados por norma ESRS (%)', 'Dupla materialidade 2026', 'hbar', ['Cobertura'],
          [{ m: 'G1 · Conduta empresarial', Cobertura: 97 }, { m: 'E1 · Alterações climáticas', Cobertura: 96 }, { m: 'S1 · Trabalhadores', Cobertura: 93 }, { m: 'E3 · Água', Cobertura: 91 }, { m: 'E2 · Poluição', Cobertura: 88 }, { m: 'E5 · Economia circular', Cobertura: 84 }, { m: 'S4 · Consumidores', Cobertura: 82 }, { m: 'S2 · Trabalhadores da cadeia de valor', Cobertura: 71 }],
          'A maior lacuna está na S2 (trabalhadores da cadeia de valor), dependente de dados de fornecedores agrícolas.',
          'Com o questionário digital aos 140 maiores fornecedores, a S2 chega a 88% em março.',
          'Enviar o questionário de fornecedores com recolha automática para o Snowflake.', { ratio: true }),
        { t: 'agents', items: [
          ag('ag-csrd', 'Relatório de sustentabilidade (CSRD)', 'humano', 'Fecho anual ou pedido do auditor', '−76% de esforço · 0 folhas de cálculo', [
            ['Sinal', 'Pedido de evidências do auditor para E1 e S1.'],
            ['Recolha', '1 046 pontos de dados ESRS calculados com linhagem até à fatura de energia ou ao registo de ponto.'],
            ['Redação', 'Cortex redige as notas narrativas (ODS 3, 8, 12 e 13) com as métricas validadas.'],
            ['Aprovação humana', 'Revisão da Sustentabilidade e do CFO.'],
            ['Ação', 'Pacote de evidências partilhado com a EY via Snowflake Data Sharing.'],
          ], { approver: 'Rita Sampaio — Responsável de Sustentabilidade', domain: 'ESG', last: '15/11' }),
        ] },
        { t: 'models', items: [
          ml('Pegada de carbono por SKU', 'Cálculo de ciclo de vida automatizado', '312 SKUs com pegada', 'receita, origem do trigo, energia por linha, embalagem, transporte', 'Sustentabilidade', 'Produção', 'Estável', 'out/26'),
          ml('Previsão de emissões âmbito 1 + 2', 'Snowflake ML FORECAST', 'Erro 2,8%', 'plano de produção, mix energético, meteorologia', 'Sustentabilidade', 'Produção', 'Estável', 'nov/26'),
        ] },
      ],
    },
  ],
  questions: [
    { q: 'Estamos na trajetória SBTi?', a: 'Quase: as emissões de âmbito 1 + 2 estão em **38,4 mil tCO₂e (−9% a/a)**, **1,5 mil t acima** do objetivo SBTi de 2026. Com a eletrificação dos secadores de Litovel em 2027, o grupo volta à trajetória em 2028.' },
    { q: 'Onde está a maior parte da nossa pegada?', a: 'No **trigo: 74% da pegada total** (312,7 mil tCO₂e). As fábricas (âmbitos 1 e 2) são apenas 9%. O trigo mexicano é o de maior pegada (544 kg CO₂e/t entregue) e o regenerativo do Alentejo o de menor (246 kg).' },
    { q: 'Estamos prontos para a CSRD?', a: 'Sim: **92% dos pontos de dados ESRS** estão cobertos e 84% têm linhagem automática. A maior lacuna é a **S2 (71%)**, que depende de dados de fornecedores agrícolas. O esforço de reporte caiu 76% face a 2024.' },
  ],
};
