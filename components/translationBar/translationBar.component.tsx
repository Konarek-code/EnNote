import React from "react";

import {
  TranslationBarContainer,
  TranslationText,
} from "./translationBar.style";

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
