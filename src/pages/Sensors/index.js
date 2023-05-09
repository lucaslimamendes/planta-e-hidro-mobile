import { Text, Modal, ScrollView, View, StyleSheet } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export async function createTableSensor() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbSensores
        (
            Id integer primary key autoincrement,
            Description text not null,
            Number integer not null    
        )`;

        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export function newSensor(sensor) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbSensores (id, description, number) values (?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [sensor.id, sensor.description, sensor.number],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log('saving ' + error);
                resolve(false);
            }
        )
    }
    );
};

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
            <Button title="Abrir Modal" onPress={handleOpenModal}> Adicionar sensor</Button>
            <Modal visible={visible} animationType="slide">
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Adicione o nome do sensor</Text>
                    <TextInput style={{ width: '80%', marginBottom: 30 }} /*value={description}*/></TextInput>
                    <Text style={styles.modalTitle}>Adicione o id do sensor</Text>
                    <TextInput style={{ width: '80%' }} /* value={number}*/></TextInput>
                    <Button onPress={newSensor}>Salvar</Button>
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
                            <Button onPress={handleOpenModal1}>
                                Gráfico
                            </Button>

                            <Modal visible={visible1} animationType="slide">
                                <View style={styles.modal}>
                                    <Text style={styles.modalTitle}>Gráfico</Text>
                                    <Text>
                                        Valor atual: teste
                                    </Text>
                                    <Text>
                                        Valor mínimo: teste
                                    </Text>
                                    <Text>
                                        Valor máximo: teste
                                    </Text>

                                    <Button title="Fechar" onPress={handleCloseModal1} >Fechar</Button>
                                </View>
                            </Modal>
                        </Card.Actions>
                    </Card>
                ))
            }

        </ScrollView>
    );

}
