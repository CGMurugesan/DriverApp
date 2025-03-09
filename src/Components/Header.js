import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import Icons from "../assets/Icons";
import { useNavigation } from "@react-navigation/native";
import Fonts from "../assets/Fonts/Fonts";

const { width, height } = Dimensions.get("window");

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        width: width,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        elevation: 2,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: "100%",
          width: width,
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Icons.BackButton width={24} height={11} />
        <View style={{ width: "4%", height: "100%" }} />
        <Text style={{ color: "#000", fontSize: 18, fontFamily: Fonts.fontFamily.Aileronregular }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
