import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TrustedHandoverScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [personName, setPersonName] = useState('');

  const trustedLocations = [
    { name: 'Synapse Partner Store A', address: '123 Tech Avenue' },
    { name: 'Local Warehouse B', address: '456 Data Drive' },
    { name: 'Nearby Hub C', address: '789 Innovation Lane' },
  ];

  const renderInitialOptions = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.optionsTitle}>Choose a handover option:</Text>
      
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setSelectedOption('add-someone')}
      >
        <Text style={styles.optionButtonText}>Add an authorized person</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setSelectedOption('warehouse')}
      >
        <Text style={styles.optionButtonText}>Use a trusted warehouse/store</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setSelectedOption('reschedule')}
      >
        <Text style={styles.optionButtonText}>No trusted handover (Reschedule)</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddSomeone = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Add an Authorized Person</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        placeholderTextColor="#9ca3af"
        value={personName}
        onChangeText={setPersonName}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={() => { /* Logic to confirm handover */ }}>
        <Text style={styles.confirmButtonText}>Confirm Handover to {personName || 'Person'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedOption(null)} style={styles.backButton}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="#f59e0b" />
        <Text style={styles.backButtonText}>Back to options</Text>
      </TouchableOpacity>
    </View>
  );

  const renderWarehouseOptions = () => (
    <View style={styles.warehouseContainer}>
      <Text style={styles.formTitle}>Select a Trusted Location</Text>
      {trustedLocations.map((location, index) => (
        <TouchableOpacity key={index} style={styles.locationButton}>
          <Text style={styles.locationName}>{location.name}</Text>
          <Text style={styles.locationAddress}>{location.address}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setSelectedOption(null)} style={styles.backButton}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="#f59e0b" />
        <Text style={styles.backButtonText}>Back to options</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRescheduleConfirmation = () => (
    <View style={styles.rescheduleContainer}>
      <Ionicons name="alert-circle-outline" size={40} color="#f59e0b" />
      <Text style={styles.rescheduleText}>
        Since a trusted handover is not possible, we will proceed with an auto-reschedule.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('AutoReschedule')} style={styles.rescheduleLink}>
        <Text style={styles.rescheduleLinkText}>Tap here to go to Auto Reschedule</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Trusted Handover</Text>
          
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Ionicons name="hand-right-outline" size={50} color="#f59e0b" style={styles.icon} />
            <Text style={styles.cardTitle}>Digital Consent & Security</Text>
            <Text style={styles.cardDescription}>
               Provide digital consent for a secure and authorized handover to a trusted third party.
            </Text>
          </View>
          
          {selectedOption === null && renderInitialOptions()}
          {selectedOption === 'add-someone' && renderAddSomeone()}
          {selectedOption === 'warehouse' && renderWarehouseOptions()}
          {selectedOption === 'reschedule' && renderRescheduleConfirmation()}
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
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
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
    paddingBottom: 20,
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
    marginTop: 20,
    alignItems: 'center',
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  // Add someone form styles
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    width: '100%',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    color: 'white',
    padding: 15,
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  // Warehouse options styles
  warehouseContainer: {
    marginTop: 20,
    width: '100%',
  },
  locationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  locationAddress: {
    fontSize: 14,
    color: '#e5e7eb',
    marginTop: 5,
  },
  // Reschedule confirmation styles
  rescheduleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  rescheduleText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  rescheduleLink: {
    marginTop: 15,
  },
  rescheduleLinkText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f59e0b',
    textDecorationLine: 'underline',
  },
  // Back button
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#f59e0b',
    marginLeft: 5,
  },
});

export default TrustedHandoverScreen;
