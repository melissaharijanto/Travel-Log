import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const userInfo = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email!').required('Email is required!'),
  });

  const onBackToLogInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.root}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.text}>Reset Your Password!</Text>

        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={async values => {
            let unmounted = false;
            setWaiting(true);
            await firebase
              .auth()
              .sendPasswordResetEmail(values.email)
              .then(() => {
                Alert.alert(
                  'Success!',
                  'A password reset email has been sent.',
                );
                navigation.goBack();
                setWaiting(false);
              })
              .catch(error => {
                if (error.code === 'auth/user-not-found') {
                  console.log('That email address is invalid!');
                  setMessage('Email is not registered.');
                  setShowMessage(true);
                  setWaiting(false);
                }

                if (error.code === 'auth/invalid-email') {
                  setMessage('Email is invalid.');
                  setShowMessage(true);
                  setWaiting(false);
                }
              });

            return () => {
              unmounted = true;
            };
          }}>
          {({
            values,
            handleChange,
            errors,
            handleBlur,
            touched,
            handleSubmit,
          }) => {
            const {email} = values;

            return (
              <>
                <CustomInputField
                  placeholder="Your Account Email"
                  value={email}
                  setValue={handleChange('email')}
                  error={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                />

                <CustomButton
                  text="Send Password Reset Email"
                  onPress={handleSubmit}
                  type="PRIMARY"
                />

                {showMessage ? (
                  <Text style={styles.error}>{message}</Text>
                ) : null}
              </>
            );
          }}
        </Formik>

        <CustomButton
          text={
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: 11,
              }}>
              Back to Log In
            </Text>
          }
          onPress={onBackToLogInPressed}
          type="SECONDARY"
        />

        {waiting ? <ActivityIndicator size="large" color="#3B4949" /> : null}
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingTop: '55%',
    backgroundColor: '#70DAD3',
  },
  logo: {
    width: '75%',
    maxWidth: 600,
    maxHeight: 140,
  },
  error: {
    color: '#a3160b',
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ForgotPasswordScreen;
