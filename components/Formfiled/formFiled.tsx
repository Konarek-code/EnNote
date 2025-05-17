import React from "react";
import Input from "./formInput";
import ErrorText from "./ErrorText";

interface FormFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  secureTextEntry?: boolean;
  editable?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  hasError?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry = false,
  editable = true,
  keyboardType = "default",
}) => (
  <>
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      editable={editable}
      keyboardType={keyboardType}
      hasError={!!error && touched}
    />
    {!!error && touched && <ErrorText>{error}</ErrorText>}
  </>
);

export default FormField;
