# 🔄 Domain Adaptation

> Aprendendo a generalizar quando o mundo muda.

---

## 📌 Visão Geral

Esta pasta reúne experimentos focados em **Domain Adaptation**, com ênfase em cenários onde há discrepância entre dados de treino (**source domain**) e dados de aplicação (**target domain**).

O objetivo é investigar como modelos de aprendizado de máquina podem:

- Generalizar para novos contextos  
- Reduzir sensibilidade a mudanças de distribuição  
- Manter desempenho em ambientes não controlados  

---

## 🧪 Problema

Modelos frequentemente assumem que treino e teste vêm da mesma distribuição.

Na prática, isso raramente acontece.

Em aplicações reais, especialmente na saúde, pequenas variações podem causar:

- Queda significativa de performance  
- Aumento de erros críticos  
- Perda de confiabilidade do sistema  

---

## 🧠 Abordagens exploradas

Os experimentos desta pasta investigam diferentes estratégias, incluindo:

- **Domain-Adversarial Training (DANN)**  
- Aprendizado de representações invariantes  
- Alinhamento de distribuições entre domínios  
- Avaliação sob domain shift  

---

## 🔬 Foco da linha de pesquisa

Mais do que melhorar métricas, o foco está em:

- Robustez  
- Interpretabilidade  
- Consistência entre domínios  
- Aplicabilidade em cenários reais  

---

## 📁 Estrutura

Cada subpasta representa um experimento independente:

```bash
domain-adaptation/
├── dann-radiology-domain-adaptation/
├── (futuros experimentos...)
