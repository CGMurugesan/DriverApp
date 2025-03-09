import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AddressInfo from "./AddressInfo";
import ContactInfo from "./ContactInfo";
import VisitInfo from "./VisitInfo";
import Colors from "../../Themes/Colors";
import Fonts from "../../assets/Fonts/Fonts";

import strings from "../../localization/Localization";
import Info from "./Info";

class CardTabs extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    activeTab: "visit",
  };

  handleTabPress = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => this.handleTabPress("visit")}
            style={[
              styles.tab,
              activeTab === "visit" ? styles.activeTab : null,
            ]}
          >
            <Text
              style={[
                styles.textsubname,
                activeTab === "visit" ? styles.tabactive : null,
              ]}
            >
              {strings.visitinfo}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleTabPress("address")}
            style={[
              styles.tab,
              activeTab === "address" ? styles.activeTab : null,
            ]}
          >
            <Text
              style={[
                styles.textsubname,
                activeTab === "address" ? styles.tabactive : null,
              ]}
            >
              {strings.adrsinfo}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleTabPress("contact")}
            style={[
              styles.tab,
              activeTab === "contact" ? styles.activeTab : null,
            ]}
          >
            <Text
              style={[
                styles.textsubname,
                activeTab === "contact" ? styles.tabactive : null,
              ]}
            >
             {strings.contactinfo}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => this.handleTabPress("info")}
            style={[
              styles.tab,
              activeTab === "info" ? styles.activeTab : null,
            ]}
          >
            <Text
              style={[
                styles.textsubname,
                activeTab === "info" ? styles.tabactive : null,
              ]}
            >
             {strings.more}
            </Text>
          </TouchableOpacity> */}
        </View>
        <View>
          <View style={styles.content}>
            {activeTab === "visit" && (
              <View>
                <VisitInfo visitData = {this.props.data} />
              </View>
            )}
            {activeTab === "address" && (
              <View>
                <AddressInfo addressData = {this.props.data}/>
              </View>
            )}
            {activeTab === "contact" && (
              <View>
                <ContactInfo contactData = {this.props.data}/>
              </View>
            )}
            {/* {activeTab === "info" && (
              <View>
                <Info info = {this.props.data}/>
              </View>
            )} */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tabs: {
    flexDirection: "row",
  },
  tab: {
    borderBottomWidth: 1,
    borderColor: "#9B9B9B",
    paddingHorizontal: 25,
    height: 55,
    justifyContent: "center",
  },
  activeTab: {
    borderBottomColor: "#00A7DD",
    borderBottomWidth: 3,
  },
  content: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textsubname: {
    fontSize: 14,
    color: "#9B9B9B",
    fontFamily: Fonts.fontFamily.AileronBold,
  },
  tabactive: {
    color: Colors.black,
  },
});

export default CardTabs;
