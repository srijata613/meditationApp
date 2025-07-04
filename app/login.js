import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Cross-platform alert
  const showAlert = (title, message) => {
    if (Platform.OS === "web") {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // Validation
  const validateForm = () => {
    if (!email || !password) {
      showAlert("Validation Error", "Please fill in all fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert("Validation Error", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  // Login Logic
  const handleLogin = async () => {
    try {
      let storedDetails;

      if (Platform.OS === "web") {
        storedDetails = localStorage.getItem("userDetails");
      } else {
        storedDetails = await AsyncStorage.getItem("userDetails");
      }

      if (storedDetails) {
        const parsedDetails = JSON.parse(storedDetails);

        if (
          email === parsedDetails.email &&
          password === parsedDetails.password
        ) {
          showAlert("Success", "Login successful!");
          router.push("/home");
        } else {
          showAlert("Error", "Incorrect email or password.");
        }
      } else {
        showAlert("Error", "No user details found. Please sign up first.");
      }
    } catch (error) {
      console.error("Error accessing storage", error);
      showAlert("Error", "Something went wrong while logging in.");
    }
  };

  // Button press
  const handleLoginPress = () => {
    if (validateForm()) {
      handleLogin();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <></>,
          headerTitle: "",
        }}
      />
      <View style={{ padding: 20 }}>
        {/* Logo */}
        <View
          style={{
            padding: 20,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#f0f0f0",
            borderRadius: 50,
            height: 90,
            ...SHADOWS.medium,
            shadowColor: COLORS.white,
          }}
        >
          <Image
            source={icons.menu}
            style={{
              width: 50,
              height: 50,
              marginBottom: 20,
            }}
          />
        </View>

        {/* Form */}
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            placeholder="Password"
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={handleLoginPress}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text style={{ marginRight: 5 }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={{ color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
