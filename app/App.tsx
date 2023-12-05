import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import NavComponent from './stack';
import {Provider} from 'react-redux';
import store from './redux/store';
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavComponent />
      </NavigationContainer>
    </Provider>
  );
}
export default App;
