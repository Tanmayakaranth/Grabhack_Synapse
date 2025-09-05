import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function SmartAlerts({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Alerts</Text>
      <Text>⚠️ Order delayed by 20 mins</Text>
      <Button title="Reorder" onPress={() => alert("Reorder API called")} />
      <Button title="Cancel" onPress={() => alert("Cancel API called")} />
      <Button title="Compensation" onPress={() => alert("Compensation API called")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" }
});
