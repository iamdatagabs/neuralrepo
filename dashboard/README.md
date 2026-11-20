# NeuralRepo Research Dashboard

The dashboard is a read-only research interface for aggregate experiment artifacts. It is built with React, TypeScript and Vite and deployed through GitHub Pages.

## Local development

```bash
cd dashboard
npm install
npm run dev
```

## Export real experiment data

From the repository root:

```bash
python -m pip install pyyaml
python scripts/export_dashboard.py
```

The exporter reads aggregate `metrics.json` files and the curated `model_comparison.csv` benchmark. It deliberately does not publish patient-level records, predictions, medical images, DICOM files, checkpoints, raw telemetry or provenance details.

## Deployment

The workflow `.github/workflows/deploy-dashboard.yml` builds the dashboard and deploys it to GitHub Pages when relevant changes reach `main`. Enable GitHub Pages with **GitHub Actions** as the build and deployment source in repository settings.

The site URL will be `https://iamdatagabs.github.io/neuralrepo/`.
