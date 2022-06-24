import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import * as Yup from 'yup';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

const SignUpScreen = () => {
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const userInfo = {
    name: '',
    password: '',
    email: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .max(20, 'Maximum characters is 20.')
      .required('Name is required!'),
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string()
      .trim()
      .min(6, 'Password is too short!')
      .required('Password is required!'),
  });

  const navigation = useNavigation();

  const onSignUpPressed = async () => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({
            name: name,
            email: email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: null,
            itineraries: 0,
          });
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log(
            'There is no existing user record corresponding to the provided identifier.',
          );
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        Alert.alert(
          error.code,
          error.message,
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
              style: 'OK',
            },
          ],
          {
            cancelable: true,
            onDismiss: () =>
              console.log(
                'This alert was dismissed by tapping outside of the alert dialog.',
              ),
          },
        );
      });
  };

  const onLogInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.root}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />

        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={async values => {
            let unmounted = false;
            setWaiting(true);
            await auth()
              .createUserWithEmailAndPassword(values.email, values.password)
              .then(async () => {
                await firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    name: values.name,
                    email: values.email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: null,
                    itineraries: 0,
                  });
                console.log('User account created & signed in!');
                setWaiting(false);
              })
              .catch(error => {
                if (error.code === 'auth/email-in-use') {
                  console.log(
                    'There is no existing user record corresponding to the provided identifier.',
                  );
                  setMessage('Email address is already in use.');
                  setShowMessage(true);
                  setWaiting(false);
                }

                if (error.code === 'auth/weak-password') {
                  console.log(
                    'There is no existing user record corresponding to the provided identifier.',
                  );
                  setMessage('Password needs to be a minimum of 6 characters.');
                  setShowMessage(true);
                  setWaiting(false);
                }

                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
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
            const {name, email, password} = values;

            return (
              <>
                <CustomInputField
                  placeholder="Name"
                  value={name}
                  setValue={handleChange('name')}
                  maxLength={20}
                  onBlur={handleBlur('name')}
                  error={touched.name && errors.name}
                />

                <CustomInputField
                  placeholder="Email"
                  value={email}
                  setValue={handleChange('email')}
                  error={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                />

                <CustomInputField
                  placeholder="Password"
                  value={password}
                  setValue={handleChange('password')}
                  error={touched.password && errors.password}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />

                <CustomButton
                  text="Sign Up"
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
            <Text style={{fontSize: 12}}>
              Have an existing account?
              <Text style={{fontSize: 12}}> </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  textDecorationLine: 'underline',
                  fontSize: 12,
                }}>
                Log in.
              </Text>
            </Text>
          }
          onPress={onLogInPressed}
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
    paddingTop: '50%',
    backgroundColor: '#70DAD3',
  },
  logo: {
    width: '75%',
    maxWidth: 600,
    maxHeight: 140,
  },
});

export default SignUpScreen;
