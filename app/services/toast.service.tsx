import React from 'react';
import {ActivityIndicator} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {wp} from '../utils/responsive.util';
export function successMessage(
  title: string,
  desc?: string,
  duration: number = 1850,
  onPress: () => void = () => {},
): void {
  showMessage({
    message: title,
    description: desc,
    onPress,
    duration,
    type: 'success',
  });
}
export function loadingMessage(
  title: string,
  desc?: string,
  onPress: () => void = () => {},
): void {
  showMessage({
    message: title,
    description: desc,
    autoHide: false,
    onPress,
    type: 'success',
    style: {
      backgroundColor: '#212121',
    },
    hideOnPress: false,
    icon: props => (
      <ActivityIndicator size={'large'} color={'green'} {...props} />
    ),
    iconProps: {
      style: {
        marginRight: wp(2),
      },
    },
  });
}
export function errorMessage(
  title: string,
  desc?: string,
  duration: number = 1850,
  onPress: () => void = () => {},
): void {
  showMessage({
    message: title,
    description: desc,
    onPress,
    duration,
    type: 'danger',
  });
}
export function infoMessage(
  title: string,
  desc?: string,
  duration: number = 1850,
  onPress: () => void = () => {},
): void {
  showMessage({
    message: title,
    description: desc,
    onPress,
    duration,
    type: 'info',
  });
}
export {hideMessage};
