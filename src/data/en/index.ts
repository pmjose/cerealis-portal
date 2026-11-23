// English dataset — mirrors ../modules/index.ts with translated twins.
import type { Agent, Model, Module } from '../types';
import { MONTHS_EN, YTD_EN, FUT_EN, WEEKS_EN } from '../gen';
import type { Dataset } from '../index';

import { compras } from './modules/compras';
import { supply } from './modules/supply';
import { operacoes } from './modules/operacoes';
import { qualidade } from './modules/qualidade';
import { comercial } from './modules/comercial';
import { marketing } from './modules/marketing';
import { financas } from './modules/financas';
import { pessoas } from './modules/pessoas';
import { sustentabilidade } from './modules/sustentabilidade';
import { pa } from './modules/pa';
import { moagens } from './modules/moagens';
import { cz } from './modules/cz';
import { vb3 } from './modules/vb3';
import { buildIA, dados } from './modules/platform';

import { executiveQuestionsEn } from './executive';
import { customers, products, employees, assets, findCustomer, findProduct, findEmployee, findAsset } from './c360';
import * as facts from './facts';
import { TRACE } from './trace';

const domain: Module[] = [compras, supply, operacoes, qualidade, comercial, marketing, financas, pessoas, sustentabilidade, pa, moagens, cz, vb3];

const allAgents: Agent[] = domain.flatMap(m => m.sections.flatMap(s => s.blocks.flatMap(b => b.t === 'agents' ? b.items : [])));
const allModels: Model[] = domain.flatMap(m => m.sections.flatMap(s => s.blocks.flatMap(b => b.t === 'models' ? b.items : [])));

const modules: Module[] = [...domain, buildIA(allModels, allAgents), dados];
const findModule = (slug?: string) => modules.find(m => m.slug === slug);
const svOf = (slug: string) => `SV_${slug.toUpperCase().replace(/-/g, '_')}`;

const PLATFORM = {
  agents: allAgents.length,
  auto: allAgents.filter(a => a.mode === 'auto').length,
  human: allAgents.filter(a => a.mode === 'humano').length,
  models: allModels.length,
  functions: modules.filter(m => m.group === 'funcoes').length,
  units: modules.filter(m => m.group === 'negocio').length,
};

const pending = allAgents.filter(a => a.mode === 'humano').length;

export const enData: Dataset = {
  lang: 'en',
  modules, findModule, svOf,
  allAgents, allModels, PLATFORM,
  executiveQuestions: executiveQuestionsEn(pending),
  customers, products, employees, assets,
  findCustomer, findProduct, findEmployee, findAsset,
  facts: {
    GROUP: facts.GROUP, BU: facts.BU, SALES_2026: facts.SALES_2026, BUDGET_2026: facts.BUDGET_2026, PLANTS: facts.PLANTS,
    plantPoints: facts.plantPoints, BRANDS: facts.BRANDS, ORIGINS: facts.ORIGINS, EXPORT: facts.EXPORT, PEOPLE_BY_SITE: facts.PEOPLE_BY_SITE,
  },
  TRACE,
  cal: { MONTHS: MONTHS_EN, YTD: YTD_EN, FUT: FUT_EN, WEEKS: WEEKS_EN },
};
