import {put, takeEvery, all, call, takeLatest} from 'redux-saga/effects';
import {
  MAKE_A_NEW_FRIEND,
  SEND_MESSAGE,
} from '../../constants/reducersActions.const';
import {sendMessage} from '../actions/chat.actions';
import {getUserDetailsByUsernameFromFirebase} from '../../apis';
import {Alert} from 'react-native';

// worker
function* incrementAsync(action: any) {
  yield put(sendMessage(action.payload));
}
function* makeaFriend(action: any) {
  const userDetails = yield call(
    getUserDetailsByUsernameFromFirebase,
    action.payload,
  );
  if (userDetails === undefined) {
    Alert.alert('No Person Found');
    return;
  }
  Alert.alert('User found');
  // proseed to chatroom
}

// watcher
function* watchSendMessageAsync() {
  yield takeEvery(SEND_MESSAGE, incrementAsync);
}

function* watchMakeaFrinedAsync() {
  yield takeLatest(MAKE_A_NEW_FRIEND, makeaFriend);
}

function* rootChatSaga() {
  yield all([watchSendMessageAsync(), watchMakeaFrinedAsync()]);
}

export {rootChatSaga};
