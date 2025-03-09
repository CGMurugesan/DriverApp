/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import Fonts from "../assets/Fonts/Fonts";
const HeaderTitle = ({ title, bottomView, topView, font, title2, font_title }) => {
  return (
    <View
      style={bottomView}
    >
      <View
        style={topView}
      >
        <Text
          style={font}
          ellipsizeMode="clip"
          numberOfLines={1}
        >
          {title}
        </Text>

        {title2 !== undefined ? <Text style={font_title} ellipsizeMode="clip" numberOfLines={1}>
          {title2 }
        </Text> : <></>}

      </View>
    </View>
  );
};

export default HeaderTitle;
