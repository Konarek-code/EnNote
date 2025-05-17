import React from "react";
import { Alert, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { loginUser } from "@/utils/firebaseAuth";
import GoogleIcon from "@/assets/signin-assets/signin-assets/Android/png2x/light/android_light_rd_na2x.png";
import FormField from "../Formfiled/formFiled";
import Button from "../buttons/button.component";
import {
  ButtonPrimaryText,
  GoogleButtonText,
  GoogleIconImage,
} from "../buttons/button.styles";

import {
  Container,
  Title,
  ErrorText,
  HorizontalLine,
  BreakText,
  SignupRegular,
  SignupBold,
  SignupWrapper,
} from "./login.component.style";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const router = useRouter();

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await signInWithGoogle();
  //     router.replace("/(tabs)/screens/profile");
  //   } catch (error: any) {
  //     Alert.alert("Google Sign In Error", error.message);
  //   }
  // };

  return (
    <Container>
      <Title>Log in</Title>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await loginUser(values.email, values.password);
            router.replace("/(tabs)/screens/profile");
          } catch (error: any) {
            Alert.alert("Login Error", error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <FormField
              placeholder="Email"
              hasError={!!errors.email && touched.email}
              onChangeText={handleChange("email")}
              onBlur={() => handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              editable={!isSubmitting}
            />
            {!!errors.email && touched.email && (
              <ErrorText>{errors.email}</ErrorText>
            )}
            <FormField
              placeholder="Password"
              hasError={!!errors.password && touched.password}
              onChangeText={handleChange("password")}
              onBlur={() => handleBlur("password")}
              value={values.password}
              secureTextEntry
              editable={!isSubmitting}
            />
            {!!errors.password && touched.password && (
              <ErrorText>{errors.password}</ErrorText>
            )}
            <Button
              type="primary"
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ButtonPrimaryText>Sign in</ButtonPrimaryText>
              )}
            </Button>
            <HorizontalLine></HorizontalLine>
            <BreakText> or </BreakText>
            <Button
              type="google"
              disabled={isSubmitting}
              onPress={() => {
                // TODO: Implement Google sign-in logic here
                Alert.alert(
                  "Google Sign In",
                  "Google sign-in not implemented yet."
                );
              }}
            >
              <GoogleIconImage source={GoogleIcon} />
              <GoogleButtonText>Sign in with Google</GoogleButtonText>
            </Button>
          </>
        )}
      </Formik>

      <SignupWrapper
        onPress={() => router.push("/(tabs)/screens/registerScreen")}
      >
        <SignupRegular>dont have account? </SignupRegular>
        <SignupBold>Sign Up</SignupBold>
      </SignupWrapper>
    </Container>
  );
};

export default LoginScreen;
