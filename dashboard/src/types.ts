export type Experiment = {
  id: string; name: string; path: string; status: string; dataset: string;
  model: string; task: string; date: string; metrics: Record<string, number>;
  outputs: number; files: string[]; source?: string; kind?: string;
};
export type DashboardData = {
  generated_at: string; repository: string; total_experiments: number;
  experiments: Experiment[]; metrics_available: string[]; warnings: string[];
};
export type VisualAsset = {
  id: string; title: string; description: string; path: string;
  category: "medical-imaging" | "explainability" | "synthetic";
  image_origin: "public_dataset" | "synthetic" | "derived_result";
  dataset?: string; license?: string; modality?: string; organ?: string;
  experiment?: string; method?: string; source_url?: string;
  approved_for_publication: boolean; disclaimer?: string;
};
export type VisualManifest = { generated_at?: string | null; assets: VisualAsset[] };
