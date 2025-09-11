import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const AtCheckoutScreen = () => {
  const [currentWaitTime, setCurrentWaitTime] = useState(45); // Simulated wait time
  const [actionTaken, setActionTaken] = useState(null); // 'switched' or 'proceeded'

  const waitTimeThreshold = 30; // Minutes
  const isLongWait = currentWaitTime > waitTimeThreshold;

  const similarRestaurants = [
    { id: 1, name: 'Taco Emporium', prepTime: 15 },
    { id: 2, name: 'Burger Barn', prepTime: 20 },
    { id: 3, name: 'Pizza Place', prepTime: 25 },
  ];

  const renderInitialView = () => (
    <>
      <View style={styles.infoCard}>
        <Ionicons name="timer-outline" size={50} color="#8b5cf6" style={styles.icon} />
        <Text style={styles.infoTitle}>Current Wait Time</Text>
        <Text style={styles.infoText}>
          The estimated wait time for this restaurant is
          <Text style={styles.boldText}> {currentWaitTime} minutes.</Text>
        </Text>
      </View>

      {isLongWait && (
        <View style={styles.alertContainer}>
          <Ionicons name="alert-circle-outline" size={30} color="#8b5cf6" />
          <Text style={styles.alertTitle}>Alert</Text>
          <Text style={styles.alertText}>
            This restaurant has a long wait time. Would you like to switch to a faster option?
          </Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setActionTaken('switched')}
          >
            <Text style={styles.optionButtonText}>Switch to a faster restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButtonSecondary}
            onPress={() => setActionTaken('proceeded')}
          >
            <Text style={styles.optionButtonTextSecondary}>Proceed with this order</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isLongWait && (
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Looks like there is no wait time issue. Your order will be placed soon.
          </Text>
        </View>
      )}
    </>
  );

  const renderSwitchedView = () => (
    <View style={styles.switchedContainer}>
      <Ionicons name="swap-horizontal" size={50} color="#8b5cf6" style={styles.icon} />
      <Text style={styles.switchedTitle}>Finding faster options...</Text>
      <Text style={styles.switchedDescription}>
        We found these similar restaurants with estimated shorter wait times for similar order.
      </Text>
      {similarRestaurants.map((restaurant) => (
        <TouchableOpacity key={restaurant.id} style={styles.restaurantButton}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantTime}>{restaurant.prepTime} min wait</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setActionTaken(null)} style={styles.backButton}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="#8b5cf6" />
        <Text style={styles.backButtonText}>Back to options</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProceededView = () => (
    <View style={styles.proceededContainer}>
      <Ionicons name="checkmark-circle-outline" size={50} color="#8b5cf6" style={styles.icon} />
      <Text style={styles.proceededTitle}>Order Confirmed</Text>
      <Text style={styles.proceededDescription}>
        You have chosen to proceed. Your order will now be placed.
      </Text>
      <TouchableOpacity onPress={() => setActionTaken(null)} style={styles.backButton}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="#8b5cf6" />
        <Text style={styles.backButtonText}>Back to options</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>At Checkout</Text>
         
        </View>
        <View style={styles.contentContainer}>
          {actionTaken === 'switched' && renderSwitchedView()}
          {actionTaken === 'proceeded' && renderProceededView()}
          {actionTaken === null && renderInitialView()}
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
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
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
  optionButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionButtonSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8b5cf6',
    width: '100%',
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  optionButtonTextSecondary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  // Switched View Styles
  switchedContainer: {
    alignItems: 'center',
  },
  switchedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
  },
  switchedDescription: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 20,
  },
  restaurantButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  restaurantTime: {
    fontSize: 14,
    color: '#8b5cf6',
  },
  // Proceeded View Styles
  proceededContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  proceededTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  proceededDescription: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
    marginTop: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#8b5cf6',
    marginLeft: 5,
  },
});

export default AtCheckoutScreen;
