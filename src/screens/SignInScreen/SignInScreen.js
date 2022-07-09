import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import auth from '@react-native-firebase/auth';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ErrorMessage} from '../../components/CustomTextStyles/CustomTextStyles';

const SignInScreen = ({navigation}) => {
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const userInfo = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string()
      .trim()
      .min(6, 'Password is too short!')
      .required('Password is required!'),
  });

  const forgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  }; // to be changed once other screens are made!

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  }; // to be changed once other screens are made!

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.root}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />

        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={async values => {
            let unmounted = false;
            console.log('Login pressed.');
            setWaiting(true);
            await auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(() => {
                console.log('User account created & signed in!');
              })
              .catch(error => {
                if (error.code === 'auth/user-not-found') {
                  console.log('That email address is invalid!');
                  setMessage('Email is not registered.');
                  setShowMessage(true);
                  setWaiting(false);
                }

                if (error.code === 'auth/wrong-password') {
                  console.log('Wrong password.');
                  setMessage('Wrong password.');
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
            const {email, password} = values;

            return (
              <>
                <CustomInputField
                  placeholder="Email"
                  value={email}
                  setValue={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                />

                <CustomInputField
                  placeholder="Password"
                  value={password}
                  setValue={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                  secureTextEntry
                />

                <CustomButton
                  text="Log In"
                  onPress={handleSubmit}
                  type="PRIMARY"
                />

                {showMessage ? <ErrorMessage text={message} /> : null}
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
              Forgot Password?
            </Text>
          }
          onPress={forgotPasswordPressed}
          type="SECONDARY"
        />

        <CustomButton
          text={
            <Text style={{fontSize: 12}}>
              Don't have an account?
              <Text style={{fontSize: 12}}> </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  textDecorationLine: 'underline',
                  fontSize: 12,
                }}>
                Sign Up.
              </Text>
            </Text>
          }
          onPress={onSignUpPressed}
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
    justifyContent: 'center',
    backgroundColor: '#70DAD3',
    height: Dimensions.get('window').height,
  },
  logo: {
    width: '75%',
    maxWidth: 600,
    maxHeight: 140,
  },
});

export default SignInScreen;
