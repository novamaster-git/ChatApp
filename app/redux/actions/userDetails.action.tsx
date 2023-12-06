import {
  CHECK_AND_UPDATE_USER_AUTH_STATUS,
  CHECK_OR_CREATE_USERDETAILS_FROM_FIREBASE,
  GET_USER_DETAILS_BY_USERNAME,
  GET_USER_DETAILS_FROM_FIREBASE,
  SET_USER_AUTH_STATUS_LOGOUT,
  SET_USER_DETAILS_TO_REDUX,
  SET_USER_DETAILS_UPDATED,
  SET_USER_DETAILS_UPDATING,
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
export const setUserDetailsToRedux = (payload: {
  userDetails: any;
  username: string;
}) => ({
  type: SET_USER_DETAILS_TO_REDUX,
  payload,
});
export const checkOrCreateUserDetailsFirebase = (payload: string) => ({
  type: CHECK_OR_CREATE_USERDETAILS_FROM_FIREBASE,
  payload,
});
export const checkAndUpdateUserAuthStatus = () => ({
  type: CHECK_AND_UPDATE_USER_AUTH_STATUS,
});
export const setUserAuthStatusToLogout = () => ({
  type: SET_USER_AUTH_STATUS_LOGOUT,
});
export const getUserDetailsFromFirebaseByUsername = (payload: string) => ({
  type: GET_USER_DETAILS_FROM_FIREBASE,
  payload,
});
export const setUserDetailsFromFirebase = (payload: string) => ({
  type: GET_USER_DETAILS_FROM_FIREBASE,
  payload,
});
