import { Text, Modal, ScrollView, View, StyleSheet} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function SensorScreen() {
    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    const [sensors, setSensorList] = useState([
        { id: 1, tipo: 'Acidez', unidade: 'pH', valor: '7,5', minValue: '6,5', maxValue: '8,5' },
        { id: 2, tipo: 'Condutividade Elétrica', unidade: 'μS/cm', valor: '1,2', minValue: '0,5', maxValue: '2,5' },
        { id: 3, tipo: 'Temperatura', unidade: '°C', valor: '25', minValue: '20', maxValue: '30' }
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

    useEffect(
        () => {
            //loadFunction
        }, []
    );

    return (

        <ScrollView>
            <Button title="Abrir Modal" onPress={handleOpenModal}> Abrir</Button>
            <Modal visible={visible} animationType="slide">
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Adicione o id do sensor</Text>
                    <TextInput></TextInput>
                    <Button>Salvar</Button>
                    <Button title="Fechar" onPress={handleCloseModal} >Fechar</Button>
                </View>
            </Modal>
            {
                sensors.map((item, index) => (
                    <Card style={{ margin: 15 }}>
                        <Card.Title
                            title={item.tipo}
                            titleStyle={{ fontSize: 20 }}
                        />
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
                            <Button onPress={() => { }}>
                                Gráfico
                            </Button>
                            {/*<Button onPress={() => { }}>
                                Explore
                            </Button>*/}
                        </Card.Actions>
                    </Card>
                ))
            }

        </ScrollView>
    );

}
