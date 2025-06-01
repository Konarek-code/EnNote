import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const COUNTER_KEY = "counter";

export const useCounter = () => {
  const [counter, setCounter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCounter = async () => {
      try {
        const stored = await AsyncStorage.getItem(COUNTER_KEY);
        setCounter(stored ? parseInt(stored, 10) : 0);
      } catch (error) {
        console.error("Failed to load counter:", error);
        setCounter(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadCounter();
  }, []);

  const updateCounter = async (value: number) => {
    try {
      await AsyncStorage.setItem(COUNTER_KEY, value.toString());
      setCounter(value);
    } catch (error) {
      console.error("Failed to update counter:", error);
    }
  };

  const increment = () => updateCounter(counter + 1);

  const reset = async () => {
    try {
      await AsyncStorage.removeItem(COUNTER_KEY);
      setCounter(0);
    } catch (error) {
      console.error("Failed to reset counter:", error);
    }
  };

  return {
    counter,
    isLoading,
    incrementCounter: increment,
    resetCounter: reset,
    set: updateCounter,
  };
};
