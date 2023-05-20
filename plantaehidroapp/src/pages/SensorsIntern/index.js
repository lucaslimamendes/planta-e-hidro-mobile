/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit';
import { AppContext } from '../../context/appContext';
import styles from './styles';
import adjustDate from '../../helper/adjustDate';
import { getValues } from '../../services/sensor';

export default function SensorInternScreen({ route }) {
  const { setLoading, tokenJwt } = useContext(AppContext);
  const defaultChartData = {
    labels: [''],
    datasets: [
      {
        data: [0],
      },
    ],
  };

  const [dateInitial, setDateInitial] = useState('');
  const [dateFinal, setDateFinal] = useState('');
  const [timeInital, setTimeInital] = useState('');
  const [timeFinal, setTimeFinal] = useState('');

  const [isPickerShowInital, setIsPickerShowInital] = useState(false);
  const [isPickerShowFinal, setIsPickerShowFinal] = useState(false);
  const [isPickerShowTimeInitial, setIsPickerShowTimeInitial] = useState(false);
  const [isPickerShowTimeFinal, setIsPickerShowTimeFinal] = useState(false);
  const [datePickerInital, setDatePickerInital] = useState(new Date());
  const [datePickerFinal, setDatePickerFinal] = useState(new Date());
  const [datePickerTimeInitial, setDatePickerTimeInitial] = useState(
    new Date()
  );
  const [datePickerTimeFinal, setDatePickerTimeFinal] = useState(new Date());

  const [filterCard, setFilterCard] = useState(false);
  const [lastLoad, setLastLoad] = useState(new Date());
  const [data, setData] = useState(defaultChartData);

  useEffect(() => {
    if (
      dateInitial === '' &&
      dateFinal === '' &&
      timeInital === '' &&
      timeFinal === ''
    ) {
      getInfoValues();
    }
  }, [dateInitial, dateFinal, timeInital, timeFinal]);

  const onChangeInital = (event, value) => {
    setDatePickerInital(value);
    setDateInitial(dayjs(value).format('DD/MM/YY'));
    setIsPickerShowInital(false);
  };
  const onChangeFinal = (event, value) => {
    setDatePickerFinal(value);
    setDateFinal(dayjs(value).format('DD/MM/YY'));
    setIsPickerShowFinal(false);
  };
  const onChangeInitalTime = (event, value) => {
    setDatePickerTimeInitial(value);
    setTimeInital(dayjs(value).format('HH:mm'));
    setIsPickerShowTimeInitial(false);
  };
  const onChangeFinalTime = (event, value) => {
    setDatePickerTimeFinal(value);
    setTimeFinal(dayjs(value).format('HH:mm'));
    setIsPickerShowTimeFinal(false);
  };

  const getInfoValues = async () => {
    setLastLoad(new Date());
    try {
      const newData = data;
      const sensorHelixDeviceId = await route.params.title;
      const respData = await getValues({
        setLoading,
        sensorHelixDeviceId,
        tokenJwt,
        startDate:
          timeInital && dateInitial
            ? dayjs(datePickerInital).format('YYYY-MM-DD') +
              ' ' +
              dayjs(datePickerTimeInitial).format('HH:mm:ss')
            : '',
        endDate:
          timeFinal && dateFinal
            ? dayjs(datePickerFinal).format('YYYY-MM-DD') +
              ' ' +
              dayjs(datePickerTimeFinal).format('HH:mm:ss')
            : '',
      });

      setLoading(true);

      for (const [i, x] of respData.entries()) {
        newData.labels[i] = [i, x.recvTime];
        newData.datasets[0].data[i] = x.attrValue;
      }

      if (!respData || respData.length === 0) {
        setData(defaultChartData);
        Alert.alert('Alerta!', 'Nenhum resultado encontrado!');
      } else {
        setData(newData);
      }

      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
      Alert.alert(
        'Erro!',
        'Falha ao buscar os dados, tente novamente mais tarde!'
      );
    }
  };

  const clearAll = () => {
    setDateInitial('');
    setDateFinal('');
    setTimeInital('');
    setTimeFinal('');
  };

  useFocusEffect(
    useCallback(() => {
      clearAll();
      getInfoValues();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <Button
          style={styles.btn}
          mode="contained-tonal"
          buttonColor="#008000"
          textColor="#fff"
          onPress={() => setFilterCard(!filterCard)}
        >
          Filtrar
        </Button>

        {filterCard && (
          <Card style={{ margin: 15, backgroundColor: 'white', width: '100%' }}>
            <Card.Content
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={styles.btnFilter}
                onPress={() => setIsPickerShowInital(true)}
              >
                <Text>Data inicial: {dateInitial || '-'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnFilter}
                onPress={() => setIsPickerShowTimeInitial(true)}
              >
                <Text>Hora inicial: {timeInital || '-'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnFilter}
                onPress={() => setIsPickerShowFinal(true)}
              >
                <Text>Data final: {dateFinal || '-'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnFilter}
                onPress={() => setIsPickerShowTimeFinal(true)}
              >
                <Text>Hora final: {timeFinal || '-'}</Text>
              </TouchableOpacity>
            </Card.Content>
            <Card.Actions>
              <TouchableOpacity
                onPress={() => {
                  clearAll();
                  setFilterCard(!filterCard);
                }}
                style={styles.btn}
              >
                <Text
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    color: '#008000',
                    fontSize: 16,
                  }}
                >
                  Limpar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => getInfoValues()}
                style={styles.btn}
              >
                <Text
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    color: '#008000',
                    fontSize: 16,
                  }}
                >
                  Buscar
                </Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        )}

        {isPickerShowInital && (
          <DateTimePicker
            value={datePickerInital}
            mode="date"
            display="default"
            is24Hour={true}
            onChange={onChangeInital}
          />
        )}
        {isPickerShowFinal && (
          <DateTimePicker
            value={datePickerFinal}
            mode="date"
            display="default"
            is24Hour={true}
            onChange={onChangeFinal}
          />
        )}
        {isPickerShowTimeInitial && (
          <DateTimePicker
            value={datePickerTimeInitial}
            mode="time"
            display="default"
            is24Hour={true}
            onChange={onChangeInitalTime}
          />
        )}
        {isPickerShowTimeFinal && (
          <DateTimePicker
            value={datePickerTimeFinal}
            mode="time"
            display="default"
            is24Hour={true}
            onChange={onChangeFinalTime}
          />
        )}

        <ScrollView horizontal={true} persistentScrollbar={true}>
          <LineChart
            data={data}
            width={
              data.labels.length <= 20
                ? (Dimensions.get('window').width / 100) * 95
                : data.labels.length * 20
            }
            height={(Dimensions.get('window').height / 100) * 58}
            verticalLabelRotation={35}
            formatXLabel={value => {
              return value[0] % 2 === 0 ? adjustDate(value[1]) : '';
            }}
            chartConfig={{
              backgroundColor: '#98FB98',
              backgroundGradientFrom: '#71BC78',
              backgroundGradientTo: '#008000',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#355E3B',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            bezier
          />
        </ScrollView>
        <Text style={styles.textDate}>
          Dados carregados pela última vez em:{' '}
          {dayjs(lastLoad).format('HH:mm DD/MM/YYYY')}
        </Text>
        <Button
          style={styles.btn}
          mode="outlined"
          textColor="#008000"
          onPress={getInfoValues}
        >
          Recarregar
        </Button>
      </View>
    </ScrollView>
  );
}
