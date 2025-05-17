import styled from "styled-components/native";

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
