import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavbarContainer, NavButton } from "./navigationBar.style";
import { NavigationProp } from "../../app/(tabs)/navigationTypes";

const NavigationBar: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <NavbarContainer>
      <NavButton onPress={() => navigation.navigate("MenuPage")}>
        <MaterialCommunityIcons name="menu" size={30} color="#ffffff" />
      </NavButton>
      <NavButton>
        <MaterialCommunityIcons name="home" size={30} color="#ffffff" />
      </NavButton>
      <NavButton>
        <MaterialCommunityIcons name="account" size={30} color="#ffffff" />
      </NavButton>
    </NavbarContainer>
  );
};

export default NavigationBar;
