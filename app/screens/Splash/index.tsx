import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {wp} from '../../utils/responsive.util';
function SplashScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ChatApp</Text>
    </View>
  );
}
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontWeight: '900',
    color: 'white',
    fontSize: wp(12),
    textAlign: 'center',
  },
});
