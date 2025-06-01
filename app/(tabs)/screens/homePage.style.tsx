import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

export const Container = styled(LinearGradient).attrs({
  colors: ["#0D47A1", "#311B92"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
`;
