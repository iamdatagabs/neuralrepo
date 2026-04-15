# 🔍 Audit Log Schema (Clinical Multimodal AI)

## 🎯 Objetivo

Definir formato padrão de logs auditáveis para todas as inferências do sistema.

---

## 📌 Cada inferência deve registrar:

### Identificação
- inference_id (UUID)
- timestamp (UTC)
- model_name
- model_version

### Entrada (sem dados sensíveis crus)
- modality_used: image | video | telemetry | multimodal
- input_hash (hash dos dados)
- preprocessing_version

### Saída
- prediction
- confidence_score
- uncertainty_score

### Contexto clínico
- device/source system
- hospital_id (anonimizado)
- session_id (pseudonimizado)

---

## 🧠 Exemplo de log

```json id="au2"
{
  "inference_id": "abc123",
  "timestamp": "2026-04-15T12:00:00Z",
  "model": "multimodal_clinical_model_v1",
  "version": "1.0.0",

  "modality": ["image", "telemetry"],

  "input_hash": "sha256:9f2c...",
  "prediction": "high_risk_condition",
  "confidence": 0.92,
  "uncertainty": 0.08,

  "preprocessing_version": "img_v1.0.0 + ts_v1.0.0",
  "session_id": "session_7f9a",
  "hospital_id": "HOSP_A"
}
