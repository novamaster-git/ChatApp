import {put, all, call, takeEvery} from 'redux-saga/effects';
import {
  CHECK_AND_UPDATE_USER_AUTH_STATUS,
  CHECK_OR_CREATE_USERDETAILS_FROM_FIREBASE,
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
  setUserDetailsToRedux,
} from '../actions/userDetails.action';
import {
  createNewUserInFirebase,
  getChatRoomsByIds,
  getUserDetailsByUsernameFromFirebase,
} from '../../apis';
import {setChatLists} from '../actions/chat.actions';

// all saga workers
function* getAndSetUserNameFromLocalStorage() {
  try {
    yield put(setUserDetailsUpdating()); // startes the loader
    const username: string = yield call(getLocalStorage, USER_NAME); // gets the username form the local storage
    if (username.length === 0) {
      yield put(setUserAuthStatusToLogout()); // if there is no username then it will opens the login screen
      return;
    }
    // gets the userdetails from the firebase using username
    const userDetails: any = yield call(
      getUserDetailsByUsernameFromFirebase,
      username,
    );
    if (userDetails === undefined) {
      yield put(setUserAuthStatusToLogout()); // if there is no detailsI then it will opens the login screen
      return;
    }
    if (userDetails?.chats === undefined) {
      yield put(setChatLists([]));
    } else {
      console.log(userDetails?.chats, 'userDetails?.chats');
      const chatLists: Array<any> = yield call(
        getChatRoomsByIds,
        userDetails?.chats,
      );
      yield put(setChatLists(chatLists));
    }

    // stores the user details to redux store
    yield put(
      setUserDetailsToRedux({
        userDetails: userDetails,
        username: username,
      }),
    );
    yield put(setUserDetailsUpdated()); // stops the loader
  } catch (error) {
    // if any error occures then its open the logout screen
    yield put(setUserAuthStatusToLogout());
    yield put(setUserDetailsUpdated()); // stops the loader
  }
}

function* checkOrCreateUserDetailsFirebase(action: any) {
  try {
    yield put(setUserDetailsUpdating()); // starts the loader
    // checks the user is exist in the firebase and if exist it returns users data
    const userDetails: any = yield call(
      getUserDetailsByUsernameFromFirebase,
      action.payload,
    );
    if (userDetails === undefined) {
      // If there is no username exist then it creates new user in firebase
      yield call(createNewUserInFirebase, action.payload);
    }
    if (userDetails?.chats === undefined) {
      yield put(setChatLists([]));
    } else {
      console.log(userDetails?.chats, 'userDetails?.chats');
      const chatLists: Array<any> = yield call(
        getChatRoomsByIds,
        userDetails?.chats,
      );
      yield put(setChatLists(chatLists));
    }
    // sets the username to localstorage
    yield call(setLocalStorage, USER_NAME, action.payload);
    // sets the details to redux
    yield put(
      setUserDetailsToRedux({
        userDetails: userDetails,
        username: action.payload,
      }),
    );
    // stops the loader
    yield put(setUserDetailsUpdated());
  } catch (error) {
    // if any error occures then its open the logout screen
    yield put(setUserAuthStatusToLogout());
    yield put(setUserDetailsUpdated());
  }
}

// watcher
function* watchUserAuthStatusAsync() {
  yield takeEvery(
    CHECK_AND_UPDATE_USER_AUTH_STATUS,
    getAndSetUserNameFromLocalStorage,
  );
}
function* watchUserDetailsCheck() {
  yield takeEvery(
    CHECK_OR_CREATE_USERDETAILS_FROM_FIREBASE,
    checkOrCreateUserDetailsFirebase,
  );
}
function* rootSaga() {
  yield all([watchUserAuthStatusAsync(), watchUserDetailsCheck()]);
}

export {rootSaga};
