// components/register/RegisterForm.tsx
import React from "react";
import { ActivityIndicator, Text, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "../Formfiled/formFiled";
import {
  BreakText,
  HorizontalLine,
  Container,
  SignupWrapper,
  SignupBold,
  SignupRegular,
} from "../loginComponent/login.component.style"; // zaktualizuj do właściwej ścieżki
import GoogleIcon from "@/assets/signin-assets/signin-assets/Android/png2x/light/android_light_rd_na2x.png";
import { register } from "@/utils/firebaseAuth";
import { useRouter } from "expo-router";
import Button from "../buttons/button.component";
import {
  ButtonPrimaryText,
  GoogleButtonText,
  GoogleIconImage,
} from "../buttons/button.styles";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .max(10, "Name must be at most 10 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const RegisterForm = () => {
  const router = useRouter();

  return (
    <Container>
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
            <FormField
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={() => handleBlur("name")}
              error={errors.name}
              touched={touched.name}
              editable={!isSubmitting}
            />
            <FormField
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              editable={!isSubmitting}
            />
            <FormField
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              editable={!isSubmitting}
            />
            <Button
              type="primary"
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ButtonPrimaryText>Sign up</ButtonPrimaryText>
              )}
            </Button>
            <HorizontalLine />
            <BreakText>or</BreakText>
            <Button
              type="google"
              disabled={isSubmitting}
              onPress={() => {
                // TODO: Implement Google sign up logic here
                Alert.alert(
                  "Google Sign Up",
                  "Google sign up not implemented yet."
                );
              }}
            >
              <GoogleIconImage source={GoogleIcon} />
              <GoogleButtonText>Sign up with Google</GoogleButtonText>
            </Button>
          </>
        )}
      </Formik>
      <SignupWrapper
        onPress={() => {
          router.replace("/(tabs)/screens/loginScreen");
        }}
      >
        <SignupRegular>Already have an account?</SignupRegular>
        <SignupBold> Sign in</SignupBold>
      </SignupWrapper>
    </Container>
  );
};

export default RegisterForm;
