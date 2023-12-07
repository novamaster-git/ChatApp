import {put, takeEvery, all, call, takeLatest} from 'redux-saga/effects';
import {
  GET_ROOM_CHATS_REQUEST_SAGA,
  MAKE_A_NEW_FRIEND,
  SEND_MESSAGE_SAGA,
} from '../../constants/reducersActions.const';
import {
  getRoomChatsFailed,
  getRoomChatsRequest,
  getRoomChatsSuccess,
  makeingAFriendStarted,
  makingAFriendEnd,
  sendMessageError,
  sendMessageRequested,
  sendMessageSuccess,
  setChatLists,
} from '../actions/chat.actions';
import {
  addMessageToRoom,
  addRoomToUserChatList,
  createNewChatRoom,
  getChatRoomsByIds,
  getRoomChatsFromFireStore,
  getUserDetailsByUsernameFromFirebase,
} from '../../apis';
import {Alert} from 'react-native';

// worker
function* sendMessageAsync(action: any) {
  try {
    yield put(sendMessageRequested());
    yield call(
      addMessageToRoom,
      action.payload.roomId,
      action.payload.messageData,
    );
    yield put(sendMessageSuccess());
  } catch (error) {
    yield put(sendMessageError(error));
  }
}
function* makeaFriend(action: any) {
  // getting friends details from firebase
  try {
    yield put(makeingAFriendStarted());
    const friendsUserDetails = yield call(
      getUserDetailsByUsernameFromFirebase,
      action.payload.friendsUsername,
    );
    // checking the friend exist or not
    if (friendsUserDetails === undefined) {
      yield put(makingAFriendEnd());
      Alert.alert('No Person Found'); // If there is no user then it shows warning
      return;
    }
    // this creates new room and returns the room ref
    const createdRoomRef = yield call(
      createNewChatRoom,
      action.payload.myUsername,
      action.payload.friendsUsername,
    );
    //adds the room id to my userdetails chats list
    yield call(
      addRoomToUserChatList,
      action.payload.myUsername,
      createdRoomRef?.id,
    );
    //adds the room id to friends userdetails chats list
    yield call(
      addRoomToUserChatList,
      action.payload.friendsUsername,
      createdRoomRef?.id,
    );
    // fetches my user details from firebase
    const myUserDetails = yield call(
      getUserDetailsByUsernameFromFirebase,
      action.payload.myUsername,
    );
    if (myUserDetails?.chats === undefined) {
      yield put(setChatLists([])); // if there is no chat rooms then it sets the home screen chat list blank
    } else {
      console.log(myUserDetails?.chats, 'myUserDetails?.chats');
      // update my home screens chat list with new chatroom
      const chatLists: Array<any> = yield call(
        getChatRoomsByIds,
        myUserDetails?.chats,
      );
      yield put(setChatLists(chatLists)); // sets the new chat list
    }
    yield put(makingAFriendEnd());
  } catch (error) {
    yield put(makingAFriendEnd());
    throw error;
  }
}

function* getChatRoomChats(action: any) {
  try {
    yield put(getRoomChatsRequest());
    const chats = yield call(getRoomChatsFromFireStore, action.payload);
    yield put(getRoomChatsSuccess(chats));
  } catch (error) {
    yield put(getRoomChatsFailed(error));
  }
}

// watcher
function* watchSendMessageAsync() {
  yield takeEvery(SEND_MESSAGE_SAGA, sendMessageAsync);
}
function* watchRoomChatRequestsAsync() {
  yield takeLatest(GET_ROOM_CHATS_REQUEST_SAGA, getChatRoomChats);
}

function* watchMakeaFrinedAsync() {
  yield takeLatest(MAKE_A_NEW_FRIEND, makeaFriend);
}

function* rootChatSaga() {
  yield all([
    watchSendMessageAsync(),
    watchMakeaFrinedAsync(),
    watchRoomChatRequestsAsync(),
  ]);
}

export {rootChatSaga};
