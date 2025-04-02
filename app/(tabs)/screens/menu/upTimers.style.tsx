import styled from "styled-components/native";

import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(LinearGradient).attrs({
  colors: ["#0D47A1", "#311B92"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
`;
export const Brake = styled.View`
  borderbottomcolor: "grey";
  borderbottomwidth: 1;
  marginvertical: 10;
  width: "100%";
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
`;
export const BackButton = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
`;

export const TestSection = styled.View`
  width: 90%;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const TestTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

export const TimerBox = styled.View`
  background: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const RemainingText = styled.Text`
  font-size: 16px;
  color: black;
`;

export const TimeText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
`;

export const ActionButton = styled.TouchableOpacity<{ secondary: boolean }>`
  background: ${({ secondary }: { secondary: boolean }) =>
    secondary ? "#8884d8" : "#6a1b9a"};
  padding: 12px 20px;
  border-radius: 10px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 5;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
`;
