import React from "react";
import WordInput from "../inputComponent/wordInput.component";
import {
  Container,
  StyledButton,
  ButtonText,
  Title,
  QuestionText,
  WordText,
} from "./testScreen.style";
import { View, Text } from "react-native";

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
  return (
    <Container>
      <Title>Test</Title>
      <QuestionText>
        <Text></Text>
      </QuestionText>
      {answerFeedback && (
        <View
          style={{
            borderColor:
              answerFeedback === "correct"
                ? "green"
                : answerFeedback === "incorrect"
                ? "red"
                : "transparent",
            borderWidth: 2,
            borderRadius: 10,
            padding: 5,
            marginBottom: 5,
          }}
        >
          {" "}
          <Text
            style={{
              color: answerFeedback === "correct" ? "green" : "red",
              fontSize: 16,
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            {answerFeedback === "correct"
              ? "✅ Good job!"
              : "👎 Oops, that's not quite right!"}
          </Text>
        </View>
      )}
      <WordText>{words[currentIndex]?.word}</WordText>
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
