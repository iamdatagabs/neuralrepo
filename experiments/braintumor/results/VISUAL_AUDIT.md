# Auditoria de ativos visuais — Brain Tumor MRI

**Data:** 20 de novembro de 2026  
**Escopo:** inspeção visual preliminar dos PNGs existentes em `experiments/braintumor/results/`.

Esta auditoria é documental e técnica; não constitui parecer jurídico, validação clínica ou confirmação de licença.

## Resultado por arquivo

| Arquivo | Inspeção | Observação | Decisão para o dashboard |
|---|---|---|---|
| `eda_distribution.png` | Visual | Gráficos agregados de contagem de classes (86 tumor, 85 normal), proporções e dimensões. Não contém cortes de RM visíveis. | Não publicar até confirmar termos aplicáveis a estatísticas derivadas e revisar a proveniência. |
| `eda_pixel_distribution.png` | Visual | Histogramas agregados de intensidade por classe; não contém cortes de RM visíveis. | Não publicar até confirmar termos aplicáveis a estatísticas derivadas e revisar a proveniência. |
| `evaluation_comparison.png` | Visual | Curvas de treino/validação, matrizes de confusão, ROC e comparação de métricas. Não contém cortes de RM visíveis. | Manter em revisão científica e de proveniência; não publicar como evidência clínica. |
| `augmentation_preview.png` | Visual | Reproduz diretamente imagens de ressonância e versões transformadas. | **Não publicar** enquanto não houver autorização de redistribuição. |
| `eda_samples.png` | Pendente | O conteúdo binário não pôde ser inspecionado nesta revisão. | Não publicar. |
| `gradcam_visualization.png` | Pendente | O conteúdo binário não pôde ser inspecionado nesta revisão. | Não publicar. |

## Verificações científicas necessárias

- A análise exploratória reporta 171 imagens: 86 da classe tumor e 85 da classe normal.
- A comparação reporta, no CSV, CNN Baseline: acurácia 0,6154 e ROC-AUC 0,6243; EfficientNetB3 (TL): acurácia 0,8846 e ROC-AUC 0,9556.
- As matrizes de confusão exibidas na figura somam 52 observações por modelo. A relação entre esse conjunto, a divisão treino/validação/teste e as métricas do CSV deve ser documentada antes de qualquer divulgação.
- Não há validação externa documentada. O tamanho reduzido e a origem do dataset limitam a generalização.
- Grad-CAM, mesmo quando inspecionado, deve ser apresentado como visualização exploratória e não como prova de raciocínio clínico do modelo.

## Política de publicação

1. Nenhum ativo desta auditoria foi adicionado a `dashboard/public` ou ao manifesto `dashboard/public/data/visuals.json`.
2. A licença MIT do repositório não concede direitos sobre as imagens do dataset nem sobre materiais de terceiros.
3. Figuras que reproduzem exames, inclusive transformações e mapas de saliência sobrepostos, permanecem bloqueadas até confirmação explícita dos direitos de redistribuição.
4. Gráficos agregados também permanecem em revisão até documentar a origem dos dados e verificar os termos aplicáveis à publicação de resultados derivados.
5. A galeria deve continuar exibindo somente itens com `approved_for_publication: true`, após revisão de origem, licença, privacidade, proveniência e contexto científico.

## Próximas ações

- Inspecionar `eda_samples.png` e `gradcam_visualization.png` localmente ou por upload.
- Documentar a divisão dos dados e a origem exata das métricas.
- Confirmar os termos do dataset com a fonte/titular.
- Para demonstrar interatividade sem depender desses direitos, criar assets sintéticos originais, claramente rotulados como sintéticos, em trilha separada dos resultados reais.
