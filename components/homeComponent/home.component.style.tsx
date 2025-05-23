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

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
