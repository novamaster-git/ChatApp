import React from 'react';
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
function ChatRoom() {
  return (
    <View style={styles.container}>
      <ChatHeader name="Soumen" imageUrl="https://i.pravatar.cc/500" />
      <View style={styles.container}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={() => {
            return <Text>Hello</Text>;
          }}
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
