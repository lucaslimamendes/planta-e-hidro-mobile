/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import { AppContext } from '../../context/appContext';
import logoImg from '../../assets/imgs/logoPlantaHidro.png';
import styles from './styles';
import { createLogin } from '../../services/user';

export default function LoginScreen({ navigation }) {
  const { setLoading, setTokenMsg, setName, setTokenJwt, setUserId } =
    useContext(AppContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const getTokenMsg = async () => {
    const fcmToken = await messaging().getToken();
    setTokenMsg(fcmToken);
  };

  useEffect(() => {
    getTokenMsg();
  }, []);

  const handleLogin = async () => {
    try {
      const respData = await createLogin({ email, password, setLoading });

      setName(respData.userName);
      setTokenJwt(respData.token);
      setUserId(respData.userId);
      navigation.navigate('HomeMyTabs');
    } catch (error) {
      Alert.alert(
        'Erro!',
        'Falha no login, preencha todos os campos ou tente novamente mais tarde!'
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <Image style={styles.imgLogo} source={logoImg} />
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
          onPress={() => handleLogin()}
        >
          Entrar
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => {
            navigation.navigate('Cadastro');
          }}
        >
          Cadastrar
        </Button>
      </View>
    </ScrollView>
  );
}
