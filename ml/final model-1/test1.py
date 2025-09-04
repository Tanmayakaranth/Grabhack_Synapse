import joblib
import pandas as pd

# ---------------- Load model, features, and defaults ----------------
model = joblib.load("delivery_eta_clean.pkl")
features = joblib.load("features_clean.pkl")
defaults = joblib.load("defaults_clean.pkl")

print("✅ Model, Features, and Defaults loaded")

# ---------------- Hardcoded Input ----------------
test_input = {
    "distance_km": 5,            # numeric
    '''"weather": "Clear",          # categorical'''
    "traffic_level": "Low",     # categorical
    "time_of_day": "Evening",    # categorical
    "preparation_time_min": 20,  # numeric
    "queue_length": 3            # numeric
}

# ---------------- Fill missing values with defaults ----------------
df_test = pd.DataFrame([test_input])

for col in features:
    if col not in df_test.columns:
        if col in defaults["numeric"]:
            df_test[col] = defaults["numeric"][col]
            print(f"⚠️ Missing numeric column {col} → filled with {defaults['numeric'][col]}")
        elif col in defaults["categorical"]:
            df_test[col] = defaults["categorical"][col]
            print(f"⚠️ Missing categorical column {col} → filled with {defaults['categorical'][col]}")
        else:
            df_test[col] = 0

# Reorder
df_test = df_test[features]

# ---------------- Predict ----------------
prediction = model.predict(df_test)

print("\n🛵 Predicted Delivery Time (minutes):", round(prediction[0], 2))
