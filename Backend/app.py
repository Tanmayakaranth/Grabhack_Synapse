'''from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load ML model
model_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../ml/final model-1/delivery_eta_clean.pkl")
)
model = joblib.load(model_path)

# In-memory states for two restaurants
restaurants = {
    "R1": {
        "name": "Spice Hub",
        "queue_length": 5,
        "preparation_time_min": 15,
        "distance_km": 2.5
    },
    "R2": {
        "name": "Urban Eats",
        "queue_length": 5,
        "preparation_time_min": 30,
        "distance_km": 1.8
    }
}

# Return restaurant list (only public info: name + distance)
@app.route("/restaurants", methods=["GET"])
def get_restaurants():
    public_data = {
        rid: {"name": r["name"], "distance_km": r["distance_km"]}
        for rid, r in restaurants.items()
    }
    return jsonify(public_data)

# Update state for a restaurant
@app.route("/update_order_state/<rest_id>", methods=["POST"])
def update_state(rest_id):
    if rest_id not in restaurants:
        return jsonify({"error": "Invalid restaurant ID"}), 404
    
    data = request.get_json()
    restaurants[rest_id].update(data)
    return jsonify({
        "message": f"State updated for {restaurants[rest_id]['name']}",
        "state": restaurants[rest_id]
    })

# Predict ETA for selected restaurant + compare with others
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    rest_id = data["restaurant_id"]

    if rest_id not in restaurants:
        return jsonify({"error": "Invalid restaurant ID"}), 404

    chosen = restaurants[rest_id]

    # ETA for chosen restaurant
    df = pd.DataFrame([{
        "weather": data.get("weather", 1),
        "traffic_level": data.get("traffic_level", 2),
        "time_of_day": data.get("time_of_day", 1),
        "preparation_time_min": chosen["preparation_time_min"],
        "queue_length": chosen["queue_length"],
        "distance_km": chosen["distance_km"]
    }])
    chosen_eta = float(model.predict(df)[0])

    # Compare with others
    suggestion = None
    best_eta = chosen_eta
    for other_id, other in restaurants.items():
        if other_id == rest_id:
            continue
        df_other = pd.DataFrame([{
            "weather": data.get("weather", 1),
            "traffic_level": data.get("traffic_level", 2),
            "time_of_day": data.get("time_of_day", 1),
            "preparation_time_min": other["preparation_time_min"],
            "queue_length": other["queue_length"],
            "distance_km": other["distance_km"]
        }])
        other_eta = float(model.predict(df_other)[0])
        if other_eta < best_eta:
            best_eta = other_eta
            suggestion = {
                "better_restaurant": other["name"],
                "better_eta": other_eta
            }

    return jsonify({
        "restaurant": chosen["name"],
        "eta": chosen_eta,
        "suggestion": suggestion
    })

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "API is running"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)'''

from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load ML model (fallback if fails)
model_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../ml/final model-1/delivery_eta_clean.pkl")
)
model = None
try:
    model = joblib.load(model_path)
except Exception as e:
    print("⚠️ Could not load model. Using fallback ETA. Error:", e)

# Dummy restaurants
restaurants = [
    {
        "id": 1,
        "name": "Spice Hub",
        "queue_length": 5,
        "preparation_time_min": 15,
        "distance_km": 2.5,
        "menu": ["Paneer Tikka", "Butter Naan", "Biryani"]
    },
    {
        "id": 2,
        "name": "Grill House",
        "queue_length": 3,
        "preparation_time_min": 10,
        "distance_km": 3.0,
        "menu": ["Burger", "Fries", "Coke", "Wrap"]
    },
    {
        "id": 3,
        "name": "Taco Town",
        "queue_length": 2,
        "preparation_time_min": 12,
        "distance_km": 3.5,
        "menu": ["Taco", "Nachos", "Burrito"]
    }
]

def calculate_eta(rest):
    """Use ML model if available, else fallback heuristic."""
    if model:
        df = pd.DataFrame([{
            "weather": 1,
            "traffic_level": 2,
            "time_of_day": 1,
            "preparation_time_min": rest["preparation_time_min"],
            "queue_length": rest["queue_length"],
            "distance_km": rest["distance_km"]
        }])
        return float(model.predict(df)[0])
    else:
        # fallback: (queue-1)*prep + distance*2
        return float(max(rest["queue_length"] - 1, 0) * rest["preparation_time_min"] + rest["distance_km"] * 2)

@app.route("/restaurants", methods=["GET"])
def get_restaurants():
    return jsonify([
        {"id": r["id"], "name": r["name"], "distance_km": r["distance_km"]}
        for r in restaurants
    ])

@app.route("/restaurant/<int:rest_id>", methods=["GET"])
def get_restaurant(rest_id):
    selected = next((r for r in restaurants if r["id"] == rest_id), None)
    if not selected:
        return jsonify({"error": "Restaurant not found"}), 404

    selected_eta = calculate_eta(selected)

    # Check for a faster option
    better_option = None
    for r in restaurants:
        if r["id"] != rest_id:
            other_eta = calculate_eta(r)
            if other_eta < selected_eta:
                better_option = {
                    "id": r["id"],
                    "name": r["name"],
                    "eta": other_eta
                }

    return jsonify({
        "id": selected["id"],
        "name": selected["name"],
        "eta": selected_eta,
        "better_option": better_option,
        "menu": selected["menu"]
    })

@app.route("/similar-restaurants", methods=["GET"])
def get_similar_restaurants():
    result = []
    for r in restaurants:
        eta = calculate_eta(r)
        result.append({"id": r["id"], "name": r["name"], "prepTime": eta})
    return jsonify(result)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "API is running"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
