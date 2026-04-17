# 🩻 Chest X-ray — Domain Adaptation Experiment

> Investigando como modelos de IA mantêm desempenho diagnóstico sob variação entre hospitais.

---

## 📌 Visão Geral

Este experimento explora o problema de **domain adaptation em imagens médicas**, utilizando radiografias de tórax (chest X-rays) como estudo de caso.

O cenário simulado é:

- Treinamento em um hospital (**source domain**)  
- Aplicação em outro hospital (**target domain**)  
- Presença de **domain shift** entre os dois  

---

## 🧪 Problema

Mesmo modelos com alta acurácia podem falhar quando aplicados fora do domínio de treino.

No contexto de raio-X de tórax, isso pode ocorrer devido a:

- Diferenças de equipamento  
- Protocolos de aquisição distintos  
- Qualidade e resolução das imagens  
- Variações populacionais  

---

## 🎯 Objetivo

Avaliar como técnicas de Domain Adaptation podem:

- Melhorar a generalização entre hospitais  
- Reduzir sensibilidade ao domain shift  
- Preservar consistência diagnóstica  

---

## 🧠 Abordagem

O experimento utiliza:

- Aprendizado supervisionado no domínio source  
- Dados não rotulados no domínio target  
- Estratégias de alinhamento de distribuição  

Modelos explorados incluem:

- Baseline (treinado apenas no source)  
- Modelos com adaptação de domínio (ex: DANN)  

---

## 🔁 Pipeline

### 1. Dados

- Source: dataset de pneumonia (rotulado)  
- Target: dataset alternativo (não rotulado ou parcialmente rotulado)  

---

### 2. Treinamento

- Aprendizado no domínio source  
- Adaptação ao domínio target  
- Otimização conjunta de múltiplas perdas  

---

### 3. Avaliação

- Desempenho no domínio target  
- Comparação entre modelos  
- Análise de robustez  

---

## 🔬 Análises

### 📊 Quantitativas

- AUC (ROC Curve)  
- Comparação baseline vs adaptação  

### 🔍 Interpretabilidade

- Mapas de atenção (Grad-CAM)  
- Comparação espacial entre domínios  

### 🧠 Métricas experimentais

- Qualidade da atenção do modelo  
- Consistência de predição  
- Sensibilidade ao domain shift  

---

## 📁 Estrutura

```bash
chest-xray/
├── README.md
├── data/
├── models/
├── training/
├── evaluation/
├── visualization/
└── results/
