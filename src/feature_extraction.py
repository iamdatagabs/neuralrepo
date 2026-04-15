class FeatureExtractor:
    """
    Extrai embeddings por modalidade.
    """

    def image_features(self, image):
        return "image_embedding_vector"

    def video_features(self, video):
        return "video_embedding_sequence"

    def telemetry_features(self, ts):
        return "time_series_embedding"
