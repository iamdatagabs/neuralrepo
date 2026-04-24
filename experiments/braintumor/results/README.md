## 📊 Resultados

Os resultados completos do experimento estão disponíveis na pasta `results/`.  
Essa abordagem mantém o repositório organizado e evita sobrecarregar o README com muitas figuras.

### Principais arquivos

- `model_comparison.csv`  
  Contém as métricas quantitativas dos modelos avaliados (acurácia, precisão, recall, F1-score e ROC-AUC).

- `evaluation_comparison.png`  
  Painel comparativo com curvas de aprendizado, matriz de confusão, curva ROC e métricas agregadas.

- `gradcam_visualization.png`  
  Visualizações de interpretabilidade (Grad-CAM), destacando as regiões da imagem utilizadas pelo modelo para a tomada de decisão.

- `error_analysis.png`  
  Exemplos de falsos positivos e falsos negativos para análise qualitativa do desempenho.

---

### 🧠 Interpretação Geral

De forma geral, o modelo baseado em **transfer learning (EfficientNetB3)** apresentou desempenho superior ao baseline, especialmente em:

- **Recall (sensibilidade)** → essencial para reduzir falsos negativos em contexto clínico  
- **ROC-AUC** → indicando boa capacidade de separação entre classes  

As visualizações com Grad-CAM sugerem que o modelo aprende padrões espacialmente relevantes, com foco em regiões compatíveis com anomalias estruturais.

---

### ⚠️ Observação

Os resultados devem ser interpretados com cautela, pois:

- O dataset é limitado e não representa toda a variabilidade clínica real  
- Não há validação externa ou prospectiva  
- O modelo não deve ser utilizado para diagnóstico sem validação adicional  

---

### 🔍 Visualização

![Grad-CAM](results/gradcam_visualization.png)
