import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: #1e1e2e;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #ffffff;
  font-family: "IrishGrover-Regular";
  margin-bottom: 20px;
`;

export const QuestionText = styled.Text`
  font-size: 18px;
  color: #cfcfcf;
  margin-bottom: 10px;
`;

export const WordText = styled.Text`
  font-size: 24px;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 20px;
`;

interface FeedbackContainerProps {
  feedback: "correct" | "incorrect" | null;
}

export const FeedbackContainer = styled.View<FeedbackContainerProps>`
  border: 2px solid;
  border-color: ${({ feedback }: FeedbackContainerProps) =>
    feedback === "correct"
      ? "green"
      : feedback === "incorrect"
      ? "red"
      : "transparent"};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;
export const InformationText = styled.Text`
  text-align: center;
  margin-bottom: 10px;
  color: #cfcfcf;
  font-size: 16px;
`;

export const FeedbackText = styled.Text<FeedbackContainerProps>`
  color: ${({ feedback }: FeedbackContainerProps) =>
    feedback === "correct" ? "green" : "red"};
  font-size: 16px;
  text-align: center;
`;
