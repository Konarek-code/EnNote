import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #1e293b;
  padding: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: left;
  margin-top: 10px;
`;

export const Brake = styled.View`
  border-bottom-color: grey;
  border-bottom-width: 1px;
  margin-vertical: 10px;
  width: 100%;
`;

export const LevelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

interface LevelButtonProps {
  backgroundColor: string;
}

export const LevelButton = styled.TouchableOpacity<LevelButtonProps>`
  flex: 1;
  align-items: center;
  padding: 10px;
  margin-horizontal: 5px;
  border-radius: 8px;
  background-color: ${(props: LevelButtonProps) => props.backgroundColor};
`;

export const LevelText = styled.Text`
  color: white;
  font-weight: bold;
`;

export const WordCard = styled.View`
  background-color: #3b82f6;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Word = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

export const Translation = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  color: #d1d5db;
`;
