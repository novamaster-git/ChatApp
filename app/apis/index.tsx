import firestore from '@react-native-firebase/firestore';
import {USERCHATS, USERS} from '../constants/firestore.key';
import CustomError from '../../customClasses/CustomError.class';
import {errorLog} from '../services/logger.service';
async function getChatRoomsByIds(ids: Array<string>) {
  try {
    const querySnapshot = await firestore()
      .collection('userChats')
      .where(firestore.FieldPath.documentId(), 'in', ids)
      .get();
    return querySnapshot.docs.map(item => ({data: item?._data, id: item.id}));
  } catch (error) {
    errorLog(error);
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
    return querySnapshot?._data;
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
      messages: [],
    });
    return docRef;
  } catch (error) {}
}
async function addRoomToUserChatList(username: string, roomId: string) {
  try {
    const querySnapshot = firestore().collection(USERS).doc(username);
    await querySnapshot.update({
      chats: firestore.FieldValue.arrayUnion(roomId),
    });
  } catch (error) {
    errorLog(error);
  }
}
async function getRoomChatsFromFireStore(roomId: string) {
  try {
    const querySnapshot = firestore().collection(USERCHATS).doc(roomId);
    const result = await querySnapshot.get();
    return result?._data;
  } catch (error) {
    errorLog(error);
    throw error;
  }
}

// Function to subscribe to real-time changes in a Firestore collection
const subscribeToRoomChatChanges = (
  roomId: string,
  callback: (data: any) => void = () => {},
) => {
  const documentRef = firestore().collection(USERCHATS).doc(roomId);

  // Subscribe to real-time changes using onSnapshot
  const unsubscribe = documentRef.onSnapshot(
    documentSnapshot => {
      if (documentSnapshot.exists) {
        // Document exists, extract document data
        const data: any = documentSnapshot.data();
        callback(data);
      } else {
        // Document does not exist
        callback(null);
      }
    },
    error => {
      console.error('Error subscribing to document changes:', error);
    },
  );

  // Return an unsubscribe function to stop listening for changes
  return unsubscribe;
};

const subscribeToUserDetailsChanges = (
  username: string,
  callback: (data: any) => void = () => {},
) => {
  const documentRef = firestore().collection(USERS).doc(username);

  // Subscribe to real-time changes using onSnapshot
  const unsubscribe = documentRef.onSnapshot(
    documentSnapshot => {
      if (documentSnapshot.exists) {
        // Document exists, extract document data
        const data: any = documentSnapshot.data();
        callback(data);
      } else {
        // Document does not exist
        callback(null);
      }
    },
    error => {
      console.error('Error subscribing to document changes:', error);
    },
  );

  // Return an unsubscribe function to stop listening for changes
  return unsubscribe;
};

async function addMessageToRoom(roomId: string, message: any) {
  try {
    const querySnapshot = firestore().collection(USERCHATS).doc(roomId);
    await querySnapshot.update({
      messages: firestore.FieldValue.arrayUnion(message),
    });
  } catch (error) {
    errorLog(error);
    throw error;
  }
}

export {
  getChatRoomsByIds,
  getUserDetailsByUsernameFromFirebase,
  createNewUserInFirebase,
  createNewChatRoom,
  addRoomToUserChatList,
  getRoomChatsFromFireStore,
  subscribeToRoomChatChanges,
  addMessageToRoom,
  subscribeToUserDetailsChanges,
};
