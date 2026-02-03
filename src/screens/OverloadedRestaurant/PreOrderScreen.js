// screens/PreOrderScreen.js
/*import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";


const API_BASE = "http://192.168.0.151:5001"; // replace with your PC IP

export default function PreOrderScreen() {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [eta, setEta] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${API_BASE}/restaurants`);
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        Alert.alert("Error", "Could not fetch restaurants. Check API_BASE.");
      }
    };
    fetchRestaurants();
  }, []);

  const onRestaurantTap = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/restaurant/${id}`);
      const data = await res.json();
      if (data.error) {
        Alert.alert("Error", data.error);
        setLoading(false);
        return;
      }

      if (data.better_option) {
        Alert.alert(
          "Faster Option Found",
          `${data.better_option.name} can deliver faster (${data.better_option.eta.toFixed(1)} min). Continue with ${data.name}?`,
          [
            { text: "No, switch", onPress: () => handleAutoSwitch(data.better_option.id) },
            { text: "Yes, proceed", onPress: () => showRestaurant(data) },
          ]
        );
      } else {
        showRestaurant(data);
      }
    } catch (err) {
      console.error("Error fetching restaurant:", err);
      Alert.alert("Error", "Could not fetch restaurant details.");
    }
    setLoading(false);
  };

  const handleAutoSwitch = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/restaurant/${id}`);
      const data = await res.json();
      showRestaurant(data);
    } catch (err) {
      Alert.alert("Error", "Could not switch to faster restaurant.");
    }
  };

  const showRestaurant = (data) => {
    setSelectedId(data.id);
    setEta(data.eta);
    setMenu(data.menu);
    const initChecked = {};
    data.menu.forEach((m) => (initChecked[m] = false));
    setCheckedItems(initChecked);
  };

  const toggleItem = (item) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const goToCheckout = () => {
    const chosen = Object.entries(checkedItems)
      .filter(([_, v]) => v)
      .map(([k]) => k);
    if (chosen.length === 0) {
      Alert.alert("No items", "Please select at least one menu item.");
      return;
    }
    navigation.navigate("Checkout", {
      restaurantId: selectedId,
      restaurantName: restaurants.find((r) => r.id === selectedId)?.name,
      items: chosen,
    });
  };

  return (
    <LinearGradient colors={["#1e293b", "#334155"]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}>Choose a Restaurant</Text>
        <Text style={styles.description}>Tap to view ETA and menu</Text>

        {restaurants.map((rest) => (
          <TouchableOpacity key={rest.id} style={styles.card} onPress={() => onRestaurantTap(rest.id)}>
            <Ionicons name="restaurant-outline" size={36} color="#8b5cf6" />
            <Text style={styles.cardTitle}>{rest.name}</Text>
            <Text style={styles.stateText}>Distance: {rest.distance_km} km</Text>
            {selectedId === rest.id && loading && <ActivityIndicator size="small" color="#8b5cf6" />}
          </TouchableOpacity>
        ))}

        {eta !== null && !loading && (
          <View style={styles.resultCard}>
            <Text style={styles.result}>ETA: {eta.toFixed(1)} min</Text>
          </View>
        )}

        {menu.length > 0 && (
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Menu</Text>
            {menu.map((item, idx) => (
              <Checkbox.Item
                key={idx}
                label={item}
                status={checkedItems[item] ? "checked" : "unchecked"}
                onPress={() => toggleItem(item)}
                labelStyle={{ color: "#e5e7eb" }}
              />
            ))}
            <Button title="Proceed to Checkout" onPress={goToCheckout} />
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { padding: 20 },
  mainTitle: { fontSize: 26, fontWeight: "bold", color: "#8b5cf6", marginBottom: 8, textAlign: "center" },
  description: { fontSize: 14, color: "#9ca3af", textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#fff", marginTop: 6 },
  stateText: { fontSize: 14, color: "#ddd" },
  resultCard: { marginTop: 12, padding: 12, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.08)" },
  result: { fontSize: 16, color: "#fff", textAlign: "center" },
  menuContainer: { marginTop: 20, padding: 12, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.05)" },
  menuTitle: { fontSize: 20, fontWeight: "bold", color: "#8b5cf6", marginBottom: 10 },
});*/

