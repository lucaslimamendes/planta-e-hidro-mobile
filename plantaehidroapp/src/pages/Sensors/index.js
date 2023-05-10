import React from 'react';
import { Text, Modal, ScrollView, View, StyleSheet } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useState, useEffect } from 'react';

export default function SensorScreen() {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleOpenModal1 = () => {
    setVisible1(true);
  };

  const handleCloseModal1 = () => {
    setVisible1(false);
  };

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
  });

  useEffect(() => {
    //loadFunction
  }, []);

  return (
    <ScrollView>
      <Button title="Abrir Modal" onPress={handleOpenModal}>
        {' '}
        Adicionar sensor
      </Button>
      <Modal visible={visible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Adicione o nome do sensor</Text>
          <TextInput
            style={{ width: '80%', marginBottom: 30 }} /*value={description}*/
          />
          <Text style={styles.modalTitle}>Adicione o id do sensor</Text>
          <TextInput style={{ width: '80%' }} /* value={number}*/ />
          <Button onPress={() => {}}>Salvar</Button>
          <Button title="Fechar" onPress={handleCloseModal}>
            Fechar
          </Button>
        </View>
      </Modal>
      {sensors.map((item, index) => (
        <Card style={{ margin: 15 }}>
          <Card.Title title={item.tipo} titleStyle={{ fontSize: 20 }} />
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
            <Button onPress={handleOpenModal1}>Gráfico</Button>

            <Modal visible={visible1} animationType="slide">
              <View style={styles.modal}>
                <Text style={styles.modalTitle}>Gráfico</Text>
                <Text>Valor atual: teste</Text>
                <Text>Valor mínimo: teste</Text>
                <Text>Valor máximo: teste</Text>

                <Button title="Fechar" onPress={handleCloseModal1}>
                  Fechar
                </Button>
              </View>
            </Modal>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}
