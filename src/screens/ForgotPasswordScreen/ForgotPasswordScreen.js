import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import {firebase} from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {ErrorMessage} from '../../components/CustomTextStyles/CustomTextStyles';

/**
 * Anonymous class that renders ForgotPasswordScreen.
 *
 * @param {*} navigation Navigation prop.
 * @returns Render of ForgotPasswordScreen.
 */
const ForgotPasswordScreen = ({navigation}) => {
  /**
   * State for error messages.
   */
  const [message, setMessage] = useState(null);

  /**
   * State to show error messages. If true, the message will
   * show. Else, it will not show.
   */
  const [showMessage, setShowMessage] = useState(false);

  /**
   * Shows activity indicator if true.
   */
  const [waiting, setWaiting] = useState(false);

  /**
   * Initial value for the information that will be
   * inputted into the field. Used for Formik.
   */
  const userInfo = {
    email: '',
  };

  /**
   * Yup object for validating the information inputted in the fields.
   */
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email!').required('Email is required!'),
  });

  /**
   * Function to navigate back to the login screen.
   */
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
            console.log('start');
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
                setWaiting(false);
                navigation.goBack();
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
    justifyContent: 'center',
    backgroundColor: '#70DAD3',
    height: Dimensions.get('window').height,
  },
  logo: {
    width: '75%',
    maxWidth: 600,
    maxHeight: 140,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ForgotPasswordScreen;
