/*import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_BASE = "http://192.168.0.151:5001"; // same as PreOrderScreen

const AtCheckoutScreen = () => {
  const route = useRoute();
  const { restaurantId, restaurantName, items } = route.params;

  const [eta, setEta] = useState(null);
  const [actionTaken, setActionTaken] = useState(null);
  const [similarRestaurants, setSimilarRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`${API_BASE}/restaurant/${restaurantId}`);
        const data = await res.json();
        if (data.error) {
          Alert.alert("Error", data.error);
          return;
        }
        setEta(data.eta);

        // Find faster options if available
        const fasterOptions = [];
        data.better_option && fasterOptions.push(data.better_option);
        setSimilarRestaurants(fasterOptions);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Could not fetch restaurant details.");
      }
    };
    fetchRestaurant();
  }, [restaurantId]);

  const isLongWait = eta && eta > 30;

  return (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}>{restaurantName}</Text>
        <Text style={styles.description}>Selected Items: {items.join(", ")}</Text>

        {eta !== null && (
          <View style={styles.infoCard}>
            <Ionicons name="timer-outline" size={50} color="#8b5cf6" />
            <Text style={styles.infoTitle}>ETA</Text>
            <Text style={styles.infoText}>{eta.toFixed(1)} minutes</Text>
          </View>
        )}

        {isLongWait && similarRestaurants.length > 0 && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>Long wait! Faster options available:</Text>
            {similarRestaurants.map(r => (
              <TouchableOpacity key={r.id} style={styles.optionButton} onPress={() => Alert.alert("Switching not implemented yet")}>
                <Text style={styles.optionButtonText}>{r.name} ({r.eta.toFixed(1)} min)</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!isLongWait && (
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Your order will be placed shortly.</Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { paddingVertical: 40, paddingHorizontal: 20 },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: '#8b5cf6', marginBottom: 8, textAlign: 'center' },
  description: { fontSize: 16, color: '#9ca3af', textAlign: 'center', marginBottom: 20 },
  infoCard: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 20, padding: 20, alignItems: 'center', marginBottom: 20 },
  infoTitle: { fontSize: 20, fontWeight: '600', color: '#fff', marginBottom: 10 },
  infoText: { fontSize: 16, color: '#e5e7eb', textAlign: 'center' },
  alertContainer: { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderRadius: 20, padding: 20, marginBottom: 20 },
  alertTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  optionButton: { backgroundColor: '#8b5cf6', padding: 12, borderRadius: 10, marginBottom: 10 },
  optionButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});

export default AtCheckoutScreen;*/
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AtCheckoutScreen({ route, navigation }) {
  const { restaurantId, restaurantName, items, eta } = route.params;

  const [confirmed, setConfirmed] = useState(false);

  const handlePlaceOrder = () => {
    Alert.alert(
      "Confirm Order",
      "Do you really want to place the order?",
      [
        {
          text: "No",
          onPress: () => navigation.navigate("PreOrderScreen"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setConfirmed(true);
            navigation.navigate("OrderPlacedScreen", {
              restaurantId,
              restaurantName,
              items,
              eta,
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <LinearGradient colors={["#1e293b", "#334155"]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}>At Checkout</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Restaurant: {restaurantName}</Text>
          <Text style={styles.infoText}>Items: {items.join(", ")}</Text>
          <Text style={styles.infoText}>
            ETA: {eta !== undefined && eta !== null ? eta.toFixed(1) : "N/A"} min
          </Text>
        </View>

        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>

        {confirmed && (
          <View style={styles.confirmationCard}>
            <Text style={styles.confirmationText}>Order Confirmed! Redirecting...</Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { padding: 20 },
  mainTitle: { fontSize: 28, fontWeight: "bold", color: "#8b5cf6", textAlign: "center", marginBottom: 20 },
  infoCard: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 20, padding: 20, marginBottom: 20 },
  infoText: { fontSize: 16, color: "#e5e7eb", marginBottom: 8 },
  placeOrderButton: { backgroundColor: "#8b5cf6", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  placeOrderText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  confirmationCard: { marginTop: 20, padding: 15, borderRadius: 10, backgroundColor: "rgba(0,255,0,0.2)", alignItems: "center" },
  confirmationText: { color: "#00ff00", fontWeight: "bold", fontSize: 16 },
});