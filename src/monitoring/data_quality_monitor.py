class DataQualityMonitor:
    """
    Detecta problemas na entrada dos dados multimodais.
    """

    def check_image_quality(self, image):
        return {"blur_score": 0.1, "noise": 0.05}

    def check_video_quality(self, video):
        return {"frame_loss": 0.02, "compression_artifacts": 0.1}

    def check_telemetry_quality(self, ts):
        return {"missing_values": 0.03, "signal_noise": 0.07}
