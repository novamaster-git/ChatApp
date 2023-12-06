import {SET_CHATS_LIST} from '../../constants/reducersActions.const';

export type ChatStateType = {chats: Array<any>};
const initialState: ChatStateType = {chats: []};
export default function ChatReducer(
  state: ChatStateType = initialState,
  action: any,
) {
  switch (action.type) {
    case SET_CHATS_LIST:
      return {...state, chats: action.payload};
    default:
      return state;
  }
}
