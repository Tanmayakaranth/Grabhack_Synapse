import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const OrderPlacedScreen = () => {
  const [prepTime, setPrepTime] = useState(20); // Initial simulated prep time
  const [orderStatus, setOrderStatus] = useState('on-track'); // 'on-track' or 'delayed'
  const prepTimeThreshold = 30; // Time in minutes to trigger a "delayed" alert
  const originalETA = '3:45 PM';

  useEffect(() => {
    // Simulating continuous monitoring
    const interval = setInterval(() => {
      setPrepTime(prevTime => {
        const newTime = prevTime + 5;
        if (newTime >= prepTimeThreshold) {
          setOrderStatus('delayed');
        }
        return newTime;
      });
    }, 5000); // Check every 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const renderOnTrackView = () => (
    <View style={styles.statusCard}>
      <Ionicons name="checkmark-circle-outline" size={50} color="#8b5cf6" style={styles.icon} />
      <Text style={styles.statusTitle}>Order on Track</Text>
      <Text style={styles.statusDescription}>
        The restaurant is preparing your order.
        <Text style={styles.boldText}> Your estimated delivery is {originalETA}.</Text>
      </Text>
    </View>
  );

  const renderDelayedView = () => (
    <View style={styles.alertContainer}>
      <Ionicons name="alert-circle-outline" size={30} color="#8b5cf6" />
      <Text style={styles.alertTitle}>Alert: Potential Delay</Text>
      <Text style={styles.alertText}>
        The restaurant's prep time is longer than expected. We've automatically adjusted your ETA.
      </Text>
      <Text style={styles.newETAText}>New Estimated Time: 4:15 PM</Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => { /* Logic to contact support */ }}
      >
        <Text style={styles.optionButtonText}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Order Placed</Text>
          <Text style={styles.description}>
            Monitor and update order status in real time.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          {orderStatus === 'on-track' && renderOnTrackView()}
          {orderStatus === 'delayed' && renderDelayedView()}
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
    color: '#8b5cf6',
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
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  statusDescription: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  alertContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  alertText: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  newETAText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default OrderPlacedScreen;
