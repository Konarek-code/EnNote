import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";

const saveUsageTime = async (milliseconds: number) => {
  try {
    const existing = await AsyncStorage.getItem("usageTime");
    const total = existing
      ? parseInt(existing, 10) + milliseconds
      : milliseconds;
    await AsyncStorage.setItem("usageTime", total.toString());
  } catch (e) {
    console.error("time save error:", e);
  }
};

const useAppUsageTimer = () => {
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "active") {
        startTime.current = Date.now();
      } else if (
        nextAppState.match(/inactive|background/) &&
        startTime.current
      ) {
        const duration = Date.now() - startTime.current;
        saveUsageTime(duration);
        startTime.current = null;
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);
};

export default useAppUsageTimer;

export const getUsageTime = async () => {
  try {
    const value = await AsyncStorage.getItem("usageTime");
    return value ? parseInt(value, 10) : 0;
  } catch (e) {
    console.error("time read error:", e);
    return 0;
  }
};
