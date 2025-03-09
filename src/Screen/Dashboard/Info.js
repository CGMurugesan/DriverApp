import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
  Linking
} from "react-native";

import Colors from "../../Themes/Colors";
import Fonts from "../../assets/Fonts/Fonts";
import strings from "../../localization/Localization";
import Icons from "../../assets/Icons";

class Info extends Component {

    handleWhatsapp = () => {
        const phoneNumber = this.props.contactData.MobilePhone;
        Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
      };
      handleCall = () => {
        const phoneNumber = this.props.contactData.MobilePhone;
        Linking.openURL(`tel:${phoneNumber}`);
      }
  render() {
    const {
      CustomerEnglishName,
      CustomerName,
      ClientAddress,
      FlatNumber,
      FloorNumber,
      DistrictNameEnglish,
      DistrictNameArabic,
      SuperVisorNameAr,
      SuperVisorNameEn,
      MobilePhone
    } = this.props.info;
    return (
      <View style={style.mainview}>
        {FlatNumber === null || FloorNumber === null ? null : (
          <Text style={style.textaddress}>{`${
            FlatNumber === null
              ? ""
              : FlatNumber + " " + FloorNumber === null
              ? ""
              : FloorNumber
          }`}</Text>
        )}
        <Text style={style.textsubname}>
          {strings.supervisorname}
        </Text>
        <Text style={style.textaddress}>{`${
          I18nManager.isRTL === false ? SuperVisorNameEn : SuperVisorNameAr
        }`}</Text>
         <View style={style.Bordercover}>
        <View style={style.coverview}>
          <Text style={style.textsubname}>{strings.supervisorphone}</Text>
          <Text style={style.textaddress}>{MobilePhone}</Text>
        </View>
        <TouchableOpacity onPress={this.handleWhatsapp}>
          <Icons.Whatappicons height={31} width={31} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleCall}>
          <Icons.CalIIcons height={26} width={26} />
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Info;

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
  Bordercover:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    paddingTop:20
  },
  textsubname: {
    fontSize: 11,
    color: "#9B9B9B",
    fontFamily: Fonts.fontFamily.Aileronregular,
    textAlign: "left",
  },
  textaddress: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.fontFamily.Aileronsemibold,
    marginTop: 5,
    textAlign: "left",
  },
  coverview: {
    width: "70%",
  },
});
