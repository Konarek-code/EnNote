import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(LinearGradient).attrs({
  colors: ["#0D47A1", "#311B92"], // Gradient: granat → fiolet
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: #bbdefb;
  margin-bottom: 20px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: rgba(0, 119, 182, 0.9);
  padding: 15px;
  margin-vertical: 5px;
  border-radius: 12px;
  shadow-color: #64b5f6;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 6;
`;

export const Icon = styled.Image`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

export const MenuText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: 600;
`;

export const BottomNav = styled.View`
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const NavIcon = styled.Image`
  width: 32px;
  height: 32px;
  tint-color: #bbdefb;
`;
