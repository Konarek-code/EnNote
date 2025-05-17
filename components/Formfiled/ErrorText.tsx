import { StyledErrorText } from "./form.style";

const ErrorText = ({ children }: { children: React.ReactNode }) => {
  return <StyledErrorText>{children}</StyledErrorText>;
};

export default ErrorText;
