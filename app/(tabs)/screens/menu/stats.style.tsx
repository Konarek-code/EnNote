import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";

export const Container = styled(LinearGradient).attrs({
  colors: ["#0D47A1", "#311B92"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
`;

export const ScrollContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 30, // Zapewnia miejsce na przewijanie
  },
})`
  width: 100%;
`;
