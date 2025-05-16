import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTestResult } from "@/store/testResult.slicer";
import { saveTestResult } from "@/utils/testHistory";
import { clearWords } from "@/api/words";

type Word = {
  word: string;
  translations: string[];
};

export const useTestLogic = (uid: string) => {
  const dispatch = useDispatch();

  const [words, setWords] = useState<Word[]>([]);
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answerFeedback, setAnswerFeedback] = useState<
    "correct" | "incorrect" | null
  >(null);

  const handleTimeout = async (isCorrect: boolean) => {
    setAnswerFeedback(null);
    const nextIndex = currentWordIndex + 1;

    if (nextIndex < words.length) {
      setCurrentWordIndex(nextIndex);
      setUserAnswer("");
    } else {
      const finalScore = score + (isCorrect ? 1 : 0);
      const accuracy = (finalScore / words.length) * 100;
      const result = {
        date: new Date().toISOString().split("T")[0],
        score: finalScore,
        total: words.length,
        accuracy,
      };

      try {
        await saveTestResult(result);
        dispatch(setTestResult({ score: finalScore, total: words.length }));
        alert(`Test finished! Your score: ${finalScore}/${words.length}`);
      } catch (err) {
        console.error("Error saving test result:", err);
        alert("Something went wrong saving the result.");
      }
    }
  };

  const checkAnswer = async () => {
    const correctAnswer = words[currentWordIndex]?.translations;
    const trimmedUserAnswer = userAnswer.trim();
    let isCorrect = false;

    if (
      correctAnswer &&
      correctAnswer.some(
        (translation) =>
          translation.toLowerCase() === trimmedUserAnswer.toLowerCase()
      )
    ) {
      isCorrect = true;
      setAnswerFeedback("correct");

      const correctWord = {
        uid,
        word: words[currentWordIndex].word,
        translations: correctAnswer,
      };

      setCorrectWords((prev) => [...prev, correctWord]);

      try {
        await fetch(
          `https://backend-305143166666.europe-central2.run.app/save-correct-word`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(correctWord),
          }
        );
      } catch (err) {
        console.error("Error saving correct word:", err);
        alert("Error saving correct word");
      }

      setScore((prev) => prev + 1);
    } else {
      isCorrect = false;
      setAnswerFeedback("incorrect");

      const incorrectWord = {
        uid,
        word: words[currentWordIndex].word,
        translations: correctAnswer || [],
      };

      setIncorrectWords((prev) => [...prev, incorrectWord]);

      try {
        await fetch(
          `https://backend-305143166666.europe-central2.run.app/save-incorrect-word`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(incorrectWord),
          }
        );
      } catch (err) {
        console.error("Error saving incorrect word:", err);
        alert("Error saving incorrect word");
      }
    }

    setTimeout(() => handleTimeout(isCorrect), 1000);
  };

  const startNewTest = async () => {
    setWords([]);
    setCurrentWordIndex(0);
    setScore(0);
    setUserAnswer("");
    setCorrectWords([]);
    setIncorrectWords([]);
    setAnswerFeedback(null);

    try {
      await clearWords(uid);
    } catch (error) {
      console.error("Error clearing words:", error);
    }
  };

  return {
    words,
    setWords,
    correctWords,
    incorrectWords,
    userAnswer,
    setUserAnswer,
    currentWordIndex,
    setCurrentWordIndex,
    score,
    checkAnswer,
    startNewTest,
    answerFeedback,
  };
};
