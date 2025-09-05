import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DeliveryDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Delivery</Text>
      <Text>Status: In Transit</Text>
      <Button title="Reschedule" onPress={() => navigation.navigate("Reschedule")} />
      <Button title="Reroute" onPress={() => alert("Reroute API called")} />
      <Button title="Trusted Handover" onPress={() => alert("Handover API called")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" }
});
