// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import colors from '../config/colors';

import AsyncStorage from '@react-native-community/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'DrawerNavigationRoutes'
        ),
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to</Text>
      <Text>Your CliMate</Text>
      <Text>Connect with people and get the</Text>
      <Text>latest climate change news</Text>
      <Image
        source={require('../Image/startPage2.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color= "#000000"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    color: colors.black,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});