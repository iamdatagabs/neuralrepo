# 📊 Multimodal Experiment Tracking Policy

## 🎯 Objetivo

Garantir rastreabilidade total de experimentos envolvendo múltiplas modalidades clínicas.

---

## 🧪 Regras obrigatórias

### 1. Versionamento por modalidade

Todo experimento deve registrar separadamente:

- dataset de imagem
- dataset de vídeo
- dataset de telemetria

---

### 2. Sincronização temporal

Para telemetria + vídeo:

- obrigatório registrar timestamp alignment strategy
- proibido “merge implícito” sem documentação

---

### 3. Logging obrigatório

- embeddings por modalidade
- outputs intermediários do fusion model
- seed global + seeds por encoder

---

## 🚨 Proibição crítica

- Não é permitido treinar sem rastrear cada modalidade
- Não é permitido misturar datasets sem versionamento explícito
- Não é permitido ignorar drift em qualquer uma das modalidades

---

## 🏥 Reprodutibilidade clínica

Modelo só é válido se:

- Reproduzível por modalidade
- Sincronização temporal documentada
- Fusion strategy versionada
