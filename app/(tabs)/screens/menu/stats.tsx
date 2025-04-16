import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  Container,
  ScrollContainer,
  Header,
  Brake,
  Card,
  CardTitle,
  Percentage,
  Progress,
  Row,
  MiniCard,
  SmallText,
  BoldText,
} from "./stats.style";
import { BackButton } from "./wordsPassed.style";
import { ProgressBar } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";

const Stats = () => {
  const { score, total } = useLocalSearchParams();
  const accuracy = total ? (Number(score) / Number(total)) * 100 : 0;

  const icons: Record<string, keyof typeof Feather.glyphMap> = {
    arrowleft: "arrow-left",
  };
  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [30, 45, 50, 55, 60, 70, 75],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <Container>
      <ScrollContainer>
        <BackButton
          as={TouchableOpacity}
          onPress={() => router.push("/(tabs)/screens/menu/menu")}
        >
          <Feather name={icons.arrowleft} size={30} color={"#ffffff"} />
        </BackButton>

        <Header>📊 Your Statistics</Header>
        <Brake />

        <Card>
          <CardTitle>Answer Accuracy</CardTitle>
          <Percentage>{accuracy.toFixed(0)}%</Percentage>
        </Card>

        <Card>
          <CardTitle>📈 Progress Over the Week</CardTitle>
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={200}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            }}
            bezier
          />
        </Card>

        <Card>
          <CardTitle>📚 Learning Summary</CardTitle>
          <SmallText>Average Words Passed: 10 / month</SmallText>
          <SmallText>Words to Learn: 15 words</SmallText>
          <SmallText>Words Well Known: 101 words</SmallText>
        </Card>

        <Row>
          <MiniCard>
            <MaterialIcons name="emoji-events" size={24} color="gold" />
            <SmallText>Your Rank</SmallText>
            <BoldText>Advanced</BoldText>
          </MiniCard>

          <MiniCard>
            <MaterialIcons name="timer" size={24} color="blue" />
            <SmallText>Time Spent Learning</SmallText>
            <BoldText>5h 30m</BoldText>
          </MiniCard>
        </Row>
      </ScrollContainer>
    </Container>
  );
};

export default Stats;
