/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useCallback, useState } from 'react';
import { View, ScrollView, Image, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../../context/appContext';
import { updateUserNotify } from '../../services/user';
import { getSensors } from '../../services/sensor';
import { getAlerts } from '../../services/alert';
import { getStatusHelix } from '../../services/helix';
import logoImg from '../../assets/imgs/logoPlantaHidro.png';
import styles from './styles';

export default function HomeScreen({ navigation }) {
  const {
    setLoading,
    name,
    tokenJwt,
    userId,
    tokenMsg,
    sensors,
    setSensors,
    alerts,
    setAlerts,
  } = useContext(AppContext);
  const [helixStatus, setHelixStatus] = useState(false);

  useEffect(() => {
    updateUserNotify({ userId, setLoading, notifyToken: tokenMsg, tokenJwt });
    getInfoSensor();
    getInfoAlerts();
  }, []);

  const getInfoSensor = async () => {
    try {
      const respData = await getSensors({ setLoading, userId, tokenJwt });
      setSensors(respData);
    } catch (error) {
      Alert.alert(
        'Erro!',
        'Falha ao buscar sensores, tente novamente mais tarde!'
      );
    }
  };

  const getInfoAlerts = async () => {
    try {
      const respData = await getAlerts({ setLoading, userId, tokenJwt });
      setAlerts(respData);
    } catch (error) {
      Alert.alert(
        'Erro!',
        'Falha ao buscar alertas, tente novamente mais tarde!'
      );
    }
  };

  const getInfoHelix = async () => {
    try {
      const respBool = await getStatusHelix({ setLoading });
      setHelixStatus(respBool);
    } catch (error) {
      setHelixStatus(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getInfoHelix();
    }, [])
  );

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
          <Text style={styles.txt}>
            Você tem {sensors.length}{' '}
            {sensors.length > 1 || sensors.length === 0
              ? 'sensores cadastrados'
              : 'sensor cadastrado'}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.txt}>
            {alerts.length}{' '}
            {alerts.length > 1 || alerts.length === 0
              ? 'alertas estão ativos'
              : 'alerta está ativo'}{' '}
            atualmente
          </Text>
          <Icon name="envelope" size={22} color="white" />
        </View>
        <View style={styles.section}>
          <Icon
            name={helixStatus ? 'check-circle-o' : 'exclamation-circle'}
            size={22}
            color="white"
          />
          <Text style={styles.txt}>
            Helix esta {helixStatus ? 'online' : 'offline'} no momento
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
