import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWords } from '@/api/words';
import { useCounter } from '@/hooks/useCounter';
import { useTestLogic } from '@/hooks/useTestLogic';
import { setFirstTestStarted, setTestStartTimestamp } from '@/store/user/userSlice';

import { Container, StyledImage } from './home.component.style';
import TestScreen from '../testComponents/basicTest/testscreen';
import WordInputSection from '../wordInputSection/wordInputSection.component';

const HomeComponent: React.FC = () => {
  const { resetCounter } = useCounter();
  const user = useSelector((state: any) => state.user);

  const [isTestStarted, setIsTestStarted] = useState(false);
  const dispatch = useDispatch();

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
        console.error('Error fetching words:', error);
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
          <StyledImage source={require('../../assets/images/Iconpage.png')} />
          <WordInputSection
            onWordAdded={(word) => setWords((prev) => [...prev, word])}
            onTestReady={() => {
              setIsTestStarted(true);
              resetCounter();
              if (!user.firstTestStarted) {
                dispatch(setFirstTestStarted(true));
                dispatch(setTestStartTimestamp(Math.floor(Date.now() / 1000).toString()));
              }
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
