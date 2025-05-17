import React from "react";
import WordInput from "../../inputWordComponent/wordInput.component";
import {
  Container,
  StyledButton,
  ButtonText,
  Title,
  QuestionText,
  WordText,
  FeedbackContainer,
} from "./testScreen.style";
import { Text } from "react-native";

interface TestScreenProps {
  words: { word: string; translations: string[] }[];
  currentIndex: number;
  userAnswer: string;
  onAnswerChange: (text: string) => void;
  onCheckAnswer: () => Promise<void>;
  onEndTest: () => void;
  answerFeedback: "correct" | "incorrect" | null;
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
        <Text
          style={{ textAlign: "center", marginBottom: 10, color: "#cfcfcf" }}
        >
          You must add at least one word before starting a test.
        </Text>
        <StyledButton onPress={onEndTest}>
          <ButtonText>Back</ButtonText>
        </StyledButton>
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
          <Text
            style={{
              color: answerFeedback === "correct" ? "green" : "red",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {answerFeedback === "correct"
              ? "✅ Good job!"
              : "👎 Oops, that's not quite right!"}
          </Text>
        </FeedbackContainer>
      )}

      <WordText>{currentWord.word}</WordText>

      <WordInput value={userAnswer} onChangeText={onAnswerChange} />

      <StyledButton onPress={onCheckAnswer}>
        <ButtonText>Check Answer</ButtonText>
      </StyledButton>

      <StyledButton onPress={onEndTest}>
        <ButtonText>End Test</ButtonText>
      </StyledButton>
    </Container>
  );
};

export default TestScreen;
