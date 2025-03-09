import React, { Component } from "react";
import { StatusBar, View } from "react-native";
import { s, vs } from "../../Utils/Scaling";

import { storage } from "../../storage";
import Colors from "../../Themes/Colors";
import Icons from "../../assets/Icons";
import remoteConfig from "@react-native-firebase/remote-config";
import Constant from "../../Constant/Constant";


export class Splashscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  

  async componentDidMount() {
    try {
      await this.initializeRemoteConfig();
      await this.configureAppConstants();
      await this.handleUserNavigation();
    } catch (error) {
      console.error("Error during component mount:", error);
    }
  }
  
  initializeRemoteConfig = async () => {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 1000,
    });
    await remoteConfig().fetchAndActivate();
  };
  
  configureAppConstants = async () => {
    const environment = remoteConfig().getValue("DriveAppD365PROD");
    const environmentConfig = JSON.parse(environment._value);
    
    const driverAppKey = environmentConfig.driverAppKey;
    const configData = environmentConfig[environmentConfig.mode];
  
    Constant.driverAppKey = driverAppKey;
    Constant.baseUrl = configData.baseUrl;
    Constant.Visit_time = environmentConfig.Visit_time;
    Constant.Dev_User = environmentConfig.Dev_User;
    console.log(Constant);
  };
  
  handleUserNavigation = async () => {
    const User = await storage.getItem("DriverId");
  
    setTimeout(() => {
      if (User === null) {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "DashboardScreen" }],
        });
      }
    }, 3000);
  };
  
  

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle='dark-content'
        />
        <View
          style={{
            backgroundColor: Colors.white,
            width: s(168),
            height: vs(58),
            borderRadius: vs(51.5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icons.SplashLogo height={vs(164)} width={s(315)} />
        </View>
      </View>
    );
  }
}


export default Splashscreen;
