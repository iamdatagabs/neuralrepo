class PreprocessingPipeline:
    """
    Pré-processamento versionado por modalidade.
    """

    def process_image(self, image):
        # normalização + resize + padronização
        return image

    def process_video(self, video):
        # frame sampling + normalization
        return video

    def process_telemetry(self, ts):
        # smoothing + resampling
        return ts
