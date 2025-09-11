import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RecipientUnavailableScreen = ({ navigation }) => {
  const features = [
    {
      id: '01',
      title: 'Pre-Check Availability',
      subtitle: '(Precaution)',
      description: 'Send automated reminders/confirmation requests before delivery to ensure recipient presence.',
      icon: 'shield-checkmark-outline',
      route: 'PreCheckAvailability',
      color: ['#3b82f6', '#2563eb'],
    },
    {
      id: '02',
      title: 'Trusted Handover',
      subtitle: '(Decision Point)',
      description: 'Allow deliveries to be made to an authorized person/neighbour/ nearby partner store with digital consent.',
      icon: 'people-outline',
      route: 'TrustedHandover',
      color: ['#10b981', '#059669'],
    },
    {
      id: '03',
      title: 'Smart Re-routing',
      subtitle: '(Monitoring)',
      description: 'Dynamically reroute parcels to alternate addresses or nearby other delivery vehicle.',
      icon: 'navigate-outline',
      route: 'SmartRerouting',
      color: ['#f59e0b', '#d97706'],
    },
    {
      id: '04',
      title: 'Auto Reschedule',
      subtitle: '(Resolution)',
      description: 'If recipient unavailable, system auto-suggests the next best delivery slot.',
      icon: 'calendar-outline',
      route: 'AutoReschedule',
      color: ['#8b5cf6', '#7c3aed'],
    },
    {
      id: '05',
      title: 'AI Voice Connect',
      subtitle: '(Assist Layer)',
      description: 'If recipient doesn\'t respond to app/SMS notifications, trigger an AI voice call.',
      icon: 'call-outline',
      route: 'AIVoiceConnect',
      color: ['#ef4444', '#dc2626'],
    },
  ];

  const renderFeatureCard = (feature, index) => (
    <TouchableOpacity
      key={feature.id}
      style={[styles.featureCard, { marginTop: index * 20 }]}
      onPress={() => navigation.navigate(feature.route)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={feature.color}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>{feature.id}</Text>
            </View>
            <Ionicons name={feature.icon} size={28} color="white" style={styles.cardIcon} />
          </View>
          
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{feature.title}</Text>
            <Text style={styles.cardSubtitle}>{feature.subtitle}</Text>
            <Text style={styles.cardDescription}>{feature.description}</Text>
          </View>
          
          <View style={styles.cardFooter}>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e293b', '#334155']}
        style={styles.background}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          {/* <View style={styles.header}>
            <View style={styles.problemContainer}>
              <Ionicons name="alert-circle-outline" size={24} color="#f59e0b" />
              <Text style={styles.problemTitle}>THE PROBLEM</Text>
            </View>
            <Text style={styles.problemDescription}>
              A delivery partner arrives at the destination, but the recipient is not available 
              to receive a valuable package
            </Text>
          </View> */}

          {/* Flow Visualization */}
          {/* <View style={styles.flowContainer}>
            <Text style={styles.flowTitle}>Solution Flow</Text>
            <View style={styles.flowSteps}>
              {features.map((feature, index) => (
                <View key={feature.id} style={styles.flowStep}>
                  <View style={[styles.flowDot, { backgroundColor: feature.color[0] }]}>
                    <Text style={styles.flowDotText}>{feature.id}</Text>
                  </View>
                  {index < features.length - 1 && (
                    <View style={styles.flowArrow}>
                      <Ionicons name="arrow-forward" size={16} color="#6b7280" />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View> */}

          {/* Feature Cards */}
          <View style={styles.featuresContainer}>
            {features.map(renderFeatureCard)}
          </View>

          {/* Tech Stack */}
          {/* <View style={styles.techStack}>
            <Text style={styles.techTitle}>TECH STACK</Text>
            <View style={styles.techItems}>
              <Text style={styles.techText}>
                ML/AI (scikit-learn, TensorFlow), Node.js, FastAPI, Databases Qdrant/SQL/MongoDB, 
                Maps & Geolocation (Google Maps API), Notifications & Communication (Twilio SMS/Voice, LLM API for Voice Connect)
              </Text>
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
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  problemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  problemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginLeft: 8,
  },
  problemDescription: {
    fontSize: 16,
    color: '#e5e7eb',
    textAlign: 'center',
    lineHeight: 24,
  },
  flowContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 20,
  },
  flowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    marginBottom: 15,
    textAlign: 'center',
  },
  flowSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  flowStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flowDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowDotText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  flowArrow: {
    marginHorizontal: 8,
  },
  featuresContainer: {
    paddingHorizontal: 20,
  },
  featureCard: {
    marginBottom: 15,
  },
  cardGradient: {
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 20,
    minHeight: 140,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cardIcon: {
    marginLeft: 'auto',
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  cardFooter: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  techStack: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 20,
  },
  techTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 10,
    textAlign: 'center',
  },
  techItems: {
    alignItems: 'center',
  },
  techText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default RecipientUnavailableScreen;