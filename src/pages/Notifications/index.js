import { Text, ScrollView, View} from 'react-native';
import { TextInput, Button, Card, SegmentedButtons, Provider, Portal, Dialog} from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { useState, useEffect } from 'react';
import styles from './styles';

export default function NotificationScreen() {

    const [sensorsList, setSensorsList] = useState([
      {label:'TDS', value:'1'}, 
      {label:'Humidade', value:'2'}, 
      {label:'Acidez', value:'3'}, 
      {label:'Temperatura', value:'4'}
    ]);
    const [notifications, setNotifications] = useState([
        { Id: 1, IdFiware: '1', User: 'Alberto', Sensor: 'TDS', Operation: 'maior', Value: '8,5', Unit: 'μS/cm', LastSent: '05/05/2023', CreatedDate: '28/08/2022'},
        { Id: 2, IdFiware: '2', User: 'Bernardo', Sensor: 'Acidez', Operation: 'menor', Value: '2,5', Unit: 'pH', LastSent: '02/05/2023', CreatedDate: '15/07/2022'},
        { Id: 3, IdFiware: '3', User: 'Carlos', Sensor: 'Temperatura', Operation: 'maior', Value: '30', Unit: '°C',  LastSent: '30/04/2023', CreatedDate: '31/12/2022'}
    ]);
    const [operationsList, setOperationsList] = useState([
      {value: '0', label: 'Menor',},
      {value: '1', label: 'Maior',}
    ]);
    const [createNewAlert, setCreateNewAlert] = useState(false);
    const [operation, setOperation] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [sensor, setSensor] = useState('');
    const [sensorValue, setSensorValue] = useState('');
    const [assureDeletion, setAssureDeletion] = useState(false);

    useEffect(
        () => {
            //loadFunction
        }, []
    );

    function cancelNewAlert() {
      setCreateNewAlert(false);
      setSensor('');
      setOperation('');
      setSensorValue('');
    }

    function saveNewAlert() {
      let newAlert = {
        sensorId: sensor,
        operationValue: operation,
        valueNumber: parseFloat(sensorValue)
      };
    }

    function questionDeleteSensor() {
      setAssureDeletion(true);
    }

    function deleteSensor() {
      setAssureDeletion(false);
    }

    return (
      <Provider>
          <Portal>
            <Dialog visible={assureDeletion} onDismiss={() => {setAssureDeletion(false)}}>
              <Dialog.Title>Atenção!</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">Deseja realmente apagar?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => {setAssureDeletion(false)}}>Cancelar</Button>
                <Button onPress={() => {deleteSensor()}}>Apagar</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        <ScrollView style={styles.createAlertArea}>
            { !createNewAlert &&
              <View>
                <Button style={styles.createAlertButton} onPress={() => {setCreateNewAlert(true)}}>
                  Criar alerta
                </Button>
              </View>
            }

            { createNewAlert &&
              <Card style={{ margin: 15, backgroundColor: "white"}}>
                        <Card.Title
                            title="Novo alerta"
                            titleStyle={{ fontSize: 20 }}
                        />
                        <Card.Content>

                              <DropDown
                                label={"Sensor:"}
                                mode={"outlined"}
                                visible={showDropDown}
                                showDropDown={() => setShowDropDown(true)}
                                onDismiss={() => setShowDropDown(false)}
                                value={sensor}
                                setValue={setSensor}
                                list={sensorsList}
                            />
                            <Text>Operação:</Text>
                            <SegmentedButtons value={operation}
                              onValueChange={setOperation}
                              buttons={operationsList}>
        
                            </SegmentedButtons>
                            <TextInput 
                              mode='outlined' 
                              label="Valor de atenção:" 
                              keyboardType="number-pad" 
                              onChangeText={(text) => setSensorValue(text)}
                              value={sensorValue} >
                            </TextInput>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => {cancelNewAlert()}}>
                                Cancelar
                            </Button>
                            <Button onPress={() => {saveNewAlert()}}>
                                Salvar
                            </Button>
                        </Card.Actions>
                    </Card>
            }
            
            {
                notifications.map((item, index) => (
                    <Card key={item.Id} style={{ margin: 15 }}>
                        <Card.Title
                            title={item.Sensor}
                            titleStyle={{ fontSize: 20 }}
                        />
                        <Card.Content>
                            <Text>
                                Id Fiware: {item.IdFiware}
                            </Text>
                            <Text>
                                Usuário: {item.User}
                            </Text>
                            <Text>
                                Sensor: {item.Sensor}
                            </Text>
                            <Text>
                              Operação: {item.Operation}
                            </Text>
                            <Text>
                              Valor: {item.Value}
                            </Text>
                            <Text>
                                Data de criação: {item.CreatedDate}
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => { }}>
                                Editar
                            </Button>
                            <Button onPress={() => {questionDeleteSensor()}}>
                                Apagar
                            </Button>
                        </Card.Actions>
                    </Card>
                ))
            }
        </ScrollView>
      </Provider>
    );
}