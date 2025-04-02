import React from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import {
  Container,
  TestSection,
  TestTitle,
  TimeText,
  ButtonRow,
  ActionButton,
  ButtonText,
  Title,
  Brake,
} from "./upTimers.style";
import { BackButton } from "./wordsPassed.style";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

const UpcomingTimers = () => {
  return (
    <Container>
      <BackButton
        as={TouchableOpacity}
        onPress={() => router.push("/(tabs)/screens/menu/menu")}
      >
        <Feather name="arrow-left" size={30} color={"#ffffff"} />
      </BackButton>
      <Title>Upcoming Tests</Title>
      <Brake />
      <TestSection>
        <TestTitle>Weekly Test</TestTitle>
        <CountdownCircleTimer
          isPlaying
          duration={180000}
          colors={["#4CAF50", "#FFC107", "#F44336"]}
          colorsTime={[120000, 60000, 0]}
          size={120}
        >
          {({ remainingTime }) => (
            <TimeText>
              {Math.floor(remainingTime / 3600)}h{" "}
              {Math.floor((remainingTime % 3600) / 60)}m
            </TimeText>
          )}
        </CountdownCircleTimer>
        <ButtonRow>
          <ActionButton secondary>
            <ButtonText>Need more time</ButtonText>
          </ActionButton>
          <ActionButton>
            <ButtonText>Start now</ButtonText>
          </ActionButton>
        </ButtonRow>
      </TestSection>

      <TestSection>
        <TestTitle>Monthly Test</TestTitle>
        <CountdownCircleTimer
          isPlaying
          duration={259200}
          colors={["#4CAF50", "#FFC107", "#F44336"]}
          colorsTime={[172800, 86400, 0]}
          size={120}
        >
          {({ remainingTime }) => (
            <TimeText>
              {Math.floor(remainingTime / 3600)}h{" "}
              {Math.floor((remainingTime % 3600) / 60)}m
            </TimeText>
          )}
        </CountdownCircleTimer>
        <ButtonRow>
          <ActionButton secondary>
            <ButtonText>Need more time</ButtonText>
          </ActionButton>
          <ActionButton>
            <ButtonText>Start now</ButtonText>
          </ActionButton>
        </ButtonRow>
      </TestSection>
    </Container>
  );
};

export default UpcomingTimers;
