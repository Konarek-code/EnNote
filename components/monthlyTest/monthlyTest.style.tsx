import styled from "styled-components/native";

export const StyledContainer = styled.View`
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const StyledTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const StyledParagraph = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
`;

export const StyledInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;

  ${({ disabled }: { disabled?: boolean }) =>
    disabled &&
    `
    background-color: #eaeaea;
  `}
`;

export const StyledButton = styled.TouchableOpacity`
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${({ disabled }: { disabled?: boolean }) =>
    disabled &&
    `
    background-color: #5a5a5a;
    cursor: not-allowed;
  `}
`;

export const StyledButtonText = styled.Text`
  color: white;
  text-align: center;
`;

export const StyledMessage = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  color: #555;
  text-align: center;
`;
