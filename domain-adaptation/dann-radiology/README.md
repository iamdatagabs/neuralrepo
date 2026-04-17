# 🧠 DANN for Radiology — Domain Adaptation in Chest X-rays

> Primeiro experimento do doutorado — investigando como modelos de IA podem generalizar entre diferentes contextos clínicos.

---

## 📌 Overview

Este experimento implementa uma **Domain-Adversarial Neural Network (DANN)** para classificação de imagens de raio-X de tórax, com foco em **robustez a mudanças de domínio (domain shift)**.

O objetivo é simular um cenário real:

- Um modelo treinado em um hospital (**source domain**)
- Aplicado em outro hospital (**target domain**)
- Onde as distribuições de dados são diferentes

---

## 🧪 Motivação

Modelos de Deep Learning em saúde frequentemente apresentam queda de desempenho fora do ambiente de treino devido a:

- Diferenças de equipamento
- Protocolos de aquisição distintos
- Populações clínicas variadas

Este experimento investiga:

> como aprender representações invariantes ao domínio sem perder capacidade diagnóstica.

---

## 🧠 Arquitetura

O modelo segue o paradigma DANN:

- **Feature Extractor:** ResNet18 pré-treinada
- **Class Classifier:** NORMAL vs PNEUMONIA
- **Domain Classifier:** SOURCE vs TARGET
- **Gradient Reversal Layer (GRL):** promove invariância de domínio

---

## 🔁 Pipeline

### 1. Dados

- **Source domain:** Chest X-ray Pneumonia Dataset (Kaggle)
- **Target domain:** NIH Chest X-rays (subamostrado)

Estrutura esperada:

```bash
data/
├── source_sample/
│   ├── NORMAL/
│   └── PNEUMONIA/
│
├── target_sample/
│   └── *.png
```
---

### 2. Pré-processamento

- Resize: 224x224  
- Conversão para 3 canais (RGB)  
- Tensorização com `ToTensor()`  

---

### 3. Treinamento

Treinamento adversarial com três componentes principais:

- **Loss de classificação (source):** aprendizado da tarefa diagnóstica  
- **Loss de domínio (source):** identificação do domínio de origem  
- **Loss de domínio (target):** alinhamento com o domínio alvo  

A função de perda total é composta por:

```text id="f7gq8n"
Loss = Loss_class + Loss_domain_source + Loss_domain_target
```

---

### 4. Avaliação

#### 📊 Métricas tradicionais

- AUC (ROC Curve)

#### 🏥 Métricas clínicas simuladas

- Correlação clínico-radiológica  
- Taxa de erro diagnóstico  
- Índice de exposição (confiança do modelo)  
- Taxa de rejeição (baixa confiança)  
- Panic values (detecção de casos críticos com alta confiança)  

---

### 5. Execução

Após configuração do ambiente e download dos dados:

```bash id="r8n2fw"
python experiment.py
