import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {wp} from '../utils/responsive.util';

import {useNavigation} from '@react-navigation/native';
import {BackIcon} from '../Theme/ImagesPath';
export type ChatHeaderProps = {
  name: string;
  imageUrl: string;
};
function ChatHeader({name, imageUrl}: ChatHeaderProps): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}>
        <BackIcon height={wp(8)} width={wp(8)} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: imageUrl ?? 'https://i.pravatar.cc/500'}}
          style={styles.avatar}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name ?? 'null'}</Text>
      </View>
    </View>
  );
}
export default ChatHeader;
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: wp(2),
    borderBottomWidth: 0.5,
    borderBottomColor: '#BDBDBD',
    backgroundColor: '#F5F5F5',
  },
  backButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  nameContainer: {
    flex: 6,
    paddingLeft: wp(2),
    justifyContent: 'center',
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(7),
  },
  nameText: {
    color: 'black',
    fontSize: wp(5),
    fontWeight: '800',
  },
});
