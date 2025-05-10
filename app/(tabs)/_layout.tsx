import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const StackLayout = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor="#1A237E" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="screens" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </>
  );
};

export default StackLayout;
