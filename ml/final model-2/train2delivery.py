import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from math import radians, cos, sin, asin, sqrt
import joblib

# ============================
# Load dataset
# ============================
df2 = pd.read_csv("train.csv")

# Clean target
df2["Time_taken(min)"] = df2["Time_taken(min)"].str.extract("(\d+)").astype(float)

# ============================
# Haversine distance function
# ============================
def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon, dlat = lon2 - lon1, lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1)*cos(lat2)*sin(dlon/2)**2
    return 6371 * 2 * asin(sqrt(a))  # km

df2["distance_km"] = df2.apply(
    lambda row: haversine(
        row["Restaurant_longitude"], row["Restaurant_latitude"],
        row["Delivery_location_longitude"], row["Delivery_location_latitude"]
    ), axis=1
)

# Extract pickup hour
df2["Order_picked_hour"] = pd.to_datetime(
    df2["Time_Order_picked"], format="%H:%M:%S", errors="coerce"
).dt.hour

# ============================
# Default values for missing
# ============================
df2["Road_traffic_density"].fillna("Medium", inplace=True)
df2["City"].fillna("Urban", inplace=True)
df2["multiple_deliveries"].fillna(1, inplace=True)

# ============================
# Select features (NO Weather)
# ============================
X = df2[["distance_km", "Delivery_person_Ratings", "Order_picked_hour",
         "Road_traffic_density", "Type_of_vehicle", "multiple_deliveries", "City"]]
y = df2["Time_taken(min)"]

# Numeric and categorical columns
numeric_features = ["distance_km", "Delivery_person_Ratings", "Order_picked_hour"]
categorical_features = ["Road_traffic_density", "Type_of_vehicle", "multiple_deliveries", "City"]

# ============================
# Preprocessing
# ============================
numeric_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="median"))
])

categorical_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="constant", fill_value="Unknown")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features)
    ]
)

# ============================
# Final pipeline
# ============================
model2 = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", GradientBoostingRegressor(
        n_estimators=200, learning_rate=0.1, random_state=42))
])

# ============================
# Train-test split
# ============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train
model2.fit(X_train, y_train)

# Evaluate
preds = model2.predict(X_test)
print("Model 2 MAE:", mean_absolute_error(y_test, preds))

# ============================
# Save model + features
# ============================
features = [
    "distance_km", 
    "Delivery_person_Ratings", 
    "Order_picked_hour",
    "Road_traffic_density", 
    "Type_of_vehicle", 
    "multiple_deliveries", 
    "City"
]

joblib.dump(features, "features.pkl")
joblib.dump(preprocessor, "preprocessor.pkl")
joblib.dump(model2, "model2.pkl")

print("✅ Model saved with default handling for missing features.")
