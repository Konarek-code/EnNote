import { useEffect, useState } from "react";

import {
  fetchCorrectWords,
  fetchExpertWords,
  fetchIncorrectWords,
} from "../api/words";

export const useWordStats = (uid: string) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [expertCount, setExpertCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const fetchStats = async () => {
      try {
        const [correctData, expertData, incorrectData] = await Promise.all([
          fetchCorrectWords(uid),
          fetchExpertWords(uid),
          fetchIncorrectWords(uid),
        ]);

        setCorrectCount(correctData.length || 0);
        setExpertCount(expertData.length || 0);
        setIncorrectCount(incorrectData.length || 0);
      } catch (err) {
        console.error("Error fetching word stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [uid]);

  return { correctCount, expertCount, incorrectCount, loading };
};
