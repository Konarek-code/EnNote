import styled from "styled-components/native";

export const TranslationBarContainer = styled.View`
  width: 100%;
  height: 100px;
  max-height: 400px;
  margin-top: 30px;
  padding: 15px;
  background: rgba(171, 173, 196, 0.7);
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const TranslationText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
