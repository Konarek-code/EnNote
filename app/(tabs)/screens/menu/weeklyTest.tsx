import React, { useEffect, useState } from "react";
import {
  StyledMessage,
  StyledContainer,
  StyledTitle,
  StyledParagraph,
  StyledInput,
  StyledButton,
  StyledButtonText,
} from "./weeklyTest.style";

interface Word {
  word: string;
  translations: string[];
  level: "incorrectWords" | "correctWords";
}

const WeeklyTestScreen = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true); // Rozpocznij ładowanie
      try {
        const response = await fetch(
          "https://backend-305143166666.europe-central2.run.app/get-weekly-words"
        );
        const data = await response.json();
        setWords(data);
      } catch (err) {
        console.error("Failed to fetch weekly words:", err);
      } finally {
        setLoading(false); // Zakończ ładowanie
      }
    };

    fetchWords();
  }, []);

  const handleSubmit = async () => {
    const currentWord = words[currentIndex];

    if (!currentWord) return;

    const isCorrect = currentWord.translations.includes(userInput.trim());

    if (isCorrect) {
      // Promote if eligible
      try {
        await fetch(
          "https://backend-305143166666.europe-central2.run.app/promote-word",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              word: currentWord.word,
              fromCollection: currentWord.level,
            }),
          }
        );
        setMessage("✅ Correct! Word promoted.");
      } catch (err) {
        setMessage("✅ Correct! But promotion failed.");
        console.error(err);
      }
    } else {
      setMessage("❌ Incorrect. Try again.");
    }

    setUserInput("");
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= words.length) {
    return <StyledMessage>🎉 Test completed!</StyledMessage>;
  }
  return (
    <StyledContainer>
      <StyledTitle>Weekly Test</StyledTitle>
      <StyledParagraph>Translate: {words[currentIndex].word}</StyledParagraph>
      <StyledInput
        value={userInput}
        onChangeText={(text: string) => setUserInput(text)}
        placeholder="Your translation"
        disabled={loading} // Wyłącz pole w trakcie ładowania
      />
      <StyledButton onPress={handleSubmit} disabled={loading}>
        <StyledButtonText>{loading ? "Loading..." : "Submit"}</StyledButtonText>
      </StyledButton>
      <StyledMessage>{message}</StyledMessage>
    </StyledContainer>
  );
};

export default WeeklyTestScreen;
