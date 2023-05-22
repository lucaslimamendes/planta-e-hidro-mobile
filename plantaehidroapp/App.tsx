import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AppProvider } from './src/context/appContext';
import { MainStack } from './src/routes';
import Loading from './src/components/Loading';
// import { getFcmTokenFromLocalStorage } from './src/helper/getFmcToken';

export default function App(): JSX.Element {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  // const getToken = async () => {
  //   const token = await getFcmTokenFromLocalStorage();
  //   console.log('tokennnn', token);
  // };

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title || 'Novo Alerta!',
        remoteMessage.notification?.body
      );
      console.log(JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <AppProvider>
      <Loading />
      <NavigationContainer>{MainStack()}</NavigationContainer>
    </AppProvider>
  );
}
