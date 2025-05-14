import { useState, useEffect, useCallback } from "react";
import { RefreshControl, FlatList } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import {
  Container,
  BackButton,
  Title,
  Brake,
  LevelContainer,
  LevelButton,
  LevelText,
  WordCard,
  Word,
  Translation,
} from "./wordsPassed.style";

const WordsComponent = () => {
  interface Word {
    id: string;
    word: string;
    translation: string;
    level: string;
    source?: string;
  }
  const user = useSelector((state: any) => state.user);

  const [refreshing, setRefreshing] = useState(false);
  const [wordsData, setWordsData] = useState<Word[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("To learn");
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [expertWords, setExpertWords] = useState([]);

  const fetchCorrectWords = async () => {
    try {
      const response = await fetch(
        `https://backend-305143166666.europe-central2.run.app/get-correct-words?uid=${user?.uid}`
      );
      const data = await response.json();
      const correctWordsWithLevels = data.map((word: any, index: number) => ({
        id: word.id || word.word,
        word: word.word || "Brak danych",
        translation: word.translations || "Brak tłumaczenia",
        level: "Good with",
      }));
      setCorrectWords(correctWordsWithLevels);
    } catch (error) {}
  };
  const fetchExpertWords = async () => {
    try {
      const response = await fetch(
        `https://backend-305143166666.europe-central2.run.app/expertWords?uid=${user?.uid}`
      );
      const data = await response.json();
      const expertWordsWithLevels = data.map((word: any, index: number) => ({
        id: word.id || word.word,
        word: word.word || "no data",
        translation: word.translations || "no translation",
        level: "Expert",
      }));
      setExpertWords(expertWordsWithLevels);
    } catch (error) {
      console.error("Error fetching expert words:", error);
    }
  };
  const fetchIncorrectWords = async () => {
    try {
      const response = await fetch(
        `https://backend-305143166666.europe-central2.run.app/get-incorrect-words?uid=${user?.uid}`
      );
      const data = await response.json();
      const incorrectWordsWithLevels = data.map((word: any, index: number) => ({
        id: word.id || word.word,
        word: word.word || "no data",
        translation: word.translations || "no translation",
        level: "To learn",
        source: "incorrect",
      }));
      setIncorrectWords(incorrectWordsWithLevels);
    } catch (error) {
      console.error("Error fetching incorrect words:", error);
    }
  };
  const fetchWords = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        `https://backend-305143166666.europe-central2.run.app/get-words?uid=${user?.uid}`
      );
      const data = await response.json();

      const wordsWithLevels = data.map((word: any, index: number) => ({
        id: index.toString(),
        word: word.word || "Brak danych",
        translation: word.translations || "Brak tłumaczenia",
        level: "To learn",
      }));

      setWordsData(wordsWithLevels);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!user?.uid) return;
    fetchWords();
    fetchCorrectWords();
    fetchIncorrectWords();
    fetchExpertWords();
  }, [user?.uid]);

  useFocusEffect(
    useCallback(() => {
      if (!user?.uid) return;
      fetchWords();
      fetchCorrectWords();
      fetchIncorrectWords();
      fetchExpertWords();
    }, [user?.uid])
  );
  const combinedWords = [
    ...wordsData,
    ...correctWords,
    ...incorrectWords,
    ...expertWords,
  ];
  const filteredWords = combinedWords.filter(
    (word) => word.level === selectedLevel
  );

  return (
    <Container>
      <BackButton onPress={() => router.push("/(tabs)/screens/menu/menu")}>
        <Feather name="arrow-left" size={30} color={"#ffffff"} />
      </BackButton>

      <Title>📖 Words List</Title>
      <Brake />

      <LevelContainer>
        {[
          { label: "To learn", color: "#f7003e" },
          { label: "Good with", color: "#fb923c" },
          { label: "Expert", color: "#14b8a6" },
        ].map((level) => (
          <LevelButton
            key={level.label}
            backgroundColor={
              selectedLevel === level.label ? level.color : "#93c5fd"
            }
            onPress={() => setSelectedLevel(level.label)}
          >
            <LevelText>{level.label}</LevelText>
          </LevelButton>
        ))}
      </LevelContainer>

      <FlatList
        data={filteredWords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isIncorrect =
            item.level === "To learn" && item.source === "incorrect";
          return (
            <WordCard isIncorrect={isIncorrect}>
              <Word isIncorrect={isIncorrect}>{item.word}</Word>
              <Translation isIncorrect={isIncorrect}>
                {item.translation}
              </Translation>
            </WordCard>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchWords} />
        }
      />
    </Container>
  );
};

export default WordsComponent;
