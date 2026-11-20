#!/usr/bin/env python3
"""Export aggregate, non-patient-level NeuralRepo experiment results for GitHub Pages."""
from __future__ import annotations
import csv, json, re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
try:
    import yaml
except ImportError:
    yaml = None

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "dashboard" / "public" / "data" / "experiments.json"
ALIASES = {
    "accuracy":"accuracy", "acuracia":"accuracy", "acc":"accuracy",
    "precision":"precision", "precisao":"precision",
    "recall":"recall", "sensibilidade":"recall",
    "f1":"f1_score", "f1_score":"f1_score", "f1_score_":"f1_score",
    "roc_auc":"roc_auc", "auc":"roc_auc", "roc-auc":"roc_auc"
}
METRIC_KEYS = {"accuracy","precision","recall","f1_score","roc_auc","loss","dice","iou","sensitivity","specificity","balanced_accuracy"}

def norm_key(value: str) -> str:
    raw = value.strip().lower().replace(" ", "_")
    return ALIASES.get(raw, re.sub(r"[^a-z0-9_]+", "_", raw).strip("_"))

def read_json(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else {}
    except (OSError, json.JSONDecodeError):
        return {}

def read_yaml(path: Path) -> dict[str, Any]:
    if yaml is None:
        return {}
    try:
        value = yaml.safe_load(path.read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else {}
    except (OSError, UnicodeError, yaml.YAMLError):
        return {}

def flatten_metrics(value: Any, prefix: str = "") -> dict[str, float]:
    found: dict[str, float] = {}
    if isinstance(value, dict):
        for key, item in value.items():
            found.update(flatten_metrics(item, f"{prefix}_{key}" if prefix else str(key)))
    elif isinstance(value, (int, float)) and not isinstance(value, bool):
        key = norm_key(prefix)
        if key in METRIC_KEYS:
            found[key] = float(value)
    return found

def record_from_csv(path: Path) -> list[dict[str, Any]]:
    if path.name != "model_comparison.csv":
        return []
    records = []
    try:
        with path.open(newline="", encoding="utf-8-sig") as handle:
            for index, row in enumerate(csv.DictReader(handle)):
                model = row.get("Modelo") or row.get("Model") or row.get("model") or f"Model {index+1}"
                metrics = {}
                for label, raw in row.items():
                    key = norm_key(label or "")
                    if key in METRIC_KEYS and raw not in (None, ""):
                        try: metrics[key] = float(raw.replace(",", "."))
                        except (ValueError, AttributeError): pass
                if metrics:
                    records.append({
                        "id": f"{path.parent.relative_to(ROOT).as_posix().replace('/', '__')}__{index+1}",
                        "name": f"Brain tumor MRI · {model}", "path": path.relative_to(ROOT).as_posix(),
                        "status": "recorded", "dataset": "Brain tumor MRI", "model": model,
                        "task": "Binary image classification", "date": "", "metrics": metrics,
                        "outputs": 0, "files": [path.name], "source": "CSV benchmark"
                    })
    except (OSError, UnicodeError, csv.Error):
        return []
    return records

def main() -> None:
    records: list[dict[str, Any]] = []
    warnings: list[str] = []
    for folder in (ROOT / "studies", ROOT / "experiments", ROOT / "results", ROOT / "registry" / "runs"):
        if not folder.exists():
            continue
        for metrics_file in folder.rglob("metrics.json"):
            doc = read_json(metrics_file)
            metrics = flatten_metrics(doc.get("metrics", doc))
            if metrics:
                records.append({
                    "id": metrics_file.parent.relative_to(ROOT).as_posix().replace("/", "__"),
                    "name": doc.get("name") or metrics_file.parent.name,
                    "path": metrics_file.relative_to(ROOT).as_posix(), "status": doc.get("status", "recorded"),
                    "dataset": doc.get("dataset") or "Unspecified", "model": doc.get("model") or "Unspecified",
                    "task": doc.get("task") or "Unspecified", "date": doc.get("date") or "",
                    "metrics": metrics, "outputs": 0, "files": [metrics_file.name], "source": "metrics.json"
                })
        for csv_file in folder.rglob("model_comparison.csv"):
            records.extend(record_from_csv(csv_file))
    registry = read_yaml(ROOT / "governance" / "models" / "model_registry.yaml")
    models = registry.get("models", []) if isinstance(registry.get("models", []), list) else []
    for model in models:
        safety = model.get("clinical_safety", {})
        if model.get("status") == "staging" or safety.get("validated") is False or safety.get("approved_for_clinical_use") is False:
            warnings.append(f"Model registry: {model.get('model_name', 'unnamed model')} ({model.get('status', 'unknown')}) is experimental; clinical validation and approval are not established.")
    if any("braintumor" in r["path"] for r in records):
        warnings.append("Brain Tumor MRI README reports a limited dataset and no external validation; interpret metrics as exploratory, not clinical performance.")
    if not any("domain-adaptation" in r["path"] for r in records):
        warnings.append("Domain adaptation is documented in the repository, but no machine-readable metrics were found for this research track.")
    if not any("tinyml" in r["path"].lower() for r in records):
        warnings.append("TinyML is a documented research direction; no structured benchmark metrics were found for this track.")
    records.sort(key=lambda item: (item["path"], item["name"]))
    metric_keys = sorted({key for record in records for key in record["metrics"]})
    payload = {"generated_at": datetime.now(timezone.utc).isoformat(), "repository": "iamdatagabs/neuralrepo",
               "total_experiments": len(records), "experiments": records, "metrics_available": metric_keys,
               "warnings": warnings}
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Exported {len(records)} benchmark records ({len(metric_keys)} metric fields) to {OUT.relative_to(ROOT)}")

if __name__ == "__main__":
    main()
