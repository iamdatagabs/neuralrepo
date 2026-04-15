class PipelineRunner:
    """
    Orquestra todo o fluxo:
    ingestão → alinhamento → pré-processamento → features → fusão
    """

    def __init__(self):
        self.ingestion = DataIngestion()
        self.alignment = TemporalAlignment()
        self.preprocessing = PreprocessingPipeline()
        self.features = FeatureExtractor()
        self.fusion = FusionModule()

    def run(self, image_path, video_path, telemetry_path):

        image = self.ingestion.load_image(image_path)
        video = self.ingestion.load_video(video_path)
        telemetry = self.ingestion.load_telemetry(telemetry_path)

        aligned = self.alignment.align(video, telemetry)

        image_p = self.preprocessing.process_image(image)
        video_p = self.preprocessing.process_video(aligned["video_segments"])
        ts_p = self.preprocessing.process_telemetry(aligned["telemetry_window"])

        image_emb = self.features.image_features(image_p)
        video_emb = self.features.video_features(video_p)
        ts_emb = self.features.telemetry_features(ts_p)

        fused = self.fusion.fuse(image_emb, video_emb, ts_emb)

        return fused
