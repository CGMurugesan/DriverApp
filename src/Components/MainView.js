/* eslint-disable react-native/no-inline-styles */
import { View, Platform,StatusBar } from "react-native";
import React from "react";
import Colors from "../Themes/Colors";
const MainView = ({ withPadding, children,backgroundColor }) => {
  return (
    <View
      style={
        withPadding
          ? {
              flex: 1,
              backgroundColor: Colors.backgroundColor,
              paddingTop: Platform.OS === "android" ? 40 : 50,
            }
          : { flex: 1, backgroundColor: Colors.backgroundColor }
      }
    >
      <StatusBar
        translucent={false}
        barStyle='dark-content'
        hidden={false}
        backgroundColor={
            backgroundColor !== undefined ? backgroundColor : Colors.white
          }
      />
      {children}
    </View>
  );
};

export default MainView;
