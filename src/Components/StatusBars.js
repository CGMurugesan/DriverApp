import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import React, { Component } from "react";
import Colors from "../Themes/Colors";

const StatusBars = ({}) => {
  return (
    <StatusBar
      translucent={false}
      barStyle='dark-content'
      hidden={false}
      backgroundColor={
        backgroundColor !== undefined ? backgroundColor : Colors.white
      }
    />
  );
};

export default StatusBars;
