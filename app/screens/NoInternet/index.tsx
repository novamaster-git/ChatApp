import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NoInternetIcon from '../../assets/images/svg/noInternet.svg';
import {hp, wp} from '../../utils/responsive.util';
import BlankSpacer from '../../components/BlankSpacer';
function NoInternet(): JSX.Element {
  return (
    <View style={styles.container}>
      <NoInternetIcon width={wp(20)} height={wp(20)} color="white" />
      <Text style={styles.warningText}>No Internet</Text>
      <Text style={styles.warningText}>
        Please Connect to internet to continue
      </Text>
      <BlankSpacer height={hp(2)} />
    </View>
  );
}
export default NoInternet;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EF5350',
    zIndex: 999,
  },
  warningText: {
    fontSize: wp(5),
    color: 'white',
    fontWeight: '900',
  },
});
