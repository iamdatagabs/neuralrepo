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

As figuras podem conter imagens originais ou transformadas do dataset Brain MRI. A licença MIT do código deste repositório **não** cobre essas imagens nem concede autorização para redistribuí-las.

A página do dataset no Kaggle informa “Data files © Original Authors”, sem apresentar, na página consultada, uma licença aberta explícita para redistribuição. Por precaução, estes arquivos não devem ser promovidos para uma galeria pública ou reutilizados fora do contexto permitido pelo titular até que os direitos de uso e redistribuição sejam confirmados.

Consulte [../DATASET_LICENSE.md](../DATASET_LICENSE.md).
