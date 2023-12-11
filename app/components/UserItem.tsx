import React, {PropsWithoutRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {wp} from '../utils/responsive.util';
import {generateAvatar} from '../utils/avatar.uti';
const UserItem: React.FC<PropsWithoutRef<{item: any}>> = ({item}: any) => {
  const navigator = useNavigation<any>();
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigator.navigate('ChatRoom', {
          roomId: item?.id,
          roomName: item?.data.RoomName,
        });
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: generateAvatar(item.data.RoomName),
          }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{item.data.RoomName}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default UserItem;
const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: wp(2),
    alignItems: 'center',
    borderWidth: 0.5,
    marginVertical: wp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
    borderColor: 'grey',
  },
  imageContainer: {
    flex: 1,
  },
  nameContainer: {
    flex: 5,
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(7),
    objectFit: 'cover',
  },
  nameText: {
    color: 'black',
    fontSize: wp(5),
  },
});
