import styled from "styled-components/native";

export const StyledInput = styled.TextInput<{ hasError?: boolean }>`
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

export const StyledErrorText = styled.Text`
  color: #e74c3c;
  margin-bottom: 10px;
  margin-left: 5px;
  font-size: 14px;
`;
