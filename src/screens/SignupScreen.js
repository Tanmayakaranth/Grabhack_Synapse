import React, { useState } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, 
    KeyboardAvoidingView, ScrollView, Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function SignupScreen({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const API_URL = "http://10.174.44.178:5000"; // Change this if needed

    // const handleSignUp = async () => {
    //     if (!fullName || !email || !password || !confirmPassword) {
    //         Alert.alert("Error", "Please fill all fields.");
    //         return;
    //     }
    //     if (password !== confirmPassword) {
    //         Alert.alert("Error", "Passwords do not match.");
    //         return;
    //     }

    //     try {
    //         console.log("Sending Signup Request...");
    //         const response = await axios.post(`${API_URL}/signup`, { fullName, email, password });

    //         console.log("Signup Response:", response.data);

    //         if (response.status === 201) {
    //             await AsyncStorage.setItem("token", response.data.token);
    //             Alert.alert("Success", "Account created! Redirecting to login...");
    //             navigation.replace("Login"); // Ensure it replaces the current screen
    //         }
    //     } catch (error) {
    //         console.error("Signup Error:", error.response ? error.response.data : error);
    //         Alert.alert("Signup Failed", error.response?.data?.message || "Something went wrong.");
    //     }
    // };
    // In SignupScreen.js, update handleSignUp
const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
        Alert.alert("Error", "Please fill all fields.");
        return;
    }
    if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
    }

    try {
        console.log("Sending Signup Request to:", `${API_URL}/signup`);
        const response = await axios.post(`${API_URL}/signup`, { fullName, email, password });
        console.log("Signup Response:", response.data);

        if (response.status === 201) {
            await AsyncStorage.setItem("token", response.data.token);
            Alert.alert("Success", "Account created! Redirecting to login...");
            setFullName(""); // Clear form
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigation.replace("Login");
        }
    } catch (error) {
        console.error("Signup Error:", error.message, error.config, error.response?.data);
        Alert.alert(
            "Signup Failed",
            error.response?.data?.message || "Network error. Please check your connection or server URL."
        );
    }
};

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Sign Up</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#BEE3DB" // Pale Mint text color
                        value={fullName}
                        onChangeText={setFullName}
                    />
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
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#BEE3DB" // Pale Mint text color
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>
                            <Text style={styles.alreadyHaveText}>Already have an account? </Text>
                            <Text style={styles.loginBold}>Login</Text>
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
        color: '#000', // Black text for title
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff', // White input background
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        color: '#000', // Black text in inputs
    },
    signupButton: {
        backgroundColor: '#F66987', // Vibrant Pink for signup button
        paddingVertical: 15,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    signupText: {
        color: '#F4E1D2', // Warm Beige text for signup button
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#F66987', // Vibrant Pink color for login text
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    alreadyHaveText: {
        color: '#000', // Black for "Already have an account?" text
    },
    loginBold: {
        fontWeight: 'bold', // Bold for "Login"
    },
});
