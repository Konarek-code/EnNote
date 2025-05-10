import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "testHistory";

export const saveTestResult = async (result: any) => {
  try {
    if (
      typeof result.score !== "number" ||
      typeof result.total !== "number" ||
      typeof result.accuracy !== "number" ||
      typeof result.date !== "string"
    ) {
      console.warn("Invalid result format", result);
      return;
    }

    const history = await AsyncStorage.getItem(STORAGE_KEY);
    const parsedHistory = history ? JSON.parse(history) : [];

    const updatedHistory = [...parsedHistory, result];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Error saving test result", error);
  }
};

export const loadTestHistory = async () => {
  try {
    const history = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = history ? JSON.parse(history) : [];

    return parsed.filter(
      (item: any) =>
        typeof item.score === "number" &&
        typeof item.total === "number" &&
        typeof item.accuracy === "number" &&
        typeof item.date === "string"
    );
  } catch (error) {
    console.error("Error loading test history", error);
    return [];
  }
};
