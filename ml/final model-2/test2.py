import pandas as pd
import joblib
from math import radians, cos, sin, asin, sqrt

# ============================
# Load saved artifacts
# ============================
model = joblib.load("model2.pkl")
preprocessor = joblib.load("preprocessor.pkl")
features = joblib.load("features.pkl")

# ============================
# Define helper functions
# ============================
def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon, dlat = lon2 - lon1, lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1)*cos(lat2)*sin(dlon/2)**2
    return 6371 * 2 * asin(sqrt(a))  # km

# ============================
# Load test data
# ============================
df_test = pd.read_csv("test.csv")

# Calculate distance
df_test["distance_km"] = df_test.apply(
    lambda row: haversine(
        row["Restaurant_longitude"], row["Restaurant_latitude"],
        row["Delivery_location_longitude"], row["Delivery_location_latitude"]
    ), axis=1
)

# Extract pickup hour
df_test["Order_picked_hour"] = pd.to_datetime(
    df_test["Time_Order_picked"], format="%H:%M:%S", errors="coerce"
).dt.hour

# ============================
# Ensure required features exist
# (fill defaults if missing)
# ============================
if "Road_traffic_density" not in df_test.columns:
    df_test["Road_traffic_density"] = "Medium"   # default

if "City" not in df_test.columns:
    df_test["City"] = "Urban"   # default

if "multiple_deliveries" not in df_test.columns:
    df_test["multiple_deliveries"] = 1   # default

# Drop weather (since we decided not to use it)
if "Weatherconditions" in df_test.columns:
    df_test = df_test.drop(columns=["Weatherconditions"])

# ============================
# Match training features
# ============================
X_test = df_test[features]

# Predict
predictions = model.predict(X_test)

# Save results
df_test["Predicted_Time_taken(min)"] = predictions
df_test.to_csv("test_predictions.csv", index=False)

print("✅ Predictions saved to test_predictions.csv")
