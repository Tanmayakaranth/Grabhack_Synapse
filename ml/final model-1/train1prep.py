import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer, TransformedTargetRegressor
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

CSV = "Food_Delivery_Times_with_hour_updated.csv"
data = pd.read_csv(CSV)
data.columns = data.columns.str.strip().str.lower().str.replace(" ", "_")

# Features & Target
features = [
    "weather", "traffic_level", "time_of_day",
    "preparation_time_min", "queue_length", "distance_km"
]
target = "delivery_time_min"

# Handle missing
for col in ["weather", "traffic_level", "time_of_day"]:
    mode_val = data[col].mode(dropna=True)[0]
    data[col].fillna(mode_val, inplace=True)

# Clip outliers at 120
data[target] = np.clip(data[target], None, 120)

X = data[features].copy()
y = data[target].copy()

# Save defaults for test-time filling
num_cols = ["preparation_time_min", "queue_length", "distance_km"]
cat_cols = ["weather", "traffic_level", "time_of_day"]

num_defaults = {c: float(X[c].median()) for c in num_cols}
cat_defaults = {c: X[c].mode().iloc[0] for c in cat_cols}
defaults = {"numeric": num_defaults, "categorical": cat_defaults}

# Pipelines
numeric_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])
categorical_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])
preprocessor = ColumnTransformer([
    ("num", numeric_transformer, num_cols),
    ("cat", categorical_transformer, cat_cols),
])

gbr = GradientBoostingRegressor(
    loss="huber", learning_rate=0.08, n_estimators=300,
    max_depth=3, random_state=42
)

model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", TransformedTargetRegressor(
        regressor=gbr, func=np.log1p, inverse_func=np.expm1
    ))
])

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)

# Eval
pred = model.predict(X_test)
mae = mean_absolute_error(y_test, pred)
rmse = np.sqrt(mean_squared_error(y_test, pred))
r2 = r2_score(y_test, pred)
baseline = np.full_like(y_test, y_train.median(), dtype=float)
baseline_mae = mean_absolute_error(y_test, baseline)

print("\n📊 Evaluation")
print(f"MAE : {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"R²  : {r2:.2f}")
print(f"Baseline (median) MAE: {baseline_mae:.2f}")

# Save
joblib.dump(model, "delivery_eta_clean.pkl")
joblib.dump(features, "features_clean.pkl")
joblib.dump(defaults, "defaults_clean.pkl")
print("\n✅ Saved: delivery_eta_clean.pkl, features_clean.pkl, defaults_clean.pkl")
