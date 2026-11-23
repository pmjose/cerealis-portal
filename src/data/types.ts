export type Kpi = { label: string; value: string; delta: string; up: boolean; good: boolean; spark?: number[]; hint?: string; ratio?: boolean };

export type ChartKind = 'area' | 'bar' | 'line' | 'pie' | 'stack' | 'hbar' | 'combo';
export type Chart = {
  id: string; title: string; subtitle: string; kind: ChartKind; keys: string[];
  data: Record<string, string | number>[];
  unit?: string; ratio?: boolean; colors?: string[]; height?: number;
  insight: string; forecast: string; action: string; model?: string;
};

export type Step = { title: string; detail: string };
export type Agent = {
  id: string; name: string; mode: 'auto' | 'humano'; trigger: string; impact: string;
  approver?: string; domain?: string; steps: Step[]; last?: string;
};

export type Insight = { title: string; text: string; tone: 'ok' | 'warn' | 'crit' | 'info'; tag?: string };
export type MapPoint = { id: string; name: string; type: string; lat: number; lng: number; status: 'ok' | 'aviso' | 'critico'; detail: string; size?: number; color?: string };
export type Model = { name: string; kind: string; metric: string; status: 'Produção' | 'Piloto' | 'Treino'; drift: 'Estável' | 'Ligeiro' | 'Re-treino agendado'; trained: string; features: string; owner: string; value?: string };
export type FlowNode = { label: string; value: string; sub?: string; status?: 'ok' | 'aviso' | 'critico' };
export type ScenarioInput = { id: string; label: string; min: number; max: number; step: number; value: number; unit: string };
export type ScenarioOutput = { label: string; calc: (v: Record<string, number>) => number; fmt: (n: number) => string; good?: (n: number) => boolean };

export type Block =
  | { t: 'kpis'; items: Kpi[] }
  | { t: 'chart'; c: Chart; span?: boolean }
  | { t: 'table'; title: string; sub?: string; columns: string[]; rows: Record<string, string | number>[]; span?: boolean; status?: string[]; bars?: string[]; link?: { base: string; idCol: string } }
  | { t: 'insights'; items: Insight[]; title?: string }
  | { t: 'funnel'; title: string; sub?: string; stages: [string, number, string][]; span?: boolean }
  | { t: 'map'; title: string; points: MapPoint[]; routes?: [number, number][][]; height?: number; legend?: [string, string][] }
  | { t: 'agents'; items: Agent[] }
  | { t: 'models'; items: Model[]; title?: string }
  | { t: 'heat'; title: string; sub?: string; rows: string[]; cols: string[]; values: number[][]; unit?: string; good?: 'high' | 'low'; span?: boolean; fmt?: (n: number) => string }
  | { t: 'flow'; title: string; sub?: string; nodes: FlowNode[] }
  | { t: 'scenario'; title: string; sub?: string; inputs: ScenarioInput[]; outputs: ScenarioOutput[]; note?: string; span?: boolean }
  | { t: 'trace'; title?: string; span?: boolean };

export type Section = { id: string; label: string; icon: string; blocks: Block[] };
export type QA = { q: string; a: string };
export type Module = {
  slug: string; name: string; short: string; icon: string; color: string;
  group: 'funcoes' | 'negocio' | 'plataforma';
  tagline: string; owner: string; sources: string[]; sections: Section[]; questions: QA[];
};
