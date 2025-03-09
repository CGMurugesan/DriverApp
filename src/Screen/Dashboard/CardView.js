import {
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  I18nManager,
  PermissionsAndroid,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  ProviderPropType,
} from "react-native-maps";
import React, { Component } from "react";
import CancelReason from "./CancelReason";
import CardTabs from "./CardTabs";
import Colors from "../../Themes/Colors";
import Fonts from "../../assets/Fonts/Fonts";
import Icons from "../../assets/Icons";
import MainButton from "../../Components/MainButton";
import RBSheet from "react-native-raw-bottom-sheet";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import {
  sendMessage,
  updateReactClient,
  AlertMessageshow,
  updateEndDate,
  updateStartDate,
  updatedholdtrip,
  GetDriverVisit,
  UpdatedEditAddress,
  updateStartPickup,
  getVisitDetails
} from "../../Shared/Reducers/index";
import moment from "moment";
import { storage } from "../../storage";
import strings from "../../localization/Localization";
import DropdownAlert from "react-native-dropdownalert";
import { s } from "../../Utils/Scaling";
import OrderStatus from "../../Constant/OrderStatus";
import Geolocation from "react-native-geolocation-service";
import Loader from "../../Components/Loader";

const { width, height } = Dimensions.get("window");

class CardView extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    arrived: true,
    delivered: false,
    cancelled: false,
    timer: null,
    viewCancel: false,
    timeLeft: 300,
    showTimer: false,
    intervalId: null,
    demomodal: false,
  };

  componentDidMount = () => {
    this.requestLocationPermission();
  };

  handleCancelView2 = () => {
    this.setState({ viewCancel: true });
    this.RBSheet2.open();
    this.setState({ demomodal: true });
  };
  handlePress = () => {
    const urls = this.props.getVisitDetailData;
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });

    let latLng, label;

    latLng = `${urls.Latitude},${urls.Longitude}`;
    label = `${urls.CarNumber},${urls.WorkerName}`;

    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
   
  };

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation Permission",
          message: "Can we access your location?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === "granted") {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  handleViewRouteClosevalue = async() => {
    this.RBSheet2.close();
    this.setState({ demomodal: false });
    this.setState({ routeMapView: false, cardView: false });
  };

  handleTimer = () => {
    this.setState({
      arrived: false,
      delivered: true,
    });
    let timer = setTimeout(() => {
      clearInterval(this.state.intervalId);
      this.setState({
        delivered: false,
        cancelled: true,
        showTimer: false,
      });
    }, 180000); // 5 min = 300000 miliseconds
    let intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timeLeft: prevState.timeLeft - 1,
      }));
    }, 2000);
    this.setState({
      timer,
      intervalId,
      showTimer: true,
    });
  };
  onStatusFunction = (item) => {
    const statusObject = OrderStatus.GetVisitStatus.find(
      (status) => status.TypeValue === item
    );
    if (statusObject) {
      return !I18nManager.isRTL
        ? statusObject.TypeNameEn
        : statusObject.TypeNameAR;
    } else {
      return "Status not found";
    }
  };
  handleSendMessage = async () => {
    console.log("hello");

    Geolocation.getCurrentPosition(
      async (position) => {
        const payload = {
          VisitID: this.props.getVisitDetailData.VisitID,
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
        };
        await this.props.sendMessage(payload);
        console.log(this.props.sendResponce);
        if (this.props.sendResponce.Data.code === 200) {
          await this.props.ontripstartedsuccess(
            this.props.sendResponce.Data.message
          );
          console.log(this.props.sendResponce.Data.content);
          await this.props.GetDriverVisit(this.props.sendResponce.Data.content);
        } else {
          await this.props.ontripstarted(this.props.sendResponce.Data.message);
        }
      },
      (error) => {
        // See error code charts below.
        // this.setState({
        //   regions: {
        //     latitude: 0,
        //     longitude: 0,
        //     latitudeDelta: 0,
        //     longitudeDelta: 0,
        //   },
        // });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  handleEditAddress = async () => {
    console.log("hello");
    Geolocation.getCurrentPosition(
      async (position) => {
        const payload = {
          AddressID: this.props.getVisitDetailData.AddressID,
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
        };
        console.log(payload);
        await this.props.UpdatedEditAddress(payload);
        console.log(this.props.getEditAddress, "getEditAddress");
        if (this.props.getEditAddress.Data.code !== 200) {
          await this.props.ontripstartedsuccess(
            this.props.getEditAddress.Data.message
          );
        } else {
          await this.props.ontripstarted(
            this.props.getEditAddress.Data.message
          );
          // await this.props.GetDriverVisit(this.props.getEditAddress.Data.content)
        }
      },
      (error) => {
        // See error code charts below.
        // this.setState({
        //   regions: {
        //     latitude: 0,
        //     longitude: 0,
        //     latitudeDelta: 0,
        //     longitudeDelta: 0,
        //   },
        // });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  handleholdtrip = async () => {
    // this.handleTimer();
    // this.handleDelivered()
    // let endvisits = {
    //   id: this.props.getVisitDetailData.new_jetkvisitId,
    //   supervisorId: this.props.getVisitDetailData.SuperVisorId,
    // };
    Geolocation.getCurrentPosition(
      async (position) => {
        let endvisits = {
          VisitID: this.props.getVisitDetailData.VisitID,
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
        };

        console.log(endvisits, "endvisits");

        await this.props.updatedholdtrip(endvisits);
        console.log(this.props.getholdtripdata, "this.props.getholdtripdata");
        if (this.props.getholdtripdata.Data.code === 200) {
          await this.props.ontripstartedsuccess(
            this.props.getholdtripdata.Data.message
          );
          await this.props.GetDriverVisit(
            this.props.getholdtripdata.Data.content
          );
        } else {
          await this.props.ontripstarted(
            this.props.getholdtripdata.Data.message
          );
        }
      },
      (error) => {
        // See error code charts below.
        // this.setState({
        //   regions: {
        //     latitude: 0,
        //     longitude: 0,
        //     latitudeDelta: 0,
        //     longitudeDelta: 0,
        //   },
        // });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  handleEndVisits = async () => {
    let endvisits = {
      id: this.props.getVisitDetailData.new_jetkvisitId,
      supervisorId: this.props.getVisitDetailData.SuperVisorId,
    };

    await this.props.updateEndDate(endvisits);
    console.log(this.props.updateEndDateres);
    if (this.props.updateEndDateres.status === 200) {
      await this.props.ontripstartedsuccess(this.props.updateEndDateres.data);
    } else {
      await this.props.ontripstarted(
        this.props.updateEndDateres.response.data.Message
      );
    }

    // await this.props.ontripstarted(this.props.sendResponce);

    // setTimeout(() => {
    //   this.props.handleCardClose();
    // }, 4000);
  };
  handleTripStart = async () => {
    // this.handleTimer();
    // this.handleDelivered()
    // let endvisits = {
    //   id: this.props.getVisitDetailData.new_jetkvisitId,
    //   supervisorId: this.props.getVisitDetailData.SuperVisorId,
    // };
    Geolocation.getCurrentPosition(
      async (position) => {
        let endvisits = {
          VisitID: this.props.getVisitDetailData.VisitID,
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
        };

        console.log(endvisits, "endvisits");

        await this.props.updateStartDate(endvisits);
        if (this.props.updatestartdata.status === 200) {
          await this.props.ontripstartedsuccess(
            this.props.updatestartdata.data.Data.message
          );
          await this.props.GetDriverVisit(
            this.props.updatestartdata.data.Data.content
          );
        } else {
          await this.props.ontripstarted(
            this.props.updatestartdata.data.Data.message
          );
        }
      },
      (error) => {
        // See error code charts below.
        // this.setState({
        //   regions: {
        //     latitude: 0,
        //     longitude: 0,
        //     latitudeDelta: 0,
        //     longitudeDelta: 0,
        //   },
        // });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  handlefinish = async () => {
    // this.handleTimer();
    // this.handleDelivered()
    // let endvisits = {
    //   id: this.props.getVisitDetailData.new_jetkvisitId,
    //   supervisorId: this.props.getVisitDetailData.SuperVisorId,
    // };
    Geolocation.getCurrentPosition(
      async (position) => {
        let endvisits = {
          VisitID: this.props.getVisitDetailData.VisitID,
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
        };

        console.log(endvisits, "endvisits");

        await this.props.updateEndDate(endvisits);
        if (this.props.updateEndDateres.status === 200) {
          await this.props.ontripstartedsuccess(
            this.props.updateEndDateres.data.Data.message
          );
          await this.props.GetDriverVisit(
            this.props.updateEndDateres.data.Data.content
          );
        } else {
          await this.props.ontripstarted(
            this.props.updateEndDateres.data.Data.message
          );
        }
      },
      (error) => {
        // See error code charts below.
        // this.setState({
        //   regions: {
        //     latitude: 0,
        //     longitude: 0,
        //     latitudeDelta: 0,
        //     longitudeDelta: 0,
        //   },
        // });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  handlePickup = async () => {
    console.log('====================================');
    console.log(this.props.getVisitDetailData.VisitID,"this.props.getVisitDetailData.VisitID");
    console.log('====================================');
    // this.handleTimer();
    // this.handleDelivered()
    // let endvisits = {
    //   id: this.props.getVisitDetailData.new_jetkvisitId,
    //   supervisorId: this.props.getVisitDetailData.SuperVisorId,
    // };
    Geolocation.getCurrentPosition(
      async (position) => {
        let endvisits = {
          VisitID: this.props.getVisitDetailData.VisitID,
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
        };

        console.log(endvisits, "endvisits");

        await this.props.updateStartPickup(endvisits);
        console.log(
          this.props.getpickupdata,
          "this.props.getpickupdata.data.Data.content"
        );
        if (this.props.getpickupdata.Data.code === 200) {
          await this.props.ontripstartedsuccess(
            this.props.getpickupdata.Data.message
          );
          await this.props.GetDriverVisit(
            this.props.getpickupdata.Data.content
          );
          console.log(this.props.getVisitDetailData, "this.props.handlePickup");
        } else {
          await this.props.ontripstarted(this.props.getpickupdata.Data.message);
        }
      },
      (error) => {
        // See error code charts below.
        // this.setState({
        //   regions: {
        //     latitude: 0,
        //     longitude: 0,
        //     latitudeDelta: 0,
        //     longitudeDelta: 0,
        //   },
        // });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    clearTimeout(this.state.timer);
  }

  handleDelivered = async () => {
    // const User = await storage.getItem("DriverId");

    console.log("delivered", this.props.getVisitDetailData);
    let CarTrip = {
      id: this.props.getVisitDetailData.new_jetkvisitId,
      supervisorId: this.props.getVisitDetailData.SuperVisorId,
    };
    console.log(CarTrip);
    await this.props.updateReactClient(CarTrip);
    console.log(this.props.getreachclient);

    if (
      this.props.getreachclient.response.status === 500 ||
      this.props.getreachclient.response.status === 400
    ) {
      // alert(this.props.getreachclient.response.data.Message);
      await this.props.AlertMessageshow(
        this.props.getreachclient.response.data.Message
      );
      this.props.ontripstarted(this.props.getreachclient.response.data.Message);
    } else {
      this.props.ontripstartedsuccess(
        this.props.getreachclient.response.data.Message
      );

      this.props.handleCardClose();
    }
  };

  handleCancelled = async(message) => {
    this.props.ontripstarted(message);
    this.props.handleCardClose();
    // await this.props.getVisitDetails(this.props.getVisitDetailData.VisitID);

  };

  handleCancelledSucess =async(message) => {
    this.props.ontripstartedsuccess(message);
    this.props.handleCardClose();
    // await this.props.getVisitDetails(this.props.getVisitDetailData.VisitID);

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
    const formattedTimeLeft = moment
      .utc(this.state.timeLeft * 1000)
      .format("mm:ss");
    const { Latitude, Longitude, VisitStatus } = this.props.getVisitDetailData;
    console.log(this.props.getVisitDetailData,"this.props.getVisitDetailData");
    return (
      <View>
        <View
          style={[
            styles.headContainer,
            {
              flexDirection: "row",
            },
          ]}
        >
          {VisitStatus === 1 && (
            <MainButton
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              title={strings.Trip_Start}
              onPress={() => this.handleTripStart()}
              // disabled={!this.state.arrived}
              disabled={false}
            />
          )}
          {/* {(VisitStatus === 1 ||
            VisitStatus === 100000001 ||
            VisitStatus === 100000000 ||
            VisitStatus === 100000006) && (
            <MainButton
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              title={strings.Hold_Trip}
              onPress={this.handleholdtrip}
              // disabled={!this.state.arrived}
              disabled={false}
            />
          )} */}
           {(VisitStatus === 1 ||
            VisitStatus === 100000001 ||
            VisitStatus === 100000000) && (
            <MainButton
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              title={strings.Hold_Trip}
              onPress={this.handleholdtrip}
              // disabled={!this.state.arrived}
              disabled={false}
            />
          )}
          {VisitStatus === 100000004 && (
            <MainButton
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              title={strings.Edit_Addr}
              onPress={this.handleEditAddress}
              // disabled={!this.state.arrived}
              disabled={false}
            />
          )}

          {VisitStatus === 100000006 && (
            <MainButton
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              title={strings.Finish}
              onPress={this.handlefinish}
              // disabled={!this.state.arrived}
              disabled={false}
            />
          )}
          {VisitStatus === 100000004 && (
            <MainButton
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              title={strings.Pick_Up}
              onPress={this.handlePickup}
              // disabled={!this.state.arrived}
              disabled={false}
            />
          )}
          {(VisitStatus === 100000001 || VisitStatus === 100000000) && (
            <MainButton
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              title={strings.arrived}
              onPress={this.handleSendMessage}
              // disabled={!this.state.arrived}
              disabled={false}
            />
          )}
          {/* {VisitStatus === 1 &&    <MainButton
                textStyle={styles.tripText}
                btnStyle={styles.tripButton}
                title={strings.delivered}
                onPress={() => this.handleArrived()}
                // disabled={this.state.cancelled}
                disabled={false}
              />} */}
          {(VisitStatus === 1 ||
            VisitStatus === 100000004 ||
            VisitStatus === 100000000) && (
            <MainButton
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              title={strings.cancelled}
              onPress={this.handleCancelView2}
              // disabled={!this.state.cancelled}
              disabled={false}
            />
          )}
          {/* {VisitStatus === 1 ? (
            <MainButton
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              title={strings.end}
              onPress={() => this.handleEndVisits()}
              // disabled={this.state.cancelled}
              disabled={false}
            />
          ) : (
            <>
            
              
              
              
               
            
             
             
            </>
          )} */}

          <View
            style={[
              styles.timerContainer,
              {
                justifyContent: this.state.showTimer
                  ? "space-between"
                  : "flex-end",
              },
            ]}
          >
            {this.state.showTimer && (
              <View style={styles.timerCircle}>
                <Text style={styles.timeLeft}>{formattedTimeLeft}</Text>
              </View>
            )}
            <TouchableOpacity onPress={this.props.handleCardClose}>
              <Icons.CloseIcon height={24} width={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              justifyContent: "center",
              height: 150,
              width: "100%",
              alignSelf: "center",
            }}
          >
            {Latitude !== null && Longitude !== null ? <MapView
              provider={this.props.provider}
              style={styles.map}
              zoomControlEnabled={false}
              initialRegion={{
                latitude: +Latitude,
                longitude: +Longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={false}
            >
              <Marker
                coordinate={{
                  latitude: +Latitude,
                  longitude: +Longitude,
                }}
                title={"First Pickup Location"}
              />
            </MapView> :null}
           
            
            <MainButton
              title={strings.getdirection}
              textStyle={styles.directionText}
              btnStyle={styles.directionButton}
              onPress={() => this.handlePress()}
              icons={<Icons.LocationIcons height={15} width={15} />}
            />
          </View>
          <View
            style={{
              height: s(350),
            }}
          >
            <CardTabs data={this.props.getVisitDetailData} />
          </View>
        </View>

        <RBSheet
          ref={(ref) => {
            this.RBSheet2 = ref;
          }}
          height={s(560)}
          closeOnSwipeDown={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "#F9F9F9",
            },
          }}
        >
          <>
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
              <CancelReason
                handleViewRouteClose2={() => this.handleViewRouteClosevalue()}
                ontripstarted={this.handleCancelled}
                ontripstartedsuccess={this.handleCancelledSucess}
              />
            </View>
          </>
        </RBSheet>
        {this.props.loaderresponce && <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(0,0,0, 0.5)",
            height: "100%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Loader />
        </View>}
        
      </View>
    );
  }
}
CardView.propTypes = {
  provider: ProviderPropType,
};
const styles = StyleSheet.create({
  tripButton: {
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 26 / 2,
    backgroundColor: "#222222",
    elevation: 3,
    height: 26,
    width: "23%",
  },
  tripText: {
    fontSize: 13,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.Aileronregular,
    textAlign: "center",
  },
  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headContainer: {
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  directionButton: {
    justifyContent: "center",
    borderRadius: 48 / 2,
    backgroundColor: "#00A7DD",
    elevation: 3,
    height: 26,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    right: 15,
    paddingHorizontal: 5,
  },
  directionText: {
    fontSize: 13,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.Aileronregular,
    textAlign: "center",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "25%",
  },
  timerCircle: {
    width: 45,
    height: 20,
    borderRadius: 40 / 2,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  timeLeft: {
    fontSize: 14,
    color: "white",
  },
});
const mapStateToProps = (state) => ({
  getVisitDetailData: state.dashboard.getVisitDetailData,
  getreachclient: state.dashboard.getreachclient,
  alertmessagestatus: state.dashboard.alertmessagestatus,
  getdriverstatus: state.dashboard.getdriverstatus,
  sendResponce: state.dashboard.sendResponce,
  getEditAddress: state.dashboard.getEditAddress,
  updateEndDateres: state.dashboard.updateEndDateres,
  updatestartdata: state.dashboard.updatestartdata,
  getholdtripdata: state.dashboard.getholdtripdata,
  getpickupdata: state.dashboard.getpickupdata,
  loaderresponce: state.dashboard.loaderresponce,
});
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: bindActionCreators(sendMessage, dispatch),
    UpdatedEditAddress: bindActionCreators(UpdatedEditAddress, dispatch),
    updateStartPickup: bindActionCreators(updateStartPickup, dispatch),
    updateEndDate: bindActionCreators(updateEndDate, dispatch),
    updateStartDate: bindActionCreators(updateStartDate, dispatch),
    updateStartDate: bindActionCreators(updateStartDate, dispatch),
    updateReactClient: bindActionCreators(updateReactClient, dispatch),
    AlertMessageshow: bindActionCreators(AlertMessageshow, dispatch),
    updatedholdtrip: bindActionCreators(updatedholdtrip, dispatch),
    GetDriverVisit: bindActionCreators(GetDriverVisit, dispatch),
    getVisitDetails: bindActionCreators(getVisitDetails, dispatch),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardView);
