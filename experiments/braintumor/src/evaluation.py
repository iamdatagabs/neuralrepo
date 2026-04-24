import numpy as np
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, auc


def evaluate_model(model, dataset):
    y_true = np.concatenate([y for _, y in dataset], axis=0)
    y_proba = model.predict(dataset).flatten()
    y_pred = (y_proba >= 0.5).astype(int)

    report = classification_report(y_true, y_pred, output_dict=True)

    fpr, tpr, _ = roc_curve(y_true, y_proba)

    metrics = {
        "accuracy": report["accuracy"],
        "precision": report["1"]["precision"],
        "recall": report["1"]["recall"],
        "f1": report["1"]["f1-score"],
        "roc_auc": auc(fpr, tpr),
        "confusion_matrix": confusion_matrix(y_true, y_pred)
    }

    return metrics
