import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { loadTestHistory } from '@/utils/testHistory';
import useAppUsageTimer, { getUsageTime } from '@/utils/usageAppTimer';

import {
  Container,
  ScrollContainer,
  Header,
  Brake,
  Card,
  CardTitle,
  Percentage,
  Row,
  MiniCard,
  SmallText,
  BoldText,
} from './stats.style';
import Button from '../buttons/button.component';

const calculateStreak = (dateSet: Set<string>) => {
  let streak = 0;
  let date = new Date();
  let dateStr = date.toISOString().split('T')[0];
  while (dateSet.has(dateStr)) {
    streak++;
    date.setDate(date.getDate() - 1);
    dateStr = date.toISOString().split('T')[0];
  }

  return streak;
};
const StatsComponent = () => {
  useAppUsageTimer();
  const [usageTime, setUsageTime] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [bestResult, setBestResult] = useState<any>(null);
  const [totalDaysWithTests, setTotalDaysWithTests] = useState(0);
  const [streak, setStreak] = useState(0);

  const scoreFromStore = useSelector((state: RootState) => state.testResult.score);
  const totalFromStore = useSelector((state: RootState) => state.testResult.total);

  const parsedScore = typeof scoreFromStore === 'number' ? scoreFromStore : 0;
  const parsedTotal = typeof totalFromStore === 'number' ? totalFromStore : 0;

  const accuracy =
    isFinite(parsedScore) && isFinite(parsedTotal) && parsedTotal > 0
      ? (parsedScore / parsedTotal) * 100
      : 0;

  useEffect(() => {
    const fetchUsageTime = async () => {
      const time = await getUsageTime();
      setUsageTime(time);
    };
    fetchUsageTime();
  }, []);

  useEffect(() => {
    const fetchTestHistory = async () => {
      try {
        const history = await loadTestHistory();
        const sortedHistory = history.sort(
          (a: { date: string | number | Date }, b: { date: string | number | Date }) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setHistory(sortedHistory);

        const totalTests = sortedHistory.length;

        const avg =
          totalTests > 0
            ? sortedHistory.reduce(
                (sum: number, h: { accuracy: any }) => sum + parseFloat(h.accuracy),
                0
              ) / totalTests
            : 0;

        setAverageAccuracy(avg);

        const best = sortedHistory.reduce(
          (best: { accuracy: any }, h: { accuracy: any }) =>
            parseFloat(h.accuracy) > parseFloat(best.accuracy) ? h : best,
          sortedHistory[0]
        );

        setBestResult(best);

        const uniqueDates = new Set<string>(sortedHistory.map((h: { date: string }) => h.date));
        setTotalDaysWithTests(uniqueDates.size);

        setStreak(calculateStreak(uniqueDates));
      } catch (error) {
        console.error('Error loading test history:', error);
      }
    };

    fetchTestHistory();
  }, []);

  const icons: Record<string, keyof typeof Feather.glyphMap> = {
    arrowleft: 'arrow-left',
  };
  console.log(usageTime, 'usageTime');
  return (
    <Container>
      <ScrollContainer>
        <Button type="back" onPress={() => router.push('/(tabs)/screens/menu/menu')}>
          <Feather name={icons.arrowleft} size={30} color={'#ffffff'} />
        </Button>

        <Header>📊 Your Statistics</Header>
        <Brake />

        <Card>
          <CardTitle>Answer Accuracy</CardTitle>
          <Percentage>{isFinite(accuracy) ? accuracy.toFixed(0) : 'N/A'}%</Percentage>
        </Card>

        <Card>
          <CardTitle>📚 Learning Summary</CardTitle>
          <SmallText>Total Tests: {history.length}</SmallText>
          <SmallText>
            Average Accuracy: {isFinite(averageAccuracy) ? averageAccuracy.toFixed(1) : 'N/A'}%
          </SmallText>
          <SmallText>
            Best Result:{' '}
            {bestResult
              ? `${bestResult.score}/${bestResult.total} (${
                  isFinite(bestResult.accuracy) ? bestResult.accuracy.toFixed(1) : 'N/A'
                }%)`
              : 'N/A'}
          </SmallText>
          <SmallText>Days with Tests: {totalDaysWithTests}</SmallText>
          <SmallText>
            🔥 Current Streak: {streak} day{streak === 1 ? '' : 's'}
          </SmallText>
        </Card>
        <Row>
          <MiniCard>
            <MaterialIcons name="local-fire-department" size={24} color="red" />
            <SmallText>🔥 Current Streak</SmallText>
            <BoldText>
              {streak} day{streak === 1 ? '' : 's'}
            </BoldText>
          </MiniCard>

          <MiniCard>
            <MaterialIcons name="timer" size={24} color="blue" />
            <SmallText>Time Spent Learning</SmallText>
            <BoldText>{(usageTime / 60000).toFixed(1)} min</BoldText>
          </MiniCard>
        </Row>
      </ScrollContainer>
    </Container>
  );
};

export default StatsComponent;
