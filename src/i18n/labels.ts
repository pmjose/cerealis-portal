import { t } from './index';
import type { Model, Agent, MapPoint } from '../data/types';

// Os dados guardam códigos internos estáveis (em português) nas duas línguas; a tradução acontece só na apresentação.
export const modelStatusLabel = (s: Model['status']) => t(`core.model.${s}`);
export const driftLabel = (s: Model['drift']) => t(`core.drift.${s}`);
export const riskLabel = (s: 'Baixo' | 'Médio' | 'Alto') => t(`core.risk.${s}`);
export const mapStatusLabel = (s: MapPoint['status']) => t(`core.status.${s}`);
export const modeLabel = (m: Agent['mode']) => t(`core.mode.${m}`);
