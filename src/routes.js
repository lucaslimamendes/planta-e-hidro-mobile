import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './pages/Home';
import SettingsScreen from './pages/Settings';
import LoginScreen from './pages/Login';
import RegisterScreen from './pages/Register';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="HomeMyTabs" component={MyTabs} />
    </Stack.Navigator>
  );
}
