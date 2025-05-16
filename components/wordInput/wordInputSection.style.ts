import styled from "styled-components/native";

export const StyledButton = styled.TouchableOpacity`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #1976d2;
  align-items: center;
  shadow-color: #64b5f6;
  shadow-opacity: 0.5;
  shadow-radius: 6px;
  elevation: 10;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;

export const Message = styled.Text`
  margin-top: 10px;
  color: ${(props: { isValid: boolean }) =>
    props.isValid ? "#4caf50" : "#ff5252"};
  font-weight: bold;
`;
export const WordsPassed = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #e3f2fd;
`;
