import { Text, View } from 'react-native';
import { TextInput, Card, Button, SegmentedButtons, Provider, Portal, Dialog} from 'react-native-paper';
import styles from './styles';
import { useState, useEffect } from 'react';

export default function LoginScreen({ navigation }) {
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <View >
      <Card style={styles.loginCard}>
        <Card.Title
            title="Bem vindo(a) de volta!"
            titleStyle={{ fontSize: 20 }}
        />
        <Card.Content>
            <TextInput
              mode='outlined' 
              label="Login:"
              value={userLogin}
              onChangeText={(text) => setUserLogin(text)}
               >
            </TextInput>
            <TextInput
              mode='outlined' 
              label="Senha:"
              secureTextEntry
              value={userPassword}
              onChangeText={(text) => setUserPassword(text)}
              >
            </TextInput>
        </Card.Content>
        <Card.Actions>
            <Button style={{}} onPress={() => { }}>
                Esqueci minha senha
            </Button>
            <Button onPress={() => navigation.navigate('HomeMyTabs')}>
                Entrar
            </Button>
        </Card.Actions>
      </Card>
      <View style={styles.loginFooter}>
        <Button style={styles.footerButton}
          onPress={() => navigation.navigate('Register')}
        >Registrar</Button>
        <Button style={styles.footerButton}
          onPress={() => navigation.navigate('HomeMyTabs')}
        >Página inicial</Button>
      </View>
    </View>
  );
}
