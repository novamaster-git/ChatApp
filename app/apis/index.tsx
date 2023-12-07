import firestore from '@react-native-firebase/firestore';
import {USERCHATS, USERS} from '../constants/firestore.key';
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
async function createNewChatRoom(myUsername: string, friendsUserName: string) {
  try {
    const querySnapshot = firestore().collection(USERCHATS);
    const docRef = await querySnapshot.add({
      RoomName: `${myUsername}_${friendsUserName}`,
      messages: {},
    });
    console.log(docRef, 'DOCREf');
    return docRef;
  } catch (error) {}
}
async function addRoomToUserChatList(username: string, roomId: string) {
  try {
    const querySnapshot = firestore().collection(USERS).doc(username);
    // console.log(querySnapshot, 'OSS');
    await querySnapshot.update({
      chats: firestore.FieldValue.arrayUnion(roomId),
    });
  } catch (error) {
    console.log(error);
  }
}
export {
  getChatRoomsByIds,
  getUserDetailsByUsernameFromFirebase,
  createNewUserInFirebase,
  createNewChatRoom,
  addRoomToUserChatList,
};
