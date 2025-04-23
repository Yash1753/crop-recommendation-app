# 🌱 Crop Recommendation App

A full‑stack web application that predicts the best crop for given **temperature, humidity, and soil‑moisture** values.

| Layer      | Tech                                                         |
|------------|--------------------------------------------------------------|
| Frontend   | React 18 · Vite · Tailwind CSS · lucide‑react icons          |
| Backend    | Flask · TensorFlow (pre‑trained Keras model)                 |
| CI / CD    | Docker · GitHub Actions · Docker Hub                         |

---

## ✨ Features
- Upload a **CSV** (`temp, humidity, soil moisture`) from the browser.
- Backend loads `your_model.h5`, decodes class indices to crop names via `LabelEncoder`.
- Beautiful Tailwind UI with loading spinner & error handling.
- GitHub Actions automatically builds & pushes **frontend** and **backend** Docker images.

---