// screens/PreOrderScreen.js
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";

const API_BASE = "http://192.168.0.151:5001"; // replace with your PC IP

export default function PreOrderScreen() {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [eta, setEta] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${API_BASE}/restaurants`);
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        Alert.alert("Error", "Could not fetch restaurants. Check API_BASE.");
      }
    };
    fetchRestaurants();
  }, []);

  const onRestaurantTap = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/restaurant/${id}`);
      const data = await res.json();
      if (data.error) {
        Alert.alert("Error", data.error);
        setLoading(false);
        return;
      }

      if (data.better_option) {
        Alert.alert(
          "Faster Option Found",
          `${data.better_option.name} can deliver faster (${data.better_option.eta.toFixed(1)} min). Continue with ${data.name}?`,
          [
            { text: "No, switch", onPress: () => handleAutoSwitch(data.better_option.id) },
            { text: "Yes, proceed", onPress: () => showRestaurant(data) },
          ]
        );
      } else {
        showRestaurant(data);
      }
    } catch (err) {
      console.error("Error fetching restaurant:", err);
      Alert.alert("Error", "Could not fetch restaurant details.");
    }
    setLoading(false);
  };

  const handleAutoSwitch = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/restaurant/${id}`);
      const data = await res.json();
      showRestaurant(data);
    } catch (err) {
      Alert.alert("Error", "Could not switch to faster restaurant.");
    }
  };

  const showRestaurant = (data) => {
    setSelectedId(data.id);
    setEta(data.eta);
    setMenu(data.menu);
    const initChecked = {};
    data.menu.forEach((m) => (initChecked[m] = false));
    setCheckedItems(initChecked);
  };

  const toggleItem = (item) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const goToCheckout = () => {
    const chosen = Object.entries(checkedItems)
      .filter(([_, v]) => v)
      .map(([k]) => k);
    if (chosen.length === 0) {
      Alert.alert("No items", "Please select at least one menu item.");
      return;
    }
    navigation.navigate("AtCheckout", {
      restaurantId: selectedId,
      restaurantName: restaurants.find((r) => r.id === selectedId)?.name,
      items: chosen,
      eta: eta,
    });
  };

  return (
    <LinearGradient colors={["#1e293b", "#334155"]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}>Choose a Restaurant</Text>
        <Text style={styles.description}>Tap to view ETA and menu</Text>

        {restaurants.map((rest) => (
          <TouchableOpacity key={rest.id} style={styles.card} onPress={() => onRestaurantTap(rest.id)}>
            <Ionicons name="restaurant-outline" size={36} color="#8b5cf6" />
            <Text style={styles.cardTitle}>{rest.name}</Text>
            <Text style={styles.stateText}>Distance: {rest.distance_km} km</Text>
            {selectedId === rest.id && loading && <ActivityIndicator size="small" color="#8b5cf6" />}
          </TouchableOpacity>
        ))}

        {eta !== null && !loading && (
          <View style={styles.resultCard}>
            <Text style={styles.result}>ETA: {eta.toFixed(1)} min</Text>
          </View>
        )}

        {menu.length > 0 && (
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Menu</Text>
            {menu.map((item, idx) => (
              <Checkbox.Item
                key={idx}
                label={item}
                status={checkedItems[item] ? "checked" : "unchecked"}
                onPress={() => toggleItem(item)}
                labelStyle={{ color: "#e5e7eb" }}
              />
            ))}
            <Button title="Proceed to Checkout" onPress={goToCheckout} />
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { padding: 20 },
  mainTitle: { fontSize: 26, fontWeight: "bold", color: "#8b5cf6", marginBottom: 8, textAlign: "center" },
  description: { fontSize: 14, color: "#9ca3af", textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#fff", marginTop: 6 },
  stateText: { fontSize: 14, color: "#ddd" },
  resultCard: { marginTop: 12, padding: 12, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.08)" },
  result: { fontSize: 16, color: "#fff", textAlign: "center" },
  menuContainer: { marginTop: 20, padding: 12, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.05)" },
  menuTitle: { fontSize: 20, fontWeight: "bold", color: "#8b5cf6", marginBottom: 10 },
});
