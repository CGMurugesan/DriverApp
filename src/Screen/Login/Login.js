import React, { Component } from "react";
import { vs, s } from "../../Utils/Scaling";
import Colors from "../../Themes/Colors";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import InputField from "../../Components/InputField";
import MainButton from "../../Components/MainButton";
import HeaderTitle from "../../Components/HeaderTitle";
import Fonts from "../../assets/Fonts/Fonts";
import MainView from "../../Components/MainView";
import strings from "../../localization/Localization";
import { loginUser } from "../../Shared/Reducers/index";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Loader from "../../Components/Loader";
import { storage } from "../../storage";

import DropdownAlert from "react-native-dropdownalert";
import { TouchableHighlight } from "react-native-gesture-handler";
import Icons from "../../assets/Icons";
import Constant from "../../Constant/Constant";
const { width, height } = Dimensions.get("screen");
import RNRestart from "react-native-restart";


const CustomTextinput = ({
  value,
  onChangeText,
  isFocused,
  onFocus,
  onBlur,
  label,
  errorMessage,
  onEyePress,
  secureTextEntry,
  show,
  keyboardType,
  maxLength,
  autoFocus,
}) => {
  return (
    <View>
      <View
        style={{
          height: 64,
          marginHorizontal: 20,
          borderRadius: 4,
          width: "90%",
          backgroundColor: "#FFFFFF",
          elevation: 3,
          color: "#9B9B9B",
          paddingHorizontal: 10,
          fontFamily: Fonts.fontFamily.Metropolis,
          fontSize: 14,
          marginTop: 15,
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          paddingTop: 5,
          justifyContent: "center",
          borderColor: "#F01F0E",
          borderWidth: errorMessage ? 1 : 0,
        }}
      >
        {isFocused && (
          <Text
            style={{
              color: "#9B9B9B",
              fontSize: isFocused ? 12 : 16,
            }}
          >
            {label}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder={isFocused ? "" : label}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            placeholderTextColor={"#9B9B9B"}
            style={{
              color: "#000",
              fontFamily: Fonts.fontFamily.Metropolis,
              fontSize: 14,
              fontWeight: "100",
              paddingHorizontal: 5,
              height: 44,
              width: width - 80,
            }}
            keyboardType={keyboardType}
            value={value}
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
            maxLength={maxLength}
            autoCapitalize="none"
            autoFocus={autoFocus}
          />
          {secureTextEntry != undefined && (
            <TouchableOpacity onPress={onEyePress}>
              {show ? (
                <Icons.EyeOff height={20} width={20} />
              ) : (
                <Icons.Eye height={20} width={20} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {errorMessage && (
        <Text
          style={{
            fontSize: 11,
            color: "#F01F0E",
            fontFamily: Fonts.fontFamily.Aileron,
            fontWeight: "100",
            width: "100%",
            paddingHorizontal: 20,
            marginTop: 10,
          }}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

class Login extends Component {
  state = {
    id: "",
    password: "",
    errorMessage: "",
    errorPassword: "",
    apierrormessage: "",
    loader: false,
    isFocusedEmail: false,
    isFocusedPassword: false,
    show: true,
    //secureTextEntry: true,
  };

  handleIdChange = (id) => {
    this.setState({ id: id, errorMessage: "", apierrormessage: "" });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password: password,
      errorPassword: "",
      apierrormessage: "",
    });
  };

  handlePasswordFocus = () => {
    this.setState({ show: true });
  };

handleSubmit = async () => {
  this.setState({ apierrormessage: "", errorMessage: "", errorPassword: "" });

  if (this.state.id === "") {
    this.setState({ errorMessage: strings.plsenterid });
    return;
  }
  if (this.state.password === "") {
    this.setState({ errorPassword: strings.pleaseenterpassword });
    return;
  }

  this.setState({ loader: true });

  const logindata = {
    Username: this.state.id,
    Password: this.state.password,
  };

  const apiUrl = "https://apijusq.jussuremdad.com:666/api/Driver/Login"; // Replace with your actual API endpoint

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindata),
    });

    const data = await response.json();
    console.log(data,"1");

    if (!response.ok) {
      throw new Error(data.message || 'Unexpected error occurred');
    }

    if (data?.Data?.code === 200) {
      const { Username } = this.state;  // Assuming Username is stored in the component state
    
      // Check if the user is a developer
      if (Constant.Dev_User.includes(Username)) {
        const values = storage.getItem("Devmode");
    
        if (values) {
          // Set DriverId and navigate to DashboardScreen
          storage.setItem("DriverId", JSON.stringify(data?.Data?.content));
          this.setState({ loader: false });
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: "DashboardScreen" }],
          });
        } else {
          // Set Devmode to true and restart
          storage.setItem("Devmode", true);
          RNRestart.Restart();
        }
      } else {
        // Remove Devmode and set DriverId for non-dev users
        storage.removeItem("Devmode");
        storage.setItem("DriverId", JSON.stringify(data?.Data?.content));
        this.setState({ loader: false });
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "DashboardScreen" }],
        });
      }
    } else {
      // Handle error response
      this.setState({ loader: false });
      const errorMessage = data?.Data?.message || data?.Data?.error?.data || strings.unexpectedError;
      this.itemAction({
        type: "error",
        message: errorMessage,
        title: strings.login,
      });
    }
    
  } catch (error) {
    console.log(error,"2");
    console.error('Login error:', error);
    this.setState({ loader: false });
    let errorMessage = strings.unexpectedError;
    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || error.response.data.error;
    } else if (error.message) {
      errorMessage = error.message;
    }
    this.itemAction({
      type: "error",
      message: errorMessage,
      title: strings.login,
    });
  }
};

  
  itemAction(item) {
    switch (item.type) {
      case "close":
        this.closeAction();
        break;
      default:
        const title = item.title;
        this.dropdown.alertWithType(item.type, title, item.message);
    }
  }

  handleClose(data) {
    console.log(data);
  }
  handleCancel(data) {
    console.log(data);
  }

  render() {
    return (
      <MainView backgroundColor={Colors.backgroundcolor}>
        {/* <View
          style={{
            // backgroundColor:'red',
            width: 300,
            height: 40,

            borderWidth: 0.2,
            alignSelf: "center",
            marginTop: 50,
          }}
        >
          <TextInput
            placeholder="id..."
            value={this.state.id}
            onChangeText={(id) => this.setState({ id })}
            style={{
              width: 300,
              height: 40,
              borderColor: "gray",
              borderWidth: 0.3,
              alignSelf: "center",
            }}
          />
          <TextInput
          style={{
            width: 300,
            height: 40,
            borderColor: "gray",
            borderWidth: 0.3,
            alignSelf: "center",
          }}
          placeholder='password'
            onChangeText={(text) => this.setState({ text })}
            secureTextEntry={this.state.secureTextEntry}
          />
          <TouchableOpacity
            onPress={() =>
              this.setState({
                secureTextEntry: !this.state.secureTextEntry,
              })
            }
          >
            {this.state.secureTextEntry ? (
              <Icons.EyeOff height={12} />
            ) : (
              <Icons.Eye height={12} />
            )}
          </TouchableOpacity>
        </View> */}
        <HeaderTitle
          font={styles.font}
          title={strings.login}
          bottomView={styles.bottomView}
          topView={styles.topView}
        />
        {/* <InputField
          placeholder={strings.id}
          onChangeText={this.handleIdChange}
          value={this.state.id}
          errorMessage={this.state.errorMessage === "" ? true : false}
          showmessage={this.state.errorMessage}
        /> */}
        <CustomTextinput
          label={strings.id}
          onFocus={() => {
            this.setState({ isFocusedEmail: true });
          }}
          onBlur={() => {
            if (this.state.id.length > 0) {
              this.setState({ isFocusedEmail: true });
            } else {
              this.setState({ isFocusedEmail: false });
            }
          }}
          keyboardType="email-address"
          errorMessage={this.state.errorMessage}
          isFocused={this.state.isFocusedEmail}
          value={this.state.id}
          onChangeText={(e) => {
            this.setState({
              id: e.trim().replace("", ""),
              errorMessage: "",
              apierrormessage: "",
            });
          }}
        />
        <CustomTextinput
          label={strings.password}
          onFocus={() => {
            this.setState({ isFocusedPassword: true });
          }}
          maxLength={20}
          onBlur={() => {
            if (this.state.password.length > 0) {
              this.setState({ isFocusedPassword: true });
            } else {
              this.setState({ isFocusedPassword: false });
            }
          }}
          errorMessage={this.state.errorMessagepassword}
          isFocused={this.state.isFocusedPassdword}
          value={this.state.password}
          // secureTextEntry={true}
          secureTextEntry={this.state.show}
          onEyePress={() => {
            this.setState({ show: !this.state.show });
          }}
          show={this.state.show}
          onChangeText={(e) => {
            this.setState({
              password: e.trim(),
              errorPassword: "",
              apierrormessage: "",
            });
          }}
        />
        {/* <InputField
          placeholder={strings.password}
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
          errorMessage={this.state.errorPassword === "" ? true : false}
          showmessage={this.state.errorPassword}
        /> */}
        {this.state.apierrormessage === "" ? null : (
          <Text
            style={{
              fontSize: 12,
              color: "#F01F0E",
              fontFamily: Fonts.fontFamily.Aileronlight,
              marginHorizontal: 20,
              paddingTop: 5,
            }}
          >
            {this.state.apierrormessage}
          </Text>
        )}
        {this.state.loader ? (
          <Loader />
        ) : (
          <MainButton
            textStyle={styles.text}
            btnStyle={styles.button}
            title={strings.login}
            onPress={() => this.handleSubmit()}
          />
        )}

        <DropdownAlert
          ref={(ref) => (this.dropdown = ref)}
          showCancel={true}
          onCancel={(data) => this.handleCancel(data)}
          onClose={(data) => this.handleClose(data)}
          imageSrc={
            "https://facebook.github.io/react-native/docs/assets/favicon.png"
          }
          closeInterval={5000}
        ></DropdownAlert>
      </MainView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    borderRadius: 48 / 2,
    backgroundColor: "#00A7DD",
    elevation: 3,
    alignSelf: "center",
    height: 48,
    width: "90%",
  },
  text: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.Aileronsemibold,
    textAlign: "center",
    textTransform: "uppercase",
  },
  bottomView: {
    width: "100%",
    height: 120,
    paddingHorizontal: 20,
    marginBottom: 40,
    
  },
  topView: {
    width: "82%",
    justifyContent: "center",
    marginTop: 80,
  },
  font: {
    fontSize: 30,
    color: "#000000",
    fontFamily: Fonts.fontFamily.AileronBold,
  },
});

const mapStateToProps = (state) => ({
  apilogin: state.login.apilogin,
});
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: bindActionCreators(loginUser, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);