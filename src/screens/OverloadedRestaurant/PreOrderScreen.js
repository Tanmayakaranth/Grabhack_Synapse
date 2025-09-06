import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PreOrderScreen = ({ navigation }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantData, setRestaurantData] = useState([]);
  const [predictionData, setPredictionData] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate fetching restaurant data with ML predictions
    const mockRestaurants = [
      {
        id: 1,
        name: "Tony's Pizza Palace",
        avgWaitTime: 25,
        currentOrders: 18,
        capacity: 25,
        peakHours: ['12:00-14:00', '19:00-21:00'],
        predictedWait: 35,
        riskLevel: 'high',
        historicalData: [
          { time: '11:00', wait: 15 },
          { time: '12:00', wait: 30 },
          { time: '13:00', wait: 45 },
          { time: '14:00', wait: 25 },
          { time: '15:00', wait: 12 }
        ]
      },
      {
        id: 2,
        name: "Burger Junction",
        avgWaitTime: 18,
        currentOrders: 12,
        capacity: 20,
        peakHours: ['11:30-13:30', '18:00-20:00'],
        predictedWait: 22,
        riskLevel: 'medium',
        historicalData: [
          { time: '11:00', wait: 10 },
          { time: '12:00', wait: 25 },
          { time: '13:00', wait: 20 },
          { time: '14:00', wait: 15 },
          { time: '15:00', wait: 8 }
        ]
      },
      {
        id: 3,
        name: "Sushi Express",
        avgWaitTime: 12,
        currentOrders: 8,
        capacity: 15,
        peakHours: ['12:30-14:00', '19:30-21:00'],
        predictedWait: 15,
        riskLevel: 'low',
        historicalData: [
          { time: '11:00', wait: 8 },
          { time: '12:00', wait: 12 },
          { time: '13:00', wait: 18 },
          { time: '14:00', wait: 10 },
          { time: '15:00', wait: 6 }
        ]
      }
    ];

    const predictions = {
      crowdingProbability: 75,
      recommendedOrderTime: '11:45 AM',
      alternativeTimeSlots: ['11:30 AM', '2:30 PM', '4:00 PM'],
      peakAvoidanceScore: 85
    };

    setRestaurantData(mockRestaurants);
    setPredictionData(predictions);
    setSelectedRestaurant(mockRestaurants[0]);

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getRiskColor = (riskLevel) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444'
    };
    return colors[riskLevel] || '#6b7280';
  };

  const getCapacityPercentage = (current, capacity) => {
    return Math.round((current / capacity) * 100);
  };

  const renderRestaurantCard = (restaurant) => {
    const capacityPercentage = getCapacityPercentage(restaurant.currentOrders, restaurant.capacity);
    const riskColor = getRiskColor(restaurant.riskLevel);

    return (
      <TouchableOpacity
        key={restaurant.id}
        style={[
          styles.restaurantCard,
          selectedRestaurant?.id === restaurant.id && styles.selectedCard
        ]}
        onPress={() => setSelectedRestaurant(restaurant)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <View style={styles.riskBadge}>
              <View style={[styles.riskDot, { backgroundColor: riskColor }]} />
              <Text style={[styles.riskText, { color: riskColor }]}>
                {restaurant.riskLevel.toUpperCase()} RISK
              </Text>
            </View>
          </View>
          <View style={styles.waitTimeContainer}>
            <Text style={styles.waitTimeNumber}>{restaurant.predictedWait}</Text>
            <Text style={styles.waitTimeLabel}>min wait</Text>
          </View>
        </View>

        <View style={styles.capacityContainer}>
          <Text style={styles.capacityLabel}>Current Capacity</Text>
          <View style={styles.capacityBar}>
            <View 
              style={[
                styles.capacityFill, 
                { 
                  width: `${capacityPercentage}%`,
                  backgroundColor: capacityPercentage > 80 ? '#ef4444' : capacityPercentage > 60 ? '#f59e0b' : '#10b981'
                }
              ]} 
            />
          </View>
          <Text style={styles.capacityText}>{restaurant.currentOrders}/{restaurant.capacity} orders</Text>
        </View>

        <View style={styles.peakHoursContainer}>
          <Ionicons name="time-outline" size={16} color="#9ca3af" />
          <Text style={styles.peakHoursText}>Peak: {restaurant.peakHours.join(', ')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHistoricalChart = (data) => {
    const maxWait = Math.max(...data.map(d => d.wait));
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Today's Wait Times</Text>
        <View style={styles.chart}>
          {data.map((point, index) => (
            <View key={index} style={styles.chartColumn}>
              <View 
                style={[
                  styles.chartBar,
                  { 
                    height: (point.wait / maxWait) * 80,
                    backgroundColor: point.wait > 30 ? '#ef4444' : point.wait > 20 ? '#f59e0b' : '#10b981'
                  }
                ]}
              />
              <Text style={styles.chartLabel}>{point.time}</Text>
              <Text style={styles.chartValue}>{point.wait}m</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const handleOrderNow = () => {
    if (!selectedRestaurant) return;

    const riskLevel = selectedRestaurant.riskLevel;
    let message = '';
    
    if (riskLevel === 'high') {
      message = `⚠️ HIGH DELAY RISK\n\nExpected wait: ${selectedRestaurant.predictedWait} minutes\nThis restaurant is currently very busy. Consider ordering from an alternative or try again at ${predictionData.recommendedOrderTime}.`;
    } else if (riskLevel === 'medium') {
      message = `⚡ MODERATE DELAY\n\nExpected wait: ${selectedRestaurant.predictedWait} minutes\nThere might be some delay, but within acceptable range.`;
    } else {
      message = `✅ OPTIMAL TIME\n\nExpected wait: ${selectedRestaurant.predictedWait} minutes\nGreat time to order!`;
    }

    Alert.alert('Order Timing Analysis', message, [
      { text: 'Choose Alternative', style: 'cancel' },
      { text: 'Proceed Anyway', onPress: () => Alert.alert('Order Placed', 'Your order has been placed successfully!') }
    ]);
  };

  const renderPredictionInsights = () => (
    <View style={styles.insightsContainer}>
      <Text style={styles.sectionTitle}>AI Predictions & Insights</Text>
      
      <View style={styles.insightCard}>
        <View style={styles.insightHeader}>
          <Ionicons name="trending-up-outline" size={20} color="#f59e0b" />
          <Text style={styles.insightTitle}>Crowding Probability</Text>
        </View>
        <Text style={styles.insightValue}>{predictionData.crowdingProbability}%</Text>
        <Text style={styles.insightDescription}>
          Likelihood of experiencing delays in the next 30 minutes
        </Text>
      </View>

      <View style={styles.insightCard}>
        <View style={styles.insightHeader}>
          <Ionicons name="time-outline" size={20} color="#10b981" />
          <Text style={styles.insightTitle}>Recommended Order Time</Text>
        </View>
        <Text style={styles.insightValue}>{predictionData.recommendedOrderTime}</Text>
        <Text style={styles.insightDescription}>
          Optimal time to place order for minimal wait
        </Text>
      </View>

      <View style={styles.alternativeTimesContainer}>
        <Text style={styles.alternativeTitle}>Alternative Time Slots:</Text>
        <View style={styles.timeSlots}>
          {predictionData.alternativeTimeSlots?.map((time, index) => (
            <View key={index} style={styles.timeSlot}>
              <Text style={styles.timeSlotText}>{time}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e293b', '#334155']}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="time" size={48} color="#3b82f6" />
            <Text style={styles.title}>Pre-Order Analysis</Text>
            <Text style={styles.subtitle}>Smart Timing Predictions</Text>
            <Text style={styles.currentTime}>
              Current Time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>

          {/* Restaurants List */}
          <View style={styles.restaurantsContainer}>
            <Text style={styles.sectionTitle}>Select Restaurant</Text>
            {restaurantData.map(renderRestaurantCard)}
          </View>

          {/* Historical Chart */}
          {selectedRestaurant && renderHistoricalChart(selectedRestaurant.historicalData)}

          {/* Prediction Insights */}
          {renderPredictionInsights()}

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={handleOrderNow}
              disabled={!selectedRestaurant}
            >
              <LinearGradient
                colors={selectedRestaurant ? ['#3b82f6', '#2563eb'] : ['#6b7280', '#4b5563']}
                style={styles.buttonGradient}
              >
                <Ionicons name="restaurant-outline" size={20} color="white" />
                <Text style={styles.buttonText}>Analyze & Order</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.alternativeButton}
              onPress={() => Alert.alert('Alternative Options', 'Showing restaurants with lower wait times...')}
            >
              <Text style={styles.alternativeButtonText}>Show Alternatives</Text>
            </TouchableOpacity>
          </View>

          {/* ML Integration Info */}
          <View style={styles.mlContainer}>
            <Text style={styles.sectionTitle}>ML Integration Features</Text>
            <View style={styles.mlFeatures}>
              <View style={styles.mlFeature}>
                <Ionicons name="analytics-outline" size={18} color="#3b82f6" />
                <Text style={styles.mlText}>Historical pattern analysis</Text>
              </View>
              <View style={styles.mlFeature}>
                <Ionicons name="trending-up-outline" size={18} color="#10b981" />
                <Text style={styles.mlText}>Real-time demand prediction</Text>
              </View>
              <View style={styles.mlFeature}>
                <Ionicons name="time-outline" size={18} color="#f59e0b" />
                <Text style={styles.mlText}>Optimal timing recommendations</Text>
              </View>
              <View style={styles.mlFeature}>
                <Ionicons name="people-outline" size={18} color="#8b5cf6" />
                <Text style={styles.mlText}>Crowd density modeling</Text>
              </View>
            </View>
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
  currentTime: {
    fontSize: 14,
    color: '#3b82f6',
    marginTop: 8,
    fontWeight: '500',
  },
  restaurantsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f59e0b',
    marginBottom: 15,
  },
  restaurantCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selectedCard: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 8,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})