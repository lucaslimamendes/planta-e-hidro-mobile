import { Text, ScrollView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useState, useEffect } from 'react';

export default function SensorScreen() {

    const [sensors, setSensorList] = useState([
        { id: 1, tipo: 'Acidez', unidade: 'pH', valor: '7,5', minValue: '6,5', maxValue: '8,5' },
        { id: 2, tipo: 'Condutividade Elétrica', unidade: 'μS/cm', valor: '1,2', minValue: '0,5', maxValue: '2,5' },
        { id: 3, tipo: 'Temperatura', unidade: '°C', valor: '25', minValue: '20', maxValue: '30' }
    ]);

    useEffect(
        () => {
            //loadFunction
        }, []
    );

    return (
        <ScrollView>

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