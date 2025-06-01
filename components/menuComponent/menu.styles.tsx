import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

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
