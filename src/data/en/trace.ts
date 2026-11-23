// English twin of ../trace.ts: same stages, ids, lot numbers and figures; translated text only.
import type { TraceNode, TRACE as PT_TRACE } from '../trace';

export type { TraceNode } from '../trace';
export const TRACE: typeof PT_TRACE = {
  product: 'Milaneza Esparguete 500 g',
  ean: '5601021 004128',
  lot: 'L26312-M2L3-03',
  produced: 'Produced on 08/11/2026 · Maia II · Line L3 · Best before 11/2029',
  stages: [
    { id: 'origem', label: 'Origin', nodes: [
      { title: 'MV Saga Aurora', sub: 'Durum wheat CWAD No. 1 · Saskatchewan · 18,400 t', meta: 'Leixões · 21/10 · DON 310 µg/kg · protein 13.9%' },
      { title: 'Lot FR-OCC-2611', sub: 'Durum wheat · Occitania · 2,960 t', meta: 'Truck · 24/10 · DON 420 µg/kg' },
    ] as TraceNode[] },
    { id: 'silo', label: 'Storage', nodes: [
      { title: 'Silo S07 · Maia', sub: '70/30 blend · protein 13.8%', meta: 'Moisture 12.4% · temperature 17 °C' },
    ] as TraceNode[] },
    { id: 'sem', label: 'Semolina mill', nodes: [
      { title: 'SEM-26-1107-A', sub: 'Durum wheat semolina · 412 t', meta: 'Ash 0.78% · gluten index 84' },
    ] as TraceNode[] },
    { id: 'linha', label: 'Production', nodes: [
      { title: 'L26312-M2L3-03', sub: 'Esparguete 500 g · 186,400 units', meta: 'Drying 84 °C · final moisture 12.1%' },
      { title: 'Packing EMB-07', sub: 'Mono-material PP film · 20 units/case', meta: 'Metal detector: 0 rejects', flag: false },
    ] as TraceNode[] },
    { id: 'exp', label: 'Dispatch', nodes: [
      { title: 'Maia logistics hub', sub: '96 pallets', meta: 'WMS · dispatched 09/11' },
      { title: 'Lisbon warehouse', sub: '30 pallets', meta: 'Transfer 10/11' },
    ] as TraceNode[] },
    { id: 'cli', label: 'Customers', nodes: [
      { title: 'Continente · Azambuja', sub: '34 pallets · 11 stores', meta: 'EDI DESADV 10/11' },
      { title: 'Pingo Doce', sub: '28 pallets · 2 DCs', meta: 'EDI DESADV 10/11' },
      { title: 'Lidl · Recheio · Intermarché', sub: '40 pallets · 14 destinations', meta: 'Deliveries 10–12/11' },
      { title: 'Auchan · Cape Verde · others', sub: '24 pallets · 11 destinations', meta: '8 pallets in transit by sea', flag: true },
    ] as TraceNode[] },
  ],
  summary: { destinations: 38, pallets: 126, units: '186,400', customers: 9 },
};
