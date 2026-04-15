class FusionModule:
    """
    Combina embeddings multimodais.
    """

    def __init__(self, strategy="late_fusion"):
        self.strategy = strategy

    def fuse(self, image_emb, video_emb, ts_emb):
        """
        Combinação final para inferência.
        """

        fused = {
            "image": image_emb,
            "video": video_emb,
            "telemetry": ts_emb,
            "fusion_strategy": self.strategy
        }

        return fused
