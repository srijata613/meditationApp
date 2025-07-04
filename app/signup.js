import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const showAlert = (title, message) => {
    if (Platform.OS === "web") {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const saveUserDetails = async (userDetails) => {
    try {
      if (Platform.OS === "web") {
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
      } else {
        await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
      }
    } catch (error) {
      console.error("Storage error:", error);
      showAlert("Error", "Failed to save user data.");
    }
  };

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      showAlert("Validation Error", "Please fill in all fields.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      showAlert("Validation Error", "Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      showAlert("Validation Error", "Password must be at least 6 characters.");
      return;
    }

    const userDetails = { userName, email, password, token: "sample-token" };

    await saveUserDetails(userDetails);
    console.log("User registered:", userDetails);
    showAlert("Success", "User registered successfully!");
    router.push("/login");
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
      <View style={{ padding: 20 }} testID="signupContainer">
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
          testID="imageIcon"
        >
          <Image
            source={icons.menu}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </View>

        <View style={{ marginTop: 30 }} testID="formData">
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="UserName"
            testID="userName"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            testID="email"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            testID="password"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            testID="handleRegister"
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginTextContainer} testID="textData">
            <Text style={{ marginRight: 5 }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={{ color: "blue" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
};

export default SignUp;
