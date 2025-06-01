import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { Formik } from 'formik';
import React from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';

import { completeGoogleUserProfile } from '@/utils/firebaseAuth';

import Button from '../buttons/button.component';
import { ButtonPrimaryText } from '../buttons/button.styles';
import FormField from '../Formfiled/formFiled';
import {
  Container,
  Title,
  ErrorText,
  PickerWrapper,
  StyledScrollView,
} from '../loginComponent/login.component.style';

const CompleteProfileSchema = Yup.object().shape({
  name: Yup.string().min(2).required('Name is required'),
  gender: Yup.string().required('Gender is required'),
});

const CompleteProfile = () => {
  const router = useRouter();

  const handleSubmitProfile = async (values: { name: string; gender: string }) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error('User not logged in');
      }

      // Zapisz do Firestore + aktualizuj profil + dispatch
      await completeGoogleUserProfile(currentUser.uid, values.name, values.gender);

      router.replace('/(tabs)/screens/profile');
    } catch (error: any) {
      Alert.alert('Profile Error', error.message || 'Something went wrong');
    }
  };

  return (
    <StyledScrollView>
      <Container>
        <Title>Complete your profile</Title>

        <Formik
          initialValues={{ name: '', gender: '' }}
          validationSchema={CompleteProfileSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleSubmitProfile(values).finally(() => setSubmitting(false))
          }
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
          }) => (
            <>
              <FormField
                placeholder="Your name"
                hasError={!!errors.name && touched.name}
                onChangeText={handleChange('name')}
                onBlur={() => handleBlur('name')}
                value={values.name}
                editable={!isSubmitting}
              />
              {!!errors.name && touched.name && <ErrorText>{errors.name}</ErrorText>}

              <PickerWrapper>
                <Picker
                  selectedValue={values.gender}
                  onValueChange={(itemValue) => setFieldValue('gender', itemValue)}
                  enabled={!isSubmitting}
                >
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </PickerWrapper>
              {!!errors.gender && touched.gender && <ErrorText>{errors.gender}</ErrorText>}

              <Button type="primary" onPress={() => handleSubmit()} disabled={isSubmitting}>
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ButtonPrimaryText>Confirm</ButtonPrimaryText>
                )}
              </Button>
            </>
          )}
        </Formik>
      </Container>
    </StyledScrollView>
  );
};

export default CompleteProfile;
