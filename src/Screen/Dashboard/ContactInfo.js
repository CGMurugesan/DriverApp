import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  I18nManager,
} from "react-native";

import Colors from "../../Themes/Colors";
import Fonts from "../../assets/Fonts/Fonts";
import Icons from "../../assets/Icons";
import strings from "../../localization/Localization";
import Constant from "../../Constant/Constant";

class ContactInfo extends Component {
  constructor(props) {
    super(props);
  }
  handleWhatsapp = (mobileNumber) => {
    let encodedMessage;
    const item = this.props.contactData;
    const customerNameKey = !I18nManager.isRTL ? 'CustomerName' : 'CustomerName';
    const districtNameKey = !I18nManager.isRTL ? 'NeighbourhoodName' : 'NeighbourhoodName';
    const message = `
    ${strings.CustomerName}: ${item[customerNameKey]}
    ${!I18nManager.isRTL ? Constant.driverAppKey.whatsapp_message_en : Constant.driverAppKey.whatsapp_message_ar}
      ${strings.District_Name}: ${item[districtNameKey]}
      ${strings.mobile1}: ${item.PreferedPhone}
      ${strings.Client_Address}: ${item.VisitShelter}
    `;
    encodedMessage = encodeURIComponent(message);
    console.log(`whatsapp://send?text=${encodedMessage}&phone=+966${item.PreferedPhone}`);
    
    // Linking.openURL(`whatsapp://send?text=${encodedMessage}`);
    Linking.openURL(`whatsapp://send?text=${!I18nManager.isRTL ? Constant.driverAppKey.whatsapp_message_en : Constant.driverAppKey.whatsapp_message_ar}&phone=+966${mobileNumber}`)
    
  };
  handleCall = (mobiles) => {
    const phoneNumber = mobiles;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  render() {
    const { PreferedPhone ,EmergancyPhone,VisitStatus} = this.props.contactData;
    return (
      <View style={style.mainview}>
        <View style={style.Bordercover}>
          <View style={style.coverview}>
            <Text style={style.textsubname}>{strings.profilenumber}</Text>
            <Text style={VisitStatus === 1 ? style.blureffect :  style.textaddress}>{PreferedPhone}</Text>
          </View>
          <TouchableOpacity onPress={()=>this.handleWhatsapp(PreferedPhone)}>
            <Icons.Whatappicons height={31} width={31} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>this.handleCall(PreferedPhone)}>
            <Icons.CalIIcons height={26} width={26} />
          </TouchableOpacity>
        </View>
        <View style={style.Bordercover}>
          <View style={style.coverview}>
            <Text style={style.textsubname}>{strings.secondnumber}</Text>
            <Text style={VisitStatus === 1 ? style.blureffect :  style.textaddress}>{EmergancyPhone}</Text>
          </View>
          <TouchableOpacity onPress={()=>this.handleWhatsapp(EmergancyPhone)}>
            <Icons.Whatappicons height={31} width={31} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>this.handleCall(EmergancyPhone)}>
            <Icons.CalIIcons height={26} width={26} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default ContactInfo;
const style = StyleSheet.create({
  mainview: {
    marginHorizontal: 10,
  },
  Bordercover: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
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
  blureffect:{
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    color:"transparent"
}
});
