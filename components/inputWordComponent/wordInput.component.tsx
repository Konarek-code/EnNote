import React from "react";
import { Platform } from "react-native";
import { Input, Wrapper } from "./wordInput.style";

type WordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const WordInput: React.FC<WordInputProps> = ({
  value,
  onChangeText,
  placeholder = "Type a word",
}) => {
  return (
    <Wrapper behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Input
        value={value}
        onChangeText={(text: string) => {
          onChangeText(text);
        }}
        placeholder={placeholder}
        keyboardType="default"
      />
    </Wrapper>
  );
};

export default WordInput;
