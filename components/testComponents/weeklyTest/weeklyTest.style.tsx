import styled from "styled-components/native";

export const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 24px;
  background-color: #f0f4f8;
  border-radius: 8px;
  width: 100%;
`;

export const StyledTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #1e293b;
  text-align: center;
  margin-bottom: 20px;
`;

export const StyledParagraph = styled.Text`
  font-size: 18px;
  color: #334155;
  text-align: center;
  margin-bottom: 10px;
`;

interface StyledInputProps {
  disabled?: boolean;
}

export const StyledInput = styled.TextInput<StyledInputProps>`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid rgb(0, 107, 238);
  padding: 12px;
  font-size: 16px;
  margin-bottom: 16px;

  ${({ disabled }: { disabled?: boolean }) =>
    disabled &&
    `
      background-color: #eaeaea;
    `}
`;

export const StyledMessage = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
  color: #475569;
`;
