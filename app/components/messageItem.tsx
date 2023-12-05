import React from 'react';
import {View, Text, ListRenderItem, StyleSheet} from 'react-native';
import {wp} from '../utils/responsive.util';
const messageItem: ListRenderItem<any> = ({item}) => {
  return (
    <View
      style={[
        styles.container,
        item.isReceived ? styles.receivedMessage : styles.sendedMessage,
      ]}>
      <View style={styles.messageContainer}>
        <Text style={styles.textMessage}>{item.message}</Text>
        <View
          style={[
            styles.flexRow,
            item.isReceived ? styles.sendedMessage : styles.receivedMessage,
          ]}>
          <Text style={styles.clockText}>10:12 AM</Text>
        </View>
      </View>
    </View>
  );
};
export default messageItem;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
  },
  flexRow: {
    flexDirection: 'row',
  },
  sendedMessage: {
    justifyContent: 'flex-end',
  },
  receivedMessage: {
    justifyContent: 'flex-start',
  },
  messageContainer: {
    maxWidth: '60%',
    backgroundColor: '#B2EBF2',
    paddingVertical: wp(2),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    alignItems: 'flex-end',
  },
  textMessage: {
    color: 'black',
    fontWeight: '500',
  },
  clockText: {
    fontSize: wp(2),
  },
});
