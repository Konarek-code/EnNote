import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WordInput from "../inputComponent/wordInput.component"; // dostosuj ścieżkę jeśli inna
import {
  Container,
  StyledButton,
  Message,
  WordsPassed,
  ButtonText,
  StyledImage,
} from "./validate.style";
import { useFonts } from "expo-font";
import TranslationBar from "../translationBar/translationBar.component";
import TestScreen from "../testScreen/testscreen";
import { router } from "expo-router";

const WordValidator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [words, setWords] = useState<
    { word: string; translations: string[] }[]
  >([]);

  const [incorrectWords, setIncorrectWords] = useState<
    { word: string; translations: string[] }[]
  >([]);

  const [correctWords, setCorrectWords] = useState<
    { word: string; translations: string[] }[]
  >([]);

  const [answerFeedback, setAnswerFeedback] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [currentTranslation, setCurrentTranslation] = useState<string | null>(
    null
  );
  const [accuracy, setAccuracy] = useState<number | null>(null);

  let [fontsLoaded] = useFonts({
    "IrishGrover-Regular": require("../../assets/fonts/IrishGrover-Regular.ttf"),
  });

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(
        "https://backend-305143166666.europe-central2.run.app/get-words"
      );
      const data = await response.json();
      setWords(data);
    };

    fetchWords();
  }, []);

  const fetchCounter = async () => {
    try {
      const storedCounter = await AsyncStorage.getItem("counter");
      if (storedCounter !== null) {
        setCounter(parseInt(storedCounter, 10));
      } else {
        setCounter(0);
      }
    } catch (error) {
      console.error("Error fetching counter:", error);
      setCounter(0);
    }
  };

  const saveCounter = async (newCounter: number) => {
    try {
      await AsyncStorage.setItem("counter", newCounter.toString());
      setCounter(newCounter);
    } catch (error) {
      console.error("Error saving counter:", error);
    }
  };
  const incrementCounter = () => {
    const newCounter = counter + 1;
    saveCounter(newCounter);
  };

  const resetCounter = async () => {
    try {
      await AsyncStorage.removeItem("counter");
      setCounter(0);
      console.log("Counter reset to 0");
    } catch (error) {
      console.error("Error resetting counter:", error);
    }
  };

  useEffect(() => {
    fetchCounter();
  }, []);

  const handleInputChange = (text: string) => {
    const onlyLetters = text.replace(/[^a-zA-Z]/g, "");
    if (onlyLetters !== text) {
      setInputValue(onlyLetters);
    } else {
      setInputValue(text);
      setValidationMessage(null);
    }
  };

  const validateWord = async () => {
    if (!inputValue.trim()) {
      setValidationMessage("Please enter a word.");
      setIsValid(false);
      return;
    }
    const rawInput = inputValue.trim().toLowerCase();

    const wordExists =
      words.some((word) => word.word.toLowerCase() === rawInput) ||
      incorrectWords.some((word) => word.word.toLowerCase() === rawInput) ||
      correctWords.some((word) => word.word.toLowerCase() === rawInput);

    if (wordExists) {
      setValidationMessage(`The word "${rawInput}" has already been added.`);
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    setValidationMessage(null);
    setIsLoading(true);
    setValidationMessage(null);
    try {
      const response = await fetch(
        `https://backend-305143166666.europe-central2.run.app/translate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputValue.trim().toLocaleLowerCase(),
            source_lang: "EN",
            target_lang: "PL",
          }),
        }
      );

      if (response.ok) {
        const rawInput = inputValue.trim().toLowerCase();
        const data = await response.json();
        const translations = Array.isArray(data.translations)
          ? data.translations.map((translation: any) => translation.text)
          : [];

        if (
          translations.length === 0 ||
          translations[0].toLowerCase() === rawInput
        ) {
          setValidationMessage(`"${rawInput}" is not a valid English word.`);
          setIsValid(false);
        } else {
          setCurrentTranslation(translations[0]);
          setIsValid(true);

          setWords((prevWords) => [
            ...prevWords,
            { word: inputValue.trim(), translations },
          ]);
          await fetch(
            "https://backend-305143166666.europe-central2.run.app/save-word",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                word: inputValue.trim(),
                translations: translations.join(", "),
              }),
            }
          );
          incrementCounter();
        }
      } else {
        setValidationMessage(`The word "${inputValue.trim()}" is invalid.`);
        setIsValid(false);
      }
    } catch (error) {
      console.error("Error validating word:", error);
      setValidationMessage("An error occurred while validating the word.");
      setIsValid(false);
    } finally {
      setIsLoading(false);
      setInputValue("");
    }
  };

  const clearWords = async () => {
    try {
      await fetch(
        "https://backend-305143166666.europe-central2.run.app/clear-words",
        {
          method: "DELETE",
        }
      );
      setWords([]);
      alert("Test finished! The words list has been cleared.");
    } catch (error) {
      console.error("Error clearing words:", error);
      alert("Test finished, but there was an error clearing the words.");
    }
  };

  const startTest = () => {
    setIsTestStarted(true);
    setCurrentWordIndex(0);
    setScore(0);
    resetCounter();
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
      try {
        const correctWord = {
          word: words[currentWordIndex].word,
          translations: correctAnswer,
        };

        setCorrectWords((prev: { word: string; translations: string[] }[]) => [
          ...prev,
          correctWord,
        ]);

        await fetch(
          "https://backend-305143166666.europe-central2.run.app/save-correct-word",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(correctWord),
          }
        );
        alert("Correct answer added to the list");
      } catch (error) {
        console.error("Error saving correct word:", error);
        alert("Error adding correct word");
      }
      setScore((prevScore) => prevScore + 1);
    } else {
      isCorrect = false;
      setAnswerFeedback("incorrect");
      try {
        const incorrectWord = {
          word: words[currentWordIndex].word,
          translations: correctAnswer || [],
        };

        setIncorrectWords((prev) => [...prev, incorrectWord]);
        await fetch(
          "https://backend-305143166666.europe-central2.run.app/save-incorrect-word",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(incorrectWord),
          }
        );
        alert("Incorrect answer added to the list");
      } catch (error) {
        console.error("Error saving incorrect word:", error);
        alert("Error adding incorrect word");
      }
    }

    setTimeout(() => {
      setAnswerFeedback(null);
      const nextIndex = currentWordIndex + 1;
      if (nextIndex < words.length) {
        setCurrentWordIndex(nextIndex);
        setUserAnswer("");
      } else {
        const accuracy = ((score + (isCorrect ? 1 : 0)) / words.length) * 100;
        setAccuracy(accuracy);
        alert(
          `Test finished! Your score: ${score + (isCorrect ? 1 : 0)}/${
            words.length
          }`
        );
        router.push({
          pathname: "/(tabs)/screens/menu/stats",
          params: { score, total: words.length },
        });
      }
    }, 1000);
  };

  const startNewTest = () => {
    setIsTestStarted(false);
    setCurrentWordIndex(0);
    clearWords();
    setScore(0);
    setCounter(0);
    setWords([]);
    setUserAnswer("");
  };
  return (
    <>
      {!isTestStarted ? (
        <Container>
          <Text
            style={{
              fontFamily: "IrishGrover-Regular",
              fontSize: 36,
              color: "#fff",
              textAlign: "center",
              marginBottom: 0,
            }}
          >
            EnNote
          </Text>
          <StyledImage source={require("../../assets/images/Iconpage.png")} />
          <WordsPassed>Words Passed: {counter}/10</WordsPassed>

          {counter < 10 && (
            <>
              <WordInput value={inputValue} onChangeText={handleInputChange} />
              <StyledButton onPress={validateWord} disabled={isLoading}>
                <ButtonText>
                  {isLoading ? "Validating..." : "Validate"}
                </ButtonText>
              </StyledButton>
            </>
          )}
          {validationMessage && (
            <>
              <Message isValid={isValid}>{validationMessage}</Message>
              {counter >= 10 &&
                alert(
                  "You have reached the maximum number of words. Please start the test."
                )}
            </>
          )}
          {counter >= 10 && (
            <StyledButton onPress={startTest}>
              <ButtonText>Start Test</ButtonText>
            </StyledButton>
          )}
          <TranslationBar translation={currentTranslation} />
        </Container>
      ) : (
        <TestScreen
          words={words}
          currentIndex={currentWordIndex}
          userAnswer={userAnswer}
          onAnswerChange={setUserAnswer}
          onCheckAnswer={checkAnswer}
          onEndTest={startNewTest}
          answerFeedback={answerFeedback}
        />
      )}
    </>
  );
};

export default WordValidator;
