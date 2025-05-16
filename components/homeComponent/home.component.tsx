import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, StyledImage } from "./home.component.style";

import WordInputSection from "../wordInput/wordInputSection.component";
import TestScreen from "../testScreen/testscreen";

import { useCounter } from "@/hooks/useCounter";
import { getWords } from "@/api/words";
import { useTestLogic } from "@/hooks/useTestLogic";

const HomeComponent: React.FC = () => {
  const { resetCounter } = useCounter();
  const user = useSelector((state: any) => state.user);

  const [isTestStarted, setIsTestStarted] = useState(false);

  const {
    words,
    setWords,
    currentWordIndex,
    userAnswer,
    setUserAnswer,
    answerFeedback,
    checkAnswer,
    startNewTest,
  } = useTestLogic(user.uid);

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

  return (
    <>
      {!isTestStarted ? (
        <Container>
          <StyledImage source={require("../../assets/images/Iconpage.png")} />
          <WordInputSection
            onWordAdded={(word) => setWords((prev) => [...prev, word])}
            onTestReady={() => {
              setIsTestStarted(true);
              resetCounter();
            }}
          />
        </Container>
      ) : (
        <TestScreen
          words={words}
          currentIndex={currentWordIndex}
          userAnswer={userAnswer}
          onAnswerChange={setUserAnswer}
          onCheckAnswer={checkAnswer}
          onEndTest={() => {
            startNewTest();
            setIsTestStarted(false);
            resetCounter();
          }}
          answerFeedback={answerFeedback}
        />
      )}
    </>
  );
};

export default HomeComponent;
