import React, { Component } from "react";
import Colors from "../../Themes/Colors";
import Fonts from "../../assets/Fonts/Fonts";
import Icons from "../../assets/Icons";
import SelectField from "../../Components/SelectField";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  I18nManager,
} from "react-native";
import HeaderTitle from "../../Components/HeaderTitle";
import Heading from "../../Components/Heading";
import InputTextArea from "../../Components/InputTextArea";
import MainButton from "../../Components/MainButton";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import {
  cancelVisit,
  GetCancelReasons,
  AlertMessageshow,
  getVisitDetails
} from "../../Shared/Reducers";
import Loader from "../../Components/Loader";
import strings from "../../localization/Localization";
import { s } from "../../Utils/Scaling";
import CancelModal from "../../Components/CancelModal";
import Geolocation from "react-native-geolocation-service";
class CancelReason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Pickup: [],
      reasonslist: [],
      title: "",
      errormessage: "",
      optionsVisible: false,
      selectedOption: strings.chooseforreason,
      id: "",
      loader: false,
      cancelModel: false,
    };
  }
  async componentDidMount() {
    // this.props.handleViewRouteClose;
    console.log(this.props.getVisitDetailData);
    this.setState({ Pickup: this.props.getVisitDetailData });
    await this.props.GetCancelReasons(I18nManager.isRTL === true ? 1 : 2);
    console.log(this.props.getcancelreasons.data.Data.content);
    this.setState({
      reasonslist: this.props.getcancelreasons.data.Data.content,
    });
  }
  SubmitCancelBtn = async () => {
    if (this.state.id === "") {
      this.setState({ errormessage: "Please enter the Choose for reason" });
    } else if (this.state.title === "") {
      this.setState({ errormessage: "Please enter the  comments " });
    } else {
      this.setState({ cancelModel: true });
    }
  };
  toggleOptions = () => {
    this.setState({ optionsVisible: !this.state.optionsVisible });
  };
  selectOption = (option) => {
    this.setState({
      selectedOption: option,
      id: option.Id,
      optionsVisible: false,
      errormessage: "",
    });
  };
  onRequestClose = async (val) => {
    if (val === "no") {
      this.setState({ cancelModel: !this.state.cancelModel });
    } else {
      this.setState({ cancelModel: !this.state.cancelModel });
      this.setState({ loader: true });
      // let data = {
      //   VisitId: this.state.Pickup.new_jetkvisitId,
      //   VisitStatus: this.state.id,
      //   CancelNote: this.state.title,
      //   supervisorId: this.state.Pickup.SuperVisorId,
      // };

      Geolocation.getCurrentPosition(
        async (position) => {
         
          let data = {
            VisitID: this.state.Pickup.VisitID,
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
            CancelReason: this.state.selectedOption,
            Attachement1: null,
            Attachement2: null,
            Attachement3: null,
          };
          console.log(data);
          await this.props.cancelVisit(data);
          console.log(this.props.getcancelVisit.Data,"this.props.getcancelVisit.Data");
          if (this.props.getcancelVisit?.Data?.code === 200) {
            // this.props.handleViewRouteClose2()
            this.props.ontripstartedsuccess(this.props.getcancelVisit.Data.message);
            this.setState({ loader: false });
          } else  {
            console.log(this.props.getcancelVisit?.Data?.message);
            this.props.ontripstarted(
              this.props.getcancelVisit.Data.message
            );
    
            this.setState({ loader: false });
          }
          this.setState({ loader: false });
    
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
     
     
      
    }
  };
  render() {
    return (
      <View
        style={{
          height: s(560),
        }}
      >
        <View
          style={[
            styles.headContainer,
            {
              flexDirection: "row",
            },
          ]}
        >
          <Text style={styles.textViewcenter}>
            {strings.VisitNum}. - {this.state.Pickup.VisitName}
          </Text>
          <TouchableOpacity onPress={this.props.handleViewRouteClose2}>
            <Icons.CloseIcon height={24} width={24} />
          </TouchableOpacity>
        </View>
        <View style={{ overflow: "hidden" }}>
          <View
            style={{
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: "#9B9B9B",
              margin: -2,
              marginBottom: 0,
              paddingTop: 10,
            }}
          ></View>
        </View>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <ScrollView>
            <HeaderTitle
              font={styles.font}
              title={strings.cancelreason}
              bottomView={styles.bottomView}
              topView={styles.topView}
            />
            <Heading
              textArea={styles.textArea}
              textView={styles.textView}
              title={strings.plsshareyouropinionabtourservices}
              textSize={styles.textSize}
            />
            <SelectField
              item={this.state.reasonslist}
              title={this.state.selectedOption}
              optionsVisible={this.state.optionsVisible}
              onPresstoggle={() => this.toggleOptions()}
              Child={this.state.reasonslist.map((i) => {
                return (
                  <TouchableOpacity
                    style={styles.buttonselect}
                    onPress={() => this.selectOption(i)}
                  >
                    <Text style={styles.textcreate}>{i} </Text>
                  </TouchableOpacity>
                );
              })}
            />
            <InputTextArea
              onChangeText={(e) => {
                this.setState({ title: e, errormessage: "" });
              }}
              value={this.state.title}
            />
            {this.state.errormessage === "" ? null : (
              <Text
                style={{
                  fontSize: 12,
                  color: "#F01F0E",
                  fontFamily: Fonts.fontFamily.Aileronlight,
                  marginHorizontal: 20,
                  paddingTop: 5,
                }}
              >
                {this.state.errormessage}
              </Text>
            )}
            {this.state.loader ? (
              <Loader />
            ) : (
              <MainButton
                textStyle={styles.text}
                btnStyle={styles.button}
                title={strings.submit}
                onPress={this.SubmitCancelBtn}
                // onPressIn={this.props.ontripstarted}
              />
            )}
          </ScrollView>
        </View>
        <CancelModal
          visible={this.state.cancelModel}
          onRequestClose={this.onRequestClose}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tripButton: {
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 48 / 2,
    backgroundColor: "#222222",
    elevation: 3,
    height: 26,
    width: "28%",
  },
  tripText: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.AileronBold,
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
  textArea: {
    width: "100%",
    height: 40,
    paddingHorizontal: 1,
    marginBottom: 10,
    alignItems: "center",
  },
  textSize: {
    fontSize: 16,
    color: "#000000",
    fontFamily: Fonts.fontFamily.Aileronregular,
    textAlign: "center",
    marginTop: 12,
  },
  textView: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    fontFamily: Fonts.fontFamily.Aileronsemibold,
  },
  scrollView: {
    backgroundColor: "#F9F9F9",
    marginHorizontal: 10,
  },
  container: {
    paddingTop: StatusBar.currentHeight,
  },
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
    fontFamily: Fonts.fontFamily.AileronBold,
    textAlign: "center",
    textTransform: "uppercase",
  },
  headContainer: {
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomView: {
    width: "100%",
    height: 60,
    paddingHorizontal: 55,
    marginBottom: -10,
  },
  topView: {
    width: "100%",
    justifyContent: "center",
    marginTop: -10,
  },
  font: {
    fontSize: 25,
    color: "#000000",
    fontFamily: Fonts.fontFamily.AileronBold,
    textAlign: "center",
    marginTop: 30,
  },
  textViewcenter: {
    fontSize: 14,
    lineHeight: 25,
    color: "#000000",
    fontFamily: Fonts.fontFamily.Aileronsemibold,
  },
  textcreate: {
    fontFamily: Fonts.fontFamily.Aileronregular,
    color: Colors.black,
    fontSize: 14,
  },
  buttonselect: {
    height: 40,
    justifyContent: "center",
  },
});
const mapStateToProps = (state) => ({
  getcancelVisit: state.dashboard.getcancelVisit,
  getVisitDetailData: state.dashboard.getVisitDetailData,
  getcancelreasons: state.dashboard.getcancelreasons,
});
const mapDispatchToProps = (dispatch) => {
  return {
    cancelVisit: bindActionCreators(cancelVisit, dispatch),
    GetCancelReasons: bindActionCreators(GetCancelReasons, dispatch),
    getVisitDetails: bindActionCreators(getVisitDetails, dispatch),
    AlertMessageshow: bindActionCreators(AlertMessageshow, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CancelReason);
