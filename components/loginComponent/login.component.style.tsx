// LoginScreen.styles.ts
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 30px 20px;
  background-color: #f7f9fc;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #222;
  margin-bottom: 40px;
  text-align: center;
`;

export const ErrorText = styled.Text`
  color: #e74c3c;
  margin-bottom: 10px;
  margin-left: 5px;
  font-size: 14px;
`;

export const SignupWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 25px;
`;

export const SignupRegular = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const SignupBold = styled.Text`
  font-size: 16px;
  color: #3b82f6;
  font-weight: 700;
`;

export const HorizontalLine = styled.View`
  height: 1px;
  background-color: #ccc;
  width: 100%;
  margin: 10px 0;
`;
export const BreakText = styled.Text`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin: 10px 0;
`;
