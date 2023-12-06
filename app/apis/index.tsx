import firestore from '@react-native-firebase/firestore';
async function getChatRoomsByIds(ids: Array<string>) {
  try {
    // const querySnapshot = firestore().collection('userChats');
    // // const data = await usersChatsCollection.get();
    // const querySnapshot = await firestore()
    //   .collection(collectionName)
    //   .where(firestore.FieldPath.documentId(), 'in', selectedIds)
    //   .get();
    // // console.log(data._docs[0]);
    // const docIds = data.docs.map(doc => doc._data);
    const querySnapshot = await firestore()
      .collection('userChats')
      .where(firestore.FieldPath.documentId(), 'in', ids)
      .get();

    // Extracting selected documents from the query snapshot
    // const selectedDocs = querySnapshot.docs.map(doc => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    return querySnapshot.docs;
  } catch (error) {
    console.log(error);
  }
}
export {getChatRoomsByIds};
