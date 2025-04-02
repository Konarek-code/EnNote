import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { BackButton } from "./wordsPassed.style";
import { Container, ScrollContainer } from "./stats.style";
import { ProgressBar } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";

const Stats = () => {
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
          {" "}
          <Feather name={icons.arrowleft} size={30} color={"#ffffff"} />
        </BackButton>
        <Text style={styles.header}>📊 Your Statistics</Text>
        <View style={styles.brake}></View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Answer Accuracy</Text>
          <Text style={styles.percentage}>34%</Text>
          <ProgressBar
            progress={0.34}
            color="#3b82f6"
            style={styles.progressBar}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📈 Progress Over the Week</Text>
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
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Learning Summary</Text>
          <Text>Average Words Passed: 10 / month</Text>
          <Text>Words to Learn: 15 words</Text>
          <Text>Words Well Known: 101 words</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.miniCard}>
            <MaterialIcons name="emoji-events" size={24} color="gold" />
            <Text style={styles.smallText}>Your Rank</Text>
            <Text style={styles.boldText}>Advanced</Text>
          </View>
          <View style={styles.miniCard}>
            <MaterialIcons name="timer" size={24} color="blue" />
            <Text style={styles.smallText}>Time Spent Learning</Text>
            <Text style={styles.boldText}>5h 30m</Text>
          </View>
        </View>
      </ScrollContainer>
    </Container>
  );
};

export default Stats;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
  brake: {
    borderBottomColor: "grey",
    borderBottomWidth: 1, // Zwiększ szerokość, np. 1 lub 2
    marginVertical: 10, // Dodaj odstęp dla lepszej widoczności
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  percentage: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  progressBar: {
    height: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  miniCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  smallText: {
    fontSize: 14,
    color: "#666",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
