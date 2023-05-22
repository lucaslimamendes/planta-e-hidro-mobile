/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
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
  DefaultTheme,
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

export default function NotificationScreen({ navigation }) {
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

  const getSensors = async rcvSensors => {
    const newSensors = [];
    const useSensors = rcvSensors || sensors;

    for (const [i, x] of await useSensors.entries()) {
      newSensors.push({ label: x.sensorHelixDeviceId, value: x._id });
    }

    setSensorsList([...newSensors]);
  };

  useFocusEffect(
    useCallback(() => {
      getInfoAlerts();
      cancelNewAlert();
    }, [])
  );

  useEffect(() => {
    getSensors(sensors);
    cancelNewAlert();
  }, [sensors]);

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
              textColor="#fff"
              onPress={() => setCreateNewAlert(true)}
            >
              Criar alerta
            </Button>
          </View>
        )}

        {createNewAlert && (
          <Card
            style={{ margin: 15, backgroundColor: 'white' }}
            theme={DefaultTheme}
          >
            <Card.Title
              theme={DefaultTheme}
              title="Novo alerta"
              titleStyle={{ fontSize: 20, color: '#000' }}
            />
            <Card.Content theme={DefaultTheme}>
              <DropDown
                label={'Sensor:'}
                mode={'outlined'}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={sensor}
                setValue={setSensor}
                list={sensorsList}
                theme={DefaultTheme}
                dropDownItemTextStyle={{ color: '#000' }}
              />
              <Text>Operação:</Text>
              <SegmentedButtons
                value={operation}
                onValueChange={setOperation}
                buttons={operationsList}
                theme={DefaultTheme}
              />
              <TextInput
                mode="outlined"
                label="Valor de atenção:"
                keyboardType="number-pad"
                onChangeText={text => setSensorValue(text)}
                value={sensorValue}
                theme={DefaultTheme}
              />
            </Card.Content>
            <Card.Actions theme={DefaultTheme}>
              <Button onPress={() => cancelNewAlert()} textColor="#000">
                Cancelar
              </Button>
              <Button
                onPress={() => saveNewAlert()}
                textColor="#fff"
                style={{ backgroundColor: '#008000' }}
              >
                Salvar
              </Button>
            </Card.Actions>
          </Card>
        )}

        {alerts && alerts.length ? (
          alerts.map((item, index) => (
            <Card key={index} style={{ margin: 15 }} theme={DefaultTheme}>
              <Card.Title
                theme={DefaultTheme}
                title={
                  sensors.find(x => {
                    return x._id === item.sensorId;
                  })?.sensorHelixDeviceId
                }
                titleStyle={{ fontSize: 20, color: '#000' }}
              />
              <Card.Content theme={DefaultTheme}>
                <Text style={styles.txt}>
                  Id Fiware: {item.fiwareSubscriptionId}
                </Text>
                <Text style={styles.txt}>
                  Atributo:{' '}
                  {
                    sensors.find(x => {
                      return x._id === item.sensorId;
                    })?.sensorHelixEntityType
                  }
                </Text>
                <Text style={styles.txt}>
                  Operação: {item.lessOrGreater ? 'maior' : 'menor'}
                </Text>
                <Text style={styles.txt}>Valor: {item.value}</Text>
                <Text style={styles.txt}>
                  Data de criação: {adjustDate(item.createdAt)}
                </Text>
              </Card.Content>
              <Card.Actions theme={DefaultTheme}>
                <Button
                  onPress={() => questionDeleteSensor(item._id)}
                  textColor="#008000"
                >
                  Apagar
                </Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Card
            style={{ margin: 30, backgroundColor: '#fff' }}
            theme={DefaultTheme}
          >
            <Card.Title
              theme={DefaultTheme}
              title="Nenhum alerta encontrado..."
              titleStyle={{ fontSize: 16, textAlign: 'center', color: '#000' }}
            />
          </Card>
        )}
      </ScrollView>
    </Provider>
  );
}
