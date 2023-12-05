import {SEND_MESSAGE} from '../../constants/reducersActions.const';

type ChatStateType = {chats: Array<any>};
const initialState: ChatStateType = {chats: []};
export default function ChatReducer(
  state: ChatStateType = initialState,
  action: any,
) {
  switch (action.type) {
    case SEND_MESSAGE:
      return state;
    default:
      return state;
  }
}
