import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './pages/Home';
import LoginScreen from './pages/Login';
import RegisterScreen from './pages/Register';
import SensorScreen from './pages/Sensors';
import NotificationScreen from './pages/Notifications';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
            size = 40;
          } else if (route.name === 'Sensores') {
            iconName = focused ? 'ios-hardware-chip-sharp' : 'ios-hardware-chip-outline';
            size = 45;
          } else if (route.name === 'Alertas') {
            iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
            size = 40;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 80
        },
        tabBarLabelStyle: {
          fontSize: 20
        },
        headerTitleAlign: 'center'
      })}>
      <Tab.Screen name="Sensores" component={SensorScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alertas" component={NotificationScreen} />
    </Tab.Navigator>
  );
}

export function MainStack() {
  return (
    <Stack.Navigator screenOptions={({ route }) => ({headerShown: route.name === 'HomeMyTabs' ? false : true})}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="HomeMyTabs" component={MyTabs} />
    </Stack.Navigator>
  );
}
