from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import tensorflow as tf
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load TFLite model
interpreter = tf.lite.Interpreter(model_path="crop_recommendation_model.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Load LabelEncoder
with open("label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

# Load Scaler
with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    df = pd.read_csv(file)

    expected_cols = ["temperature", "humidity", "soil_moisture"]
    if not all(col in df.columns for col in expected_cols):
        return jsonify({"error": f"CSV must contain columns: {expected_cols}"}), 400

    inputs = df[expected_cols].values
    inputs = scaler.transform(inputs)

    predictions = []
    for input_row in inputs:
        input_data = np.array([input_row], dtype=np.float32)
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output = interpreter.get_tensor(output_details[0]['index'])
        predicted_index = np.argmax(output)
        predicted_label = label_encoder.inverse_transform([predicted_index])[0]
        predictions.append(predicted_label)

    return jsonify({"predictions": predictions})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
