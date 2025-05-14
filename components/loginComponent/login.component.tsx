// screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { loginUser } from "@/utils/firebaseAuth";
import { useDispatch } from "react-redux";

import { useRouter } from "expo-router";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      router.replace("/(tabs)/screens/profile");
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Log in
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        style={{ marginTop: 15, color: "blue" }}
        onPress={() => router.push("/(tabs)/screens/registerScreen")}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
};

export default LoginScreen;
