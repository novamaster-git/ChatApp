import {
  MAKE_A_NEW_FRIEND,
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
