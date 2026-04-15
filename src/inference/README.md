# Inference Module (`src/inference/`)

Este diretório contém o código responsável pela **execução de inferência dos modelos treinados**, isto é, a aplicação do modelo em dados novos para geração de predições.

---

## 🧠 Responsabilidade

- Carregamento de modelos treinados
- Pipeline de pré-processamento para dados de entrada
- Execução de inferência (batch ou single sample)
- Pós-processamento das saídas do modelo
- Interface para consumo (scripts, API ou CLI)

---

## 📂 Estrutura (exemplo)

- `predict.py` → script principal de inferência
- `model_loader.py` → carregamento de checkpoints
- `preprocess.py` → preparação dos dados de entrada
- `postprocess.py` → transformação da saída do modelo

---

## ▶️ Como usar

Exemplo básico:

```bash
python src/inference/predict.py --input data/sample.json --model checkpoints/model.pt
