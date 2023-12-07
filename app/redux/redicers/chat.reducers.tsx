import {
  MAKE_A_NEW_FRIEND,
  MAKING_A_NEW_FRIEND,
  MAKING_A_NEW_FRIEND_DONE,
  SET_CHATS_LIST,
} from '../../constants/reducersActions.const';

export type ChatStateType = {chats: Array<any>; isMakeingAFrined: boolean};
const initialState: ChatStateType = {chats: [], isMakeingAFrined: false};
export default function ChatReducer(
  state: ChatStateType = initialState,
  action: any,
) {
  switch (action.type) {
    case SET_CHATS_LIST:
      return {...state, chats: action.payload};
    case MAKING_A_NEW_FRIEND_DONE:
      return {...state, isMakeingAFrined: false};
    case MAKING_A_NEW_FRIEND:
      return {...state, isMakeingAFrined: true};
    default:
      return state;
  }
}
