import { Text, View } from 'react-native';
import { TextInput, Card, Button, SegmentedButtons, Provider, Portal, Dialog} from 'react-native-paper';
import styles from './styles';
import { useState, useEffect } from 'react';

export default function RegisterScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  return (
    <View>
      <Card style={styles.loginCard}>
        <Card.Title
            title="Prazer conhecê-lo(a)"
            titleStyle={{ fontSize: 20 }}
        />
        <Card.Content>
            <TextInput
              mode='outlined' 
              label="Digite seu nome:"
              value={userName}
              onChangeText={(text) => setUserName(text)}
               >
            </TextInput>
            <TextInput
              mode='outlined' 
              label="Agora o seu email:"
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
              >
            </TextInput>
            <TextInput
              mode='outlined' 
              label="Crie uma senha forte:"
              value={userPassword}
              secureTextEntry
              onChangeText={(text) => setUserPassword(text)}
              >
            </TextInput>
            <TextInput
              mode='outlined' 
              label="Confirme sua senha:"
              value={passwordConfirmation}
              secureTextEntry
              onChangeText={(text) => setPasswordConfirmation(text)}
              >
            </TextInput>
        </Card.Content>
        <Card.Actions>
            <Button onPress={() => {}}>
                Cadastrar
            </Button>
        </Card.Actions>
      </Card>
      <View style={styles.loginFooter}>
        <Button style={styles.footerButton}
          onPress={() => navigation.navigate('Login')}
        >Já tem uma conta?</Button>
        <Button style={styles.footerButton}
          onPress={() => navigation.navigate('HomeMyTabs')}
        >Página inicial</Button>
      </View>
    </View>
  );
}
