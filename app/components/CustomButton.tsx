import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {wp} from '../utils/responsive.util';
export type CustomButtonPropsType = {
  onPress?: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
};
function CustomButton({
  onPress = () => {},
  title,
  style,
  textStyle,
  isLoading = false,
}: CustomButtonPropsType) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style]}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={textStyle?.color} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title ?? 'No Text'}</Text>
      )}
    </TouchableOpacity>
  );
}
export default CustomButton;
const styles = StyleSheet.create({
  buttonContainer: {
    fontSize: wp(7),
    backgroundColor: '#FFFC00',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(3),
  },
  buttonText: {
    fontSize: wp(5),
    fontWeight: '700',
    color: 'black',
  },
});
