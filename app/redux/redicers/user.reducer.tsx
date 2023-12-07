import {
  SET_USER_AUTH_STATUS_LOGOUT,
  SET_USER_DETAILS_TO_REDUX,
  SET_USER_DETAILS_UPDATED,
  SET_USER_DETAILS_UPDATING,
} from '../../constants/reducersActions.const';

export type UserStateType = {
  username: string;
  userDetails: any;
  loginStatus: 'LOGGED_IN' | 'PENDING' | 'LOGGED_OUT';
  userDetailsUpdating: boolean;
};
const initialState: UserStateType = {
  username: '',
  userDetails: {},
  loginStatus: 'PENDING',
  userDetailsUpdating: false,
};
export default function UserReducer(
  state: UserStateType = initialState,
  action: any,
) {
  switch (action.type) {
    case SET_USER_DETAILS_TO_REDUX:
      return {
        ...state,
        username: action.payload.username,
        userDetails: action.payload.userDetails,
        loginStatus: 'LOGGED_IN',
      };
    case SET_USER_DETAILS_UPDATING:
      return {...state, userDetailsUpdating: true};
    case SET_USER_DETAILS_UPDATED:
      return {...state, userDetailsUpdating: false};
    case SET_USER_AUTH_STATUS_LOGOUT:
      return {...state, ...initialState, loginStatus: 'LOGGED_OUT'};
    default:
      return state;
  }
}
