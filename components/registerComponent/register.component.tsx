import React from "react";
import { Alert, ActivityIndicator, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { register } from "@/utils/firebaseAuth";
import GoogleIcon from "@/assets/signin-assets/signin-assets/Android/png2x/light/android_light_rd_na2x.png";

import {
  Container,
  Title,
  Input,
  ErrorText,
  ButtonPrimary,
  ButtonPrimaryText,
  SignupWrapper,
  SignupRegular,
  SignupBold,
  BreakText,
  GoogleButton,
  GoogleIconImage,
  HorizontalLine,
} from "../loginComponent/login.component.style"; // Reuse login styles

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegisterScreen = () => {
  const router = useRouter();

  return (
    <Container>
      <Title>Register</Title>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await register(values.email, values.password, values.name);
            router.replace("/(tabs)/screens/loginScreen");
          } catch (error: any) {
            Alert.alert("Registration Error", error.message);
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
              placeholder="Name"
              hasError={!!errors.name && touched.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              editable={!isSubmitting}
            />
            {!!errors.name && touched.name && (
              <ErrorText>{errors.name}</ErrorText>
            )}

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
                <ButtonPrimaryText>Sign up</ButtonPrimaryText>
              )}
            </ButtonPrimary>
            <HorizontalLine />
            <BreakText> or </BreakText>

            <GoogleButton disabled={isSubmitting}>
              <GoogleIconImage source={GoogleIcon} />
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Sign up with Google
              </Text>
            </GoogleButton>
          </>
        )}
      </Formik>

      <SignupWrapper
        onPress={() => router.replace("/(tabs)/screens/loginScreen")}
      >
        <SignupRegular>Already have an account? </SignupRegular>
        <SignupBold>Log in</SignupBold>
      </SignupWrapper>
    </Container>
  );
};

export default RegisterScreen;
