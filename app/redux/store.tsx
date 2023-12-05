import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import ChatReducer from './redicers/chat.reducers';
import {rootSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: combineReducers({ChatReducer}),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export default store;
