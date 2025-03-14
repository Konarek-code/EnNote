import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  max-height: 700px;
  padding: 20px;
  background-color: rgb(18, 21, 54);
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 100px;
`;
export const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 45px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: "IrishGrover-Regular";
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
`;

export const WordsPassed = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #fff;
`;
export const Input = styled.TextInput`
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: white;
`;

export const StyledButton = styled.TouchableOpacity`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: rgb(26, 92, 179);
  align-items: center;
  shadow-color: rgb(96, 141, 238);
  shadow-opacity: 0.2;
  shadow-radius: 4px;
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
