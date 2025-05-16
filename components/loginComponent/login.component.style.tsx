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

export const Input = styled.TextInput<{ hasError?: boolean }>`
  background-color: white;
  border-width: 1px;
  border-color: ${({ hasError }: { hasError?: boolean }) =>
    hasError ? "#e74c3c" : "#ccc"};
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 5px;
  elevation: 1;
`;

export const ErrorText = styled.Text`
  color: #e74c3c;
  margin-bottom: 10px;
  margin-left: 5px;
  font-size: 14px;
`;

export const ButtonPrimary = styled.TouchableOpacity`
  background-color: #3b82f6;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-top: 10px;
  shadow-color: #3b82f6;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 3;
`;

export const ButtonPrimaryText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 18px;
`;

export const GoogleButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: white;
  border-width: 1px;
  border-color: #ddd;
  padding: 14px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 5px;
  elevation: 1;
`;

export const GoogleIconImage = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 12px;
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
