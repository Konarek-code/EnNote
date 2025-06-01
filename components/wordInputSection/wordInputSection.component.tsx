import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { validateAndTranslateWord, saveWord, getWords } from '@/api/words';
import { useCounter } from '@/hooks/useCounter';

import { Message, WordsPassed } from './wordInputSection.style';
import Button from '../buttons/button.component';
import { ButtonText } from '../buttons/button.styles';
import WordInput from '../inputWordComponent/wordInput.component';
import TranslationBar from '../translationBar/translationBar.component';

type WordEntry = { word: string; translations: string[] };
type Props = {
  onWordAdded: () => void;
  onTestReady: () => void;
};
const WordInputSection: React.FC<Props> = ({ onWordAdded, onTestReady }) => {
  const [inputValue, setInputValue] = useState('');
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const { counter, incrementCounter } = useCounter();
  const [isLoading, setIsLoading] = useState(false);
  const [translation, setTranslation] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const user = useSelector((state: any) => state.user);

  const [words, setWords] = useState<WordEntry[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const wordsFromApi = await getWords(user.uid);
        setWords(wordsFromApi);
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };

    if (user?.uid) {
      fetchWords();
    }
  }, [user.uid]);

  const handleInputChange = (text: string) => {
    const onlyLetters = text.replace(/[^a-zA-Z]/g, '');
    setInputValue(onlyLetters);
    setValidationMessage(null);
  };

  const handleValidate = async () => {
    const inputword = inputValue.trim().toLowerCase();
    if (!inputword) {
      setValidationMessage('Please enter a word.');
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    try {
      const translations = await validateAndTranslateWord(inputword);

      if (translations.length === 0 || translations[0].toLowerCase() === inputword) {
        setValidationMessage(`"${inputword}" is not a valid English word.`);
        setIsValid(false);
        return;
      }
      if (words.some((w) => w.word.toLowerCase() === inputword)) {
        setValidationMessage(`"${inputword}" already exists in the database.`);
        setIsValid(false);
        return;
      }
      if (!user?.uid) {
        setValidationMessage('You must be logged in to save a word.');
        setIsValid(false);
        return;
      }

      await saveWord(user.uid, inputword, translations);
      setIsValid(true);
      setTranslation(translations[0]);
      onWordAdded({ word: inputword, translations });
      incrementCounter();

      if (counter + 1 >= 10) {
        onTestReady();
      }
    } catch (err) {
      console.error(err);
      setValidationMessage('Error validating or saving the word.');
      setIsValid(false);
    } finally {
      setIsLoading(false);
      setInputValue('');
    }
  };

  return (
    <>
      <WordsPassed>Words Passed: {counter}/10</WordsPassed>
      <WordInput value={inputValue} onChangeText={handleInputChange} />
      <Button type="translate" onPress={handleValidate} disabled={isLoading}>
        <ButtonText>{isLoading ? 'Translating word...' : 'Translate'}</ButtonText>
      </Button>
      {validationMessage && <Message isValid={isValid}>{validationMessage}</Message>}
      <TranslationBar translation={translation} />
    </>
  );
};

export default WordInputSection;
