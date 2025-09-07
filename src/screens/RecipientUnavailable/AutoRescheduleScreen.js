import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const AutoRescheduleScreen = () => {
  const [rescheduleOption, setRescheduleOption] = useState(null); // 'auto' or 'manual'
  const [rescheduledTime, setRescheduledTime] = useState(null);

  const handleAutoReschedule = () => {
    setRescheduleOption('auto');
    // Simulate fetching a new time from an AI model
    const newTime = "Today, 4:00 PM - 5:00 PM";
    setRescheduledTime(newTime);
  };

  const handleManualReschedule = () => {
    setRescheduleOption('manual');
    setRescheduledTime(null);
  };

  const missedOrderDetails = {
    orderNumber: 'ORD-789012',
    deliveryTime: '2:15 PM',
    deliveryDate: 'July 15, 2024',
    item: 'Valuable Package'
  };

  return (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Delivery Attempt Failed</Text>
          <Text style={styles.description}>
            We were unable to deliver your package as you were unavailable at the scheduled time.
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Missed Order Details:</Text>
            <View style={styles.infoItem}>
              <Ionicons name="cube-outline" size={20} color="#f59e0b" />
              <Text style={styles.infoText}>Item: {missedOrderDetails.item}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={20} color="#f59e0b" />
              <Text style={styles.infoText}>Order Number: {missedOrderDetails.orderNumber}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color="#f59e0b" />
              <Text style={styles.infoText}>Missed Time: {missedOrderDetails.deliveryTime} on {missedOrderDetails.deliveryDate}</Text>
            </View>
          </View>
          
          <View style={styles.rescheduleOptions}>
            <Text style={styles.optionsTitle}>What would you like to do next?</Text>
            <TouchableOpacity style={styles.optionButton} onPress={handleAutoReschedule}>
              <Text style={styles.optionButtonText}>Opt for Auto Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={handleManualReschedule}>
              <Text style={styles.optionButtonText}>Reschedule Manually Later</Text>
            </TouchableOpacity>
          </View>

          {rescheduleOption === 'auto' && (
            <View style={styles.rescheduleResultCard}>
              <Text style={styles.rescheduleResultTitle}>Reschedule Confirmed</Text>
              <Text style={styles.rescheduleResultText}>
                The AI has found the best available delivery slot for you.
              </Text>
              <Text style={styles.rescheduledTimeText}>New Time: {rescheduledTime}</Text>
            </View>
          )}

          {rescheduleOption === 'manual' && (
            <View style={styles.rescheduleResultCard}>
              <Text style={styles.rescheduleResultTitle}>Manual Reschedule</Text>
              <Text style={styles.rescheduleResultText}>
                You have chosen to reschedule manually. We will notify you to select a new time later.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f59e0b',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#e5e7eb',
    marginLeft: 10,
  },
  rescheduleOptions: {
    alignItems: 'center',
    marginBottom: 20,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  rescheduleResultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  rescheduleResultTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  rescheduleResultText: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
    lineHeight: 20,
  },
  rescheduledTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default AutoRescheduleScreen;
