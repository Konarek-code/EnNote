import React from "react";
import { Alert, Text, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { loginUser } from "@/utils/firebaseAuth";
import GoogleIcon from "@/assets/signin-assets/signin-assets/Android/png2x/light/android_light_rd_na2x.png";

import {
  Container,
  Title,
  Input,
  ErrorText,
  ButtonPrimary,
  ButtonPrimaryText,
  GoogleButton,
  GoogleIconImage,
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
            <Input
              placeholder="Email"
              hasError={!!errors.email && touched.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isSubmitting}
            />
            {!!errors.email && touched.email && (
              <ErrorText>{errors.email}</ErrorText>
            )}
            <Input
              placeholder="Password"
              hasError={!!errors.password && touched.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              editable={!isSubmitting}
            />
            {!!errors.password && touched.password && (
              <ErrorText>{errors.password}</ErrorText>
            )}
            <ButtonPrimary
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ButtonPrimaryText>Sign in</ButtonPrimaryText>
              )}
            </ButtonPrimary>
            <HorizontalLine></HorizontalLine>
            <BreakText> or </BreakText>
            <GoogleButton disabled={isSubmitting}>
              <GoogleIconImage source={GoogleIcon} />
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Sign in with Google
              </Text>
            </GoogleButton>
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
