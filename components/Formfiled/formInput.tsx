import React from "react";
import { TextInputProps } from "react-native";

import { StyledInput } from "./form.style";

interface InputProps extends TextInputProps {
  hasError?: boolean;
}

const Input: React.FC<InputProps> = ({ hasError = false, ...props }) => {
  return <StyledInput hasError={hasError} {...props} />;
};

export default Input;
