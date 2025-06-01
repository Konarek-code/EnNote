import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAccountLevel } from '@/api/words';
import { useWordStats } from '@/hooks/useWordsStats';
import { RootState } from '@/store/store';
import { logout } from '@/store/user/userSlice';

import {
  Container,
  ProfileHeader,
  ProfileImage,
  Username,
  Handle,
  StatsContainer,
  StatBox,
  StatLabel,
  StatValue,
  LevelBox,
  LevelText,
  LevelValue,
  AccountBox,
  AccountText,
  AccountDate,
  AchievementsTitle,
  AchievementsContainer,
  AchievementBox,
  ProfileBackground,
  DetailsBox,
  AchivmentIcons,
  LogoutButton,
  LogoutButtonText,
  AchievementDescription,
  IndicatorContainer,
} from './profile.style';

const ProfileComponent = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeAchievement, setActiveAchievement] = useState<string | null>(null);

  const [accountLevel, setAccountLevel] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const { isLoggedIn } = user;
  const router = useRouter();
  const dispatch = useDispatch();

  const profileImage =
    user.gender === 'female'
      ? require('@/assets/images/profileW.png')
      : require('@/assets/images/profile.png');

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('pl-PL')
    : 'error getting date';

  const { correctCount, expertCount, incorrectCount } = useWordStats(user?.uid ?? '');
  const totalWords = correctCount + expertCount + incorrectCount;

  useFocusEffect(
    React.useCallback(() => {
      if (!isLoggedIn) {
        router.replace('/(tabs)/screens/loginScreen');
      } else {
        setCheckingAuth(false);
      }
    }, [isLoggedIn])
  );
  useEffect(() => {
    if (user?.uid) {
      fetchAccountLevel(user?.uid).then(setAccountLevel);
    }
  }, [user?.uid]);

  if (checkingAuth) {
    return (
      <IndicatorContainer>
        <ActivityIndicator size="large" color="#3b82f6" />
      </IndicatorContainer>
    );
  }

  return (
    <Container>
      <ProfileHeader>
        <ProfileBackground>
          <ProfileImage source={profileImage} />
        </ProfileBackground>
        <Username>{user.name || 'Guest'}</Username>
        <Handle>@{user.email || 'no-email'}</Handle>
      </ProfileHeader>
      <StatsContainer>
        <StatBox>
          <StatLabel>Words {'\n'}overall</StatLabel>
          <StatValue>{totalWords}</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Words {'\n'}well known</StatLabel>
          <StatValue>{correctCount}</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Words {'\n'} expert level</StatLabel>
          <StatValue>{expertCount}</StatValue>
        </StatBox>
      </StatsContainer>
      <DetailsBox>
        <LevelBox>
          <LevelText>Account Level</LevelText>
          <LevelValue>{accountLevel}</LevelValue>
        </LevelBox>
        <AccountBox>
          <AccountText>Account created</AccountText>
          <AccountDate>{formattedDate}</AccountDate>
        </AccountBox>
      </DetailsBox>
      <AchievementsTitle>Achievements</AchievementsTitle>
      <AchievementsContainer>
        <AchievementBox onPress={() => setActiveAchievement('Academic Excellence')}>
          <AchivmentIcons source={require('@/assets/images/academic-achievement.png')} />
        </AchievementBox>

        <AchievementBox onPress={() => setActiveAchievement('Consistent Success')}>
          <AchivmentIcons source={require('@/assets/images/success.png')} />
        </AchievementBox>

        <AchievementBox onPress={() => setActiveAchievement('Vocabulary Master')}>
          <AchivmentIcons source={require('@/assets/images/testAchivment.png')} />
        </AchievementBox>

        <AchievementBox onPress={() => setActiveAchievement('Badge Collector')}>
          <AchivmentIcons source={require('@/assets/images/badge.png')} />
        </AchievementBox>
      </AchievementsContainer>
      {activeAchievement && <AchievementDescription>{activeAchievement}</AchievementDescription>}

      <LogoutButton
        onPress={() => {
          dispatch(logout());
          router.replace('/(tabs)/screens/loginScreen');
        }}
      >
        <LogoutButtonText>Logout</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
};

export default ProfileComponent;
