## 📊 Resultados

Os artefatos de análise exploratória, avaliação e interpretabilidade estão nesta pasta.

### Principais arquivos

#### 🔍 Análise Exploratória (EDA)

- `eda_distribution.png` — distribuição das classes e dimensões das imagens.
- `eda_samples.png` — amostras visuais das classes.
- `eda_pixel_distribution.png` — distribuição de intensidade de pixels por classe.

#### 🔄 Pré-processamento

- `augmentation_preview.png` — exemplos de técnicas de aumento de dados (flip, rotação, brilho e contraste).

#### 📈 Avaliação dos Modelos

- `evaluation_comparison.png` — curvas de aprendizado, matrizes de confusão, curvas ROC e comparação de métricas.
- `model_comparison.csv` — métricas quantitativas reportadas pelo experimento.

#### 🧠 Interpretabilidade

- `gradcam_visualization.png` — visualizações Grad-CAM.

---

## ⚠️ Limitações e cautela científica

- O conjunto de dados é limitado e não representa a variabilidade clínica real.
- Não há validação externa documentada.
- Resultados experimentais não demonstram segurança, eficácia ou utilidade clínica.
- Grad-CAM é uma técnica de visualização; não comprova, isoladamente, que o modelo utiliza evidências clinicamente válidas.

Não interpretar os resultados como diagnóstico ou recomendação médica.

## 📜 Direitos e licenciamento

A redistribuição pública dos ativos visuais selecionados para o dashboard (`eda_samples.png`, `gradcam_visualization.png` e `augmentation_preview.png`) foi confirmada pelo responsável do projeto em 20 de novembro de 2026, incluindo publicação no GitHub Pages. O registro do escopo está em [../DATASET_LICENSE.md](../DATASET_LICENSE.md).

Essa autorização específica não transforma o dataset em MIT nem se estende automaticamente a outros arquivos, datasets ou usos. A licença MIT do repositório cobre o código e a documentação autoral, não os materiais de terceiros.

## Dashboard

Os ativos aprovados para a galeria são listados em `dashboard/public/data/visuals.json`. A galeria mantém avisos de pesquisa/educação e contexto de proveniência. Grad-CAM não deve ser interpretado como validação clínica.
