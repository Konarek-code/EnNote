import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const BASE_URL = "https://backend-305143166666.europe-central2.run.app";

export const validateAndTranslateWord = async (
  text: string
): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, source_lang: "EN", target_lang: "PL" }),
  });

  if (!response.ok) throw new Error("Failed to translate");

  const data = await response.json();
  return data.translations.map((t: any) => t.text);
};

export const saveWord = async (
  uid: string,
  word: string,
  translations: string[]
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/save-word`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, word, translations: translations.join(", ") }),
  });

  if (!response.ok) throw new Error("Failed to save word");
};

export const getWords = async (uid: string) => {
  if (!uid) throw new Error("Missing UID");

  const response = await fetch(
    `https://backend-305143166666.europe-central2.run.app/get-words?uid=${uid}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch words");
  }

  const data = await response.json();
  return data;
};
export const clearWords = async (uid: string): Promise<void> => {
  if (!uid) throw new Error("Missing UID");

  const response = await fetch(`${BASE_URL}/clear-words?uid=${uid}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to clear words");
  }
};

export const fetchAccountLevel = async (
  uid: string
): Promise<"beginner" | "intermediate" | "Expert"> => {
  try {
    const [expertRes, correctRes] = await Promise.all([
      fetch(`${BASE_URL}/expertWords?uid=${uid}`),
      fetch(`${BASE_URL}/get-correct-words?uid=${uid}`),
    ]);
    const expertData = await expertRes.json();
    const correctData = await correctRes.json();
    if (expertData.length > 10) {
      return "Expert";
    }
    if (correctData.length > 10) {
      return "intermediate";
    }
    return "beginner";
  } catch (error) {
    console.error("Error fetching account level:", error);
    throw error;
  }
};
export const fetchCorrectWords = async (uid: string) => {
  if (!uid) throw new Error("Missing UID");
  const res = await fetch(
    `https://backend-305143166666.europe-central2.run.app/get-correct-words?uid=${uid}`
  );
  if (!res.ok) throw new Error("Failed to fetch correct words");
  return await res.json();
};

export const fetchExpertWords = async (uid: string) => {
  if (!uid) throw new Error("Missing UID");
  const res = await fetch(
    `https://backend-305143166666.europe-central2.run.app/expertWords?uid=${uid}`
  );
  if (!res.ok) throw new Error("Failed to fetch expert words");
  return await res.json();
};

export const fetchIncorrectWords = async (uid: string) => {
  if (!uid) throw new Error("Misssing UID");
  const res = await fetch(
    `https://backend-305143166666.europe-central2.run.app/get-incorrect-words?uid=${uid}`
  );
  if (!res.ok) throw new Error("Failed to fetch incorrect words");
  return await res.json();
};
