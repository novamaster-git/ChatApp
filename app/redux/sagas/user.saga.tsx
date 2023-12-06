import {put, all, takeLatest, call, takeEvery} from 'redux-saga/effects';
import {
  CHECK_AND_UPDATE_USER_AUTH_STATUS,
  SET_USER_NAME_SAGA,
} from '../../constants/reducersActions.const';
import {
  getLocalStorage,
  setLocalStorage,
} from '../../services/localStorage.service';
import {USER_NAME} from '../../constants/storage.keys';
import {
  setUserAuthStatusToLogout,
  setUserDetailsUpdated,
  setUserDetailsUpdating,
  setUserNameToRedux,
} from '../actions/userDetails.action';

// worker
// function* getUserDetailsAsync(action: any) {
//   const userName = yield call(getLocalStorage, USER_NAME);
//   yield put(sendMessage(action.payload));
// }
function* saveNewUserName(action: any) {
  yield put(setUserDetailsUpdating());
  yield call(setLocalStorage, USER_NAME, action.payload);
  yield put(setUserNameToRedux(action.payload));
  yield put(setUserDetailsUpdated());
}
function* getAndSetUserNameFromLocalStorage(action: any) {
  try {
    yield put(setUserDetailsUpdating());
    const username: string = yield call(getLocalStorage, USER_NAME);
    console.log('first');
    if (username.length === 0) {
      put(setUserAuthStatusToLogout());
    }
    yield put(setUserNameToRedux(action.payload));
    yield put(setUserDetailsUpdated());
  } catch (error) {
    console.log('second');
    yield put(setUserAuthStatusToLogout());
    yield put(setUserDetailsUpdated());
  }
}

// watcher
function* watchSendMessageAsync() {
  yield takeLatest(SET_USER_NAME_SAGA, saveNewUserName);
}
function* watchUserAuthStatusAsync() {
  yield takeEvery(
    CHECK_AND_UPDATE_USER_AUTH_STATUS,
    getAndSetUserNameFromLocalStorage,
  );
}
function* rootSaga() {
  yield all([watchSendMessageAsync(), watchUserAuthStatusAsync()]);
}

export {rootSaga};
