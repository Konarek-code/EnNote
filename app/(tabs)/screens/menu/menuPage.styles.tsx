import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #005f88;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: white;
  margin-vertical: 20px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #0077b6;
  padding: 15px;
  margin-vertical: 5px;
  border-radius: 10px;
`;

export const Icon = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

export const MenuText = styled.Text`
  font-size: 18px;
  color: white;
`;

export const BottomNav = styled.View`
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  background-color: white;
  padding: 10px;
`;

export const NavIcon = styled.Image`
  width: 30px;
  height: 30px;
`;
