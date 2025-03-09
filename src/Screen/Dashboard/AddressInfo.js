import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";

import Colors from "../../Themes/Colors";
import Fonts from "../../assets/Fonts/Fonts";

class AddressInfo extends Component {
  render() {
    const {
      CustomerEnglishName,
      CustomerName,
      ClientAddress,
      FlatNumber,
      FloorNumber,
      DistrictNameEnglish,
      DistrictNameArabic,
      VisitShelter,
      VisitStatus,
      NeighbourhoodName
    } = this.props.addressData;
    return (
      <View style={VisitStatus === 1 ? style.blureffect :  style.mainview}>
        {FlatNumber === undefined || FloorNumber === undefined ? null : (
          <Text style={style.textaddress}>{`${
            FlatNumber === null
              ? ""
              : FlatNumber + " " + FloorNumber === null
              ? ""
              : FloorNumber
          }`}</Text>
        )}
        <Text style={VisitStatus === 1 ? style.blureffect :  style.textsubname}>
          {I18nManager.isRTL === false ? CustomerName : CustomerName}
        </Text>
        <Text style={VisitStatus === 1 ? style.blureffect :  style.textaddress}>{`${VisitShelter}  ${
          I18nManager.isRTL === false ? NeighbourhoodName : NeighbourhoodName
        }`}</Text>
      </View>
    );
  }
}
export default AddressInfo;

const style = StyleSheet.create({
  mainview: {
    padding: 14,
  },
  textsubname: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: Fonts.fontFamily.AileronBold,
  },
  textaddress: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: Fonts.fontFamily.Aileronregular,
    marginTop: 5,
  },
   blureffect:{
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    color:"transparent"
}
});
