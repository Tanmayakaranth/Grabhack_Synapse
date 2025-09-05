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
