import React, { useEffect, useState } from "react";
import {
  StyledButton,
  ButtonText,
  Message,
  WordsPassed,
} from "./wordInputSection.style";
import WordInput from "../inputComponent/wordInput.component";
import TranslationBar from "../translationBar/translationBar.component";
import { validateAndTranslateWord, saveWord, getWords } from "@/api/words";
import { useSelector } from "react-redux";
import { useCounter } from "@/hooks/useCounter";

type Props = {
  onWordAdded: (word: { word: string; translations: string[] }) => void;
  onTestReady: () => void;
};

const WordInputSection: React.FC<Props> = ({ onWordAdded, onTestReady }) => {
  const [inputValue, setInputValue] = useState("");
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );
  const { counter, incrementCounter } = useCounter();
  const [isLoading, setIsLoading] = useState(false);
  const [translation, setTranslation] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const user = useSelector((state: any) => state.user);
  const [words, setWords] = useState<
    { word: string; translations: string[] }[]
  >([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const wordsFromApi = await getWords(user.uid);
        setWords(wordsFromApi);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    if (user?.uid) {
      fetchWords();
    }
  }, [user.uid]);

  const handleInputChange = (text: string) => {
    const onlyLetters = text.replace(/[^a-zA-Z]/g, "");
    setInputValue(onlyLetters);
    setValidationMessage(null);
  };

  const handleValidate = async () => {
    const word = inputValue.trim().toLowerCase();
    if (!word) {
      setValidationMessage("Please enter a word.");
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    try {
      const translations = await validateAndTranslateWord(word);

      if (translations.length === 0 || translations[0].toLowerCase() === word) {
        setValidationMessage(`"${word}" is not a valid English word.`);
        setIsValid(false);
        return;
      }

      if (words.some((w) => w.word.toLowerCase() === word)) {
        setValidationMessage(`"${word}" already exists in the database.`);
        setIsValid(false);
        return;
      }

      await saveWord(user.uid, word, translations);
      setIsValid(true);
      setTranslation(translations[0]);
      onWordAdded({ word, translations });
      incrementCounter();

      if (counter + 1 >= 10) {
        onTestReady();
      }
    } catch (err) {
      console.error(err);
      setValidationMessage("Error validating or saving the word.");
      setIsValid(false);
    } finally {
      setIsLoading(false);
      setInputValue("");
    }
  };

  return (
    <>
      <WordsPassed>Words Passed: {counter}/10</WordsPassed>
      <WordInput value={inputValue} onChangeText={handleInputChange} />
      <StyledButton onPress={handleValidate} disabled={isLoading}>
        <ButtonText>
          {isLoading ? "Translating word..." : "Translate"}
        </ButtonText>
      </StyledButton>
      {validationMessage && (
        <Message isValid={isValid}>{validationMessage}</Message>
      )}
      <TranslationBar translation={translation} />
    </>
  );
};

export default WordInputSection;
