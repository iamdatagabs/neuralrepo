## 📊 Resultados

Os resultados completos do experimento estão disponíveis na pasta `results/`.  
Essa organização mantém o repositório limpo e facilita a navegação entre análises exploratórias, treinamento e avaliação dos modelos.

### Principais arquivos

#### 🔍 Análise Exploratória (EDA)

- `eda_distribution.png`  
  Distribuição das classes e análise das dimensões das imagens.

- `eda_samples.png`  
  Amostras visuais das classes (normal vs tumor), permitindo inspeção qualitativa inicial.

- `eda_pixel_distribution.png`  
  Distribuição de intensidade de pixels por classe, útil para entender diferenças estatísticas entre os grupos.

---

#### 🔄 Pré-processamento

- `augmentation_preview.png`  
  Exemplos de técnicas de *data augmentation* aplicadas durante o treinamento (flip, rotação, brilho, contraste).

---

#### 📈 Avaliação dos Modelos

- `evaluation_comparison.png`  
  Painel completo com:
  - Curvas de aprendizado  
  - Matrizes de confusão  
  - Curvas ROC  
  - Comparação de métricas  

- `model_comparison.csv`  
  Tabela com métricas quantitativas dos modelos (acurácia, precisão, recall, F1-score e ROC-AUC).

---

#### 🧠 Interpretabilidade

- `gradcam_visualization.png`  
  Visualizações de Grad-CAM destacando as regiões da imagem mais relevantes para a decisão do modelo.

---

### 🧠 Interpretação Geral

O modelo baseado em **transfer learning (EfficientNetB3)** apresentou desempenho superior ao baseline, principalmente em:

- **Recall (sensibilidade)** → reduz falsos negativos, essencial em contexto clínico  
- **ROC-AUC** → indica boa capacidade de separação entre classes  

As visualizações com Grad-CAM sugerem que o modelo aprende padrões espacialmente relevantes, com foco em regiões compatíveis com alterações estruturais.

---

### ⚠️ Observação

Os resultados devem ser interpretados com cautela:

- Dataset limitado e não representativo da variabilidade clínica real  
- Ausência de validação externa  
- Uso restrito a fins educacionais e de pesquisa  

---

### 🔍 Visualização

![Grad-CAM](results/gradcam_visualization.png)
