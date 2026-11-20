export type Experiment = {
  id: string; name: string; path: string; status: string; dataset: string;
  model: string; task: string; date: string; metrics: Record<string, number>;
  outputs: number; files: string[]; source?: string; kind?: string;
};
export type DashboardData = {
  generated_at: string; repository: string; total_experiments: number;
  experiments: Experiment[]; metrics_available: string[]; warnings: string[];
};