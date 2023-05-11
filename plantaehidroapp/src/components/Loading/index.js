import React, { useContext, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { AppContext } from '../../context/appContext';
import styles from './styles';

export default function Loading() {
  const { loading } = useContext(AppContext);

  return (
    loading && (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="#fff" size={60} />
      </View>
    )
  );
}
