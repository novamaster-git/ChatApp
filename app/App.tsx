import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {addEventListener} from '@react-native-community/netinfo';
import FlashMessage from 'react-native-flash-message';
import NavComponent from './stack';
import {Provider} from 'react-redux';
import store from './redux/store';
import NoInternet from './screens/NoInternet';
function App() {
  const [isInternetAvailable, setIsInternetAvailable] = useState<
    boolean | null
  >(true);
  useEffect(() => {
    // Checks the internet connection
    const unsubscribe = addEventListener(state => {
      setIsInternetAvailable(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <NavComponent />
        </NavigationContainer>
      </Provider>
      <FlashMessage position={'top'} />
      {/* Blocks the user if there is no internet */}
      {!isInternetAvailable && <NoInternet />}
    </>
  );
}
export default App;
