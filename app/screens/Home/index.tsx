import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from '../../assets/images/svg/close.svg';
import {wp} from '../../utils/responsive.util';
import UserItem from '../../components/UserItem';
import {useDispatch, useSelector} from 'react-redux';
import NewChatIcon from '../../assets/images/svg/newChat.svg';
import BlankSpacer from '../../components/BlankSpacer';
import CustomButton from '../../components/CustomButton';
import {makeaFriend} from '../../redux/actions/chat.actions';
function Home() {
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.UserReducer?.username);
  const isMakingAFriend: boolean = useSelector(
    (state: any) => state.ChatReducer?.isMakeingAFrined,
  );
  const [friendsUsername, setFriendsUsername] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const chatLists: Array<any> = useSelector(
    (state: any) => state.ChatReducer?.chats,
  );
  const newChatComponent = () => {
    return <NewChatIcon height={wp(10)} width={wp(10)} color="white" />;
  };
  const handleNewChat = () => {
    setModalVisible(true);
  };
  const handleFindButton = () => {
    if (friendsUsername === username?.toLowerCase()) {
      Alert.alert('Own username not allowed');
      return;
    }
    dispatch(
      makeaFriend({
        myUsername: username,
        friendsUsername: friendsUsername?.toLowerCase(),
      }),
    );
    setFriendsUsername('');
    setModalVisible(false);
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.componentContainer}>
          <Text style={styles.headerTitle}>ChatApp</Text>
          <Text style={styles.bottomText}>Welcome {username}</Text>
        </View>

        <View style={[styles.componentContainer, styles.container]}>
          {chatLists ? (
            <FlatList
              data={chatLists}
              renderItem={({item}) => {
                return <UserItem item={item} />;
              }}
            />
          ) : (
            <View style={styles.containerWithCenter}>
              <Text style={styles.warningText}>No Messages Yet</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.newChatButtonContainer}
          onPress={handleNewChat}>
          {newChatComponent()}
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setFriendsUsername('');
          setModalVisible(false);
        }}
        transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>
                Enter your friends username here
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setFriendsUsername('');
                  setModalVisible(false);
                }}
                style={styles.closeButtonContainer}>
                <CloseIcon height={wp(5)} width={wp(5)} />
              </TouchableOpacity>
            </View>
            <BlankSpacer height={wp(4)} />
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              onChangeText={setFriendsUsername}
              value={friendsUsername}
            />
            <BlankSpacer height={wp(6)} />
            <CustomButton
              isLoading={isMakingAFriend}
              onPress={handleFindButton}
              title="Find"
              style={styles.modalButtonStyle}
              textStyle={styles.modalButtonText}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerWithCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentContainer: {
    width: '100%',
    paddingVertical: wp(2),
    paddingHorizontal: wp(3),
  },
  headerTitle: {
    fontWeight: '900',
    color: 'black',
    fontSize: wp(8),
  },
  bottomText: {
    fontWeight: '400',
    color: 'black',
    fontSize: wp(4),
  },
  warningText: {
    fontWeight: '900',
    color: 'black',
    fontSize: wp(4),
  },
  newChatButtonContainer: {
    position: 'absolute',
    bottom: wp(10),
    right: wp(10),
    backgroundColor: '#3F51B5',
    padding: wp(2),
    borderRadius: wp(10),
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0000004f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    padding: wp(2),
    paddingHorizontal: wp(4),
    backgroundColor: 'white',
    borderRadius: wp(2),
  },
  modalTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: wp(4),
  },
  textInput: {
    width: '100%',
    paddingVertical: wp(2),
    fontSize: wp(6),
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    paddingHorizontal: wp(5),
  },
  modalButtonStyle: {
    backgroundColor: '#3F51B5',
    borderRadius: wp(2),
  },
  modalButtonText: {
    color: 'white',
  },
  closeButtonContainer: {
    padding: wp(2),
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
