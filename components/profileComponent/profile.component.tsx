import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
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
import { useRouter } from "expo-router";
import { Button } from "react-native";
import { logout } from "@/store/user/userSlice";

const ProfileComponent = () => {
  const user = useSelector((state: RootState) => state.user);
  const { isLoggedIn } = user;
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      // wysyłamy na login, zamiast renderować go inline
      router.replace("/(tabs)/screens/loginScreen");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  const dispatch = useDispatch();

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage source={require("../../../assets/images/profile.png")} />
        <Username>{user.name || "Guest"}</Username>
        <Handle>@{user.email || "no-email"}</Handle>
      </ProfileHeader>

      <StatsContainer>
        <StatBox>
          <StatLabel>friends</StatLabel>
          <StatValue>0</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>followers</StatLabel>
          <StatValue>0</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>following</StatLabel>
          <StatValue>0</StatValue>
        </StatBox>
      </StatsContainer>

      <LevelBox>
        <LevelText>Level</LevelText>
        <LevelValue>Expert</LevelValue>
      </LevelBox>

      <AccountBox>
        <AccountText>Account created</AccountText>
        <AccountDate>24 May 2024</AccountDate>
      </AccountBox>

      <AchievementsTitle>Achievements</AchievementsTitle>
      <AchievementsContainer>
        <AchievementBox />
        <AchievementBox />
        <AchievementBox />
        <AchievementBox />
      </AchievementsContainer>
      <Button
        title="Logout"
        onPress={() => {
          dispatch(logout());
          router.replace("/(tabs)/screens/loginScreen");
        }}
      ></Button>
    </Container>
  );
};

export default ProfileComponent;
