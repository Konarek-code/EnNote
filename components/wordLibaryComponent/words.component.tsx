import { useState, useCallback } from "react";
import { RefreshControl, FlatList } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import {
  Container,
  Title,
  Brake,
  LevelContainer,
  WordCard,
  Word,
  Translation,
} from "./wordsPassed.style";
import Button from "../buttons/button.component";
import { LevelText } from "../buttons/button.styles";
import { useWords, Word as WordType } from "../../hooks/useWords";

const levels = [
  { label: "To learn", color: "#f7003e" },
  { label: "Good with", color: "#fb923c" },
  { label: "Expert", color: "#14b8a6" },
];

const WordsComponent = () => {
  const user = useSelector((state: any) => state.user);
  const [selectedLevel, setSelectedLevel] = useState("To learn");

  const { words, refreshing, refetch } = useWords(user?.uid);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [user?.uid])
  );

  const filtered = words.filter((w) => w.level === selectedLevel);

  return (
    <Container>
      <Button
        type="back"
        onPress={() => router.push("/(tabs)/screens/menu/menu")}
      >
        <Feather name="arrow-left" size={30} color={"#ffffff"} />
      </Button>

      <Title>📖 Words List</Title>
      <Brake />

      <LevelContainer>
        {levels.map(({ label, color }) => (
          <Button
            key={label}
            type="level"
            backgroundColor={selectedLevel === label ? color : "#93c5fd"}
            onPress={() => setSelectedLevel(label)}
          >
            <LevelText>{label}</LevelText>
          </Button>
        ))}
      </LevelContainer>

      <FlatList
        data={filtered}
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
          <RefreshControl refreshing={refreshing} onRefresh={refetch} />
        }
      />
    </Container>
  );
};

export default WordsComponent;
