export type TraceNode = { title: string; sub: string; meta: string; flag?: boolean };
export const TRACE = {
  product: 'Milaneza Esparguete 500 g',
  ean: '5601021 004128',
  lot: 'L26312-M2L3-03',
  produced: 'Produzido a 08/11/2026 · Maia II · Linha L3 · Consumir de pref. antes de 11/2029',
  stages: [
    { id: 'origem', label: 'Origem', nodes: [
      { title: 'MV Saga Aurora', sub: 'Trigo duro CWAD n.º 1 · Saskatchewan · 18 400 t', meta: 'Leixões · 21/10 · DON 310 µg/kg · proteína 13,9%' },
      { title: 'Lote FR-OCC-2611', sub: 'Trigo duro · Occitânia · 2 960 t', meta: 'Camião · 24/10 · DON 420 µg/kg' },
    ] as TraceNode[] },
    { id: 'silo', label: 'Ensilagem', nodes: [
      { title: 'Silo S07 · Maia', sub: 'Mistura 70/30 · proteína 13,8%', meta: 'Humidade 12,4% · temperatura 17 °C' },
    ] as TraceNode[] },
    { id: 'sem', label: 'Semolaria', nodes: [
      { title: 'SEM-26-1107-A', sub: 'Sêmola de trigo duro · 412 t', meta: 'Cinzas 0,78% · índice de glúten 84' },
    ] as TraceNode[] },
    { id: 'linha', label: 'Produção', nodes: [
      { title: 'L26312-M2L3-03', sub: 'Esparguete 500 g · 186 400 un.', meta: 'Secagem 84 °C · humidade final 12,1%' },
      { title: 'Embalamento EMB-07', sub: 'Filme PP mono-material · 20 un./cx', meta: 'Detetor de metais: 0 rejeições', flag: false },
    ] as TraceNode[] },
    { id: 'exp', label: 'Expedição', nodes: [
      { title: 'Hub logístico da Maia', sub: '96 paletes', meta: 'WMS · saída 09/11' },
      { title: 'Armazém de Lisboa', sub: '30 paletes', meta: 'Transferência 10/11' },
    ] as TraceNode[] },
    { id: 'cli', label: 'Clientes', nodes: [
      { title: 'Continente · Azambuja', sub: '34 paletes · 11 lojas', meta: 'EDI DESADV 10/11' },
      { title: 'Pingo Doce', sub: '28 paletes · 2 entrepostos', meta: 'EDI DESADV 10/11' },
      { title: 'Lidl · Recheio · Intermarché', sub: '40 paletes · 14 destinos', meta: 'Entregas 10–12/11' },
      { title: 'Auchan · Cabo Verde · outros', sub: '24 paletes · 11 destinos', meta: '8 paletes em trânsito marítimo', flag: true },
    ] as TraceNode[] },
  ],
  summary: { destinations: 38, pallets: 126, units: '186 400', customers: 9 },
};
