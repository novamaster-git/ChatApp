import {SEND_MESSAGE} from '../../constants/reducersActions.const';

export const sendMessage = (payload: any) => ({
  type: SEND_MESSAGE,
  payload,
});
