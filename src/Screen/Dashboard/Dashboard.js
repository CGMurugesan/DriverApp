import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SvgXml } from 'react-native-svg';
import { LogOutSVG } from "../../assets/Icons/Icons";
import Heading from "../../Components/Heading";
import Fonts from "../../assets/Fonts/Fonts";
import Colors from "../../Themes/Colors";
import MainButton from "../../Components/MainButton";
import strings from "../../localization/Localization";

class Dashboard extends Component {
  render() {
    console.log(LogOutSVG);
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              alignContent: "space-between",
            },
          ]}
        >
          <Heading title={strings.dashboard} />
          <MainButton textStyle={styles.text} btnStyle={styles.button} title={"العربية"}/>
         
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  box: {
    flex: 1,
    height: 50,
    width: 50,
  },
  button: {
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 48 / 2,
    backgroundColor: "#00A7DD",
    elevation: 3,
    height:26,
    width:'25%'
  },
  text: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.AileronBold,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
export default Dashboard;
