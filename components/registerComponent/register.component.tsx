// screens/RegisterScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { register } from "@/utils/firebaseAuth";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const route = useRouter();

  const handleRegister = async () => {
    try {
      await register(email, password, name);
      route.replace("/(tabs)/screens/loginScreen");
    } catch (error: any) {
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Register
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password (min 6 characters)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
      />
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Register" onPress={handleRegister} />
      <Text
        style={{ marginTop: 15, color: "blue" }}
        onPress={() => route.replace("/(tabs)/screens/loginScreen")}
      >
        Already have an account? Log in
      </Text>
    </View>
  );
};

export default RegisterScreen;
