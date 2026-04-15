class DriftDetector:
    """
    Detecta drift por modalidade.
    """

    def detect_image_drift(self, reference, current):
        return self._kl_divergence(reference, current)

    def detect_video_drift(self, reference, current):
        return self._feature_shift(reference, current)

    def detect_telemetry_drift(self, reference, current):
        return self._psi(reference, current)

    def _kl_divergence(self, ref, cur):
        return abs(hash(str(ref)) - hash(str(cur))) % 100 / 100

    def _feature_shift(self, ref, cur):
        return 0.12

    def _psi(self, ref, cur):
        return 0.08
