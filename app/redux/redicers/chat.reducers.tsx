import {
  GET_ROOM_CHATS_FAILED,
  GET_ROOM_CHATS_REQUEST,
  GET_ROOM_CHATS_SUCCESS,
  MAKING_A_NEW_FRIEND,
  MAKING_A_NEW_FRIEND_DONE,
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_REQUESTED,
  SEND_MESSAGE_SUCCCESS,
  SET_CHATS_LIST_FAILED,
  SET_CHATS_LIST_REQUEST,
  SET_CHATS_LIST_SUCCESS,
} from '../../constants/reducersActions.const';

export type ChatStateType = {
  chats: Array<any>;
  isMakeingAFrined: boolean;
  currentRoomChats: Array<any>;
  isCurrentRoomChatsLoading: boolean;
  sendingAMessage: boolean;
  updatingChatList: boolean;
};
const initialState: ChatStateType = {
  chats: [],
  isMakeingAFrined: false,
  currentRoomChats: [],
  isCurrentRoomChatsLoading: false,
  sendingAMessage: false,
  updatingChatList: true,
};
export default function ChatReducer(
  state: ChatStateType = initialState,
  action: any,
) {
  switch (action.type) {
    case SEND_MESSAGE_SUCCCESS:
      return {...state, sendingAMessage: false};
    case SEND_MESSAGE_REQUESTED:
      return {...state, sendingAMessage: true};
    case SEND_MESSAGE_ERROR:
      return {...state, sendingAMessage: false};
    case SET_CHATS_LIST_REQUEST:
      return {...state, chats: action.payload, updatingChatList: true};
    case SET_CHATS_LIST_SUCCESS:
      return {...state, updatingChatList: false};
    case SET_CHATS_LIST_FAILED:
      return {...state, updatingChatList: false};
    case GET_ROOM_CHATS_REQUEST:
      return {...state, isCurrentRoomChatsLoading: true};
    case GET_ROOM_CHATS_SUCCESS:
      return {
        ...state,
        currentRoomChats: action.payload,
        isCurrentRoomChatsLoading: false,
      };
    case GET_ROOM_CHATS_FAILED:
      return {
        ...state,
        isCurrentRoomChatsLoading: false,
      };
    case MAKING_A_NEW_FRIEND_DONE:
      return {...state, isMakeingAFrined: false};
    case MAKING_A_NEW_FRIEND:
      return {...state, isMakeingAFrined: true};
    default:
      return state;
  }
}
