# 🧠 neuralrepo
### Experimentos em Redes Neurais • TinyML • Domain Adaptation

<p align="center">
  <img src="assets/logo-pucpr-vermelha.png" width="200"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue?logo=python"/>
  <img src="https://img.shields.io/badge/Code%20License-MIT-green"/>
  <img src="https://img.shields.io/badge/Status-Research-orange"/>
  <img src="https://img.shields.io/badge/TinyML-Efficient%20AI-blueviolet"/>
  <img src="https://img.shields.io/badge/Domain%20Adaptation-Generalization-blueviolet"/>
  <img src="https://img.shields.io/badge/Made%20with-Colab-F9AB00?logo=googlecolab"/>
</p>

<p align="center">
  🚀 Repositório de pesquisa em Deep Learning aplicado a imagens médicas
</p>

---

## ✨ Sobre o Projeto

Este repositório reúne experimentos em aprendizado profundo, com foco em:

- Classificação e análise de imagens médicas
- **TinyML** (modelos eficientes e leves)
- **Domain Adaptation** (generalização entre domínios)

O objetivo é construir um framework experimental reprodutível para comparar arquiteturas e estratégias de forma organizada.

---

## 🎯 Objetivos

- Comparar arquiteturas de redes neurais
- Investigar técnicas de compressão (quantização e pruning)
- Avaliar métodos de Domain Adaptation (DANN, CORAL, MMD)
- Promover reprodutibilidade científica

---

## 🧪 Datasets

Os datasets externos são obtidos diretamente de suas fontes. Eles não são automaticamente cobertos pela licença MIT deste repositório.

- **Nigeria Chest X-Ray Dataset** — [Kaggle](https://www.kaggle.com/datasets/aminumusa/nigeria-chest-x-ray-dataset)
- **Enhanced MRI Brain Tumor Classification** — [Kaggle](https://www.kaggle.com/code/farzadnekouei/enhanced-mri-brain-tumor-classification)
- **Lung Cancer Prediction on Image Data** — [Kaggle](https://www.kaggle.com/code/adityamahimkar/lung-cancer-prediction-on-image-data/notebook)
- **Brain MRI Images for Brain Tumor Detection** — [Kaggle](https://www.kaggle.com/datasets/navoneel/brain-mri-images-for-brain-tumor-detection)

Consulte os termos de cada fonte antes de baixar, usar, modificar ou redistribuir dados. Para o dataset Brain MRI, a situação de licenciamento está documentada em [experiments/braintumor/DATASET_LICENSE.md](experiments/braintumor/DATASET_LICENSE.md).

---

## 🗂️ Estrutura do Projeto

```text
repo/
├── data/                         # Dados locais; não presumir que sejam publicáveis
├── cohorts/                      # Definições computacionais de populações de estudo
├── src/                           # Núcleo reutilizável de IA
├── studies/                       # Estudos e métricas agregadas
├── registry/                      # Rastreabilidade e reprodutibilidade
├── results/                       # Resultados consolidados
├── notebooks/                     # Exploração e análise
├── scripts/                       # Automação de pipelines
├── configs/                       # Configurações globais
├── tests/                         # Testes de integridade
├── .github/workflows/             # CI e deploy
├── requirements.txt
├── README.md
└── LICENSE
```

---

## 🚀 Como rodar

```bash
pip install -r requirements.txt
```

Consulte as instruções específicas de cada experimento para executar seus pipelines.

---

## 🔁 Reprodutibilidade

Os experimentos devem registrar configurações, versões de dados, métricas e limitações metodológicas. Dados clínicos privados, identificáveis ou sem autorização explícita não devem ser enviados ao repositório.

---

## 🧠 Linhas de Pesquisa

### ⚡ TinyML
- Quantização
- Pruning
- Modelos leves para edge

### 🌍 Domain Adaptation
- DANN
- CORAL
- MMD

---

## 📜 Licença e direitos de terceiros

O código-fonte e a documentação autoral deste repositório são disponibilizados sob a licença MIT, conforme o arquivo [LICENSE](LICENSE), salvo indicação específica em contrário.

**Datasets, imagens médicas, artigos, marcas, logotipos e outros materiais de terceiros não são relicenciados pela MIT.** Cada item permanece sujeito aos direitos e termos definidos por seus respectivos titulares e fontes. A presença de um arquivo neste repositório não constitui declaração de que ele pode ser redistribuído.

Antes de publicar figuras derivadas de dados de terceiros, verifique a licença aplicável, a atribuição exigida, as restrições de uso e a ausência de informações identificáveis.

---

## 🔗 Links

- LinkedIn: https://linkedin.com/in/passosgabriel
- Lattes: http://lattes.cnpq.br/9928924222649468
- ORCID: https://orcid.org/0000-0001-5813-7462
- GitHub: https://github.com/iamdatagabs
