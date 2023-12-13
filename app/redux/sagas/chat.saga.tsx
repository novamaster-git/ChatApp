import {
  put,
  takeEvery,
  all,
  call,
  takeLatest,
  take,
  cancelled,
  fork,
  cancel,
} from 'redux-saga/effects';
import {
  GET_ROOM_CHATS_REQUEST_SAGA,
  MAKE_A_NEW_FRIEND,
  SEND_MESSAGE_SAGA,
  START_USER_CHATLIST_UPDATE_LISTNER,
  STOP_USER_CHATLIST_UPDATE_LISTNER,
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
  setChatListsSuccess,
} from '../actions/chat.actions';
import {
  addMessageToRoom,
  addRoomToUserChatList,
  createNewChatRoom,
  getChatRoomsByIds,
  getRoomChatsFromFireStore,
  getUserDetailsByUsernameFromFirebase,
  subscribeToUserDetailsChanges,
} from '../../apis';
import {Alert} from 'react-native';
import {eventChannel} from 'redux-saga';

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

function* userChatRoomEventChannel(username: string) {
  return eventChannel(emit => {
    // checks and calles the callback when ever the room is updated
    const unsubscribe = subscribeToUserDetailsChanges(username, data => {
      // dispatch(setChatLists(data));
      if (data?.chats.length === 0) {
        // todo: need to find solution to how to call yield without the generator function
        // if there is no chat rooms then it sets the home screen chat list blank
      } else {
        // update my home screens chat list with new chatroom
        emit(data);
      }
    });

    return () => {
      unsubscribe(); // to unsub the firebase snapshot listener
      console.log('STOPPED');
    };
  });
}

function* handleFirebaseUserListUpdate(data: any) {
  const roomsList = yield call(getChatRoomsByIds, data?.chats); // gets the rooms from firebase by ids
  yield put(setChatLists(roomsList)); // sets the new chat list
  yield put(setChatListsSuccess()); // sets the loader false
}

function* watchChannel(action: any) {
  // creates the eventChannel update the chatlist
  const createdChannel = yield call(userChatRoomEventChannel, action.payload);
  try {
    while (true) {
      const data = yield take(createdChannel); // take every changes updated by the firebase
      yield call(handleFirebaseUserListUpdate, data); // updates the redux using the latest updated list
    }
  } finally {
    if (cancelled()) {
      createdChannel.close(); // closes the channel or the firebase event listner
    }
  }
}

// watcher
function* watchSendMessageAsync() {
  yield takeEvery(SEND_MESSAGE_SAGA, sendMessageAsync); // watches for new send message request
}

function* watchMakeaFrinedAsync() {
  yield takeLatest(MAKE_A_NEW_FRIEND, makeaFriend); // watches make a new friend request
}

function* startFirebaseChatListUpdateWatcherChannel() {
  yield takeLatest(START_USER_CHATLIST_UPDATE_LISTNER, watchChannel); //request for user chatlist firebase listner start
}

function* forkWatchChannel() {
  const task = yield fork(startFirebaseChatListUpdateWatcherChannel); // creates a separate process for the channel
  yield take(STOP_USER_CHATLIST_UPDATE_LISTNER); // waits for the firebase chatlist event emiter close request
  yield cancel(task); // stoppes the channel
}

function* rootChatSaga() {
  yield all([
    watchSendMessageAsync(),
    watchMakeaFrinedAsync(),
    forkWatchChannel(),
  ]);
}

export {rootChatSaga};
