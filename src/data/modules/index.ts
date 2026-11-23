import type { Agent, Model, Module, QA } from '../types';
import { compras } from './compras';
import { supply } from './supply';
import { operacoes } from './operacoes';
import { qualidade } from './qualidade';
import { comercial } from './comercial';
import { marketing } from './marketing';
import { financas } from './financas';
import { pessoas } from './pessoas';
import { sustentabilidade } from './sustentabilidade';
import { pa } from './pa';
import { moagens } from './moagens';
import { cz } from './cz';
import { vb3 } from './vb3';
import { buildIA, dados } from './platform';

const domain = [compras, supply, operacoes, qualidade, comercial, marketing, financas, pessoas, sustentabilidade, pa, moagens, cz, vb3];

export const allAgents: Agent[] = domain.flatMap(m => m.sections.flatMap(s => s.blocks.flatMap(b => b.t === 'agents' ? b.items : [])));
export const allModels: Model[] = domain.flatMap(m => m.sections.flatMap(s => s.blocks.flatMap(b => b.t === 'models' ? b.items : [])));

export const modules: Module[] = [...domain, buildIA(allModels, allAgents), dados];
export const findModule = (slug?: string) => modules.find(m => m.slug === slug);
export const svOf = (slug: string) => `SV_${slug.toUpperCase().replace(/-/g, '_')}`;

export const PLATFORM = {
  agents: allAgents.length,
  auto: allAgents.filter(a => a.mode === 'auto').length,
  human: allAgents.filter(a => a.mode === 'humano').length,
  models: allModels.length,
  functions: modules.filter(m => m.group === 'funcoes').length,
  units: modules.filter(m => m.group === 'negocio').length,
};

export const executiveQuestions: QA[] = [
  { q: 'Resume-me o dia em 5 pontos.', a: '**Briefing de 23 de novembro**\n• Vendas YTD em **€325,8 M (+1,5% vs. orçamento)**; outubro foi o melhor mês de sempre (€37,4 M)\n• **Trigo duro −4,2%** em 10 dias: o agente de cobertura propõe comprar 25 000 t de CWAD (aguarda Nuno Ferraz)\n• **Moinho B3 de Lisboa**: vida útil remanescente de 6 dias — intervenção proposta para domingo\n• **Milaneza Esparguete no Pingo Doce**: rutura evitada com 6 paletes de Lisboa\n• Venta de Baños acima do plano (+3,2%), mas OEE em 72,5% (meta 78%)' },
  { q: 'Como vamos fechar o ano?', a: 'O Cortex prevê **€398,2 M de vendas** (+27% a/a, com a Pasta VB3 desde abril) e **EBITDA de €37,9 M (9,5%)**. O principal risco é o trigo duro voltar a subir em fevereiro; a principal oportunidade é a compra antecipada de CWAD agora.' },
  { q: 'Que decisões estão à minha espera?', a: `Há **${allAgents.filter(a => a.mode === 'humano').length} decisões** com humano no circuito. As de maior impacto:\n• Compra de 25 000 t de trigo duro CWAD (€0,9 M de poupança)\n• Intervenção no moinho B3 de Lisboa (evita €118 mil de paragem)\n• Gestão do risco de DON no MV Sonora Star\n• Retenção da Panificação Douro (€5,6 M/ano)` },
  { q: 'Onde estamos a perder margem?', a: 'Três focos:\n• **Bolachas**: −0,7 pp de margem com manteiga (+13%) e açúcar (+11%)\n• **Moagens**: o trigo mole subiu 1,8% em outubro sem ajuste de tabela\n• **Venta de Baños**: 2,1 h por turno em mudanças de formato (−6 pp de OEE)' },
  { q: 'Quanto valor gerou a Espiga este ano?', a: '**€7,9 M capturados em 2026**, com €12,4 M/ano em regime. Os maiores contributos: compra inteligente de trigo (€2,7 M), promoções e preço (€1,4 M) e previsão de procura (€1,3 M). A plataforma custa cerca de €38 mil por mês — retorno de 17×.' },
];
