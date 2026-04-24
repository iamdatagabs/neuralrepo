id="n3t8d4"
import os
import yaml
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split

import tensorflow as tf

from src.data_utils import build_dataset
from src.models import build_baseline, build_efficientnet
from src.evaluation import evaluate_model


# -----------------------------
# Load config
# -----------------------------
with open("configs/config.yaml", "r") as f:
    config = yaml.safe_load(f)

SEED = config["seed"]
np.random.seed(SEED)
tf.random.set_seed(SEED)


# -----------------------------
# Load dataset paths
# -----------------------------
DATA_DIR = Path(config["paths"]["data_dir"])

yes_dir = DATA_DIR / "brain_tumor_dataset" / "yes"
no_dir = DATA_DIR / "brain_tumor_dataset" / "no"

paths = []
labels = []

for p in yes_dir.glob("*.jpg"):
    paths.append(str(p))
    labels.append(1)

for p in no_dir.glob("*.jpg"):
    paths.append(str(p))
    labels.append(0)

df = pd.DataFrame({"path": paths, "label": labels})

# -----------------------------
# Split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    df["path"], df["label"],
    test_size=config["data"]["test_size"],
    stratify=df["label"],
    random_state=SEED
)

X_train, X_val, y_train, y_val = train_test_split(
    X_train, y_train,
    test_size=config["data"]["val_size"],
    stratify=y_train,
    random_state=SEED
)

# -----------------------------
# Build datasets
# -----------------------------
train_ds = build_dataset(X_train, y_train, augment=True, shuffle=True)
val_ds = build_dataset(X_val, y_val)
test_ds = build_dataset(X_test, y_test)

# -----------------------------
# Model selection
# -----------------------------
if config["model"]["name"] == "baseline":
    model = build_baseline()

elif config["model"]["name"] == "efficientnet":
    model, base = build_efficientnet()

else:
    raise ValueError("Modelo inválido")

# -----------------------------
# Train
# -----------------------------
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=config["training"]["epochs"]
)

# -----------------------------
# Fine-tuning (opcional)
# -----------------------------
if config["model"]["name"] == "efficientnet" and config["model"]["fine_tune"]:
    base.trainable = True

    for layer in base.layers[:-config["model"]["unfreeze_layers"]]:
        layer.trainable = False

    model.compile(
        optimizer=tf.keras.optimizers.Adam(1e-5),
        loss="binary_crossentropy",
        metrics=["accuracy", tf.keras.metrics.AUC(name="auc")]
    )

    model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=config["training"]["fine_tune_epochs"]
    )

# -----------------------------
# Evaluation
# -----------------------------
metrics = evaluate_model(model, test_ds)

print("\nRESULTADOS:")
for k, v in metrics.items():
    if k != "confusion_matrix":
        print(f"{k}: {v:.4f}")

# -----------------------------
# Save model
# -----------------------------
os.makedirs(config["paths"]["models_dir"], exist_ok=True)

model.save(
    os.path.join(config["paths"]["models_dir"], "final_model.h5")
)

print("\nModelo salvo com sucesso!")
