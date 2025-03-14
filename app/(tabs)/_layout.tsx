import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const StackLayout = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="screens" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default StackLayout;
