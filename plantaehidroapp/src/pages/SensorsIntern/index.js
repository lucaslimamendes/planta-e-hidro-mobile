/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from './styles';

export default function SensorInternScreen({ navigation, route }) {
  const data = {
    labels: [
      '2023-05-09T02:56:28.675Z',
      '2023-04-27T23:28:03.188Z',
      '2023-04-26T00:17:18.551Z',
      '2023-04-25T00:06:52.001Z',
      '2023-04-25T00:06:17.042Z',
      '2023-04-24T23:29:29.107Z',
      '2023-04-24T23:29:14.184Z',
    ],
    datasets: [
      {
        data: ['5.8', '20.72', '5', '8', '8', '7.77', '6.31'],
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <LineChart
          data={data}
          width={(Dimensions.get('window').width / 100) * 95}
          height={(Dimensions.get('window').height / 100) * 60}
          verticalLabelRotation={30}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          bezier
        />
      </View>
    </ScrollView>
  );
}
