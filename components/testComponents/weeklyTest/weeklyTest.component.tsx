import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fetchWeeklyWords, promoteWord } from "@/api/words";
import Button from "@/components/buttons/button.component";
import { ButtonText } from "@/components/buttons/button.styles";

import {
  StyledMessage,
  StyledContainer,
  StyledTitle,
  StyledParagraph,
  StyledInput,
} from "./weeklyTest.style";

interface Word {
  word: string;
  translations: string[];
  level: "incorrectWords" | "correctWords" | "expertWords";
}

const WeeklyTestComponent = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const uid = useSelector((state: any) => state.user.uid);

  useEffect(() => {
    if (!uid) return;

    const loadWords = async () => {
      setLoading(true);
      try {
        const data = await fetchWeeklyWords(uid);
        setWords(data);
      } catch (error) {
        console.error("Failed to fetch weekly words:", error);
        setMessage("Failed to load words");
      } finally {
        setLoading(false);
      }
    };

    loadWords();
  }, [uid]);

  const handleSubmit = async () => {
    const currentWord = words[currentIndex];
    if (!currentWord) return;

    const isCorrect = currentWord.translations.includes(userInput.trim());

    if (isCorrect) {
      try {
        await promoteWord(uid, currentWord.word, currentWord.level);
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

  if (loading) {
    return <StyledMessage>Loading...</StyledMessage>;
  }

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
        disabled={loading}
      />
      <Button type="action" onPress={handleSubmit} disabled={loading}>
        <ButtonText>{loading ? "Loading..." : "Submit"}</ButtonText>
      </Button>
      <StyledMessage>{message}</StyledMessage>
    </StyledContainer>
  );
};

export default WeeklyTestComponent;
