# 🔍 Data Lineage Schema

## 🎯 Objetivo

Rastrear o caminho completo dos dados desde a origem até o treinamento do modelo.

---

## 🧩 Estrutura de rastreio

Cada amostra deve conter:

- dataset_version
- modality (image | video | telemetry)
- source_system
- preprocessing_pipeline_version
- augmentation_pipeline_version (se aplicável)
- split (train | val | test)

---

## 📌 Exemplo de lineage
