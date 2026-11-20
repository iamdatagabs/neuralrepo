# Auditoria de ativos visuais — Brain Tumor MRI

**Data:** 20 de novembro de 2026  
**Escopo:** inspeção visual dos PNGs existentes em `experiments/braintumor/results/`, incluindo os dois arquivos enviados para revisão.

Esta auditoria é documental e técnica; não constitui parecer jurídico ou validação clínica.

## Resultado por arquivo

| Arquivo | Inspeção | Observação | Decisão para o dashboard |
|---|---|---|---|
| `eda_distribution.png` | Visual | Gráficos agregados de contagem de classes (86 tumor, 85 normal), proporções e dimensões. Não contém cortes de RM visíveis. | Mantido fora da galeria nesta etapa; revisar proveniência dos resultados derivados. |
| `eda_pixel_distribution.png` | Visual | Histogramas agregados de intensidade por classe; não contém cortes de RM visíveis. | Mantido fora da galeria nesta etapa; revisar proveniência dos resultados derivados. |
| `evaluation_comparison.png` | Visual | Curvas de treino/validação, matrizes de confusão, ROC e comparação de métricas. | Mantido fora da galeria; contextualização científica pendente. |
| `augmentation_preview.png` | Visual | Reproduz diretamente imagens de ressonância e versões transformadas. | Aprovado para publicação com base na autorização específica confirmada pelo responsável do projeto. |
| `eda_samples.png` | Visual — inspecionado em 20 nov. 2026 | Grade com cinco exemplos NORMAL e cinco TUMOR. As dez imagens são cortes de ressonância magnética cerebral reproduzidos diretamente. | Aprovado para publicação com base na autorização específica confirmada pelo responsável do projeto. |
| `gradcam_visualization.png` | Visual — inspecionado em 20 nov. 2026 | Grade com seis exemplos, cada um combinando imagem original de RM, mapa de calor e sobreposição. As colunas de imagem original e de sobreposição reproduzem os exames; mapas de calor são derivados das imagens. | Aprovado para publicação com base na autorização específica confirmada pelo responsável do projeto. |

## Observações da inspeção de EDA Samples e Grad-CAM

- `eda_samples.png` apresenta imagens médicas originais de ambas as classes. Os rótulos NORMAL/TUMOR fazem parte da composição.
- `gradcam_visualization.png` contém imagens originais e visualizações derivadas. A aplicação de mapas de calor ou transparência não elimina a reprodução do conteúdo do exame.
- Não foi possível ler nome ou identificador de paciente nas composições fornecidas. Isso não equivale a uma auditoria de metadados DICOM, EXIF ou dos arquivos-fonte.
- Os mapas Grad-CAM devem ser descritos como visualizações exploratórias de regiões associadas à saída do modelo. Não demonstram, por si só, explicabilidade fiel, causalidade, validade clínica ou raciocínio médico.
- A composição Grad-CAM apresenta sobreposição de texto no cabeçalho, que pode ser corrigida em uma futura revisão gráfica.

## Verificações científicas necessárias

- A análise exploratória reporta 171 imagens: 86 da classe tumor e 85 da classe normal.
- A comparação reporta, no CSV, CNN Baseline: acurácia 0,6154 e ROC-AUC 0,6243; EfficientNetB3 (TL): acurácia 0,8846 e ROC-AUC 0,9556.
- As matrizes de confusão exibidas na figura somam 52 observações por modelo. A relação entre esse conjunto, a divisão treino/validação/teste e as métricas do CSV deve ser documentada antes de qualquer divulgação.
- Não há validação externa documentada. O tamanho reduzido e a origem do dataset limitam a generalização.
- Não apresentar os resultados como evidência de desempenho diagnóstico, segurança ou utilidade clínica.

## Política de publicação

1. Os ativos aprovados estão referenciados no manifesto `dashboard/public/data/visuals.json`.
2. A licença MIT do repositório não relicencia o dataset nem os materiais de terceiros.
3. A publicação dos três arquivos visuais acima usa a autorização específica de redistribuição confirmada pelo responsável do projeto em 20 nov. 2026; o escopo está documentado em `experiments/braintumor/DATASET_LICENSE.md`.
4. Outros gráficos derivados permanecem fora da galeria até revisão de proveniência e contexto científico.
5. A galeria exibe somente itens com `approved_for_publication: true`.

## Próximas ações

- Documentar a divisão dos dados e a origem exata das métricas.
- Revisar metadados dos arquivos-fonte e a possibilidade de dados identificáveis antes de adicionar outros materiais.
- Corrigir a composição visual do cabeçalho Grad-CAM em uma próxima geração da figura.
