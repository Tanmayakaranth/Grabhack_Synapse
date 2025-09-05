import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function RescheduleScreen() {
  const [date, setDate] = useState(new Date());

  const handleConfirm = () => {
    alert("Reschedule API called with " + date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reschedule Delivery</Text>
      <DateTimePicker value={date} mode="datetime" onChange={(e, d) => setDate(d)} />
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" }
});
