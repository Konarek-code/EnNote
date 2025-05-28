// components/register/RegisterForm.tsx
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "@/utils/AuthProvider";
import { Picker } from "@react-native-picker/picker";
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
  PickerWrapper,
  ErrorText,
  StyledScrollView,
} from "../loginComponent/login.component.style";
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
  gender: Yup.string().oneOf(["male", "female"]).required("Gender is required"),
});

const RegisterForm = () => {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <StyledScrollView>
        <Container>
          <Formik
            initialValues={{ name: "", email: "", password: "", gender: "" }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await register(
                  values.email,
                  values.password,
                  values.name,
                  values.gender
                );
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
                <PickerWrapper>
                  <Picker
                    selectedValue={values.gender}
                    onValueChange={handleChange("gender")}
                    enabled={!isSubmitting}
                  >
                    <Picker.Item label="Select gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                  </Picker>
                </PickerWrapper>
                {touched.gender && errors.gender && (
                  <ErrorText>{errors.gender}</ErrorText>
                )}

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
                    signInWithGoogle();
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
      </StyledScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;
