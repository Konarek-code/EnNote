import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { ActivityIndicator } from "react-native";
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
} from "./profile.style";
import { useRouter } from "expo-router";
import { Button } from "react-native";
import { logout } from "@/store/user/userSlice";
import { useFocusEffect } from "@react-navigation/native";

const ProfileComponent = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeAchievement, setActiveAchievement] = useState<string | null>(
    null
  );
  const user = useSelector((state: RootState) => state.user);
  const { isLoggedIn } = user;
  const router = useRouter();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (!isLoggedIn) {
        router.replace("/(tabs)/screens/loginScreen");
      } else {
        setCheckingAuth(false);
      }
    }, [isLoggedIn])
  );

  if (checkingAuth) {
    return (
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </Container>
    );
  }

  return (
    <Container>
      <ProfileHeader>
        <ProfileBackground>
          <ProfileImage source={require("@/assets/images/profile.png")} />
        </ProfileBackground>
        <Username>{user.name || "Guest"}</Username>
        <Handle>@{user.email || "no-email"}</Handle>
      </ProfileHeader>
      <StatsContainer>
        <StatBox>
          <StatLabel>Words {"\n"}overall</StatLabel>
          <StatValue>0</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Words {"\n"}well known</StatLabel>
          <StatValue>0</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Words {"\n"} expert level</StatLabel>
          <StatValue>0</StatValue>
        </StatBox>
      </StatsContainer>
      <DetailsBox>
        <LevelBox>
          <LevelText>Account Level</LevelText>
          <LevelValue>Expert</LevelValue>
        </LevelBox>

        <AccountBox>
          <AccountText>Account created</AccountText>
          <AccountDate>24 May 2024</AccountDate>
        </AccountBox>
      </DetailsBox>
      <AchievementsTitle>Achievements</AchievementsTitle>
      <AchievementsContainer>
        <AchievementBox
          onPress={() => setActiveAchievement("Academic Excellence")}
        >
          <AchivmentIcons
            source={require("@/assets/images/academic-achievement.png")}
          />
        </AchievementBox>

        <AchievementBox
          onPress={() => setActiveAchievement("Consistent Success")}
        >
          <AchivmentIcons source={require("@/assets/images/success.png")} />
        </AchievementBox>

        <AchievementBox
          onPress={() => setActiveAchievement("Vocabulary Master")}
        >
          <AchivmentIcons
            source={require("@/assets/images/testAchivment.png")}
          />
        </AchievementBox>

        <AchievementBox onPress={() => setActiveAchievement("Badge Collector")}>
          <AchivmentIcons source={require("@/assets/images/badge.png")} />
        </AchievementBox>
      </AchievementsContainer>
      {activeAchievement && (
        <AchievementDescription>{activeAchievement}</AchievementDescription>
      )}

      <LogoutButton
        onPress={() => {
          dispatch(logout());
          router.replace("/(tabs)/screens/loginScreen");
        }}
      >
        <LogoutButtonText>Logout</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
};

export default ProfileComponent;
