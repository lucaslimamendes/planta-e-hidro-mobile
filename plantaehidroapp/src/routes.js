/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './pages/Home';
import LoginScreen from './pages/Login';
import RegisterScreen from './pages/Register';
import SensorScreen from './pages/Sensors';
import SensorsInternScreen from './pages/SensorsIntern';
import NotificationScreen from './pages/Notifications';

const Stack = createStackNavigator();
const StackSensors = createStackNavigator();
const Tab = createBottomTabNavigator();

const icons = {
  Home: 'home',
  Alertas: 'bell',
  SensoresStack: 'microchip',
};

function SensorStack() {
  return (
    <StackSensors.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
      })}
    >
      <StackSensors.Screen
        name="Sensores"
        options={{ headerLeft: null }}
        component={SensorScreen}
      />
      <StackSensors.Screen
        name="SensorsInternScreen"
        component={SensorsInternScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </StackSensors.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return (
            <AwesomeIcon
              name={icons[route.name]}
              size={22}
              color={focused ? 'green' : 'gray'}
            />
          );
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
        headerTitleAlign: 'center',
        headerShown: route.name === 'SensoresStack' ? false : true,
      })}
    >
      <Tab.Screen
        name="SensoresStack"
        options={{ tabBarLabel: 'Sensores' }}
        component={SensorStack}
      />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alertas" component={NotificationScreen} />
    </Tab.Navigator>
  );
}

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'HomeMyTabs' ? false : true,
        headerTitleAlign: 'center',
      })}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={RegisterScreen} />
      <Stack.Screen name="HomeMyTabs" component={MyTabs} />
    </Stack.Navigator>
  );
}
