import {
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
