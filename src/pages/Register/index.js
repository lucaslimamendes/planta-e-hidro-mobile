import { Text, View, Button } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View>
      <Text>REGISTER Screen!</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('HomeMyTabs')}
      />
    </View>
  );
}
