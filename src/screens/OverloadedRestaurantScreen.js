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

const OverloadedRestaurantScreen = ({ navigation }) => {
  const features = [
    {
      id: '01',
      title: 'Pre-Order',
      subtitle: '(Precaution)',
      description: 'Show past logs (avg wait, peak times), predict crowding risk in advance → "Likely 30+ min delay"',
      icon: 'time-outline',
      route: 'PreOrder',
      color: ['#3b82f6', '#2563eb'],
      type: 'precaution'
    },
    {
      id: '02',
      title: 'At Checkout',
      subtitle: '(Decision Point)',
      description: 'Live load indicator → current prep queue & wait time. Smart alert: "This restaurant has <40 min wait, want to switch?"',
      icon: 'storefront-outline',
      route: 'AtCheckout',
      color: ['#10b981', '#059669'],
      type: 'decision'
    },
    {
      id: '03',
      title: 'Order Placed',
      subtitle: '(Monitoring)',
      description: 'Continuous monitoring of restaurant load & wait time. Notify customer with updated ETA (delays/improvements)',
      icon: 'receipt-outline',
      route: 'OrderPlaced',
      color: ['#f59e0b', '#d97706'],
      type: 'monitoring'
    },
    {
      id: '04',
      title: 'Post-Order',
      subtitle: '(Resolution)',
      description: 'Forward same order → auto-shift to another restaurant. Quick reorder → 1-click from suggested alternatives',
      icon: 'refresh-outline',
      route: 'PostOrder',
      color: ['#8b5cf6', '#7c3aed'],
      type: 'resolution'
    },
    {
      id: '05',
      title: 'Chatbot',
      subtitle: '(Assist Layer)',
      description: 'Interactive Q&A → "Should I wait, forward, reorder, or cancel?" Explains reasoning → why each option is suggested',
      icon: 'chatbubble-ellipses-outline',
      route: 'Chatbot',
      color: ['#ef4444', '#dc2626'],
      type: 'assist'
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
            <View style={styles.typeIndicator}>
              <Text style={styles.typeText}>{feature.type.toUpperCase()}</Text>
            </View>
          </View>
          
          <View style={styles.cardIconContainer}>
            <Ionicons name={feature.icon} size={32} color="white" />
          </View>
          
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{feature.title}</Text>
            <Text style={styles.cardSubtitle}>{feature.subtitle}</Text>
            <Text style={styles.cardDescription}>{feature.description}</Text>
          </View>
          
          <View style={styles.cardFooter}>
            <Text style={styles.exploreText}>Explore Feature</Text>
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
          


          {/* Feature Cards */}
          <View style={styles.featuresContainer}>
            
            {features.map(renderFeatureCard)}
          </View>

          {/* Backend Integration Info */}
          {/* <View style={styles.integrationContainer}>
            <Text style={styles.integrationTitle}>Backend & ML Integration</Text>
            <View style={styles.integrationGrid}>
              <View style={styles.integrationItem}>
                <Ionicons name="server-outline" size={20} color="#3b82f6" />
                <Text style={styles.integrationText}>MongoDB / SQLite</Text>
              </View>
              <View style={styles.integrationItem}>
                <Ionicons name="analytics-outline" size={20} color="#10b981" />
                <Text style={styles.integrationText}>FastAPI / Flask</Text>
              </View>
              <View style={styles.integrationItem}>
                <Ionicons name="brain-outline" size={20} color="#f59e0b" />
                <Text style={styles.integrationText}>Python, LangChain, LLM</Text>
              </View>
              <View style={styles.integrationItem}>
                <Ionicons name="code-outline" size={20} color="#8b5cf6" />
                <Text style={styles.integrationText}>ML:Scikit-learn</Text>
              </View>
            </View>
          </View> */}

          {/* CTA Section */}
          <View style={styles.ctaContainer}>
            <LinearGradient
              colors={['#f59e0b', '#d97706']}
              style={styles.ctaGradient}
            >
              {/* <Text style={styles.ctaTitle}>Ready to Optimize?</Text>
              <Text style={styles.ctaDescription}>
                Tap on any feature above to see how our AI-powered solutions can transform your delivery experience
              </Text> */}
            </LinearGradient>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
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
    marginBottom: 20,
    textAlign: 'center',
  },
  flowSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  flowStep: {
    alignItems: 'center',
  },
  flowDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowDotText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  flowConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  flowLine: {
    width: 20,
    height: 1,
    backgroundColor: '#6b7280',
    marginRight: 5,
  },
  featuresContainer: {
    paddingHorizontal: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e5e7eb',
    marginBottom: 20,
    textAlign: 'center',
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
    minHeight: 160,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  typeIndicator: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  cardIconContainer: {
    alignSelf: 'center',
    marginBottom: 12,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  exploreText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  integrationContainer: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 20,
  },
  integrationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 15,
    textAlign: 'center',
  },
  integrationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  integrationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    minWidth: '45%',
  },
  integrationText: {
    fontSize: 12,
    color: '#e5e7eb',
    marginLeft: 8,
  },
  ctaContainer: {
    margin: 20,
  },
  ctaGradient: {
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default OverloadedRestaurantScreen;