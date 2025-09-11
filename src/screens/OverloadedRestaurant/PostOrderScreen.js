import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const PostOrderScreen = () => {
  const [isDelayed, setIsDelayed] = useState(false);
  const [actionTaken, setActionTaken] = useState(null);

  useEffect(() => {
    // Simulate a significant delay after 5 seconds to trigger the resolution options
    const delayTimer = setTimeout(() => {
      setIsDelayed(true);
    }, 5000); 

    return () => clearTimeout(delayTimer);
  }, []);

  const handleAction = (action) => {
    setActionTaken(action);
  };

  const renderActionButtons = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.optionsTitle}>Due to a significant delay, we offer the following options:</Text>
      
      <TouchableOpacity style={styles.optionButton} onPress={() => handleAction('wait')}>
        <Text style={styles.optionButtonText}>Keep Order and Wait</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.optionButton} onPress={() => handleAction('re_route_or_reorder')}>
        <Text style={styles.optionButtonText}>Re-route or Quick Reorder</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionButton, styles.cancelButton]} onPress={() => handleAction('cancel_with_compensation')}>
        <Text style={styles.optionButtonText}>Cancel Order with Compensation</Text>
      </TouchableOpacity>
    </View>
  );

  const renderConfirmation = () => {
    let title = '';
    let message = '';
    
    switch (actionTaken) {
      case 'wait':
        title = 'Order Confirmed';
        message = 'Thank you for your patience! We will continue to monitor your order and notify you of any updates.';
        break;
      case 're_route_or_reorder':
        title = 'Re-routing/Reorder Initiated';
        message = 'We are finding the best alternative for you, either by auto-shifting your order or helping you reorder from a similar, faster restaurant.';
        break;
      case 'cancel_with_compensation':
        title = 'Cancellation Confirmed';
        message = 'Your order has been canceled. An instant voucher has been added to your account for the inconvenience.';
        break;
    }

    return (
      <View style={styles.confirmationCard}>
        <Ionicons name="checkmark-circle-outline" size={50} color="#8b5cf6" style={styles.icon} />
        <Text style={styles.confirmationTitle}>{title}</Text>
        <Text style={styles.confirmationText}>{message}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => setActionTaken(null)}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="#8b5cf6" />
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Post-Order</Text>
          
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Ionicons name="sync-outline" size={50} color="#8b5cf6" style={styles.icon} />
            <Text style={styles.cardTitle}>Resolution</Text>
            <Text style={styles.cardDescription}>
               Proactive solutions to minimize the impact of long waits and unexpected disruptions.
            </Text>
          </View>

          {isDelayed && !actionTaken && renderActionButtons()}
          {actionTaken && renderConfirmation()}
          {!isDelayed && !actionTaken && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Monitoring order for potential issues...</Text>
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
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
    lineHeight: 20,
  },
  optionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: '#8b5cf6',
    borderWidth: 2,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  confirmationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
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

export default PostOrderScreen;
