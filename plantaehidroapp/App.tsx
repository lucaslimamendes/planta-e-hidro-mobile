import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { MainStack } from './src/routes';
import { getFcmTokenFromLocalStorage } from './src/helper/getFmcToken';

export default function App(): JSX.Element {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  const getToken = async () => {
    const token = await getFcmTokenFromLocalStorage();
    console.log('tokennnn', token);
  };

  useEffect(() => {
    getToken();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  
  return (
    <NavigationContainer>
      { MainStack() }
    </NavigationContainer>
  );
};
