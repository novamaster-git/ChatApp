import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import {wp} from '../../utils/responsive.util';
import ChatHeader from '../../components/ChatHeader';
import SendIcon from '../../assets/images/svg/sent.svg';
import BlankSpacer from '../../components/BlankSpacer';
import messageItem from '../../components/messageItem';
import {useDispatch, useSelector} from 'react-redux';
import {subscribeToRoomChatChanges} from '../../apis';
import NoMessagesIcon from '../../assets/images/svg/noMessages.svg';
import {
  getRoomChatsSuccess,
  sendMessageSaga,
} from '../../redux/actions/chat.actions';
import moment from 'moment';
import {reverseArr} from '../../utils/array.util';

function ChatRoom({route}: any) {
  const [userWrittenMessage, setUserWrittenMessage] = useState('');
  const roomId = route?.params.roomId;
  const roomName = route?.params.roomName;
  const username = useSelector((state: any) => state.UserReducer?.username);
  const isSendingMessage = useSelector(
    (state: any) => state.ChatReducer?.sendingAMessage,
  );

  const roomChats: Array<any> = useSelector(
    (state: any) => state?.ChatReducer?.currentRoomChats,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (roomId) {
      // checks and calles the callback when ever the room is updated
      const unsubscribe = subscribeToRoomChatChanges(roomId, data => {
        dispatch(
          getRoomChatsSuccess(
            data.messages.map((item: any) => {
              return {
                ...item,
                isReceived: item.sender !== username,
              };
            }),
          ),
        );
      });
      return () => {
        unsubscribe(); // to unsub the firebase snapshot listener
      };
    }
  }, [roomId, dispatch, username]);
  const handleMessageSubmit = () => {
    if (userWrittenMessage.length === 0) {
      Alert.alert('Please enter a message to send');
      return;
    }
    const dataToSend = {
      roomId: roomId,
      messageData: {
        sender: username,
        message: userWrittenMessage,
        time: moment().format(),
      },
    };
    dispatch(sendMessageSaga(dataToSend));
    setUserWrittenMessage('');
  };
  return (
    <View style={styles.container}>
      <ChatHeader
        name={roomName}
        imageUrl={`https://ui-avatars.com/api/?name=${roomName}&background=random`}
      />
      {roomChats.length !== 0 ? (
        <View style={styles.container}>
          <FlatList
            data={reverseArr(roomChats)}
            renderItem={messageItem}
            inverted
          />
        </View>
      ) : (
        <View style={styles.noMessagesYetContainer}>
          <NoMessagesIcon height={wp(20)} width={wp(20)} />
          <Text style={styles.noMessageWarning}>No Messages Yet</Text>
        </View>
      )}
      <View style={styles.chatPadContainer}>
        <TextInput
          style={styles.chatInput}
          placeholder="Enter New Message"
          onChangeText={setUserWrittenMessage}
          value={userWrittenMessage}
          placeholderTextColor={'grey'}
        />
        <BlankSpacer width={wp(2)} />
        <TouchableOpacity
          disabled={isSendingMessage}
          style={styles.sendButtonContainer}
          onPress={handleMessageSubmit}>
          {isSendingMessage ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <SendIcon width={wp(10)} height={wp(10)} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ChatRoom;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  noMessagesYetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessageWarning: {
    color: 'black',
    fontSize: wp(5),
  },
  chatPadContainer: {
    width: '100%',
    paddingVertical: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
  },
  chatInput: {
    fontSize: wp(4),
    backgroundColor: 'white',
    color: 'black',
    flex: 6,
    borderRadius: wp(3),
    paddingHorizontal: wp(2),
  },
  sendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(5),
    flex: 1,
    backgroundColor: '#3F51B5',
  },
});
