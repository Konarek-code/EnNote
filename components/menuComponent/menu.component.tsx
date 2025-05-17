import React from "react";
import { useRouter } from "expo-router";
import Button from "../buttons/button.component";
import { MenuText, Title, Container } from "./menu.styles";
import { MenuIcon } from "../buttons/button.styles";

const MenuComponent = () => {
  const router = useRouter();

  return (
    <Container>
      <Title>Menu</Title>

      <Button
        type="menu"
        onPress={() => router.push("/(tabs)/screens/menu/wordsPassed")}
      >
        <MenuIcon source={require("@/assets/images/WordImage.png")} />
        <MenuText>Word Passed</MenuText>
      </Button>

      <Button
        type="menu"
        onPress={() => router.push("/(tabs)/screens/menu/stats")}
      >
        <MenuIcon source={require("@/assets/images/StatsIcon.png")} />
        <MenuText>Statistic</MenuText>
      </Button>

      <Button
        type="menu"
        onPress={() => router.push("/(tabs)/screens/menu/upTimers")}
      >
        <MenuIcon source={require("@/assets/images/StopwatchIcon.png")} />
        <MenuText>Upcoming test timer</MenuText>
      </Button>
    </Container>
  );
};

export default MenuComponent;
