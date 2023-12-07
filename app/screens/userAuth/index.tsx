import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import {hp, wp} from '../../utils/responsive.util';
import BlankSpacer from '../../components/BlankSpacer';
import {useDispatch, useSelector} from 'react-redux';
import {checkOrCreateUserDetailsFirebase} from '../../redux/actions/userDetails.action';
import CustomButton from '../../components/CustomButton';
function UserAuth(): JSX.Element {
  const isUpdating = useSelector(
    (state: any) => state?.UserReducer?.userDetailsUpdating,
  );
  const [username, setUserName] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (username.length === 0) {
      Alert.alert('Invalid Input', 'Please enter an username');
      return;
    }
    dispatch(checkOrCreateUserDetailsFirebase(username.toLowerCase()));
  };
  return (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        <Text style={styles.headerTitle}>Welcome To</Text>
        <Text style={styles.headerTitle}>ChatApp</Text>
      </View>
      <View style={styles.componentContainer}>
        <TextInput
          placeholder="Enter your username"
          style={styles.textInput}
          placeholderTextColor={'#C5CAE9'}
          onChangeText={setUserName}
          value={username}
        />
        <BlankSpacer height={hp(5)} />
        <CustomButton
          onPress={handleSubmit}
          title="Let's get started"
          isLoading={isUpdating}
        />
      </View>
    </View>
  );
}
export default UserAuth;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
  },
  componentContainer: {
    // marginTop: hp(10),
    width: '100%',
    paddingVertical: wp(5),
    paddingHorizontal: wp(6),
  },
  headerTitle: {
    fontWeight: '900',
    color: 'white',
    fontSize: wp(12),
  },
  textInput: {
    width: '100%',
    paddingVertical: wp(2),
    fontSize: wp(6),
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    paddingHorizontal: wp(5),
  },
});
