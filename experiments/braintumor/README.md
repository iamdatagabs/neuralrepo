# 🧠 Brain Tumor MRI Classification  
**Deep Learning para Detecção de Tumores Cerebrais em Imagens de Ressonância Magnética**

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=flat&logo=tensorflow&logoColor=white)
![Colab](https://img.shields.io/badge/Google%20Colab-GPU%20T4-F9AB00?style=flat&logo=googlecolab&logoColor=white)
![Kaggle](https://img.shields.io/badge/Dataset-Kaggle-20BEFF?style=flat&logo=kaggle&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

</div>

---

## 📋 Visão Geral

Este projeto desenvolve e compara dois modelos de **Redes Neurais Convolucionais (CNNs)** para classificação binária de imagens de ressonância magnética cerebral:

- **Normal** — sem evidências de tumor  
- **Tumor** — presença de massa tumoral detectável  

---

## 🏗️ Estrutura do Repositório

```
brain-tumor-mri-classification/
│
├── notebooks/
│   └── brain_tumor_classification.ipynb
│
├── src/
│   ├── data_utils.py
│   ├── models.py
│   └── evaluation.py
│
├── data/
│   └── README_data.md
│
├── models/
│   └── .gitkeep
│
├── results/
│   ├── evaluation_comparison.png
│   ├── gradcam_visualization.png
│   ├── error_analysis.png
│   └── model_comparison.csv
│
├── requirements.txt
└── README.md
```

---

## ⚙️ Pipeline

```
Kaggle API
    ↓
Download + Organização
    ↓
EDA
    ↓
Pré-processamento
    ↓
Split
    ↓
Treinamento
    ↓
Avaliação
    ↓
Grad-CAM
```

---

## 🚀 Como Executar

### Pré-requisitos

```bash
pip install -r requirements.txt
```

### 1. Configurar Kaggle API

Acesse: https://www.kaggle.com/settings  
Clique em **Create New Token**  
Baixe o arquivo `kaggle.json`

---

### 2. Executar o Notebook

Use Google Colab com:

- GPU: T4  
- RAM: 12GB  

---

### 3. Download do Dataset

```bash
kaggle datasets download -d navoneel/brain-mri-images-for-brain-tumor-detection \
    -p /content/data --unzip
```

---

## 📄 Licença

MIT License — veja `LICENSE` para detalhes.
