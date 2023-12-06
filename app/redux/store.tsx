import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import ChatReducer from './redicers/chat.reducers';
import UserReducer from './redicers/user.reducer';
import {rootChatSaga} from './sagas/chat.saga';
import {rootSaga} from './sagas/user.saga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: combineReducers({ChatReducer, UserReducer}),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootChatSaga);
sagaMiddleware.run(rootSaga);
export default store;
