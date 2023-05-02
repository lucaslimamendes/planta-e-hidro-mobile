import { Text, View, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View>
      <Text>LOGIN Screen!</Text>
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('HomeMyTabs')}
      />
    </View>
  );
}
