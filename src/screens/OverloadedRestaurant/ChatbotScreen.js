import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function ChatbotScreen() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const sendMsg = () => {
    const newChat = [...chat, { sender: "user", text: msg }];
    // mock bot reply
    newChat.push({ sender: "bot", text: "Bot suggests: Wait 20 mins or reorder." });
    setChat(newChat);
    setMsg("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Chatbot</Text>
      {chat.map((c, i) => (
        <Text key={i} style={{ color: c.sender === "user" ? "blue" : "green" }}>
          {c.sender}: {c.text}
        </Text>
      ))}
      <TextInput value={msg} onChangeText={setMsg} placeholder="Type a message" style={styles.input} />
      <Button title="Send" onPress={sendMsg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "flex-end" },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 8 }
});
// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';

// const ChatbotScreen = () => {
//   const features = [
//     'Interactive Q&A: The chatbot answers questions like "Should I wait?" or "Should I reorder?"',
//     'Explains reasoning: Provides a clear explanation for why a certain option is suggested.',
//     'Shows pros and cons: Displays the advantages and disadvantages of each resolution choice.',
//     'Provides updated delivery time: Shows the new estimated time of arrival for each option.',
//   ];

//   return (
//     <LinearGradient colors={['#1e293b', '#334155']} style={styles.background}>
//       <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <Text style={styles.mainTitle}>Chatbot Assistant</Text>
//           <Text style={styles.description}>
//             An AI assistant to help you make informed decisions about your order.
//           </Text>
//         </View>
//         <View style={styles.contentContainer}>
//           <View style={styles.card}>
//             <Ionicons name="chatbubbles-outline" size={50} color="#8b5cf6" style={styles.icon} />
//             <Text style={styles.cardTitle}>Intelligent Chatbot</Text>
//             <Text style={styles.cardDescription}>
//               This chatbot uses advanced AI to give you the information you need to make the best choice for your order.
//             </Text>
//           </View>
//           <View style={styles.featuresSection}>
//             <Text style={styles.featuresTitle}>Key Features</Text>
//             {features.map((feature, index) => (
//               <View key={index} style={styles.featureItem}>
//                 <Ionicons name="checkmark-circle-outline" size={20} color="#8b5cf6" />
//                 <Text style={styles.featureText}>{feature}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   scrollContainer: {
//     paddingVertical: 40,
//   },
//   header: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   mainTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#8b5cf6',
//     textAlign: 'center',
//   },
//   description: {
//     fontSize: 16,
//     color: '#9ca3af',
//     textAlign: 'center',
//     marginTop: 10,
//     lineHeight: 22,
//   },
//   contentContainer: {
//     paddingHorizontal: 20,
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   icon: {
//     marginBottom: 10,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: 'white',
//     marginBottom: 10,
//   },
//   cardDescription: {
//     fontSize: 14,
//     color: '#e5e7eb',
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   featuresSection: {
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//     borderRadius: 15,
//     padding: 20,
//   },
//   featuresTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: 'white',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 15,
//   },
//   featureText: {
//     fontSize: 14,
//     color: '#e5e7eb',
//     marginLeft: 10,
//     flex: 1,
//   },
// });

// export default ChatbotScreen;
