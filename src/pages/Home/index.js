import { Text, ScrollView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useState, useEffect } from 'react';

export default function HomeScreen() {

  const [user, setUser] = useState('Fábio Cabrini');

useEffect(
    () => {
        //loadFunction
    }, []
);

  return (
    <ScrollView>

      <Text>Bem-vindo {user}!</Text>

    </ScrollView>
  );
}
