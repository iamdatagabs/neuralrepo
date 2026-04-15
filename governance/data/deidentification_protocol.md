# 🔒 De-identification Protocol (Multimodal Clinical Data)

## 🎯 Objetivo

Garantir anonimização de dados clínicos antes de qualquer uso em modelos de IA.

---

## 🖼️ Imagem médica

- Remoção de DICOM headers
- Remoção de metadata hospitalar
- Padronização de formato
- Verificação de burnout de identidade indireta

---

## 🎥 Vídeo clínico

- Face blurring obrigatório
- Masking de regiões identificáveis
- Remoção de áudio quando necessário
- Redução de FPS se necessário para anonimização temporal

⚠️ Risco crítico: reidentificação por contexto hospitalar

---

## 📈 Telemetria

- Substituição de IDs por hashes irreversíveis
- Time-shift aleatório controlado
- Remoção de timestamps absolutos

---

## 🚨 Regras gerais

- Nenhum dado pode conter identificador direto ou indireto
- Nenhum dataset pode ser revertido para identidade original
- Auditoria obrigatória antes do treino
