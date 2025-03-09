import React, { Component } from "react";
import { TextInput, StyleSheet, Text } from "react-native";
import MainButton from "./MainButton";
import Fonts from "../assets/Fonts/Fonts";
import Colors from "../Themes/Colors";

const InputField = ({ placeholder, onChangeText, value, errorMessage,showmessage }) => {
  return (
    <>
      <TextInput
        style={styles.inputField}
        // placeholder={"ID"}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.placeHolderText}
        autoCapitalize='none'
        value={value}
        borderColor={errorMessage ? null : "#F01F0E"}
        borderWidth={errorMessage ? null : 1}
      />
      {errorMessage ? null : (
        <Text
          style={{
            fontSize: 12,
            color: "#F01F0E",
            fontFamily: Fonts.fontFamily.Aileronlight,
            marginHorizontal: 20,
            paddingTop:5
          }}
        >
          {showmessage}
        </Text>
      )}
    </>
  );
};
// class InputField extends Component {
//   render() {
//     return (
//       <View style={styles.page}>
//         <Text>Login</Text>
//         <TextInput style={styles.inputField} placeholder={"ID"} />
//         <TextInput
//           style={styles.inputField}
//           placeholder={"Password"}
//           secureTextEntry={true}
//         />
//         <MainButton title={"Login"} />
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  inputField: {
    height: 64,
    marginHorizontal: 20,
    borderRadius: 4,
    width: "90%",
    backgroundColor: Colors.white,
    elevation: 3,
    color: "#9B9B9B",
    paddingHorizontal: 10,
    fontFamily: Fonts.fontFamily.Metropolis,
    fontSize: 14,
    marginTop: 15,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default InputField;
