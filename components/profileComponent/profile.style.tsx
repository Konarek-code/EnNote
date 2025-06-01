import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f0f6ff;
  align-items: center;
  width: 100%;
`;

export const ProfileBackground = styled.ImageBackground`
  width: 100%;
  height: 120px;
  justify-content: flex-end;
  align-items: center;
  background-color: #1a237e;
  elevation: 3;
`;

export const ProfileHeader = styled.View`
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.Image`
  position: absolute;
  top: 50px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 3px solid #fff;
  elevation: 5;
`;

export const Username = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  color: #1e3a8a;
  text-align: center;
`;

export const Handle = styled.Text`
  font-size: 16px;
  color: rgb(146, 145, 145);
  margin-top: 5px;
  text-align: center;
`;

export const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 90%;
  margin: 20px 0;
  padding: 12px;
  background-color: #dbeafe;
  border-radius: 12px;
  border: 1px solid #93c5fd;
`;

export const StatBox = styled.View`
  align-items: center;
`;

export const StatLabel = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #1e40af;
`;

export const StatValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1e3a8a;
`;

export const DetailsBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #e0f2fe;
  padding: 12px;
  width: 90%;
  border-radius: 10px;
  margin: 10px 0;
`;

export const LevelBox = styled.View`
  background-color: #3b82f6;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  flex: 1;
  margin-right: 10px;
`;

export const LevelText = styled.Text`
  font-size: 14px;
  color: #e0f2fe;
`;

export const LevelValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

export const AccountBox = styled.View`
  background-color: #1d4ed8;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  flex: 1;
`;

export const AccountText = styled.Text`
  font-size: 14px;
  color: #dbeafe;
`;

export const AccountDate = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const AchievementsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
  color: #1e3a8a;
`;

export const AchievementsContainer = styled.View`
  flex-direction: row;
  background-color: #bfdbfe;
  border-radius: 10px;
  justify-content: space-between;
  padding: 10px;
  width: 90%;
`;

export const AchievementBox = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: #3b82f6;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

export const AchievementDescription = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: #1e3a8a;
  font-weight: bold;
  text-align: center;
`;

export const AchivmentIcons = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 6px;
`;
export const LogoutButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #1e40af;
  padding: 12px 24px;
  border-radius: 12px;
  elevation: 3;
`;
export const LogoutButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const IndicatorContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
