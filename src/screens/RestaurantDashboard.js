import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function RestaurantDashboard({ navigation }) {
  const status = "Busy"; // mock from backend ML

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Status</Text>
      <Text>Current Load: {status}</Text>
      <Button title="Smart Alerts" onPress={() => navigation.navigate("Alerts")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" }
});
