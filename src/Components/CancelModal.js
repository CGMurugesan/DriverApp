import React, { Component } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { s, vs } from "../Utils/Scaling";
import Colors from "../Themes/Colors";
import Fonts from "../Constant/Fonts";
import strings from "../localization/Localization";

export default class CancelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onRequestClose, visible } = this.props;
    if(!visible)
    return null;
    return (
      <View style={styles.View_Container}>
        <View style={styles.Centercard}>
          <Text style={styles.textsubname}>
            {strings.Do_you_wish_to_cancel_your_trip}
          </Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.buttonstyle} onPress={() =>onRequestClose("yes")}>
            <Text style={[styles.textsub, { color: Colors.Tabprimary }]}>
              {strings.Yes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonstyle,{backgroundColor:Colors.black}]} onPress={() =>onRequestClose("no")}>
            <Text style={[styles.textsub, { color: Colors.white }]}>
            {strings.No}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  View_Container: {
    width: "90%",
    height: vs(160),
    backgroundColor: Colors.Tabprimary,
    position: "absolute",
    alignSelf: "center",
    top: vs(120),
    bottom: 0,
    borderRadius: s(4),
    justifyContent: "center",
    alignItems: "center", // Add this line,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderBottomLeftRadius: vs(45),
    borderTopRightRadius: vs(45),
  },
  Centercard: {
    marginVertical: vs(10),
  },
  textsubname: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.AileronBold,
  },
  textsub: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.Aileronsemibold,
  },
  buttonstyle: {
    width: s(100),
    height: vs(40),
    backgroundColor: Colors.white,
    borderRadius: 6,
    borderBottomLeftRadius: vs(22),
    borderTopRightRadius: vs(22),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: s(10),
  },
});
