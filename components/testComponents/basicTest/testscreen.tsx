import React from 'react';

import Button from '@/components/buttons/button.component';
import { ButtonText } from '@/components/buttons/button.styles';

import {
  Container,
  Title,
  QuestionText,
  WordText,
  FeedbackContainer,
  InformationText,
  FeedbackText,
} from './testScreen.style';
import WordInput from '../../inputWordComponent/wordInput.component';

interface TestScreenProps {
  words: { word: string; translations: string[] }[];
  currentIndex: number;
  userAnswer: string;
  onAnswerChange: () => void;
  onCheckAnswer: () => Promise<void>;
  onEndTest: () => void;
  answerFeedback: 'correct' | 'incorrect' | null;
}

const TestScreen: React.FC<TestScreenProps> = ({
  words,
  currentIndex,
  userAnswer,
  onAnswerChange,
  onCheckAnswer,
  onEndTest,
  answerFeedback,
}) => {
  const currentWord = words[currentIndex];

  if (!currentWord) {
    return (
      <Container>
        <Title>No Words Available</Title>
        <InformationText>You must add at least one word before starting a test.</InformationText>
        <Button type="primary" onPress={onEndTest}>
          <ButtonText>Back</ButtonText>
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Translation Test</Title>

      <QuestionText>
        Question {currentIndex + 1} of {words.length}
      </QuestionText>

      {answerFeedback && (
        <FeedbackContainer feedback={answerFeedback}>
          <FeedbackText feedback={answerFeedback}>
            {answerFeedback === 'correct' ? '✅ Good job!' : "👎 Oops, that's not quite right!"}
          </FeedbackText>
        </FeedbackContainer>
      )}

      <WordText>{currentWord.word}</WordText>

      <WordInput value={userAnswer} onChangeText={onAnswerChange} />

      <Button type="primary" onPress={onCheckAnswer}>
        <ButtonText>Check Answer</ButtonText>
      </Button>

      <Button type="primary" onPress={onEndTest}>
        <ButtonText>End Test</ButtonText>
      </Button>
    </Container>
  );
};

export default TestScreen;
