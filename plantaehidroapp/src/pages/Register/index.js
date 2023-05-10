import React, { useContext, useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../../context/appContext';
import logoImg from '../../assets/imgs/logoPlantaHidro.png';
import styles from './styles';

export default function RegisterScreen({ navigation }) {
  const { name, setName } = useContext(AppContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
          onPress={() => {
            navigation.navigate('HomeMyTabs');
          }}
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
