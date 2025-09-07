import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const PreCheckAvailabilityScreen = ({ navigation }) => {
  const [autoReminders, setAutoReminders] = useState(true);
  const [reminderTime, setReminderTime] = useState('30');
  const [confirmationRequired, setConfirmationRequired] = useState(true);
  const [currentDelivery, setCurrentDelivery] = useState(null);
  const [recipientStatus, setRecipientStatus] = useState('pending');

  // Simulate backend integration
  useEffect(() => {
    // Simulate fetching current delivery data
    const mockDelivery = {
      orderId: 'ORD-2024-001',
      recipient: 'John Doe',
      address: '123 Main Street, Apt 4B',
      phone: '+1 555-0123',
      estimatedArrival: '2:30 PM',
      value: '$45.99'
    };
    setCurrentDelivery(mockDelivery);
  }, []);

  const handleSendReminder = () => {
    Alert.alert(
      'Reminder Sent',
      'Pre-delivery confirmation request sent to recipient via SMS and app notification.',
      [{ text: 'OK' }]
    );
    setRecipientStatus('reminder_sent');
  };

  const handleRecipientResponse = (response) => {
    setRecipientStatus(response);
    if (response === 'confirmed') {
      Alert.alert('Success', 'Recipient confirmed availability. Delivery can proceed.');
    } else if (response === 'unavailable') {
      Alert.alert('Alternative Required', 'Recipient is unavailable. Activating backup solutions.');
    }
  };

  const renderStatusIndicator = () => {
    const statusConfig = {
      pending: { color: '#f59e0b', icon: 'time-outline', text: 'Awaiting Response' },
      reminder_sent: { color: '#3b82f6', icon: 'mail-outline', text: 'Reminder Sent' },
      confirmed: { color: '#10b981', icon: 'checkmark-circle', text: 'Confirmed Available' },
      unavailable: { color: '#ef4444', icon: 'close-circle', text: 'Not Available' },
    };

    const config = statusConfig[recipientStatus];
    
    return (
      <View style={[styles.statusContainer, { backgroundColor: `${config.color}20` }]}>
        <Ionicons name={config.icon} size={24} color={config.color} />
        <Text style={[styles.statusText, { color: config.color }]}>{config.text}</Text>
      </View>
    );
  };

  if (!currentDelivery) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e293b', '#334155']}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="shield-checkmark" size={48} color="#3b82f6" />
            <Text style={styles.title}>Pre-Check Availability</Text>
            <Text style={styles.subtitle}>Proactive Delivery Confirmation</Text>
          </View>

          {/* Current Delivery Info */}
          <View style={styles.deliveryCard}>
            <Text style={styles.sectionTitle}>Current Delivery</Text>
            <View style={styles.deliveryInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="receipt-outline" size={20} color="#f59e0b" />
                <Text style={styles.infoLabel}>Order ID:</Text>
                <Text style={styles.infoValue}>{currentDelivery.orderId}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="person-outline" size={20} color="#f59e0b" />
                <Text style={styles.infoLabel}>Recipient:</Text>
                <Text style={styles.infoValue}>{currentDelivery.recipient}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={20} color="#f59e0b" />
                <Text style={styles.infoLabel}>Address:</Text>
                <Text style={styles.infoValue}>{currentDelivery.address}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={20} color="#f59e0b" />
                <Text style={styles.infoLabel}>ETA:</Text>
                <Text style={styles.infoValue}>{currentDelivery.estimatedArrival}</Text>
              </View>
            </View>
          </View>

          {/* Status */}
          {renderStatusIndicator()}

          {/* Settings */}
          <View style={styles.settingsCard}>
            <Text style={styles.sectionTitle}>Reminder Settings</Text>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Auto Reminders</Text>
                <Text style={styles.settingDescription}>
                  Automatically send confirmation requests before delivery
                </Text>
              </View>
              <Switch
                value={autoReminders}
                onValueChange={setAutoReminders}
                trackColor={{ false: '#767577', true: '#3b82f6' }}
                thumbColor={autoReminders ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Reminder Timing (minutes before ETA)</Text>
                <TextInput
                  style={styles.timeInput}
                  value={reminderTime}
                  onChangeText={setReminderTime}
                  keyboardType="numeric"
                  placeholder="30"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Require Confirmation</Text>
                <Text style={styles.settingDescription}>
                  Recipient must confirm availability before dispatch
                </Text>
              </View>
              <Switch
                value={confirmationRequired}
                onValueChange={setConfirmationRequired}
                trackColor={{ false: '#767577', true: '#3b82f6' }}
                thumbColor={confirmationRequired ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSendReminder}
              disabled={recipientStatus === 'reminder_sent'}
            >
              <LinearGradient
                colors={recipientStatus === 'reminder_sent' ? ['#6b7280', '#4b5563'] : ['#3b82f6', '#2563eb']}
                style={styles.buttonGradient}
              >
                <Ionicons name="send" size={20} color="white" />
                <Text style={styles.buttonText}>
                  {recipientStatus === 'reminder_sent' ? 'Reminder Sent' : 'Send Reminder'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {recipientStatus === 'reminder_sent' && (
              <View style={styles.responseButtons}>
                <TouchableOpacity
                  style={styles.responseButton}
                  onPress={() => handleRecipientResponse('confirmed')}
                >
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  <Text style={[styles.responseText, { color: '#10b981' }]}>Simulate: Available</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.responseButton}
                  onPress={() => handleRecipientResponse('unavailable')}
                >
                  <Ionicons name="close-circle" size={20} color="#ef4444" />
                  <Text style={[styles.responseText, { color: '#ef4444' }]}>Simulate: Unavailable</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e5e7eb',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 5,
  },
  deliveryCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f59e0b',
    marginBottom: 15,
  },
  deliveryInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginLeft: 10,
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: '#e5e7eb',
    flex: 1,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  settingsCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    color: '#e5e7eb',
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  timeInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 10,
    color: '#e5e7eb',
    fontSize: 16,
    marginTop: 8,
    width: 80,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    marginBottom: 15,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  responseButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  responseButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
  },
  responseText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  mlCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  mlFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mlText: {
    fontSize: 14,
    color: '#e5e7eb',
    marginLeft: 10,
    flex: 1,
  },
});

export default PreCheckAvailabilityScreen;