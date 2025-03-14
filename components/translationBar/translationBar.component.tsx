import React from "react";
import { TranslationBarContainer } from "./translationBar.style";
import { Text } from "react-native"; // Używamy komponentu Text z React Native zamiast h2

interface TranslationBarProps {
  translation: string | null;
}

const TranslationBar: React.FC<TranslationBarProps> = ({ translation }) => {
  return (
    <TranslationBarContainer>
      {translation ? (
        <Text style={{ fontSize: 18, color: "#fff" }}>
          Translation: {translation}
        </Text>
      ) : (
        <Text style={{ fontSize: 18, color: "#fff" }}>
          No translation available
        </Text>
      )}
    </TranslationBarContainer>
  );
};

export default TranslationBar;
