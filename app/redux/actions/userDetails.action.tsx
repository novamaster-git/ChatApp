import {
  CHECK_AND_UPDATE_USER_AUTH_STATUS,
  GET_USER_DETAILS_BY_USERNAME,
  SET_USER_AUTH_STATUS_LOGOUT,
  SET_USER_DETAILS_UPDATED,
  SET_USER_DETAILS_UPDATING,
  SET_USER_NAME,
  SET_USER_NAME_SAGA,
} from '../../constants/reducersActions.const';

export const getUserDetailsByUsername = (payload: any) => ({
  type: GET_USER_DETAILS_BY_USERNAME,
  payload,
});
export const setUserDetailsUpdating = () => ({
  type: SET_USER_DETAILS_UPDATING,
});
export const setUserDetailsUpdated = () => ({
  type: SET_USER_DETAILS_UPDATED,
});
export const setUserNameToRedux = (payload: string) => ({
  type: SET_USER_NAME,
  payload,
});
export const setUserNameFromAuthScreen = (payload: string) => ({
  type: SET_USER_NAME_SAGA,
  payload,
});
export const checkAndUpdateUserAuthStatus = () => ({
  type: CHECK_AND_UPDATE_USER_AUTH_STATUS,
});
export const setUserAuthStatusToLogout = () => ({
  type: SET_USER_AUTH_STATUS_LOGOUT,
});
