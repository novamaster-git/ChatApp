import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import ChatRoom from '../screens/ChatRoom';
function NavComponent() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={ChatRoom} name="ChatRoom" />
    </Stack.Navigator>
  );
}
export default NavComponent;
