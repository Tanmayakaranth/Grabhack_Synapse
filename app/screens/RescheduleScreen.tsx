// app/screens/RescheduleScreen.tsx

import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

// Import the service functions from your new fetch-based orderService file.
import { confirmReschedule, getFailedOrders } from '@/services/orderService';

// Define the Order interface for type safety
interface Order {
  _id: string;
  orderNumber: string;
  recipient: { name: string };
  address: { lat: number; lng: number };
  status: string;
  scheduledSlot: { start: string; end: string };
  reschedule?: {
    suggestion?: { start: string; end: string };
    autoConfirmed?: boolean;
    createdAt?: string;
  };
}

export default function RescheduleScreen() {
  const [failedOrders, setFailedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch failed orders using the service module
  const fetchFailedOrders = async () => {
    setLoading(true);
    try {
      const data = await getFailedOrders();
      setFailedOrders(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch failed orders. Please check your network connection and server status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFailedOrders();
  }, []);

  const handleReschedule = async (order: Order) => {
    if (!order.reschedule?.suggestion) {
      Alert.alert('Error', 'No reschedule suggestion available for this order.');
      return;
    }

    try {
      const result = await confirmReschedule(order._id, order.reschedule.suggestion);

      if (result) {
        Alert.alert('Success', `Order ${order.orderNumber} rescheduled successfully! ✅`);
        fetchFailedOrders();
      } else {
        Alert.alert('Failed', `Could not reschedule order ${order.orderNumber}.`);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Network error while rescheduling. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading failed orders...</Text>
      </View>
    );
  }

  if (failedOrders.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noOrdersText}>No failed orders 🎉</Text>
        <Button title="Refresh" onPress={fetchFailedOrders} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {failedOrders.map((order) => (
        <View key={order._id} style={styles.orderCard}>
          <Text style={styles.bold}>Order: {order.orderNumber}</Text>
          <Text>Recipient: {order.recipient?.name || 'N/A'}</Text>
          <Text>
            Original Slot: {new Date(order.scheduledSlot.start).toLocaleString()} →{' '}
            {new Date(order.scheduledSlot.end).toLocaleString()}
          </Text>

          {order.reschedule?.suggestion ? (
            <View style={styles.rescheduleSuggestionContainer}>
              <Text style={styles.bold}>Reschedule Suggested:</Text>
              <Text>
                {new Date(order.reschedule.suggestion.start).toLocaleString()} →{' '}
                {new Date(order.reschedule.suggestion.end).toLocaleString()}
              </Text>
            </View>
          ) : (
            <Text style={{ fontStyle: 'italic', color: '#888' }}>No reschedule suggestion available</Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              title="Confirm Reschedule"
              onPress={() => handleReschedule(order)}
              disabled={!order.reschedule?.suggestion}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  orderCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  bold: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rescheduleSuggestionContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  noOrdersText: {
    fontSize: 18,
    marginBottom: 10,
  },
});