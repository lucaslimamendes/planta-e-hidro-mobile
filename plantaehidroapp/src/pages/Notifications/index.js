/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useContext, useCallback } from 'react';
import { Text, ScrollView, View, Alert } from 'react-native';
import {
  TextInput,
  Button,
  Card,
  SegmentedButtons,
  Provider,
  Portal,
  Dialog,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import DropDown from 'react-native-paper-dropdown';
import { AppContext } from '../../context/appContext';
import { getAlerts, createAlert, deleteAlert } from '../../services/alert';
import adjustDate from '../../helper/adjustDate';
import styles from './styles';

const operationsList = [
  { value: '0', label: 'Menor' },
  { value: '1', label: 'Maior' },
];

export default function NotificationScreen() {
  const { setLoading, tokenJwt, userId, sensors, alerts, setAlerts } =
    useContext(AppContext);

  const [createNewAlert, setCreateNewAlert] = useState(false);
  const [operation, setOperation] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [sensor, setSensor] = useState('');
  const [sensorValue, setSensorValue] = useState('');
  const [deleteAlertId, setDeleteAlertId] = useState('');
  const [assureDeletion, setAssureDeletion] = useState(false);
  const [sensorsList, setSensorsList] = useState([]);

  const getInfoAlerts = async () => {
    try {
      const respData = await getAlerts({ setLoading, userId, tokenJwt });

      setAlerts(respData);
    } catch (error) {
      console.log('error', error);
      Alert.alert(
        'Erro!',
        'Falha ao buscar alertas, tente novamente mais tarde!'
      );
    }
  };

  const getSensors = () => {
    const newSensors = [];

    for (const [i, x] of sensors.entries()) {
      newSensors.push({ label: x.sensorHelixDeviceId, value: x._id });
    }

    setSensorsList(newSensors);
  };

  useFocusEffect(
    useCallback(() => {
      getInfoAlerts();
      getSensors();
    }, [])
  );

  const cancelNewAlert = () => {
    setCreateNewAlert(false);
    setSensor('');
    setOperation('');
    setSensorValue('');
  };

  const saveNewAlert = async () => {
    try {
      await createAlert({
        setLoading,
        tokenJwt,
        data: {
          sensorId: sensor,
          value: sensorValue,
          lessOrGreater: operation,
        },
      });
      getInfoAlerts();
      cancelNewAlert();
    } catch (error) {
      Alert.alert(
        'Erro!',
        'Falha ao adicionar novo alerta, tente novamente mais tarde!'
      );
    }
  };

  const questionDeleteSensor = alertId => {
    setDeleteAlertId(alertId);
    setAssureDeletion(true);
  };

  const deleteSensor = async id => {
    try {
      await deleteAlert({ setLoading, tokenJwt, alertId: deleteAlertId });
      setDeleteAlertId('');
      getInfoAlerts();
      setAssureDeletion(false);
    } catch (error) {
      Alert.alert(
        'Erro!',
        'Falha ao excluir alerta, tente novamente mais tarde!'
      );
    }
  };

  return (
    <Provider>
      <Portal>
        <Dialog
          visible={assureDeletion}
          onDismiss={() => {
            setAssureDeletion(false);
          }}
        >
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Deseja realmente apagar?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAssureDeletion(false)}>Cancelar</Button>
            <Button onPress={() => deleteSensor(deleteAlertId)}>Apagar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView style={styles.createAlertArea}>
        {!createNewAlert && (
          <View>
            <Button
              style={styles.createAlertButton}
              onPress={() => setCreateNewAlert(true)}
            >
              Criar alerta
            </Button>
          </View>
        )}

        {createNewAlert && (
          <Card style={{ margin: 15, backgroundColor: 'white' }}>
            <Card.Title title="Novo alerta" titleStyle={{ fontSize: 20 }} />
            <Card.Content>
              <DropDown
                label={'Sensor:'}
                mode={'outlined'}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={sensor}
                setValue={setSensor}
                list={sensorsList}
              />
              <Text>Operação:</Text>
              <SegmentedButtons
                value={operation}
                onValueChange={setOperation}
                buttons={operationsList}
              />
              <TextInput
                mode="outlined"
                label="Valor de atenção:"
                keyboardType="number-pad"
                onChangeText={text => setSensorValue(text)}
                value={sensorValue}
              />
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => cancelNewAlert()}>Cancelar</Button>
              <Button onPress={() => saveNewAlert()}>Salvar</Button>
            </Card.Actions>
          </Card>
        )}

        {alerts && alerts.length ? (
          alerts.map((item, index) => (
            <Card key={index} style={{ margin: 15 }}>
              <Card.Title
                title={
                  sensors.find(x => {
                    return x._id === item.sensorId;
                  })?.sensorHelixDeviceId
                }
                titleStyle={{ fontSize: 20 }}
              />
              <Card.Content>
                <Text>Id Fiware: {item.fiwareSubscriptionId}</Text>
                <Text>
                  Atributo:{' '}
                  {
                    sensors.find(x => {
                      return x._id === item.sensorId;
                    })?.sensorHelixEntityType
                  }
                </Text>
                <Text>Operação: {item.lessOrGreater ? 'maior' : 'menor'}</Text>
                <Text>Valor: {item.value}</Text>
                <Text>Data de criação: {adjustDate(item.createdAt)}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => questionDeleteSensor(item._id)}>
                  Apagar
                </Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Card style={{ margin: 30 }}>
            <Card.Title
              title="Nenhum alerta encontrado..."
              titleStyle={{ fontSize: 16, textAlign: 'center' }}
            />
          </Card>
        )}
      </ScrollView>
    </Provider>
  );
}
