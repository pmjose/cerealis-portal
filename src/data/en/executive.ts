import type { QA } from '../types';

// English twin of executiveQuestions in ../modules/index.ts (same facts and numbers).
export const executiveQuestionsEn = (pending: number): QA[] => [
  { q: 'Summarise my day in 5 points.', a: '**Briefing for 23 November**\n• YTD sales at **€325.8M (+1.5% vs. budget)**; October was the best month ever (€37.4M)\n• **Durum wheat −4.2%** in 10 days: the coverage agent proposes buying 25,000 t of CWAD (awaiting Nuno Ferraz)\n• **Lisbon B3 mill**: 6 days of remaining useful life — intervention proposed for Sunday\n• **Milaneza Esparguete at Pingo Doce**: stock-out avoided with 6 pallets from Lisbon\n• Venta de Baños above plan (+3.2%), but OEE at 72.5% (target 78%)' },
  { q: 'How will we close the year?', a: 'Cortex forecasts **€398.2M in sales** (+27% YoY, with Pasta VB3 since April) and **EBITDA of €37.9M (9.5%)**. The main risk is durum wheat rising again in February; the main opportunity is buying CWAD early, now.' },
  { q: 'Which decisions are waiting for me?', a: `There are **${pending} decisions** with a human in the loop. The highest-impact ones:\n• Purchase of 25,000 t of CWAD durum wheat (€0.9M saving)\n• Intervention on the Lisbon B3 mill (avoids €118k of downtime)\n• DON risk management on the MV Sonora Star\n• Retention of Panificação Douro (€5.6M/year)` },
  { q: 'Where are we losing margin?', a: 'Three hotspots:\n• **Biscuits**: −0.7 pp of margin with butter (+13%) and sugar (+11%)\n• **Moagens**: soft wheat rose 1.8% in October with no price-list adjustment\n• **Venta de Baños**: 2.1 h per shift in format changeovers (−6 pp of OEE)' },
  { q: 'How much value has Espiga generated this year?', a: '**€7.9M captured in 2026**, with €12.4M a year at run-rate. The biggest contributors: smart wheat buying (€2.7M), pricing and promotions (€1.4M) and demand forecasting (€1.3M). The platform costs about €38k a month — a 17× return.' },
];
