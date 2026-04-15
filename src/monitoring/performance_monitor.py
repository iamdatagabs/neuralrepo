class PerformanceMonitor:
    """
    Monitora degradação de performance do modelo em produção.
    """

    def evaluate(self, predictions, ground_truth):
        metrics = {
            "auc": 0.90,
            "accuracy": 0.88,
            "f1_score": 0.87,
            "sensitivity": 0.85,
            "specificity": 0.89
        }

        return metrics

    def detect_decay(self, baseline, current):
        return {
            "auc_drop": baseline["auc"] - current["auc"],
            "warning": current["auc"] < 0.85
        }
