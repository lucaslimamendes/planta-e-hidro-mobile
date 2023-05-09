import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { AppContext } from '../../context/appContext';

export default function LoginScreen({ navigation }) {
  const { setName } = useContext(AppContext);

  return (
    <View>
      <Text>LOGIN Screen!</Text>
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Go to Home"
        onPress={() => {
          setName('Yidj Pijk');
          navigation.navigate('HomeMyTabs');
        }}
      />
    </View>
  );
}
