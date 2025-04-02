import { useState, useEffect, useCallback } from "react";
import { RefreshControl, FlatList } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Feather } from "@expo/vector-icons";

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

const WordsPage = () => {
  interface Word {
    id: string;
    word: string;
    translation: string;
    level: string;
  }

  const [refreshing, setRefreshing] = useState(false);
  const [wordsData, setWordsData] = useState<Word[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("To learn");

  const fetchWords = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        "https://backend-305143166666.europe-west1.run.app/get-words"
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
    fetchWords();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchWords();
    }, [])
  );

  const filteredWords = wordsData.filter(
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
        renderItem={({ item }) => (
          <WordCard>
            <Word>{item.word}</Word>
            <Translation>{item.translation}</Translation>
          </WordCard>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchWords} />
        }
      />
    </Container>
  );
};

export default WordsPage;
