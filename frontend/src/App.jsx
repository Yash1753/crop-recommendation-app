import React, { useState } from "react";
import { Loader } from "lucide-react";

export default function App() {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPredictions([]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://crop-recommendation-app-backend.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setPredictions(result.predictions);
      } else {
        setError(result.error || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to fetch predictions. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-green shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-green-800">Crop Recommendation System</h1>
        <p className="text-sm text-gray-600">Upload a CSV file with temperature, humidity, and soil moisture to get recommended crops.</p>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file:border file:border-green-600 file:rounded-lg file:bg-white file:text-green-700 px-3 py-2 border rounded w-full"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
        >
          {loading ? <><Loader className="animate-spin mr-2" size={16} /> Predicting...</> : "Predict"}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {predictions.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold text-green-700">Predicted Crops:</h2>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {predictions.map((crop, index) => (
                <li key={index}>{crop}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}