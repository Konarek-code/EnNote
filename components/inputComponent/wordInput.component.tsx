import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Input } from "./wordInput.style";

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.wrapper}
    >
      <Input
        value={value}
        onChangeText={(text: string) => {
          onChangeText(text);
        }}
        placeholder={placeholder}
        keyboardType="default"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
});

export default WordInput;
