import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../context/appContext';

export default function HomeScreen() {
  const { name } = useContext(AppContext);
  console.log('name', name);

  return (
    <View>
      <Text>HOME Screen {name} !!</Text>
    </View>
  );
}
