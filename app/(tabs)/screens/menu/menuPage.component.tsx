import React from "react";
import { Container } from "../homePage.style";
import { Icon, MenuItem, MenuText, Title } from "./menuPage.styles";

const MenuPage = () => {
  return (
    <Container>
      <Title>Menu</Title>
      <MenuItem>
        <Icon
          source={require("../../../../assets/images/WordImage.png")}
        ></Icon>
        <MenuText>Word Passed</MenuText>
      </MenuItem>
      <MenuItem>
        <Icon
          source={require("../../../../assets/images/StatsIcon.png")}
        ></Icon>
        <MenuText>Statistic</MenuText>
      </MenuItem>
      <MenuItem>
        <Icon
          source={require("../../../../assets/images/StopwatchIcon.png")}
        ></Icon>
        <MenuText>Upcoming test timer</MenuText>
      </MenuItem>
    </Container>
  );
};

export default MenuPage;
