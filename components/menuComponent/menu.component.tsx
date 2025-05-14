import React from "react";
import { Icon, MenuItem, MenuText, Title, Container } from "./menu.styles";
import { useRouter } from "expo-router";

const MenuComponent = () => {
  const router = useRouter();
  return (
    <Container>
      <Title>Menu</Title>
      <MenuItem onPress={() => router.push("/(tabs)/screens/menu/wordsPassed")}>
        <Icon
          source={require("../../../../assets/images/WordImage.png")}
        ></Icon>
        <MenuText>Word Passed</MenuText>
      </MenuItem>
      <MenuItem onPress={() => router.push("/(tabs)/screens/menu/stats")}>
        <Icon
          source={require("../../../../assets/images/StatsIcon.png")}
        ></Icon>
        <MenuText>Statistic</MenuText>
      </MenuItem>
      <MenuItem onPress={() => router.push("/(tabs)/screens/menu/upTimers")}>
        <Icon
          source={require("../../../../assets/images/StopwatchIcon.png")}
        ></Icon>
        <MenuText>Upcoming test timer</MenuText>
      </MenuItem>
    </Container>
  );
};

export default MenuComponent;
