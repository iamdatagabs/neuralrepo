class AlertingSystem:
    """
    Sistema de alertas clínicos e técnicos.
    """

    def send_alert(self, level, message):
        alert = {
            "level": level,
            "message": message
        }

        self._log_alert(alert)
        return alert

    def _log_alert(self, alert):
        print(f"[{alert['level'].upper()}] {alert['message']}")
