import React, { Component } from "react";
import { I18nManager } from "react-native";
import { Provider } from "react-redux";
import Navigation from "./src/navigation/Navigation";
import Constant from "./src/Constant/Constant";
import axiosMiddleware from "redux-axios-middleware";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
// import store from "./src/storage/Store";
import { DashboardReducer, LoginReducer } from "./src/Shared/Reducers/index";
import thunk from "redux-thunk";
import { storage } from "./src/storage";
import strings from "./src/localization/Localization";

const client = axios.create({
  baseURL: ``,
  responseType: "json",
});

const store = configureStore({
  reducer: {
    dashboard: DashboardReducer,
    login: LoginReducer,
  },
  middleware: [thunk, axiosMiddleware(client)],
});

export const RootState = store.getState();

export const AppDispatch = store.dispatch;

export default class App extends Component {
  componentDidMount = async () => {
    const Language = await storage.getItem("Language");
    console.log(Language);
    if (Language === null) {
      if (Platform.OS === "android") {
        if (
          I18nManager.getConstants().localeIdentifier.split("_")[0] === "ar" ||
          I18nManager.getConstants().localeIdentifier.split("_")[0] === "fa"
        ) {
          storage.setItem("Language", "ar");
          strings.setLanguage("ar");
        } else {
          storage.setItem("Language", "en");
          strings.setLanguage("en");
        }
      }
    } else if (Language === "ar") {
      strings.setLanguage("ar");
    } else if (Language === "en") {
      strings.setLanguage("en");
    }
  };
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
