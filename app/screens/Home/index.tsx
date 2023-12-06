import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {wp} from '../../utils/responsive.util';
import UserItem from '../../components/UserItem';
function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
      <View style={styles.componentContainer}>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={({item}) => {
            return <UserItem item={item} />;
          }}
        />
      </View>
    </View>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
