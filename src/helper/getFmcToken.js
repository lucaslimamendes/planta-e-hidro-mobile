import { AsyncStorage } from 'react-native';

const getFcmTokenFromLocalStorage = async () => {
  const fcmtoken = await AsyncStorage.getItem('fcmtoken');

  if (!fcmtoken) {
    try {
      const newFcmToken = await messaging().getToken();
      await AsyncStorage.setItem('fcmtoken', newFcmToken);

      return newFcmToken;
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('token found', fcmtoken);
    return fcmtoken;
  }
};

export { getFcmTokenFromLocalStorage };
