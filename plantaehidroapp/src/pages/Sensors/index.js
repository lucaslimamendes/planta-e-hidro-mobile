/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Text, Modal, ScrollView, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TextInput,
  Button,
  Card,
  Provider,
  Portal,
  Dialog,
} from 'react-native-paper';

export default function SensorScreen({ navigation, route }) {
  const [sensors, setSensorList] = useState([
    {
      id: 1,
      tipo: 'Acidez',
      unidade: 'pH',
      valor: '7,5',
      minValue: '6,5',
      maxValue: '8,5',
    },
    {
      id: 2,
      tipo: 'Condutividade Elétrica',
      unidade: 'μS/cm',
      valor: '1,2',
      minValue: '0,5',
      maxValue: '2,5',
    },
    {
      id: 3,
      tipo: 'Temperatura',
      unidade: '°C',
      valor: '25',
      minValue: '20',
      maxValue: '30',
    },
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      margin: 50,
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    positionButton: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    createSensorButton: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#000',
      width: '50%',
      alignSelf: 'center',
      marginTop: '4%',
    },
  });
  const handleOpenModal1 = () => {
    setVisible1(true);
  };

  const handleCloseModal1 = () => {
    setVisible1(false);
  };
  const [visible1, setVisible1] = useState(false);
  const [createNewSensor, setCreateNewSensor] = useState(false);
  const [operation, setOperation] = useState('');
  const [sensor, setSensor] = useState('');
  const [sensorValue, setSensorValue] = useState('');
  const [assureDeletion, setAssureDeletion] = useState(false);
  useEffect(() => {
    //loadFunction
  }, []);
  function questionDeleteSensor() {
    setAssureDeletion(true);
  }

  function deleteSensor() {
    setAssureDeletion(false);
  }
  function cancelNewSensor() {
    setCreateNewSensor(false);
    setSensor('');
    setOperation('');
    setSensorValue('');
  }
  function saveNewSensor() {
    let newSensor = {
      sensorId: sensor,
      operationValue: operation,
      valueNumber: parseFloat(sensorValue),
    };
  }
  return (
    <Provider>
      <ScrollView>
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
              <Button
                onPress={() => {
                  setAssureDeletion(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                onPress={() => {
                  deleteSensor();
                }}
              >
                Apagar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {!createNewSensor && (
          <View>
            <Button
              style={styles.createSensorButton}
              onPress={() => {
                setCreateNewSensor(true);
              }}
            >
              Adicionar Sensor
            </Button>
          </View>
        )}

        {createNewSensor && (
          <Card style={{ margin: 15, backgroundColor: 'white' }}>
            <Card.Title title="Novo Sensor" titleStyle={{ fontSize: 20 }} />
            <Card.Content>
              <TextInput mode="outlined" label="ID do sensor:" />
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  cancelNewSensor();
                }}
              >
                Cancelar
              </Button>
              <Button
                onPress={() => {
                  saveNewSensor();
                }}
              >
                Salvar
              </Button>
            </Card.Actions>
          </Card>
        )}
        {sensors.map((item, index) => (
          <Card style={{ margin: 15 }} key={item.id}>
            <Card.Title title={item.tipo} titleStyle={{ fontSize: 20 }} />
            <Button
              onPress={() => {
                questionDeleteSensor();
              }}
              style={styles.positionButton}
            >
              <Icon name="trash" size={22} />
            </Button>
            <Card.Content>
              <Text>
                Valor atual: {item.valor} {item.unidade}
              </Text>
              <Text>
                Valor mínimo: {item.minValue} {item.unidade}
              </Text>
              <Text>
                Valor máximo: {item.maxValue} {item.unidade}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.navigate('SensorsInternScreen', {
                    title: item.tipo,
                  })
                }
              >
                Gráfico
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </Provider>
  );
}
