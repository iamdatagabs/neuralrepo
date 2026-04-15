# Dataset

This project uses the **Nigeria Chest X-Ray Dataset**.

Due to size and licensing restrictions, the dataset is NOT included in this repository.

## Download

Please download the dataset from Kaggle:

https://www.kaggle.com/datasets/aminumusa/nigeria-chest-x-ray-dataset

You will need a Kaggle account and API key.

## How to download via Kaggle API

```bash
pip install kaggle

mkdir -p ~/.kaggle
cp kaggle.json ~/.kaggle/
chmod 600 ~/.kaggle/kaggle.json

kaggle datasets download -d aminumusa/nigeria-chest-x-ray-dataset
unzip nigeria-chest-x-ray-dataset.zip -d data/raw/
