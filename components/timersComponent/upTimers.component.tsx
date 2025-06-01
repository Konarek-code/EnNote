import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useSelector } from 'react-redux';

import { useWordStats } from '@/hooks/useWordsStats';

import {
  Container,
  TestSection,
  TestTitle,
  TimeText,
  ButtonRow,
  Title,
  Brake,
  BackButton,
} from './upTimers.style';
import Button from '../buttons/button.component';
import { ButtonText } from '../buttons/button.styles';

const UpcomingTimersComponent = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  const WEEKLY_DURATION = 7 * 24 * 60 * 60;
  const MONTHLY_DURATION = 30 * 24 * 60 * 60;

  const getRemainingTime = (startTimestamp: number, duration: number) => {
    const now = Math.floor(Date.now() / 1000);
    const elapsed = now - startTimestamp;
    const remaining = duration - elapsed;
    return remaining > 0 ? remaining : 0;
  };

  const { correctCount, expertCount } = useWordStats(user?.uid ?? '');

  const weeklyRemaining =
    user.firstTestStarted && user.testStartTimestamp
      ? getRemainingTime(user.testStartTimestamp, WEEKLY_DURATION)
      : WEEKLY_DURATION;

  const monthlyRemaining =
    user.firstTestStarted && user.testStartTimestamp
      ? getRemainingTime(user.testStartTimestamp, MONTHLY_DURATION)
      : MONTHLY_DURATION;

  const isTestLocked = !user.firstTestStarted || correctCount > 10;
  const isTestLockedexpert = !user.firstTestStarted || expertCount > 5;
  return (
    <ScrollView>
      <Container>
        <BackButton as={TouchableOpacity} onPress={() => router.push('/(tabs)/screens/menu/menu')}>
          <Feather name="arrow-left" size={30} color={'#ffffff'} />
        </BackButton>

        <Title>Upcoming Tests</Title>
        <Brake />

        <TestSection>
          <TestTitle>Weekly Test</TestTitle>
          <CountdownCircleTimer
            isPlaying={!!user.firstTestStarted}
            duration={WEEKLY_DURATION}
            initialRemainingTime={weeklyRemaining}
            colors={['#00e0ff', '#00bfff', '#0050a0']}
            colorsTime={[WEEKLY_DURATION, WEEKLY_DURATION / 2, 0]}
            size={140}
            onComplete={() => {
              router.push('/(tabs)/screens/menu/weeklyTest');
              return { shouldRepeat: false };
            }}
          >
            {({ remainingTime }) => (
              <TimeText>
                {Math.floor(remainingTime / 3600)}h {Math.floor((remainingTime % 3600) / 60)}m
              </TimeText>
            )}
          </CountdownCircleTimer>

          <ButtonRow>
            <Button
              type="action"
              secondary={false}
              onPress={() => router.push('/(tabs)/screens/menu/weeklyTest')}
              disabled={isTestLocked}
            >
              {isTestLocked ? (
                <ButtonText>Add at least 10 words to start this test.</ButtonText>
              ) : (
                <ButtonText>Start Weekly Test</ButtonText>
              )}
            </Button>
          </ButtonRow>
        </TestSection>

        <TestSection>
          <TestTitle>Monthly Test</TestTitle>
          <CountdownCircleTimer
            isPlaying={!!user.firstTestStarted}
            duration={MONTHLY_DURATION}
            initialRemainingTime={monthlyRemaining}
            colors={['#76ff03', '#fdd835', '#e65100']}
            colorsTime={[MONTHLY_DURATION, MONTHLY_DURATION / 2, 0]}
            size={140}
            onComplete={() => {
              router.push('/(tabs)/screens/menu/monthlyTest');
              return { shouldRepeat: false };
            }}
          >
            {({ remainingTime }) => (
              <TimeText>
                {Math.floor(remainingTime / 3600)}h {Math.floor((remainingTime % 3600) / 60)}m
              </TimeText>
            )}
          </CountdownCircleTimer>

          <ButtonRow>
            <Button
              type="action"
              secondary={false}
              disabled={isTestLockedexpert}
              onPress={() => router.push('/(tabs)/screens/menu/monthlyTest')}
            >
              {isTestLockedexpert ? (
                <ButtonText>Add at least 5 expert words to start this test.</ButtonText>
              ) : (
                <ButtonText>Start mothnly Test</ButtonText>
              )}
            </Button>
          </ButtonRow>
        </TestSection>
      </Container>
    </ScrollView>
  );
};

export default UpcomingTimersComponent;
