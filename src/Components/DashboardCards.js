import React, { Component } from "react";
/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, View } from "react-native";

import Fonts from "../assets/Fonts/Fonts";
const DashboardCards = ({
  item,
  backgroundColor,
  handlePress,
  borderColor,
  color,
  icon
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 0.5,
        width: 95,
        height: 63,
        justifyContent: "space-around",
        alignSelf: "center",
        alignItems: "center",
        borderRadius:5,
        marginHorizontal:8,
        padding:6,
        
      }}
      onPress={handlePress}
    >
      {icon}
      <Text
        style={{
          fontFamily: Fonts.fontFamily.Aileronregular,
          fontSize: 12,
          color: color
        }}
      >
        {item.Name}
      </Text>
    </TouchableOpacity>
  );
};

export default DashboardCards;
