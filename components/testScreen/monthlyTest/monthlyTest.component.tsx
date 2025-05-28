import React, { useEffect, useState } from "react";
import {
  StyledMessage,
  StyledContainer,
  StyledTitle,
  StyledParagraph,
  StyledInput,
} from "./monthlyTest.style";
import { useSelector } from "react-redux";
import { fetchMonthlyWords, promoteWord, Word } from "@/api/words"; // <- upewnij się, że ścieżka jest poprawna
import Button from "@/components/buttons/button.component";
import { ButtonText } from "@/components/buttons/button.styles";

const MonthlyTestComponent = () => {
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
        const monthlyWords = await fetchMonthlyWords(uid);
        setWords(monthlyWords);
      } catch (err) {
        console.error("Failed to load monthly words:", err);
        setMessage("❌ Failed to load words.");
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
        console.error("Promotion failed:", err);
        setMessage("✅ Correct! But promotion failed.");
      }
    } else {
      setMessage("❌ Incorrect. Try again.");
    }

    setUserInput("");
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading && words.length === 0) {
    return <StyledMessage>Loading monthly words...</StyledMessage>;
  }

  if (currentIndex >= words.length) {
    return <StyledMessage>🎉 Monthly test completed!</StyledMessage>;
  }

  return (
    <StyledContainer>
      <StyledTitle>Monthly Test</StyledTitle>
      <StyledParagraph>Translate: {words[currentIndex].word}</StyledParagraph>
      <StyledInput
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Your translation"
        editable={!loading}
      />
      <Button onPress={handleSubmit} type="action" disabled={loading}>
        <ButtonText>{loading ? "Loading..." : "Submit"}</ButtonText>
      </Button>
      <StyledMessage>{message}</StyledMessage>
    </StyledContainer>
  );
};

export default MonthlyTestComponent;
