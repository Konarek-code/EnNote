import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  padding: 20px;
`;

export const ProfileHeader = styled.View`
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const Username = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

export const Handle = styled.Text`
  font-size: 16px;
  color: gray;
`;

export const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-vertical: 20px;
`;

export const StatBox = styled.View`
  align-items: center;
`;

export const StatLabel = styled.Text`
  font-size: 14px;
  color: gray;
`;

export const StatValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const LevelBox = styled.View`
  background-color: #ccc;
  padding: 10px;
  border-radius: 10px;
  margin-vertical: 10px;
  align-items: center;
`;

export const LevelText = styled.Text`
  font-size: 14px;
`;

export const LevelValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const AccountBox = styled.View`
  background-color: #4caf50;
  padding: 10px;
  border-radius: 10px;
  margin-vertical: 10px;
  align-items: center;
`;

export const AccountText = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export const AccountDate = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const AchievementsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

export const AchievementsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

export const AchievementBox = styled.View`
  width: 50px;
  height: 50px;
  background-color: purple;
  border-radius: 10px;
`;
