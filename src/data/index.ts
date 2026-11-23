// Camada de dados por língua: o português é carregado logo; o gémeo inglês (src/data/en) só na primeira mudança para EN.
import { use } from 'react';
import { useLang } from '../i18n';
import type { Agent, MapPoint, Model, Module, QA, Kpi } from './types';
import * as mods from './modules';
import * as c360 from './c360';
import * as facts from './facts';
import { TRACE } from './trace';
import { MONTHS, YTD, FUT, WEEKS } from './gen';
import { isRatioPt, kpiIsRatioPt } from '../filters';

export type Facts = {
  GROUP: typeof facts.GROUP;
  BU: typeof facts.BU;
  SALES_2026: typeof facts.SALES_2026;
  BUDGET_2026: typeof facts.BUDGET_2026;
  PLANTS: facts.Plant[];
  plantPoints: MapPoint[];
  BRANDS: facts.Brand[];
  ORIGINS: MapPoint[];
  EXPORT: MapPoint[];
  PEOPLE_BY_SITE: ReadonlyArray<readonly [string, number]>;
};

export type Dataset = {
  lang: 'pt' | 'en';
  modules: Module[];
  findModule: (slug?: string) => Module | undefined;
  svOf: (slug: string) => string;
  allAgents: Agent[];
  allModels: Model[];
  PLATFORM: typeof mods.PLATFORM;
  executiveQuestions: QA[];
  customers: c360.Customer[];
  products: c360.Product[];
  employees: c360.Employee[];
  assets: c360.Asset[];
  findCustomer: (id?: string) => c360.Customer | undefined;
  findProduct: (id?: string) => c360.Product | undefined;
  findEmployee: (id?: string) => c360.Employee | undefined;
  findAsset: (id?: string) => c360.Asset | undefined;
  facts: Facts;
  TRACE: typeof TRACE;
  /** Etiquetas de calendário da língua: meses (nov–out), YTD (jan–out), previsão (nov–abr), semanas. */
  cal: { MONTHS: string[]; YTD: string[]; FUT: string[]; WEEKS: string[] };
};

export const ptData: Dataset = {
  lang: 'pt',
  modules: mods.modules, findModule: mods.findModule, svOf: mods.svOf,
  allAgents: mods.allAgents, allModels: mods.allModels, PLATFORM: mods.PLATFORM, executiveQuestions: mods.executiveQuestions,
  customers: c360.customers, products: c360.products, employees: c360.employees, assets: c360.assets,
  findCustomer: c360.findCustomer, findProduct: c360.findProduct, findEmployee: c360.findEmployee, findAsset: c360.findAsset,
  facts: {
    GROUP: facts.GROUP, BU: facts.BU, SALES_2026: facts.SALES_2026, BUDGET_2026: facts.BUDGET_2026, PLANTS: facts.PLANTS,
    plantPoints: facts.plantPoints, BRANDS: facts.BRANDS, ORIGINS: facts.ORIGINS, EXPORT: facts.EXPORT, PEOPLE_BY_SITE: facts.PEOPLE_BY_SITE,
  },
  TRACE,
  cal: { MONTHS, YTD, FUT, WEEKS },
};

/* Rácios (%, preços unitários, dias…) não escalam com os filtros. A decisão é tomada uma vez a partir do texto
   português e copiada para o gémeo inglês por posição, para que os números filtrados sejam iguais nas duas línguas. */
const kpiBlocks = (m: Module) => m.sections.map(s => s.blocks);
function flagRatios(ms: Module[]) {
  for (const blocks of ms.flatMap(kpiBlocks)) for (const b of blocks) {
    if (b.t === 'kpis') b.items.forEach((k: Kpi) => { k.ratio ??= kpiIsRatioPt(k); });
    if (b.t === 'chart') b.c.ratio ??= isRatioPt(b.c.title);
  }
}
function copyRatios(src: Module[], dst: Module[]) {
  for (const m of src) {
    const d = dst.find(x => x.slug === m.slug);
    if (!d) continue;
    m.sections.forEach((s, i) => s.blocks.forEach((b, j) => {
      const e = d.sections[i]?.blocks[j];
      if (b.t === 'kpis' && e?.t === 'kpis') b.items.forEach((k, n) => { if (e.items[n]) e.items[n].ratio = k.ratio; });
      if (b.t === 'chart' && e?.t === 'chart') e.c.ratio = b.c.ratio;
    }));
  }
}
flagRatios(ptData.modules);

let enPromise: Promise<Dataset> | null = null;
export const loadEn = () => (enPromise ??= import('./en').then(m => { copyRatios(ptData.modules, m.enData.modules); return m.enData; }));

/** Dados da língua ativa. Na primeira passagem para EN suspende (Suspense) enquanto o pacote inglês carrega. */
export function useData(): Dataset {
  const { lang } = useLang();
  return lang === 'en' ? use(loadEn()) : ptData;
}
