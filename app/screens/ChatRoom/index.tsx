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

function ChatRoom() {
  return (
    <View style={styles.container}>
      <ChatHeader name="Soumen" imageUrl="https://i.pravatar.cc/500" />
      <View style={styles.container}>
        <FlatList
          data={[
            {message: 'Hi Soumen', isReceived: true},
            {
              message:
                'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
              isReceived: false,
            },
            {message: 'You got the job', isReceived: true},
            {message: 'Thanks', isReceived: false},
            {message: 'Ok', isReceived: false},
          ]}
          renderItem={messageItem}
        />
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
