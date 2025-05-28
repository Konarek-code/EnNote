import Constants from "expo-constants";
const BASE_URL = Constants.expoConfig?.extra?.apiUrl;

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

  const response = await fetch(`${BASE_URL}/get-words?uid=${uid}`);

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
  const res = await fetch(`${BASE_URL}/get-correct-words?uid=${uid}`);
  if (!res.ok) throw new Error("Failed to fetch correct words");
  return await res.json();
};

export const fetchExpertWords = async (uid: string) => {
  if (!uid) throw new Error("Missing UID");
  const res = await fetch(`${BASE_URL}/expertWords?uid=${uid}`);
  if (!res.ok) throw new Error("Failed to fetch expert words");
  return await res.json();
};

export const fetchIncorrectWords = async (uid: string) => {
  if (!uid) throw new Error("Misssing UID");
  const res = await fetch(`${BASE_URL}/get-incorrect-words?uid=${uid}`);
  if (!res.ok) throw new Error("Failed to fetch incorrect words");
  return await res.json();
};

export interface Word {
  word: string;
  translations: string[];
  level: "incorrectWords" | "correctWords" | "expertWords";
}
export const fetchWeeklyWords = async (uid: string): Promise<Word[]> => {
  if (!uid) throw new Error("Missing UID");
  const response = await fetch(`${BASE_URL}/get-weekly-words?uid=${uid}`);
  if (!response.ok) throw new Error("Failed to fetch weekly words");
  return response.json();
};

export const promoteWord = async (
  uid: string,
  word: string,
  fromCollection: string
) => {
  if (!uid) throw new Error("Missing UID");
  const response = await fetch(`${BASE_URL}/promote-word`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, word, fromCollection }),
  });
  if (!response.ok) throw new Error("Failed to promote word");
  return response.json();
};

export const fetchMonthlyWords = async (uid: string): Promise<Word[]> => {
  if (!uid) throw new Error("Missing UID");

  const response = await fetch(`${BASE_URL}/get-monthly-words?uid=${uid}`);
  if (!response.ok) throw new Error("Failed to fetch monthly words");

  const data = await response.json();

  return data.map((word: any) => ({
    ...word,
    level: "expertWords",
  }));
};
