import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const AIVoiceConnectScreen = () => {
  const features = [
    'Trigger an AI voice call if a recipient is unresponsive to in-app or chat notifications.',
    'Collect delivery instructions such as "reschedule delivery," "drop at a locker," or "leave with a neighbor."',
    'The AI assistant is trained to understand natural language and provide a seamless, human-like interaction.',
    'Reduces failed delivery attempts and improves customer satisfaction.'
  ];

  return (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>AI Voice Connect</Text>
          <Text style={styles.description}>
            Use an AI assistant to get real-time delivery instructions from recipients.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Ionicons name="call-outline" size={50} color="#f59e0b" style={styles.icon} />
            <Text style={styles.cardTitle}>Intelligent Communication</Text>
            <Text style={styles.cardDescription}>
              Our AI voice assistant provides a proactive solution to a common delivery problem, ensuring every package finds its way.
            </Text>
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

export default AIVoiceConnectScreen;
