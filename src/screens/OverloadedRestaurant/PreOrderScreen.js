import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const PreOrderScreen = () => {
  const features = [
    'Show past logs: Displays average wait times and peak hours for a restaurant.',
    'Predict crowding risk: Uses AI to predict potential delays in advance.',
    'Highlights faster alternatives in search results based on predicted wait times.'
  ];

  return (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Pre-Order (Precaution)</Text>
          <Text style={styles.description}>
            Predicts and alerts customers to potential delays before they place an order.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Ionicons name="fast-food-outline" size={50} color="#8b5cf6" style={styles.icon} />
            <Text style={styles.cardTitle}>Proactive Analytics</Text>
            <Text style={styles.cardDescription}>
              Our system uses historical data and AI to identify and warn about potential delays at restaurants before you even order.
            </Text>
          </View>
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Key Features</Text>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#8b5cf6" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
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
  featuresSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 14,
    color: '#e5e7eb',
    marginLeft: 10,
    flex: 1,
  },
});

export default PreOrderScreen;
