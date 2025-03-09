/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { Component } from "react";
import Colors from "../Themes/Colors";
import Fonts from "../assets/Fonts/Fonts";
const MainButton = ({
  onPress,
  title,
  disabled,
  btnStyle,
  textStyle,
  icons,
  onPressIn
}) => {
  return (
    <TouchableOpacity style={btnStyle} onPress={onPress} disabled={disabled} onPressIn={onPressIn}>
      {icons !== undefined ? icons : null}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MainButton;
