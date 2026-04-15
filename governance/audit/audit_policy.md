# 📜 Audit Policy (Clinical AI System)

## 🎯 Objetivo

Garantir rastreabilidade completa de todas as decisões feitas pelo sistema de IA.

---

## 🧠 Regras obrigatórias

### 1. Toda inferência deve ser logada
- sem exceção
- incluindo testes e ambiente de desenvolvimento

---

### 2. Logs não podem conter dados sensíveis brutos
- imagens não armazenadas no log
- apenas hashes ou embeddings

---

### 3. Imutabilidade

- logs não podem ser alterados após criação
- apenas append-only

---

## 🏥 Uso clínico

Logs devem permitir:

- reconstrução da decisão
- auditoria médica posterior
- investigação de erro clínico

---

## 🚨 Violação crítica

Qualquer sistema sem audit log completo é considerado:

> ❌ não clínico / não auditável / não seguro
