import React from 'react';
import { Platform } from 'react-native';

import { Input, Wrapper } from './wordInput.style';

type WordInputProps = {
  value: string;
  onChangeText: () => void;
  placeholder?: string;
};

const WordInput: React.FC<WordInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Type a word',
}) => {
  return (
    <Wrapper behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType="default"
      />
    </Wrapper>
  );
};

export default WordInput;
