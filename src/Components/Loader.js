/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator,View } from "react-native";
import React, { Component } from "react";

const Loader = ({}) => {
  return (
    <View style={{ justifyContent: "center",marginVertical:20 }}>
      <ActivityIndicator size='small' color='#0000ff' />
    </View>
  );
};

export default Loader;
