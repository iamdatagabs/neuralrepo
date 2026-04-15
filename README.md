# 🧠 neuralrepo  
### Experimentos em Redes Neurais • TinyML • Domain Adaptation

<p align="center">
  <img src="assets/logo-pucpr-vermelha.png" width="200"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue?logo=python"/>
  <img src="https://img.shields.io/badge/PyTorch-Deep%20Learning-red?logo=pytorch"/>
  <img src="https://img.shields.io/badge/License-MIT-green"/>
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

Este repositório faz parte de um projeto de **Doutorado em Ciência da Computação (PPGIA/PUCPR)**, com foco em:

- 🧠 Classificação de imagens médicas (contexto geral/cirurgia)  
- ⚡ **TinyML** (modelos eficientes e leves)  
- 🌍 **Domain Adaptation** (generalização entre domínios)  

A ideia é construir um **framework experimental reprodutível**, permitindo comparar diferentes arquiteturas e estratégias de forma justa e organizada.

---

## 🎯 Objetivos

- Comparar arquiteturas de redes neurais  
- Investigar técnicas de compressão (quantização e pruning)  
- Avaliar métodos de Domain Adaptation (DANN, CORAL, MMD)  
- Garantir **reprodutibilidade científica**  

---

## 🧪 Dataset

Utilizamos o dataset:

👉 **Nigeria Chest X-Ray Dataset**  
https://www.kaggle.com/datasets/aminumusa/nigeria-chest-x-ray-dataset  

> ⚠️ O dataset não está incluído no repositório (licença + tamanho)

📌 Veja como baixar em: `data/README.md`

---

## 🗂️ Estrutura do Projeto

## 🗂️ Estrutura do Projeto

```bash
repo/
├── data/           # Instruções do dataset
├── src/            # Código principal (modelos, treino, utils)
├── notebooks/      # Exploração e análise
├── results/        # Resultados dos experimentos
├── scripts/        # Scripts auxiliares
└── README.md
```

---

## 🚀 Como rodar

```bash
pip install -r requirements.txt
python src/training/train.py --config src/experiments/exp_baseline.yaml
```

---

## 🔁 Reprodutibilidade

Todos os experimentos são controlados por arquivos `.yaml`:

```
src/experiments/
```

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

## 📊 Contribuições Esperadas

- Framework modular para experimentos em Deep Learning
- Benchmark de técnicas TinyML em imagens médicas
- Estudo comparativo de Domain Adaptation
- Insights para aplicações em cenários reais

---

## 🎓 Afiliação Institucional

PPGIA — Programa de Pós-Graduação em Informática  
Doutorado em Ciência da Computação  
Pontifícia Universidade Católica do Paraná (PUCPR)

---

## 👨‍🏫 Orientadores

- Dr. André Gustavo Hochuli  
- Dr. Alceu de Souza Britto Jr.  

---

## 👨‍🎓 Pesquisador

### MSc. Gabriel Passos de Jesus
Doutorando em Ciência da Computação (PPGIA/PUCPR)

## 💡 Áreas de Interesse

- Deep Learning  
- TinyML  
- Domain Adaptation  
- Informática Médica  

## 🔗 Links

- LinkedIn: https://linkedin.com/in/passosgabriel  
- Lattes: http://lattes.cnpq.br/9928924222649468  
- ORCID: https://orcid.org/0000-0001-5813-7462  
- GitHub: https://github.com/iamdatagabs  

---

## 📜 Licença

Este projeto está sob a licença MIT.

---

## 🤝 Agradecimentos

- Pontifícia Universidade Católica do Paraná (PUCPR)  
- Programa de Pós-Graduação em Informática (PPGIA)  
- Comunidade Kaggle  
- Associação Codaqui, DevParaná e Comunidade Campos Tech  

❤️ Ju Miranda (best gf ever, I'm waitin' for 2028)  
❤️ Maria D'Ajuda e Rafael (thx 4 being my family)  

---

## ⭐ Se este projeto te ajudar...

Considere dar uma ⭐ no repositório!
