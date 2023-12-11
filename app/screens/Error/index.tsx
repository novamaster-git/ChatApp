import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {wp} from '../../utils/responsive.util';
export default function Error() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontWeight: '900',
    fontSize: wp(10),
  },
});
