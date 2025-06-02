import { Platform } from 'react-native';

import { Input, Wrapper } from './wordInput.style';

type WordInputProps = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void;
  placeholder?: string;
};
const WordInput: React.FC<WordInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Type a word',
}: WordInputProps) => {
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
