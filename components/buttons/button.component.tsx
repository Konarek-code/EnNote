import React from "react";

import {
  BaseButton,
  GoogleButton,
  ButtonPrimary,
  ActionButton,
  TranslateButton,
  BackButton,
  LevelButton,
  MenuButton,
} from "./button.styles";

export const BUTTON_TYPES = {
  base: "base",
  google: "google",
  primary: "primary",
  action: "action",
  translate: "translate",
  back: "back",
  level: "level",
  menu: "menu",
} as const;

type ButtonType = keyof typeof BUTTON_TYPES;

interface ButtonProps {
  type?: ButtonType;
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
  backgroundColor?: string;
}

const getButtonComponent = (type: ButtonType = "base") => {
  const map = {
    base: BaseButton,
    google: GoogleButton,
    primary: ButtonPrimary,
    action: ActionButton,
    translate: TranslateButton,
    back: BackButton,
    level: LevelButton,
    menu: MenuButton,
  };

  return map[type] || BaseButton;
};

const Button: React.FC<ButtonProps> = ({
  type = "base",
  children,
  onPress,
  disabled = false,
  secondary = false,
  backgroundColor,
}) => {
  const StyledButton = getButtonComponent(type);

  if (type === "level") {
    return (
      <StyledButton
        onPress={onPress}
        backgroundColor={backgroundColor}
        disabled={disabled}
      >
        {children}
      </StyledButton>
    );
  }
  return (
    <StyledButton onPress={onPress} disabled={disabled} secondary={secondary}>
      {children}
    </StyledButton>
  );
};

export default Button;
