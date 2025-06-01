import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

export const Container = styled(LinearGradient).attrs({
  colors: ["#0D47A1", "#311B92"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-top: 60px;
`;

export const Brake = styled.View`
  height: 1px;
  background-color: grey;
  width: 90%;
  margin-vertical: 10px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 30px;
`;

export const BackButton = styled.View`
  position: absolute;
  top: 40px;
  left: 20px;
  z-index: 1;
`;

export const TestSection = styled.View`
  width: 90%;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  padding: 25px;
  border-radius: 20px;
  margin-bottom: 25px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 5;
`;

export const TestTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
`;

export const TimeText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
`;

export const ButtonRow = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;
