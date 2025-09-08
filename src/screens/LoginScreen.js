import React, { useState } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, 
    KeyboardAvoidingView, ScrollView, Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const API_URL = "http://10.174.44.178:5000";// Change this if needed

    // const handleLogin = async () => {
    //     if (!email || !password) {
    //         Alert.alert("Error", "Please enter both email and password.");
    //         return;
    //     }

    //     try {
    //         console.log("Sending Login Request...");
    //         const response = await axios.post(`${API_URL}/login`, { email, password });

    //         console.log("Login Response:", response.data);

    //         if (response.status === 200) {
    //             await AsyncStorage.setItem("token", response.data.token);
    //             Alert.alert("Success", "Login successful! Redirecting...");
    //             navigation.replace("Delivery"); // ✅ Navigate to DeliveryScreen after login
    //         }
    //     } catch (error) {
    //         console.error("Login Error:", error.response ? error.response.data : error);
    //         Alert.alert("Login Failed", error.response?.data?.message || "Invalid credentials.");
    //     }
    // };
    // In LoginScreen.js, update handleLogin
const handleLogin = async () => {
    if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password.");
        return;
    }

    try {
        console.log("Sending Login Request to:", `${API_URL}/login`);
        const response = await axios.post(`${API_URL}/login`, { email, password });
        console.log("Login Response:", response.data);

        if (response.status === 200) {
            await AsyncStorage.setItem("token", response.data.token);
            Alert.alert("Success", "Login successful! Redirecting...");
            setEmail(""); // Clear form
            setPassword("");
            navigation.replace("Home"); // Navigate to Home (or Delivery if it exists)
        }
    } catch (error) {
        console.error("Login Error:", error.message, error.config, error.response?.data);
        Alert.alert(
            "Login Failed",
            error.response?.data?.message || "Network error. Please check your connection or server URL."
        );
    }
};
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Login</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#BEE3DB" // Pale Mint text color
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#BEE3DB" // Pale Mint text color
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupContainer}>
                        <Text style={styles.signupText}>
                            Don't have an account? <Text style={styles.signupBold}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4E1D2', // Warm Beige background
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    formContainer: {
        width: "90%",
        alignItems: "center",
        backgroundColor: "#A9CCE3", // Powder Blue form container
        padding: 20,
        borderRadius: 15,
    },
    title: {
        fontSize: 28,
        color: 'black', // Pale Mint text color
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        color: '#000',
    },
    loginButton: {
        backgroundColor: '#F66987', // Updated button color (Vibrant Pink)
        paddingVertical: 15,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    loginText: {
        color: '#F4E1D2', // Button text color same as background (Warm Beige)
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        marginTop: 10,
    },
    signupText: {
        color: '#000', // "Don't have an account?" text black
        fontSize: 16,
        textAlign: 'center',
    },
    signupBold: {
        color: '#F66987', // "Sign Up" text vibrant pink
        fontWeight: 'bold',
    },
});
