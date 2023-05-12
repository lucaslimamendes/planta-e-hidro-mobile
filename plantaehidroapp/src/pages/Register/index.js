import React, { useContext, useState } from 'react';
import { View, ScrollView, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../../context/appContext';
import logoImg from '../../assets/imgs/logoPlantaHidro.png';
import styles from './styles';
import { createUser } from '../../services/user';

export default function RegisterScreen({ navigation }) {
  const { name, setName, setLoading, tokenMsg } = useContext(AppContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleRegister = async () => {
    try {
      await createUser({ email, password, name, tokenMsg, setLoading });

      Alert.alert('OK!', 'Cadastro realizado com sucesso.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(
        'Erro!',
        'Falha ao se cadastrar, preencha todos os campos ou tente novamente mais tarde!'
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <Image style={styles.imgLogo} source={logoImg} />
        <TextInput
          mode="outlined"
          label="Nome:"
          onChangeText={text => setName(text)}
          value={name}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Email:"
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Senha:"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
          style={styles.input}
        />
        <Button
          mode="contained-tonal"
          textColor="#fff"
          buttonColor="green"
          style={styles.button}
          onPress={() => handleRegister()}
        >
          Cadastrar
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          Voltar
        </Button>
      </View>
    </ScrollView>
  );
}
