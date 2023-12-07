import {
  GET_ROOM_CHATS_FAILED,
  GET_ROOM_CHATS_REQUEST,
  GET_ROOM_CHATS_REQUEST_SAGA,
  GET_ROOM_CHATS_SUCCESS,
  MAKE_A_NEW_FRIEND,
  MAKING_A_NEW_FRIEND,
  MAKING_A_NEW_FRIEND_DONE,
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_REQUESTED,
  SEND_MESSAGE_SAGA,
  SEND_MESSAGE_SUCCCESS,
  SET_CHATS_LIST,
} from '../../constants/reducersActions.const';

export const sendMessageSaga = (payload: any) => ({
  type: SEND_MESSAGE_SAGA,
  payload,
});
export const sendMessageSuccess = () => ({
  type: SEND_MESSAGE_SUCCCESS,
});
export const sendMessageError = (payload: any) => ({
  type: SEND_MESSAGE_ERROR,
  payload,
});
export const sendMessageRequested = () => ({
  type: SEND_MESSAGE_REQUESTED,
});
export const setChatLists = (payload: any) => ({
  type: SET_CHATS_LIST,
  payload,
});
export const makeaFriend = (payload: any) => ({
  type: MAKE_A_NEW_FRIEND,
  payload,
});
export const makeingAFriendStarted = () => ({
  type: MAKING_A_NEW_FRIEND,
});
export const makingAFriendEnd = () => ({
  type: MAKING_A_NEW_FRIEND_DONE,
});
export const getRoomChatsRequest = () => ({
  type: GET_ROOM_CHATS_REQUEST,
});
export const getRoomChatsSuccess = (payload: any) => ({
  type: GET_ROOM_CHATS_SUCCESS,
  payload,
});
export const getRoomChatsFailed = (payload: any) => ({
  type: GET_ROOM_CHATS_FAILED,
  payload,
});
export const getRoomChatsRequestSaga = (payload: any) => ({
  type: GET_ROOM_CHATS_REQUEST_SAGA,
  payload,
});
