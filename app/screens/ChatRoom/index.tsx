import React, {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {wp} from '../../utils/responsive.util';
import ChatHeader from '../../components/ChatHeader';
import SendIcon from '../../assets/images/svg/sent.svg';
import BlankSpacer from '../../components/BlankSpacer';
import messageItem from '../../components/messageItem';
import {useDispatch, useSelector} from 'react-redux';
// import {getRoomChatsRequestSaga} from '../../redux/actions/chat.actions';
import {subscribeToRoomChatChanges} from '../../apis';
import {getRoomChatsSuccess} from '../../redux/actions/chat.actions';

function ChatRoom({route}: any) {
  const roomId = route?.params.roomId;
  const roomName = route?.params.roomName;
  const username = useSelector((state: any) => state.UserReducer?.username);
  const roomChats = useSelector(
    (state: any) => state?.ChatReducer?.currentRoomChats,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (roomId) {
      console.log(roomId, 'ROOMID');
      const unsubscribe = subscribeToRoomChatChanges(roomId, data => {
        dispatch(
          getRoomChatsSuccess(
            data.messages.map(item => {
              return {
                ...item,
                isReceived: item.sender !== username,
              };
            }),
          ),
        );
      });
      return () => {
        unsubscribe();
      };
    }
  }, [roomId]);
  return (
    <View style={styles.container}>
      <ChatHeader
        name={roomName}
        imageUrl={`https://ui-avatars.com/api/?name=${roomName}&background=random`}
      />
      <View style={styles.container}>
        <FlatList data={roomChats ?? [1, 2, 3]} renderItem={messageItem} />
      </View>
      <View style={styles.chatPadContainer}>
        <TextInput style={styles.chatInput} placeholder="Enter New Message" />
        <BlankSpacer width={wp(2)} />
        <TouchableOpacity style={styles.sendButtonContainer}>
          <SendIcon width={wp(10)} height={wp(10)} color="white" />
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
