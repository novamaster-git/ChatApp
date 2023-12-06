import firestore from '@react-native-firebase/firestore';
import {USERS} from '../constants/firestore.key';
import CustomError from '../../customClasses/CustomError.class';
async function getChatRoomsByIds(ids: Array<string>) {
  try {
    const querySnapshot = await firestore()
      .collection('userChats')
      .where(firestore.FieldPath.documentId(), 'in', ids)
      .get();
    // console.log(querySnapshot.docs.map(item => item._data));
    // return querySnapshot.docs._data;
    return querySnapshot.docs.map(item => item._data);
  } catch (error) {
    console.log(error);
  }
}
async function getUserDetailsByUsernameFromFirebase(username: string) {
  try {
    if (username === '' || username === null || username === undefined) {
      throw new CustomError(
        'NO_USERNAME_FOR_FIREBASE',
        'Please provide username',
      );
    }
    const querySnapshot = await firestore()
      .collection(USERS)
      .doc(username)
      .get();
    // console.log(querySnapshot._data);
    return querySnapshot._data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function createNewUserInFirebase(username: string) {
  try {
    if (username === '' || username === null || username === undefined) {
      throw new CustomError(
        'NO_USERNAME_FOR_FIREBASE',
        'Please provide username',
      );
    }
    const data = {
      chats: [],
    };
    const querySnapshot = firestore().collection(USERS).doc(username);
    await querySnapshot.set(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export {
  getChatRoomsByIds,
  getUserDetailsByUsernameFromFirebase,
  createNewUserInFirebase,
};
