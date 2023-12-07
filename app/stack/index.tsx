import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Home from '../screens/Home';
import ChatRoom from '../screens/ChatRoom';
import UserAuth from '../screens/userAuth';
import SplashScreen from '../screens/Splash';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native-svg';
import {checkAndUpdateUserAuthStatus} from '../redux/actions/userDetails.action';
function AppStack() {
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

function AuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="UserAuth">
      <Stack.Screen component={UserAuth} name="UserAuth" />
    </Stack.Navigator>
  );
}

function SplashStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SplashScreen">
      <Stack.Screen component={SplashScreen} name="SplashScreen" />
    </Stack.Navigator>
  );
}

function NavComponent() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state: any) => state.UserReducer.loginStatus);
  useEffect(() => {
    dispatch(checkAndUpdateUserAuthStatus());
  }, [dispatch]);

  if (authStatus === 'PENDING') {
    return <SplashStack />;
  } else if (authStatus === 'LOGGED_OUT') {
    return <AuthStack />;
  } else if (authStatus === 'LOGGED_IN') {
    return <AppStack />;
  } else {
    return <Text>Error</Text>;
  }
}
export default NavComponent;
