import {
  MAKE_A_NEW_FRIEND,
  MAKING_A_NEW_FRIEND,
  MAKING_A_NEW_FRIEND_DONE,
  SEND_MESSAGE,
  SET_CHATS_LIST,
} from '../../constants/reducersActions.const';

export const sendMessage = (payload: any) => ({
  type: SEND_MESSAGE,
  payload,
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
