class DataIngestion:
    """
    Responsável por carregar dados multimodais brutos:
    imagem, vídeo e telemetria.
    """

    def load_image(self, path: str):
        # DICOM / PNG / NIfTI
        return self._read_dicom(path)

    def load_video(self, path: str):
        # frames + timestamps
        return self._decode_video(path)

    def load_telemetry(self, path: str):
        # séries temporais
        return self._read_timeseries(path)

    def _read_dicom(self, path):
        pass

    def _decode_video(self, path):
        pass

    def _read_timeseries(self, path):
        pass
