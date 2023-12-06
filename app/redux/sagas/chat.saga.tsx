import {put, takeEvery, all} from 'redux-saga/effects';
import {SEND_MESSAGE} from '../../constants/reducersActions.const';
import {sendMessage} from '../actions/chat.actions';

// worker
function* incrementAsync(action: any) {
  yield put(sendMessage(action.payload));
}

// watcher
function* watchSendMessageAsync() {
  yield takeEvery(SEND_MESSAGE, incrementAsync);
}

function* rootChatSaga() {
  yield all([watchSendMessageAsync()]);
}

export {rootChatSaga};
