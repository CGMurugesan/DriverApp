/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import Fonts from "../assets/Fonts/Fonts";
const Heading = ({ title, textView, textArea, textSize }) => {
  return (
    <View
      style={textView}
    >
      <View
        style={textArea}
      >
        <Text
          style={textSize}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};


export default Heading;
