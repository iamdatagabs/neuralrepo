# 🧠 Brain Tumor MRI Classification
**Deep Learning para classificação binária de imagens de ressonância magnética cerebral**

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=flat&logo=tensorflow&logoColor=white)
![Colab](https://img.shields.io/badge/Google%20Colab-GPU%20T4-F9AB00?style=flat&logo=googlecolab)
![Dataset](https://img.shields.io/badge/Dataset-Kaggle-20BEFF?style=flat&logo=kaggle)

</div>

---

## 📋 Visão Geral

Este experimento compara redes neurais convolucionais para classificação de imagens de ressonância magnética cerebral em duas classes:

- **Normal** — classificada como sem tumor pelo conjunto de dados.
- **Tumor** — classificada como contendo tumor pelo conjunto de dados.

A classificação é experimental e não representa diagnóstico ou validação para uso clínico.

---

## 🏗️ Estrutura do Experimento

```text
experiments/braintumor/
├── notebooks/
├── src/
├── data/
├── models/
├── results/
├── requirements.txt
└── README.md
```

---

## ⚙️ Pipeline

```text
Fonte do dataset
    ↓
Download e organização
    ↓
Análise exploratória
    ↓
Pré-processamento
    ↓
Divisão dos dados
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

### Dataset

A referência utilizada pelo notebook é o dataset [Brain MRI Images for Brain Tumor Detection](https://www.kaggle.com/datasets/navoneel/brain-mri-images-for-brain-tumor-detection), de Navoneel Chakrabarty, hospedado no Kaggle.

O download deve ser feito diretamente na plataforma, observando os termos apresentados pelo titular dos dados:

```bash
kaggle datasets download -d navoneel/brain-mri-images-for-brain-tumor-detection \
    -p /content/data --unzip
```

**Licenciamento:** a licença MIT deste repositório não se estende às imagens do dataset. A página do Kaggle atualmente identifica os arquivos como “Data files © Original Authors”; não foi possível confirmar, na página consultada, uma licença aberta explícita que autorize redistribuição. Consulte [DATASET_LICENSE.md](DATASET_LICENSE.md) antes de reutilizar ou compartilhar imagens e figuras que possam incorporar imagens do conjunto.

---

## 📊 Resultados

Os artefatos de análise e avaliação estão na pasta `results/`. A descrição dos arquivos e as limitações de interpretação estão em [results/README.md](results/README.md).

---

## 📄 Licença

O código-fonte e a documentação autoral deste experimento são disponibilizados sob a licença MIT do repositório principal. Essa licença **não** concede direitos sobre o dataset, imagens originais ou materiais de terceiros.

Consulte [DATASET_LICENSE.md](DATASET_LICENSE.md) para a situação específica do conjunto de dados.
