import React from "react";
import { Container } from "./menu.styles";
import { Icon, MenuItem, MenuText, Title } from "./menu.styles";
import { useRouter } from "expo-router";

const MenuPage = () => {
  const router = useRouter(); // This is the same as using the useNavigation hook from @react-navigation/native
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

export default MenuPage;
