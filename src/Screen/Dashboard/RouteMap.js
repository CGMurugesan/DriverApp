import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dispatch, bindActionCreators } from "redux";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  ProviderPropType,
} from "react-native-maps";
import React, { Component } from "react";
import {
  getVisitDetails,
  toggleCardView,
  updateTripEnd,
  updateTripStart,
  visitIdupdate,
  AlertMessageshow
} from "../../Shared/Reducers/index";

import Colors from "../../Themes/Colors";
import Fonts from "../../assets/Fonts/Fonts";
import Icons from "../../assets/Icons";
import MainButton from "../../Components/MainButton";
import MapViewDirections from "react-native-maps-directions";
import { connect } from "react-redux";
import strings from "../../localization/Localization";
import Constant from "../../Constant/Constant";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DEL = 0.1422;
const LONGITUDE_DEL = LATITUDE_DEL * ASPECT_RATIO;

class RouteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Pickup: [],
      regions: {
        latitude: 24.685126,
        longitude: 46.734105,
        latitudeDelta: LATITUDE_DEL,
        longitudeDelta: LONGITUDE_DEL,
      },
      tripStarted: false,
      completeTripEnabled: false,
      showCompleteTrip: false,
      showSOS: false,
      loader: false,
    };
  }
  componentDidMount() {
    // this.props.handleViewRouteClose;
    console.log("rerer");
    console.log(this.props.getdriverstatus);
    console.log(this.props.morningVisitData);
    let arrays = this.props.morningVisitData[this.props.getdriverstatus === 1 ? "MorningVisits" : "EveningVisits"]?.VisitList;
    console.log(arrays,"arrays");
    let array = [];
    for (let index = 0; index < arrays.length; index++) {
      const element = arrays[index];
      array.push({
        Latitude: Number(element.Latitude),
        Longitude: Number(element.Longitude),
        CustomerName: element.CustomerName,
        VisitID: element.VisitID,
      });
    }
    console.log(array,"array");
    this.setState({ Pickup: array }, () => {
      setTimeout(() => {
        this.setState(
          {
            regions: {
              latitude: this.state.Pickup[0].Latitude,
              longitude: this.state.Pickup[0].Longitude,
              latitudeDelta: LATITUDE_DEL,
              longitudeDelta: LONGITUDE_DEL,
            },
          },
          async () => {
            console.log(this.state.Pickup, "rerere");

            this.mapRef.animateToRegion({
              latitude: this.state.Pickup[0].Latitude,
              longitude: this.state.Pickup[0].Longitude,
              latitudeDelta: LATITUDE_DEL,
              longitudeDelta: LONGITUDE_DEL,
            });
          }
        );
      }, 500);
    });
  }
  fetch = async () => {
    console.log(this.state.Pickup, "rerere");
    this.mapRef.animateToRegion({
      latitude: this.state.Pickup[0].Latitude,
      longitude: this.state.Pickup[0].Longitude,
      latitudeDelta: LATITUDE_DEL,
      longitudeDelta: LONGITUDE_DEL,
    });
  };

  handleTripStarted = async () =>  {
    this.setState({
      tripStarted: true,
      completeTripEnabled: true,
      showCompleteTrip: true,
      showSOS: true,
    });
    let CarTrip = {
      CarTripId: this.props.morningVisitData[0].CarTripId,
      CarTripTime: new Date().toISOString(),
    };
    console.log(CarTrip);

    await this.props.updateTripStart(CarTrip);

    if (
      this.props.Getupdatetripstart.response.status === 500 ||
      this.props.Getupdatetripstart.response.status === 400
    ) {
      // alert(this.props.Getupdatetripstart.response.data.Message);
      // console.log(this.props.Getupdatetripstart.response.data.Message);
      await this.props.AlertMessageshow(this.props.Getupdatetripstart.response.data.Message)
      this.props.ontripstarted(this.props.Getupdatetripstart.response.data.Message)
      
      // console.log(this.props.alertmessage);
    }
  };

  handleCompleteTrip = async () => {
    let CarTrip = {
      CarTripId: this.props.morningVisitData[0].CarTripId,
      CarTripTime: new Date().toISOString(),
    };
    console.log(CarTrip);
    await this.props.updateTripEnd(CarTrip);
    console.log(this.props.getupdatetripend);
    console.log(this.props.getupdatetripend);

    if (
      this.props.getupdatetripend.response.status === 500 ||
      this.props.getupdatetripend.response.status === 400
    ) {
      // alert(this.props.getupdatetripend.response.data.Message);
      await this.props.AlertMessageshow(this.props.getupdatetripend.response.data.Message)
      this.props.ontripstarted(this.props.getupdatetripend.response.data.Message)


      // console.log(this.props.alertmessage);

    }
  };

  handleMarkerClick = async (visitId) => {
    console.log(visitId,"visitId");
    
    await this.props.getVisitDetails(visitId.VisitID);
    await this.props.toggleCardView(true);
    // this.props.getVisitDetailData;
  };

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          height: 515,
          width: "100%",
          alignSelf: "center",
        }}
      >
        {this.props.morningVisitData.length === 0 ? null : (
          <MapView
            ref={(ref) => {
              this.mapRef = ref;
            }}
            provider={this.props.provider}
            style={styles.map}
            zoomControlEnabled={false}
            initialRegion={this.state.regions}
            showsUserLocation={false}
          >
            {this.state.Pickup.map((val, index) => {
              return (
                <Marker
                  coordinate={{
                    latitude: val.Latitude,
                    longitude: val.Longitude,
                  }}
                  title={val.CustomerName}
                  key={index}
                  onPress={() => this.handleMarkerClick(val)}
                >
                  {this.props.getdriverstatus === 1 ? (
                    <Icons.MorningMapicon height={50} width={50} />
                  ) : this.props.getdriverstatus === 2 ? (
                    <Icons.EveninginIcons height={50} width={50} />
                  ) : this.props.getdriverstatus === 3 ? (
                    <Icons.MorninginIcons height={50} width={50} />
                  ) : (
                    <Icons.EveningoutIcons height={50} width={50} />
                  )}
                  <Text style={styles.tripTextblack}>
                    {index + 1}
                  </Text>
                </Marker>
              );
            })}
            <MapViewDirections
              origin={{
                latitude: this.state.Pickup[0] && this.state.Pickup[0].Latitude,
                longitude:
                  this.state.Pickup[0] && this.state.Pickup[0].Longitude,
              }}
              destination={{
                latitude:
                  this.state.Pickup.slice(-1)[0] &&
                  this.state.Pickup.slice(-1)[0].Latitude,
                longitude:
                  this.state.Pickup.slice(-1)[0] &&
                  this.state.Pickup.slice(-1)[0].Longitude,
              }}
              waypoints={this.state.Pickup.slice(1, -1)
                .filter((point) => point.Latitude && point.Longitude)
                .map((point) => ({
                  latitude: point.Latitude,
                  longitude: point.Longitude,
                }))}
              apikey={Constant.driverAppKey.android_key}
              strokeWidth={3}
              strokeColor='black'
            />
          </MapView>
        )}
        {/* <View style={{ position: "absolute", bottom: 15, width: "100%" }}>
          {!this.state.tripStarted && (
            <MainButton
              title={strings.tripstarted}
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              // onPress={(this.props.ontripstarted, this.handleTripStarted)}
              onPress={this.handleTripStarted}
              // onPressIn={this.props.ontripstarted}
            />
          )}
          {this.state.showCompleteTrip && (
            <MainButton
              title={strings.Completetrip}
              textStyle={styles.tripText}
              btnStyle={styles.tripButton}
              disabled={!this.state.completeTripEnabled}
              onPress={this.handleCompleteTrip}
              // onPressIn={this.props.ontripstarted}
            />
          )}
          {this.state.showSOS && (
            <TouchableOpacity
              style={{ position: "absolute", right: 5, bottom: 55 }}
              onPress={() => {
                const url = "tel:920008482";
                Linking.openURL(url);
              }}
            >
              <Icons.SOSIcon height={66} width={66} fill={"#C91C1C"} />
            </TouchableOpacity>
          )}
        </View> */}
      </View>
    );
  }
}
RouteMap.propTypes = {
  provider: ProviderPropType,
};
const styles = StyleSheet.create({
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
  tripButton: {
    backgroundColor: "#00A7DD",
    height: 48,
    width: "90%",
    borderRadius: 48 / 2,
    justifyContent: "center",
    alignSelf: "center",
  },
  tripText: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.AileronBold,
    textAlign: "center",
    textTransform: "uppercase",
  },
  tripTextblack: {
    fontSize: 10,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.AileronBold,
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor:'#000',
    width:12,
    alignSelf:'center',
    borderRadius:12/2,
    top:-2
  },
});

const mapStateToProps = (state) => ({
  morningVisitData: state.dashboard.morningVisitData,
  Getupdatetripstart: state.dashboard.Getupdatetripstart,
  getupdatetripend: state.dashboard.getupdatetripend,
  getVisitDetailData: state.dashboard.getVisitDetailData,
  updatedvisit: state.dashboard.updatedvisit,
  getdriverstatus: state.dashboard.getdriverstatus,
  alertmessage: state.dashboard.alertmessage,
  
});
const mapDispatchToProps = (dispatch) => {
  return {
    updateTripEnd: bindActionCreators(updateTripEnd, dispatch),
    updateTripStart: bindActionCreators(updateTripStart, dispatch),
    toggleCardView: bindActionCreators(toggleCardView, dispatch),
    getVisitDetails: bindActionCreators(getVisitDetails, dispatch),
    visitIdupdate: bindActionCreators(visitIdupdate, dispatch),
    AlertMessageshow: bindActionCreators(AlertMessageshow, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RouteMap);
