import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Fonts from "../assets/Fonts/Fonts";
import Icons from "../assets/Icons";
import Colors from "../Themes/Colors";

// class SelectField extends Component {
//   state = {
//     selectedOption: "Choose for reason",
//     optionsVisible: false,
//     reasonslist: [],
//   };
//   async componentDidMount() {
//     // this.props.handleViewRouteClose;
//     await this.props.GetCancelReasons();
//     console.log(this.props.getcancelreasons.data);
//     this.setState({ reasonslist: this.props.getcancelreasons.data });
//   }
//   toggleOptions = () => {
//     this.setState({ optionsVisible: !this.state.optionsVisible });
//   };

//   selectOption = (option) => {
//     this.setState({ selectedOption: option.Text, optionsVisible: false });
//   };

const SelectField = ({
  title,
  optionsVisible,
  item,
  onPresstoggle,
  onPress,
  Child,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPresstoggle}>
        <View style={styles.dropdownContainer}>
          <Text
            style={{
              fontFamily: Fonts.fontFamily.Aileronregular,
              color: Colors.black,
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            {title}
          </Text>
          <Icons.DownArrow height={16} width={16} />
        </View>
      </TouchableOpacity>
      {optionsVisible && <View style={styles.optionsContainer}>{Child}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "92%",
    height: 56,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  optionsContainer: {
    backgroundColor: "white",
    paddingHorizontal: 5,
    marginHorizontal: 15,
    marginTop: 10,
  },
  buttonselect: {
    height: 40,
    justifyContent: "center",
  },
  textcreate: {
    fontFamily: Fonts.fontFamily.Aileronregular,
    color: Colors.black,
    fontSize: 14,
  },
});

export default SelectField;
