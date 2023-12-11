import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RNRestart from 'react-native-restart';
import {hp, wp} from '../../utils/responsive.util';
import BlankSpacer from '../../components/BlankSpacer';
export default function Error() {
  return (
    <View style={styles.container}>
      <View style={styles.modalViewContainer}>
        <BlankSpacer height={wp(5)} />
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Crash</Text>
          <Text style={styles.text}>Detected!</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.errorText}>Error Code: 201</Text>
          <Text style={styles.errorText}>Please Contact Developers</Text>
        </View>
        <BlankSpacer height={wp(5)} />
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.reloadButton}
            onPress={() => {
              RNRestart.restart();
            }}>
            <Text style={styles.reloadButtonText}>Reload App</Text>
          </TouchableOpacity>
        </View>
        <BlankSpacer height={hp(2)} />
      </View>
      {/* <ErrorIcon height={wp(20)} width={wp(20)} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424242',
  },
  modalViewContainer: {
    width: '90%',
    backgroundColor: 'red',
    borderRadius: wp(3),
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: '600',
  },
  text: {
    color: 'white',
    fontWeight: '900',
    fontSize: wp(12),
    lineHeight: wp(12),
  },
  reloadButton: {
    paddingVertical: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: '#212121',
    width: '80%',
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  reloadButtonText: {
    color: 'white',
    fontSize: wp(5),
  },
});
