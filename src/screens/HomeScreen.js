import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const solutions = [
    {
      id: 1,
      title: 'Recipient Unavailable',
      description: 'Handle delivery challenges when recipients are not available',
      icon: 'person-remove-outline',
      color: ['#f59e0b', '#d97706'],
      route: 'RecipientUnavailable',
      features: [
        'Pre-Check Availability',
        'Trusted Handover',
        'Smart Re-routing',
        'Auto Reschedule',
        'AI Voice Connect',
      ],
    },
    {
      id: 2,
      title: 'Overloaded Restaurant',
      description: 'Optimize delivery experience during high-demand periods',
      icon: 'restaurant-outline',
      color: ['#8b5cf6', '#7c3aed'],
      route: 'OverloadedRestaurant',
      features: [
        'Pre-Order Analytics',
        'Live Load Indicator',
        'Order Monitoring',
        'Quick Reorder',
        'Smart Chatbot',
      ],
    },
  ];

  const renderSolutionCard = (solution) => (
    <TouchableOpacity
      key={solution.id}
      style={styles.cardContainer}
      onPress={() => navigation.navigate(solution.route)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={solution.color}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <Ionicons name={solution.icon} size={40} color="white" />
          <Text style={styles.cardTitle}>{solution.title}</Text>
        </View>

        <Text style={styles.cardDescription}>{solution.description}</Text>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Key Features:</Text>
          {solution.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color="rgba(255,255,255,0.8)"
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.exploreText}>Tap to explore solutions</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Smart Delivery</Text>
          <Text style={styles.subtitle}>Solutions</Text>
          <Text style={styles.description}>
            Choose a delivery scenario to explore our AI-powered solutions
          </Text>
        </View>

        {/* Solutions Cards */}
        <View style={styles.solutionsContainer}>
          {solutions.map(renderSolutionCard)}
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>95%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50%</Text>
            <Text style={styles.statLabel}>Time Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>AI Support</Text>
          </View>
        </View>

        {/* Tech Stack Info */}
        <View style={styles.techContainer}>
          <Text style={styles.techTitle}>Powered by Advanced AI</Text>
          <View style={styles.techStack}>
            <View style={styles.techItem}>
              <Text style={styles.techText}>
                ML/AI (scikit-learn, TensorFlow)
              </Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techText}>Real-time Processing</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techText}>Smart Analytics</Text>
            </View>
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
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f59e0b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#e5e7eb',
    marginTop: -5,
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  solutionsContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    borderRadius: 20,
    padding: 25,
    minHeight: 280,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
    flex: 1,
  },
  cardDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  exploreText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  techContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  techTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 15,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  techItem: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    margin: 5,
  },
  techText: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '500',
  },
});

export default HomeScreen;
