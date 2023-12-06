import React from 'react';
import {View} from 'react-native';
interface BlankSpacerProps {
  height?: number;
  width?: number;
}
export default function BlankSpacer({height, width}: BlankSpacerProps) {
  return <View style={{height: height, width: width}} />;
}
