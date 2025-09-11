import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SmartReroutingScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [alternativeOptions, setAlternativeOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [reroutingStatus, setReroutingStatus] = useState('analyzing');

  useEffect(() => {
    // Simulate fetching current delivery and analyzing alternatives
    const mockCurrentDelivery = {
      orderId: 'ORD-2024-003',
      originalAddress: '456 Oak Street, Apt 2A',
      deliveryPartner: 'Mike Johnson',
      currentLat: 40.7128,
      currentLng: -74.0060,
      packageValue: '$85.50'
    };

    const mockAlternatives = [
      {
        id: 1,
        type: 'other_vehicle',
        name: 'Transfer to Vehicle #47',
        address: 'Mobile handoff point',
        distance: '1.2 km',
        confidence: 95,
        authorizedBy: 'System',
        estimatedTime: '10 min',
        icon: 'car-outline'
      },
      {
        id: 2,
        type: 'neighbor',
        name: 'Sarah Wilson (Neighbor)',
        address: '458 Oak Street, Apt 2B',
        distance: '0.1 km',
        confidence: 90,
        authorizedBy: 'Recipient',
        estimatedTime: '2 min',
        icon: 'home-outline'
      },
      {
        id: 3,
        type: 'delivery_hub',
        name: 'DeliveryHub - Central',
        address: '789 Main Avenue',
        distance: '2.3 km',
        confidence: 85,
        authorizedBy: 'Auto',
        estimatedTime: '15 min',
        icon: 'business-outline'
      },
      {
        id: 4,
        type: 'partner_store',
        name: 'QuickMart Store',
        address: '123 Pine Street',
        distance: '0.8 km',
        confidence: 80,
        authorizedBy: 'System',
        estimatedTime: '8 min',
        icon: 'storefront-outline'
      }
    ];

    setCurrentLocation(mockCurrentDelivery);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setAlternativeOptions(mockAlternatives);
      setReroutingStatus('options_ready');
    }, 2000);
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    Alert.alert(
      'Confirm Rerouting',
      `Reroute delivery to ${option.name}?\n\nEstimated time: ${option.estimatedTime}\nConfidence: ${option.confidence}%`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => executeRerouting(option) }
      ]
    );
  };

  const executeRerouting = (option) => {
    setLoading(true);
    setReroutingStatus('executing');
    
    // Simulate rerouting process
    setTimeout(() => {
      setLoading(false);
      setReroutingStatus('completed');
      Alert.alert(
        'Rerouting Successful',
        `Package has been successfully rerouted to ${option.name}. Recipient will be notified.`,
        [{ text: 'OK' }]
      );
    }, 3000);
  };

  const getStatusConfig = () => {
    const configs = {
      analyzing: { color: '#f59e0b', icon: 'analytics-outline', text: 'Analyzing Options' },
      options_ready: { color: '#3b82f6', icon: 'list-outline', text: 'Options Available' },
      executing: { color: '#8b5cf6', icon: 'refresh-outline', text: 'Executing Reroute' },
      completed: { color: '#10b981', icon: 'checkmark-circle', text: 'Rerouting Complete' }
    };
    return configs[reroutingStatus];
  };

  const renderAlternativeCard = (option) => {
    const getTypeColor = (type) => {
      const colors = {
        neighbor: '#10b981',
        partner_store: '#3b82f6',
        delivery_hub: '#f59e0b',
        other_vehicle: '#8b5cf6'
      };
      return colors[type] || '#6b7280';
    };

    return (
      <TouchableOpacity
        key={option.id}
        style={styles.optionCard}
        onPress={() => handleSelectOption(option)}
        disabled={loading || reroutingStatus === 'completed'}
      >
        <View style={styles.optionHeader}>
          <View style={[styles.optionIcon, { backgroundColor: `${getTypeColor(option.type)}20` }]}>
            <Ionicons name={option.icon} size={24} color={getTypeColor(option.type)} />
          </View>
          <View style={styles.optionInfo}>
            <Text style={styles.optionName}>{option.name}</Text>
            <Text style={styles.optionAddress}>{option.address}</Text>
          </View>
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceText}>{option.confidence}%</Text>
            <Text style={styles.confidenceLabel}>Confidence</Text>
          </View>
        </View>

        <View style={styles.optionDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color="#9ca3af" />
            <Text style={styles.detailText}>{option.distance} away</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#9ca3af" />
            <Text style={styles.detailText}>{option.estimatedTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#9ca3af" />
            <Text style={styles.detailText}>Auth: {option.authorizedBy}</Text>
          </View>
        </View>

        <View style={styles.optionFooter}>
          <LinearGradient
            colors={[getTypeColor(option.type), `${getTypeColor(option.type)}80`]}
            style={styles.selectButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.selectButtonText}>Select Option</Text>
            <Ionicons name="arrow-forward" size={16} color="white" />
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  const statusConfig = getStatusConfig();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e293b', '#334155']}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="navigate" size={48} color="#f59e0b" />
            <Text style={styles.title}>Smart Re-routing</Text>
            <Text style={styles.subtitle}>Dynamic Delivery Optimization</Text>
          </View>

          

          {/* Current Delivery Info */}
          {currentLocation && (
            <View style={styles.currentDeliveryCard}>
              <Text style={styles.sectionTitle}>Current Delivery</Text>
              <View style={styles.deliveryInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="receipt-outline" size={20} color="#f59e0b" />
                  <Text style={styles.infoLabel}>Order:</Text>
                  <Text style={styles.infoValue}>{currentLocation.orderId}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={20} color="#f59e0b" />
                  <Text style={styles.infoLabel}>Original:</Text>
                  <Text style={styles.infoValue}>{currentLocation.originalAddress}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="person-outline" size={20} color="#f59e0b" />
                  <Text style={styles.infoLabel}>Partner:</Text>
                  <Text style={styles.infoValue}>{currentLocation.deliveryPartner}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="pricetag-outline" size={20} color="#f59e0b" />
                  <Text style={styles.infoLabel}>Value:</Text>
                  <Text style={styles.infoValue}>{currentLocation.packageValue}</Text>
                </View>
              </View>
            </View>
          )}
          {/* Status Indicator */}
          {/* <View style={[styles.statusContainer, { backgroundColor: `${statusConfig.color}20` }]}>
            <Ionicons name={statusConfig.icon} size={24} color={statusConfig.color} />
            <Text style={[styles.statusText, { color: statusConfig.color }]}>{statusConfig.text}</Text>
            {(reroutingStatus === 'analyzing' || reroutingStatus === 'executing') && (
              <ActivityIndicator size="small" color={statusConfig.color} style={{ marginLeft: 10 }} />
            )}
          </View> */}

          {/* Alternative Options */}
          {alternativeOptions.length > 0 && (
            <View style={styles.optionsContainer}>
              <Text style={styles.sectionTitle}>Best Alternative Delivery Options</Text>
              <View style={[styles.statusContainer, { backgroundColor: `${statusConfig.color}20` }]}>
                <Ionicons name={statusConfig.icon} size={24} color={statusConfig.color} />
                <Text style={[styles.statusText, { color: statusConfig.color }]}>{statusConfig.text}</Text>
                {(reroutingStatus === 'analyzing' || reroutingStatus === 'executing') && (
                  <ActivityIndicator size="small" color={statusConfig.color} style={{ marginLeft: 10 }} />
                )}
              </View>
              {alternativeOptions.map(renderAlternativeCard)}
            </View>
          )}

          {/* Loading State */}
          {reroutingStatus === 'analyzing' && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#f59e0b" />
              <Text style={styles.loadingText}>Analyzing nearby delivery options...</Text>
              <Text style={styles.loadingSubtext}>Using ML models to find optimal alternatives</Text>
            </View>
          )}


          {/* Backend Integration */}
          {/* <View style={styles.integrationCard}>
            <Text style={styles.sectionTitle}>Backend Integration Points</Text>
            <View style={styles.integrationList}>
              <Text style={styles.integrationItem}>• Google Maps API for geolocation</Text>
              <Text style={styles.integrationItem}>• FastAPI endpoints for route optimization</Text>
              <Text style={styles.integrationItem}>• MongoDB for storing delivery preferences</Text>
              <Text style={styles.integrationItem}>• ML models (scikit-learn) for confidence scoring</Text>
              <Text style={styles.integrationItem}>• Real-time communication via WebSocket</Text>
            </View>
          </View> */}
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
  currentDeliveryCard: {
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
  sectionDescription: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 20,
    textAlign: 'center',
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
    width: 70,
  },
  infoValue: {
    fontSize: 14,
    color: '#e5e7eb',
    flex: 1,
    fontWeight: '500',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e5e7eb',
  },
  optionAddress: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  confidenceContainer: {
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  confidenceLabel: {
    fontSize: 10,
    color: '#9ca3af',
  },
  optionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4,
  },
  optionFooter: {
    alignItems: 'center',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginRight: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#e5e7eb',
    marginTop: 15,
  },
  loadingSubtext: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 5,
  },
  aiContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  aiFeaturesList: {
    gap: 12,
  },
  aiFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiFeatureText: {
    marginLeft: 12,
    flex: 1,
  },
  aiFeatureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e5e7eb',
  },
  aiFeatureDesc: {
    fontSize: 12,
    color: '#9ca3af',
  },
  integrationCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  integrationList: {
    gap: 8,
  },
  integrationItem: {
    fontSize: 14,
    color: '#e5e7eb',
    lineHeight: 20,
  },
});

export default SmartReroutingScreen;