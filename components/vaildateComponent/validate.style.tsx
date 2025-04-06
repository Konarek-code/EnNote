import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  max-height: 700px;
  padding: 20px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: auto;
  margin-bottom: 50px;
`;
export const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 45px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-family: "IrishGrover-Regular";
  font-weight: bold;
  margin-bottom: 10px;
  color: rgb(233, 233, 233);
`;
export const WordsPassed = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #e3f2fd;
`;

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
  font-weight: bold;
  font-size: 16px;
`;

export const Message = styled.Text`
  margin-top: 10px;
  color: ${(props: { isValid: boolean }) =>
    props.isValid ? "#4caf50" : "#ff5252"};
  font-weight: bold;
`;
