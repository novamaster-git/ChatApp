import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {wp} from '../../utils/responsive.util';
import UserItem from '../../components/UserItem';
import {useDispatch, useSelector} from 'react-redux';
import {ChatStateType} from '../../redux/redicers/chat.reducers';

function Home() {
  const dispatch = useDispatch();
  const username = useSelector(state => state.UserReducer?.username);
  const chatLists: Array<any> = useSelector(
    (state: any) => state.ChatReducer?.chats,
  );
  useEffect(() => {
    console.log(chatLists);
  }, [chatLists]);
  return (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        <Text style={styles.headerTitle}>ChatApp</Text>
        <Text style={styles.bottomText}>Welcome {username}</Text>
      </View>
      <View style={[styles.componentContainer, styles.container]}>
        {chatLists.length !== 0 ? (
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
    </View>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
