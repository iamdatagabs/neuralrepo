class MonitoringPipeline:
    """
    Orquestra todo o monitoramento do sistema.
    """

    def __init__(self):
        self.drift = DriftDetector()
        self.performance = PerformanceMonitor()
        self.quality = DataQualityMonitor()
        self.alerts = AlertingSystem()

    def run(self, reference_data, current_data, predictions, labels):

        image_drift = self.drift.detect_image_drift(
            reference_data["image"],
            current_data["image"]
        )

        video_drift = self.drift.detect_video_drift(
            reference_data["video"],
            current_data["video"]
        )

        ts_drift = self.drift.detect_telemetry_drift(
            reference_data["telemetry"],
            current_data["telemetry"]
        )

        performance = self.performance.evaluate(predictions, labels)

        if image_drift > 0.15:
            self.alerts.send_alert("warning", "Image drift detected")

        if ts_drift > 0.10:
            self.alerts.send_alert("critical", "Telemetry drift critical")

        if performance["auc"] < 0.85:
            self.alerts.send_alert("critical", "Model performance degraded")

        return {
            "drift": {
                "image": image_drift,
                "video": video_drift,
                "telemetry": ts_drift
            },
            "performance": performance
        }
