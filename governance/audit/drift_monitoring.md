# 📊 Drift Monitoring Policy

## 🎯 Objetivo

Detectar mudanças na distribuição dos dados e degradação do modelo.

---

## 🧠 Tipos de drift

### 🖼️ Image drift
- mudança de equipamento
- mudança de protocolo de aquisição

### 🎥 Video drift
- mudança de iluminação
- mudança de contexto hospitalar

### 📈 Telemetry drift
- mudança em sensores
- mudança em população monitorada

---

## 📊 Métricas

- PSI (Population Stability Index)
- KL divergence entre distribuições
- performance decay ao longo do tempo

---

## 🚨 Regras

- drift deve ser monitorado por modalidade separadamente
- alertas automáticos obrigatórios
- modelos degradados devem ser reavaliados
