import React, { Component } from "react";
import { TextInput } from "react-native";
import Fonts from "../assets/Fonts/Fonts";
import strings from "../localization/Localization";
import Colors from "../Themes/Colors";

const InputTextArea = ({ onChangeText, value,}) => {
  return (
    <TextInput
      style={{
        height: 180,
        textAlignVertical: "top",
        padding: 16,
        color: Colors.black,
        fontFamily: Fonts.fontFamily.Aileronregular,
        backgroundColor: "#FFFFFF",
        marginHorizontal: 15,
        marginTop: 15,
        borderRadius: 5,
      }}
      onChangeText={onChangeText}
      value={value}
      multiline={true}
      maxLength={250}
      placeholder={strings.additionalcomments}
      placeholderTextColor={Colors.placeHolderText}
    />
  );
};


export default InputTextArea;
