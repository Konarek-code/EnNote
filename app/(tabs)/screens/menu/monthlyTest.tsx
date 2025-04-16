import React, { useEffect, useState } from "react";
import {
  StyledContainer,
  StyledTitle,
  StyledParagraph,
  StyledInput,
  StyledButton,
  StyledButtonText,
  StyledMessage,
} from "./monthlyTest.style"; // Zaimportuj stylowane komponenty

interface Word {
  word: string;
  translations: string[];
}

const MonthlyTestScreen = () => {
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
          "https://backend-305143166666.europe-central2.run.app/get-monthly-words"
        );
        const data = await response.json();
        setWords(data);
      } catch (err) {
        console.error("Failed to fetch monthly words:", err);
      } finally {
        setLoading(false); // Zakończ ładowanie
      }
    };

    fetchWords();
  }, []);

  const handleSubmit = () => {
    const currentWord = words[currentIndex];

    if (!currentWord) return;

    const isCorrect = currentWord.translations.includes(userInput.trim());

    setMessage(isCorrect ? "✅ Correct!" : "❌ Incorrect. Try again.");
    setUserInput("");
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= words.length) {
    return <StyledMessage>🎉 Monthly Test completed!</StyledMessage>;
  }

  return (
    <StyledContainer>
      <StyledTitle>Monthly Test</StyledTitle>
      <StyledParagraph>
        Translate: <strong>{words[currentIndex].word}</strong>
      </StyledParagraph>
      <StyledInput
        value={userInput}
        onChangeText={(text: any) => setUserInput(text)} // Zmieniamy onChange na onChangeText
        placeholder="Your translation"
        editable={!loading} // Wyłącz pole w trakcie ładowania
      />
      <StyledButton onPress={handleSubmit} disabled={loading}>
        <StyledButtonText>{loading ? "Loading..." : "Submit"}</StyledButtonText>
      </StyledButton>
      <StyledMessage>{message}</StyledMessage>
    </StyledContainer>
  );
};

export default MonthlyTestScreen;
