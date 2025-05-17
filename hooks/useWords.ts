import { useState, useEffect } from "react";
import {
  getWords,
  fetchCorrectWords,
  fetchIncorrectWords,
  fetchExpertWords,
} from "@/api/words";

export interface Word {
  id: string;
  word: string;
  translation: string;
  level: string;
  source?: string;
}

export const useWords = (uid?: string) => {
  const [words, setWords] = useState<Word[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAll = async () => {
    if (!uid) return;
    setRefreshing(true);
    try {
      const [base, correct, incorrect, expert] = await Promise.all([
        getWords(uid),
        fetchCorrectWords(uid),
        fetchIncorrectWords(uid),
        fetchExpertWords(uid),
      ]);

      const format = (items: any[], level: string, source?: string) =>
        items.map((w: any, i: number) => ({
          id: w.id || w.word || `${level}-${i}`,
          word: w.word || "no word",
          translation: w.translations || "no translation",
          level,
          source,
        }));

      setWords([
        ...format(base, "To learn"),
        ...format(correct, "Good with"),
        ...format(incorrect, "To learn", "incorrect"),
        ...format(expert, "Expert"),
      ]);
    } catch (err) {
      console.error("Failed to fetch words:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [uid]);

  return {
    words,
    refreshing,
    refetch: fetchAll,
  };
};
