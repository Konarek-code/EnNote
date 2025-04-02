import React from "react";
import { Image } from "react-native";
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
} from "./profile.style";

const ProfileScreen = () => {
  return (
    <Container>
      {/* Profilowe */}
      <ProfileHeader>
        <ProfileImage source={require("../../../assets/images/profile.png")} />
        <Username>Damian</Username>
        <Handle>@Damiano_italiano</Handle>
      </ProfileHeader>

      {/* Statystyki */}
      <StatsContainer>
        <StatBox>
          <StatLabel>friends</StatLabel>
          <StatValue>5</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>followers</StatLabel>
          <StatValue>15</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>following</StatLabel>
          <StatValue>350</StatValue>
        </StatBox>
      </StatsContainer>

      {/* Poziom użytkownika */}
      <LevelBox>
        <LevelText>Level</LevelText>
        <LevelValue>Expert</LevelValue>
      </LevelBox>

      {/* Data utworzenia konta */}
      <AccountBox>
        <AccountText>Account created</AccountText>
        <AccountDate>24 May 2024</AccountDate>
      </AccountBox>

      {/* Osiągnięcia */}
      <AchievementsTitle>Achievements</AchievementsTitle>
      <AchievementsContainer>
        <AchievementBox />
        <AchievementBox />
        <AchievementBox />
        <AchievementBox />
      </AchievementsContainer>
    </Container>
  );
};

export default ProfileScreen;
