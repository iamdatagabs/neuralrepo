# 🧪 Studies — Clinical AI Research Layer

This directory contains **self-contained, reproducible clinical studies** for AI models applied to medical imaging and surgical video analysis.

Each study represents a **computational equivalent of a clinical research protocol**, including:
- cohort definition
- model configuration
- execution pipeline
- evaluation metrics
- clinical interpretation of results

---

# 🏥 Conceptual Overview

Unlike traditional machine learning projects where experiments are loosely defined, this repository follows a **study-centric paradigm inspired by clinical research workflows (NIH-style)**.

Each study is treated as an independent scientific unit:

> 📌 A study = a reproducible experiment grounded in a defined clinical cohort.

---

# 🧬 Structure of a Study

Each folder inside `studies/` must be self-contained:

```bash
study_xxx_name/
├── cohort.yaml            # Definition of the clinical population
├── config.yaml            # Model + training configuration
├── run.py                 # Execution script for the study
├── metrics.json          # Quantitative evaluation results
├── predictions.csv       # Model outputs (if applicable)
├── artifacts/            # Optional intermediate outputs
└── interpretation.md     # Clinical-oriented analysis of results
