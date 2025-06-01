import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #1e293b;
`;

export const ScrollContainer = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 30,
  },
}))``;

export const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  margin-top: 20px;
`;

export const Brake = styled.View`
  border-bottom-color: grey;
  border-bottom-width: 1px;
  margin-vertical: 10px;
  width: 100%;
`;

export const Card = styled.View`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  elevation: 3;
  justify-content: center;
  align-items: center;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Percentage = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #3b82f6;
`;

export const Progress = styled.View`
  margin-top: 5px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const MiniCard = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-horizontal: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  elevation: 3;
`;

export const SmallText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const BoldText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
