import styled from "styled-components/native";

export const BaseButton = styled.TouchableOpacity`
  background-color: #ccc;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-top: 10px;
`;

export const ButtonPrimary = styled(BaseButton)`
  background-color: #3b82f6;
  shadow-color: #3b82f6;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 3;
`;

export const TranslateButton = styled(BaseButton)`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #1976d2;
  align-items: center;
  shadow-color: #64b5f6;
  shadow-opacity: 0.5;
  shadow-radius: 6px;
  elevation: 10;
`;

export const GoogleButton = styled(BaseButton)`
  flex-direction: row;
  background-color: white;
  border-width: 1px;
  border-color: #ddd;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 5px;
  elevation: 1;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 8px;
  align-self: flex-start;
  background-color: transparent;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;

interface LevelButtonProps {
  backgroundColor: string;
}

export const LevelButton = styled.TouchableOpacity<LevelButtonProps>`
  flex: 1;
  align-items: center;
  padding: 10px;
  margin-horizontal: 5px;
  border-radius: 8px;
  background-color: ${(props: LevelButtonProps) => props.backgroundColor};
`;
export const LevelText = styled.Text`
  color: white;
  font-weight: bold;
`;
interface ActionButtonProps {
  secondary?: boolean;
  disabled?: boolean;
}

interface ActionButtonStyledProps {
  secondary: boolean;
  disabled?: boolean;
}

export const ActionButton = styled(BaseButton)<ActionButtonStyledProps>`
  background: ${({ secondary, disabled }: ActionButtonStyledProps) =>
    disabled ? "#999999" : secondary ? "#8884d8" : "#6a1b9a"};
  opacity: ${({ disabled }: ActionButtonStyledProps) => (disabled ? 0.6 : 1)};
  padding: 12px 20px;
  border-radius: 10px;
  elevation: ${({ disabled }: ActionButtonStyledProps) => (disabled ? 0 : 5)};
  shadow-opacity: ${({ disabled }: ActionButtonStyledProps) =>
    disabled ? 0 : 0.3};
  shadow-radius: ${({ disabled }: ActionButtonStyledProps) =>
    disabled ? 0 : 4}px;
`;

export const MenuButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: rgba(0, 119, 182, 0.9);
  padding: 15px;
  margin-vertical: 5px;
  border-radius: 12px;
  shadow-color: #64b5f6;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 6;
`;

export const MenuIcon = styled.Image`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

export const MenuText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: 600;
`;
export const GoogleIconImage = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;
export const GoogleButtonText = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

export const ButtonPrimaryText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 18px;
`;
