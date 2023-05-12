import React, { useContext, useState } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../../context/appContext';
import logoImg from '../../assets/imgs/logoPlantaHidro.png';
import styles from './styles';

export default function HomeScreen({ navigation }) {
  const { name } = useContext(AppContext);

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <Image style={styles.imgLogo} source={logoImg} />

        <View style={styles.section}>
          <Text style={styles.txt}>Olá, {name}!</Text>
          <Icon name="user" size={22} color="white" />
        </View>
        <View style={styles.section}>
          <Icon name="server" size={22} color="white" />
          <Text style={styles.txt}>Você tem 5 sensores cadastrados</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.txt}>2 alertas estão ativos atualmente</Text>
          <Icon name="envelope" size={22} color="white" />
        </View>
        <View style={styles.section}>
          <Icon name="check-circle-o" size={22} color="white" />
          <Text style={styles.txt}>Helix esta online no momento</Text>
        </View>
      </View>
    </ScrollView>
  );
}
