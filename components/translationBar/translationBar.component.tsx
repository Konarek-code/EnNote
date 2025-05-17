import React from "react";
import {
  TranslationBarContainer,
  TranslationText,
} from "./translationBar.style";
import { Text } from "react-native"; // Używamy komponentu Text z React Native zamiast h2

interface TranslationBarProps {
  translation: string | null;
}

const TranslationBar: React.FC<TranslationBarProps> = ({ translation }) => {
  return (
    <TranslationBarContainer>
      {translation ? (
        <TranslationText>Translation: {translation}</TranslationText>
      ) : (
        <TranslationText>No translation available</TranslationText>
      )}
    </TranslationBarContainer>
  );
};

export default TranslationBar;
