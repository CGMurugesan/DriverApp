import React, { Component } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  I18nManager,
  Platform,
  Modal,
  Dimensions,
} from "react-native";

import CardView from "./CardView";
import Colors from "../../Themes/Colors";
import DashboardCard from "./DashboardCard";
import DashboardCards from "../../Components/DashboardCards";
import { FlatList } from "react-native-gesture-handler";
import Fonts from "../../assets/Fonts/Fonts";
import HeaderTitle from "../../Components/HeaderTitle";
import Icons from "../../assets/Icons";
import MainButton from "../../Components/MainButton";
import RBSheet from "react-native-raw-bottom-sheet";
import StatusBars from "../../Components/StatusBars";
import ViewRoute from "./ViewRoute";
import strings from "../../localization/Localization";
import {
  morningVisits,
  getVisitDetails,
  toggleCardView,
  updatadrivestatus,
  GetDriverVisit,
} from "../../../src/Shared/Reducers/index";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import MainView from "../../Components/MainView";
import { vs } from "../../Utils/Scaling";
import { storage } from "../../storage";
import RNRestart from "react-native-restart";
import Loader from "../../Components/Loader";
import moment from "moment";
import DropdownAlert from "react-native-dropdownalert";

const { width, height } = Dimensions.get("window");

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Pickup: [
        {
          Name: strings.morning,
          icon: <Icons.Morningicon height={24} width={24} />,
        },
        {
          Name: strings.evening,
          icon: <Icons.Eveningicon height={24} width={24} />,
        },
        {
          Name: strings.in,
          icon: <Icons.Pendings height={24} width={24} />,
        },
        // {
        //   Name: strings.out,
        //   icon: <Icons.Outicon height={24} width={24} />,
        // },
      ],
      selectedIndex: 0,
      selectedIndexInOut: 2,
      routeMapView: false,
      setdata: {},
      Driverid: "",
      loader: false,
      loaderRBsheet: false,
      demomodal: false,
      userDetalis: [],
      setvisitId: "",
      selectedDate: moment(new Date()).format("YYYY-MM-DD"),

      statuses: {
        WaitingVisit: 0,
        UnderDelivery: 0,
        // UnderProcessing: 2,
        Finished: 0,
        Cancelled: 0,
      },
    };
  }
  async componentDidMount() {
    this.fetchCallback();
  }
  fetchCallback = async () => {
    console.log(this.state.selectedDate, "this.state.selectedDate");

    const User = await storage.getItem("DriverId");
    await this.props.updatadrivestatus(1);
    await this.props.morningVisits(
      1,
      1,
      JSON.parse(User).CarID,
      this.state.selectedDate
    );

    this.setState(
      {
        Driverid: JSON.parse(User).DriverID,
        loader: true,
        userDetalis: JSON.parse(User),
        selectedIndex:
          (this.props.morningVisitData?.["PendingVisits"].VisitList?.length ??
            0) > 0
            ? 2
            : this.state.selectedIndex,
      },
      () => {
        this.setState({
          statuses: {
            WaitingVisit:
              this.props.morningVisitData["MorningVisits"].WaitingVisit,
            UnderDelivery:
              this.props.morningVisitData["MorningVisits"].UnderDelivery +
              this.props.morningVisitData["MorningVisits"].UnderProcessing,
            // UnderProcessing: 2,
            Finished: this.props.morningVisitData["MorningVisits"].Finished,
            Cancelled: this.props.morningVisitData["MorningVisits"].Cancelled,
          },
          loaderRBsheet:false

        });
      }
    );
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      // prevProps.sendResponce !== this.props.sendResponce ||
      prevProps.updateEndDateres !== this.props.updateEndDateres ||
      prevProps.updatestartdata !== this.props.updatestartdata ||
      prevProps.getreachclient !== this.props.getreachclient ||
      prevProps.getcancelVisit !== this.props.getcancelVisit
    ) {
      // await this.props.getVisitDetails(this.state.setvisitId);
    }
  }

  renderIcon = (index) => {
    switch (index) {
      case 0:
        return (
          <Icons.Morningicon
            height={19}
            width={19}
            fill={this.renderCardColor(index).color}
          />
        );
        break;
      case 1:
        return (
          <Icons.Eveningicon
            height={19}
            width={19}
            fill={this.renderCardColor(index).color}
          />
        );
        break;
      case 2:
        return (
          <Icons.Pendings
            height={19}
            width={19}
            fill={this.renderCardColor(index).color}
          />
        );
        break;
      case 3:
        return (
          <View
            style={{
              transform: [{ scaleX: 1 }, { rotate: "180deg" }],
            }}
          >
            <Icons.Outicon
              height={19}
              width={19}
              fill={this.renderCardColor(index).color}
            />
          </View>
        );

        break;

      default:
        return null;
        break;
    }
  };

  handlePress = async (index, item) => {
    if (index === 0) {
      this.setState({ selectedIndex: index });
      this.state.selectedIndexInOut === 2
        ? await this.props.updatadrivestatus(1)
        : await this.props.updatadrivestatus(4);
      await this.props.morningVisits(
        1,
        this.state.selectedIndexInOut === 2 ? 1 : 2,
        this.state.userDetalis.CarID,
        this.state.selectedDate
      );
      this.setState({
        statuses: {
          WaitingVisit:
            this.props.morningVisitData["MorningVisits"].WaitingVisit,
          UnderDelivery:
            this.props.morningVisitData["MorningVisits"].UnderDelivery +
            this.props.morningVisitData["MorningVisits"].UnderProcessing,
          // UnderProcessing: 2,
          Finished: this.props.morningVisitData["MorningVisits"].Finished,
          Cancelled: this.props.morningVisitData["MorningVisits"].Cancelled,
        },
      });
    } else if (index === 1) {
      this.setState({ selectedIndex: index });
      this.state.selectedIndexInOut === 2
        ? await this.props.updatadrivestatus(2)
        : await this.props.updatadrivestatus(4);

      await this.props.morningVisits(
        2,
        this.state.selectedIndexInOut === 2 ? 1 : 2,
        this.state.userDetalis.CarID,
        this.state.selectedDate
      );
      this.setState({
        statuses: {
          WaitingVisit:
            this.props.morningVisitData["EveningVisits"].WaitingVisit,
          UnderDelivery:
            this.props.morningVisitData["EveningVisits"].UnderDelivery +
            this.props.morningVisitData["EveningVisits"].UnderProcessing,
          // UnderProcessing: 2,
          Finished: this.props.morningVisitData["EveningVisits"].Finished,
          Cancelled: this.props.morningVisitData["EveningVisits"].Cancelled,
        },
      });
    } else if (index === 2) {
      this.setState({ selectedIndex: index });
      this.state.selectedIndex === 0
        ? await this.props.updatadrivestatus(1)
        : await this.props.updatadrivestatus(2);

      await this.props.morningVisits(
        this.state.selectedIndex === 0 ? 1 : 2,
        1,
        this.state.userDetalis.CarID,
        this.state.selectedDate
      );
      this.setState({
        statuses: {
          WaitingVisit:
            this.props.morningVisitData["PendingVisits"].WaitingVisit,
          UnderDelivery:
            this.props.morningVisitData["PendingVisits"].UnderDelivery +
            this.props.morningVisitData["PendingVisits"].UnderProcessing,
          // UnderProcessing: 2,
          Finished: this.props.morningVisitData["PendingVisits"].Finished,
          Cancelled: this.props.morningVisitData["PendingVisits"].Cancelled,
        },
      });
    } else if (index === 3) {
      this.setState({ selectedIndexInOut: index });
      this.state.selectedIndex === 0
        ? await this.props.updatadrivestatus(4)
        : await this.props.updatadrivestatus(4);

      await this.props.morningVisits(
        this.state.selectedIndex === 0 ? 1 : 2,
        2,
        this.state.userDetalis.CarID,
        this.state.selectedDate
      );
    }
    // if (index === 0 || index === 1) {
    //   this.setState({ selectedIndex: index });
    //   if (index === 0) {
    //     await this.props.morningVisits();
    //     console.log(this.props.morningVisitData);
    //   } else if (index === 1) {
    //     await this.props.eveningVisits();
    //     console.log(this.props.eveningVisitData);
    //   }
    // } else {
    //   this.setState({ selectedIndexInOut: index, setdata: item });
    // }
  };
  renderCardColor(index) {
    if (index === 0 || index === 1 || index === 2) {
      if (this.state.selectedIndex === index) {
        return {
          backgroundColor: "#00A7DD",
          borderColor: "#00A7DD",
          color: "#FFFFFF",
        };
      } else {
        return {
          backgroundColor: "transparent",
          borderColor: "#DFDFDF",
          color: "#A1A1A1",
        };
      }
    } else if (index === 3) {
      if (this.state.selectedIndexInOut === index) {
        return {
          backgroundColor: "#222222",
          borderColor: "#222222",
          color: "#FFFFFF",
        };
      } else {
        return {
          backgroundColor: "transparent",
          borderColor: "#DFDFDF",
          color: "#A1A1A1",
        };
      }
    }
  }
  handleViewRoute = () => {
    this.setState({ routeMapView: true });
    this.props.toggleCardView(false);
    this.RBSheet.open();
    this.setState({ demomodal: true });
  };
  handleCardData = () => {
    this.setState({ routeMapView: false }, () => {
      this.RBSheet.open();
      this.setState({ demomodal: true });
    });
    this.props.toggleCardView(true);
  };
  langfetch = async () => {
    if (I18nManager.isRTL === true) {
      storage.setItem("Language", "en");
      if (Platform.OS === "android") {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      } else {
        I18nManager.forceRTL(false);
      }
    } else {
      storage.setItem("Language", "ar");
      if (Platform.OS === "android") {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(true);
      }
    }

    RNRestart.Restart();
  };
  handleCard = async (visitId) => {
    await this.props.getVisitDetails(visitId.VisitID);
    this.setState({ setvisitId: visitId });
    // console.log(this.props.getVisitDetailData);
  };
  handleCardView = async (visitId) => {
    this.setState({ loaderRBsheet: true });
    console.log(visitId);
    await this.props.GetDriverVisit(visitId);
    await this.handleCard(visitId);
    await this.handleCardData();
    this.setState({ loaderRBsheet: false });
  };
  handleViewRouteClose = () => {
    this.RBSheet.close();
    this.setState({ demomodal: false });
    this.setState({ routeMapView: false });
    this.props.toggleCardView(false);
  };
  ontripstarted = (id) => {
    console.log(id, "rererer");
    this.itemAction({
      type: "error",
      message: id,
      title: strings.dashboard,
    });
  };
  ontripstartedsuccess = (id) => {
    console.log(id, "rererer");
    this.itemAction({
      type: "success",
      message: id,
      title: strings.dashboard,
    });
  };
  handleCardClose = () => {
    this.RBSheet.close();
    this.setState({ demomodal: false, routeMapView: false });
    this.props.toggleCardView(false);
    this.fetchCallback();
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
  renderVisitCards = (visitData, keyPrefix) =>
    visitData?.VisitList.map((data, index) => (
      <TouchableOpacity
        key={`${keyPrefix}_${index}`}
        activeOpacity={0.8}
        onPress={() => this.handleCardView(data)}
      >
        <DashboardCard data={data} key={index + data?.length} />
      </TouchableOpacity>
    ));

  getStatusColor = (status) => {
    switch (status) {
      case "WaitingVisit":
        return "gray"; // Color for "Not Start"
      case "UnderDelivery":
      case "UnderProcessing":
        return "orange"; // Color for "In Progress"
      case "Finished":
        return "green"; // Color for "Completed"
      case "Cancelled":
        return "red"; // Color for "Cancelled"
      default:
        return "black"; // Default color
    }
  };

  getStatusText = (status, value) => {
    if (status === "WaitingVisit") {
      return `${strings.not_start} (${value})`;
    }
    if (status === "UnderDelivery" || status === "UnderProcessing") {
      return `${strings.inprogress} (${value})`;
    }
    if (status === "Finished") {
      return `${strings.Completed}  (${value})`;
    }
    if (status === "Cancelled") {
      return `${strings.Cancel} (${value})`;
    }
    return `${status} (${value})`;
  };

  changeDate = (days) => {
    this.setState(
      (prevState) => ({
        selectedDate: moment(prevState.selectedDate)
          .add(days, "days")
          .format("YYYY-MM-DD"), 
          loaderRBsheet:true
      }),
      () => {
        this.fetchCallback(); // Callback function after state update
       

      }
    );
  };

  render() {
    return (
      <MainView>
        <SafeAreaView>
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              backgroundColor: "#fff",
              height: vs(190),
            }}
          >
            <View
              style={{
                height: 70,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <HeaderTitle
                font={styles.font}
                font_title={styles.font_title}
                title={
                  this.state.userDetalis && this.state.userDetalis.DriverName
                }
                title2={this.state.userDetalis && this.state.userDetalis.CarNO}
                bottomView={styles.bottomView}
                topView={styles.topView}
              />
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "30%",
                }}
              >
                <View style={styles.Date_view}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MainButton
                      textStyle={styles.langtext}
                      btnStyle={styles.langbutton}
                      title={
                        I18nManager.isRTL === true
                          ? "EN English"
                          : "Arabic" + " " + "عربي"
                      }
                      onPress={this.langfetch}
                    />

                    <TouchableOpacity
                      style={{
                        transform:
                          I18nManager.isRTL === true
                            ? [{ scaleX: 1 }, { rotate: "180deg" }]
                            : undefined,
                      }}
                      onPress={() => {
                        storage.multiRemove(["DriverId,Devmode"]);
                        this.props.navigation.reset({
                          index: 0,
                          routes: [{ name: "Login" }],
                        });
                      }}
                    >
                      <Icons.Backbutton height={24} width={24} />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 5,
                      justifyContent: "center", // Space items evenly
                    }}
                  >
                    <TouchableOpacity onPress={() => this.changeDate(-1)}>
                      <Icons.rightarrow height={22} width={22} />
                    </TouchableOpacity>

                    <Text style={styles.font_title_Date}>
                      {this.state.selectedDate &&
                        moment(this.state.selectedDate).format("DD-MM-YYYY")}
                    </Text>

                    <TouchableOpacity onPress={() => this.changeDate(1)}>
                      <Icons.leftarrow height={22} width={22} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <FlatList
                data={this.state.Pickup}
                horizontal={true}
                renderItem={({ item, index }) => {
                  return (
                    <DashboardCards
                      item={item}
                      backgroundColor={
                        this.renderCardColor(index).backgroundColor
                      }
                      handlePress={() => this.handlePress(index, item)}
                      borderColor={this.renderCardColor(index).borderColor}
                      color={this.renderCardColor(index).color}
                      icon={this.renderIcon(index)}
                    />
                  );
                }}
              ></FlatList>
            </View>
            <View style={styles.runningTimeContainer}>
              {Object.entries(this.state.statuses).map(([status, value]) => (
                <Text
                  style={[
                    styles.cardsection,
                    { backgroundColor: this.getStatusColor(status) },
                  ]}
                  key={status}
                >
                  {this.getStatusText(status, value)}
                </Text>
              ))}
            </View>
            <View>
              <MainButton
                textStyle={styles.text}
                btnStyle={styles.button}
                title={strings.viewroute}
                onPress={() => this.handleViewRoute()}
                disabled={
                  this.props.morningVisitData[
                    this.state.selectedIndex === 0
                      ? "MorningVisits"
                      : "EveningVisits"
                  ]?.VisitList.length > 0
                    ? false
                    : true
                }
              />
            </View>
          </View>
          <ScrollView>
            {this.props.morningVisitData?.length === 0 ? (
              this.state.loader ? (
                this.props.morningVisitData?.length > 0 ? (
                  []
                ) : (
                  <Text
                    style={{
                      color: "#30B8E3",
                      fontSize: 16,
                      fontFamily: Fonts.fontFamily.Aileronsemibold,
                      textAlign: "center",
                      marginTop: 20,
                    }}
                  >
                    {this.state.selectedIndex === 0
                      ? strings.Nodrivesisavailablefortoday
                      : strings.Nodrivesisavailablefortonight}
                  </Text>
                )
              ) : (
                <Loader />
              )
            ) : (
              <>
                {this.props.morningVisitData && (
                  <ScrollView
                    style={{
                      flex: 1,
                    }}
                    contentContainerStyle={{ paddingBottom: 250 }}
                  >
                    {this.state.selectedIndex === 0
                      ? this.renderVisitCards(
                          this.props.morningVisitData["MorningVisits"],
                          "MorningVisits"
                        )
                      : this.state.selectedIndex === 1
                      ? this.renderVisitCards(
                          this.props.morningVisitData["EveningVisits"],
                          "EveningVisits"
                        )
                      : this.renderVisitCards(
                          this.props.morningVisitData["PendingVisits"],
                          "PendingVisits"
                        )}
                  </ScrollView>
                )}

                {this.state.loaderRBsheet ? (
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(0,0,0, 0.3)",
                      height: "90%",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Loader />
                  </View>
                ) : null}
              </>
            )}
          </ScrollView>

          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={height}
            closeOnSwipeDown={false}
            customStyles={{
              container: {
                backgroundColor: "rgba(0,0,0,0.1)",
              },
            }}
          >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)" }}>
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
              <View
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  bottom: 0,
                  width: width,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  backgroundColor: "#F9F9F9",
                }}
              >
                {this.props.cardView ? (
                  <CardView
                    handleCardClose={() => this.handleCardClose()}
                    ontripstarted={this.ontripstarted}
                    ontripstartedsuccess={this.ontripstartedsuccess}
                  />
                ) : this.state.routeMapView ? (
                  <ViewRoute
                    handleViewRouteClose={() => this.handleViewRouteClose()}
                    handleCardView={(visitId) => {
                      this.handleCardView(visitId);
                    }}
                    ontripstarted={this.ontripstarted}
                  />
                ) : (
                  ""
                )}
              </View>
            </View>
          </RBSheet>
        </SafeAreaView>
      </MainView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 16 / 2,
    backgroundColor: "#00A7DD",
    elevation: 3,
    alignSelf: "center",
    height: 40,
    width: "90%",
  },
  text: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.Aileronsemibold,
    textAlign: "center",
    textTransform: "uppercase",
  },
  langbutton: {
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 48 / 2,
    backgroundColor: "#00A7DD",
    elevation: 3,
    height: 26,
    width: "80%",
  },
  langtext: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.Aileronregular,
    textAlign: "center",
  },

  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bottomView: {
    width: "70%",
    paddingHorizontal: 5,
    marginBottom: 0,
  },
  topView: {
    width: "100%",
    justifyContent: "center",
    marginTop: 0,
  },
  textSize: {
    fontSize: 18,
    color: "#000000",
    fontFamily: Fonts.fontFamily.Aileronsemibold,
    marginTop: 10,
  },
  textView: {
    fontSize: 20,
    color: "#000000",
    fontFamily: Fonts.fontFamily.Aileronsemibold,
  },
  font: {
    fontSize: 16,
    color: "#000000",
    fontFamily: Fonts.fontFamily.Aileronsemibold,
    width: "100%",
    textAlign: "left",
  },
  font_title: {
    fontSize: 14,
    color: "#A9A9A9",
    fontFamily: Fonts.fontFamily.Aileronsemibold,
    marginTop: 5,
    width: "100%",
    textAlign: "left",
  },
  font_title_Date: {
    fontSize: 14,
    color: "#000000",
    fontFamily: Fonts.fontFamily.Aileronsemibold,
    marginTop: 5,
  },
  Date_view: {
    alignItems: "center",
    width: "85%",
  },
  cardsection: {
    fontSize: width * 0.035, // Responsive font size
    color: Colors.white,
    fontFamily: Fonts.fontFamily.AileronBold,
    marginLeft: 5, // Space between icon and text
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 4, // Consistent padding
    paddingVertical: 5, // Add vertical padding for better height
    textAlign: "center",
    marginHorizontal: 10,
  },
  runningTimeContainer: {
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center", // Center icon and text vertically
    justifyContent: "space-around", // Space items evenly
    // marginHorizontal: 20,
    marginTop: 10,
  },
});
const mapStateToProps = (state) => ({
  morningVisitData: state.dashboard.morningVisitData,
  getVisitDetailData: state.dashboard.getVisitDetailData,
  cardView: state.dashboard.cardView,
  getdriverstatus: state.dashboard.getdriverstatus,
  alertmessagestatus: state.dashboard.alertmessagestatus,
  sendResponce: state.dashboard.sendResponce,
  updateEndDateres: state.dashboard.updateEndDateres,
  updatestartdata: state.dashboard.updatestartdata,
  getreachclient: state.dashboard.getreachclient,
  getcancelVisit: state.dashboard.getcancelVisit,
});
const mapDispatchToProps = (dispatch) => {
  return {
    morningVisits: bindActionCreators(morningVisits, dispatch),
    getVisitDetails: bindActionCreators(getVisitDetails, dispatch),
    GetDriverVisit: bindActionCreators(GetDriverVisit, dispatch),
    toggleCardView: bindActionCreators(toggleCardView, dispatch),
    updatadrivestatus: bindActionCreators(updatadrivestatus, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
