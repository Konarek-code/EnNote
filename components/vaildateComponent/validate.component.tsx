import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

import {
  Container,
  Input,
  StyledButton,
  Message,
  WordsPassed,
  ButtonText,
  StyledImage,
} from "./validate.style";
import { useFonts } from "expo-font";
import TranslationBar from "../translationBar/translationBar.component";

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

  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [currentTranslation, setCurrentTranslation] = useState<string | null>(
    null
  );

  let [fontsLoaded] = useFonts({
    "IrishGrover-Regular": require("../../assets/fonts/IrishGrover-Regular.ttf"),
  });

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(
        "https://backend-305143166666.europe-west1.run.app/get-words"
      );
      const data = await response.json();
      setWords(data);
    };

    fetchWords();
  }, []);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    setValidationMessage(null);
  };

  const validateWord = async () => {
    if (!inputValue.trim()) {
      setValidationMessage("Please enter a word.");
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    setValidationMessage(null);
    try {
      const response = await fetch(
        `https://backend-305143166666.europe-west1.run.app/translate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputValue.trim(),
            target_lang: "PL",
          }),
        }
      );

      if (response.ok) {
        setCounter((prevCounter) => prevCounter + 1);
        const data = await response.json();
        const translations = data.translations.map(
          (translation: any) => translation.text
        );
        setCurrentTranslation(translations[0]);
        setIsValid(true);

        setWords((prevWords) => [
          ...prevWords,
          { word: inputValue.trim(), translations },
        ]);
        await fetch(
          "https://backend-305143166666.europe-west1.run.app/save-word",
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
        "https://backend-305143166666.europe-west1.run.app/clear-words",
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
  };

  const handleAnswerChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setUserAnswer(e.nativeEvent.text);
  };

  const checkAnswer = async () => {
    const correctAnswer = words[currentWordIndex]?.translations; // Pobranie poprawnej odpowiedzi z listy słów
    const trimmedUserAnswer = userAnswer.trim(); // Przygotowanie odpowiedzi użytkownika

    // Sprawdzenie odpowiedzi
    if (
      correctAnswer &&
      correctAnswer.some(
        (translation) =>
          translation.toLowerCase() === trimmedUserAnswer.toLowerCase()
      )
    ) {
      try {
        await fetch(
          "https://backend-305143166666.europe-west1.run.app/save-correct-word",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              word: words[currentWordIndex].word,
              translations: correctAnswer.join(", "),
            }),
          }
        );
        alert("Correct answer added to the list");
      } catch (error) {
        console.error("Error saving correct word:", error);
        alert("Error adding correct word");
      }
      setScore((prevScore) => prevScore + 1);
    } else {
      try {
        await fetch(
          "https://backend-305143166666.europe-west1.run.app/save-incorrect-word",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              word: words[currentWordIndex].word,
              translations: correctAnswer.join(", "),
            }),
          }
        );
        alert("Incorrect answer added to the list");
      } catch (error) {
        console.error("Error saving incorrect word:", error);
        alert("Error adding incorrect word");
      }
    }

    const nextIndex = currentWordIndex + 1;
    if (nextIndex < words.length) {
      setCurrentWordIndex(nextIndex);
      setUserAnswer(""); // Wyczyszczenie pola odpowiedzi
    } else {
      alert(`Test finished! Your score: ${score + 1}/${words.length}`);
    }
  };

  const startNewTest = () => {
    setIsTestStarted(false);
    setCurrentWordIndex(0);
    clearWords();
    setScore(0);
    window.location.reload();
  };
  return (
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
      {!isTestStarted ? (
        <>
          <Input
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Type a word"
          />
          <StyledButton onPress={validateWord} disabled={isLoading}>
            <ButtonText>{isLoading ? "Validating..." : "Validate"}</ButtonText>
          </StyledButton>
          {validationMessage && (
            <Message isValid={isValid}>{validationMessage}</Message>
          )}
          {words.length >= 10 && (
            <StyledButton title="Start Test" onPress={startTest} />
          )}
          <TranslationBar translation={currentTranslation} />
        </>
      ) : (
        <View style={{ padding: 20 }}>
          <Text>Test</Text>
          <Text style={{ marginVertical: 10 }}>
            Question {currentWordIndex + 1}/{words.length}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {words[currentWordIndex]?.word}
          </Text>
          <Input
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder="Your answer"
          />
          <StyledButton title="Check Answer" onPress={() => {}} />
          <StyledButton title="Start New Test" onPress={startNewTest} />
        </View>
      )}
    </Container>
  );
};

export default WordValidator;
