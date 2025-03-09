import React, { Component } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  I18nManager,
  Dimensions
  
} from "react-native";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import Fonts from "../../assets/Fonts/Fonts";
import Heading from "../../Components/Heading";
import Icons from "../../assets/Icons";
import moment from "moment";
import strings from "../../localization/Localization";
import Constant from "../../Constant/Constant";

const { width } = Dimensions.get('window'); // Get screen width
class DashboardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runningTime: null,
    };
    this.timer = null; // Initialize a reference for the interval timer
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer); // Clear the timer when the component unmounts
  }

  startTimer = () => {
    this.calculateRunningTime(); // Initial calculation
    this.timer = setInterval(this.calculateRunningTime, 1000); // Update every second
  };

  calculateRunningTime = () => {
    const { VisitStatus, ActualStartTime } = this.props.data;
    if (VisitStatus === 100000004 || VisitStatus === 100000006) {
      const actualStartPlus4Hours = moment(ActualStartTime).add(4, "hours");
      const currentTime = moment();
      const duration = moment.duration(actualStartPlus4Hours.diff(currentTime));

      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      this.setState({
        runningTime: `${hours}h ${minutes}m ${seconds}s`,
      });
    } else {
      this.setState({ runningTime: null }); // Reset running time if status changes
    }
  };

  handleWhatsapp = (mobileNumber) => {
    let encodedMessage;
    const item = this.props.data;
    const customerNameKey = !I18nManager.isRTL
      ? "CustomerName"
      : "CustomerName";
    const districtNameKey = !I18nManager.isRTL
      ? "NeighbourhoodName"
      : "NeighbourhoodName";
    const message = `
    ${strings.CustomerName}: ${item[customerNameKey]}
     ${
       !I18nManager.isRTL
         ? Constant.driverAppKey.whatsapp_message_en
         : Constant.driverAppKey.whatsapp_message_ar
     }
      ${strings.District_Name}: ${item[districtNameKey]}
      ${strings.mobile1}: ${item.PreferedPhone}
      ${strings.Client_Address}: ${item.VisitShelter}
    `;
    encodedMessage = encodeURIComponent(message);
    // Linking.openURL(`whatsapp://send?text=${encodedMessage}`);
    Linking.openURL(
      `whatsapp://send?text=${
        !I18nManager.isRTL
          ? Constant.driverAppKey.whatsapp_message_en
          : Constant.driverAppKey.whatsapp_message_ar
      }&phone=+966${mobileNumber}`
    );
  };
  handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  getVisitTime = (visitIds, timeKey) => {
   
    switch (visitIds) {
      case 1: // Wait
        return Constant.Visit_time[timeKey];
      case 100000000: // On Delivery
        return Constant.Visit_time[timeKey];

      case 100000004: // Finished Partially
      case 100000006: // On Collection
        const actualStartTime = moment(this.props.data.ActualStartTime);
        return timeKey === "Morning_start_time"
          ? actualStartTime.format("hh:mm A")
          : timeKey === "Evening_start_time" ? actualStartTime.format("hh:mm A") : actualStartTime.clone().add(4, "hours").format("hh:mm A");

      case 100000001: // Cancelled for Investigation
      case 100000002: // Cancelled Refunded
      case 100000003: // Cancelled Not Refunded
      case 100000007: // Cancel Not Paid
        return "--";

      case 100000005: // Finished
        const actualEndTime = moment(
          timeKey === "Morning_start_time"
            ? this.props.data.ActualStartTime
            : this.props.data.ActualEndTime
        );
        return actualEndTime.format("hh:mm A");

      default:
        return ""; // Handle unexpected visit IDs
    }
  };

  render() {
    const {
      ActualEndTime,
      CarTripId,
      ClientAddress,
      CustomerEnglishName,
      CustomerLatitude,
      CustomerLongitude,
      DateTimeActualStartTime,
      DistrictNameArabic,
      DistrictNameEnglish,
      DriverId,
      EmpNameEnglish,
      FlatNumber,
      FloorNumber,
      HouseLatitude,
      HouseLongitude,
      MapAddress,
      MobilePhone,
      NationalityArabic,
      NationalityEnglish,
      ProfesionArabicName,
      ProfesionEnglishName,
      ScheduledEndTime,
      ScheduledStartTime,
      Shift,
      SuperVisorArabicName,
      SuperVisorEnglishName,
      SuperVisorId,
      Telephone1,
      Telephone2,
      Telephone3,
      ThemeColor,
      VisitNumber,
      VisitStatus,
      new_Cartripin,
      new_Cartripout,
      new_carsId,
      visitId,
      EmpNameArabic,
      RequestNumber,
      LaborName,
      CustomerName,
      VisitShelter,
      PreferedPhone,
      EmergancyPhone,
      VisitActualStart,
      VisitDate,
      VisitName,
      TimeID,
    } = this.props.data;
    return (
      <View style={[styles.box, { backgroundColor: "#FFFFFF" }]}>
       {
  (VisitStatus === 100000004 || VisitStatus === 100000006) && (
    <View style={styles.runningTimeContainer}>
      <Icons.RunTimer height={14} width={14} fill={Colors.black} />
      <Text style={styles.runningTime}>{this.state.runningTime}</Text>
    </View>
  )
}
        <Heading
          title={VisitName}
          textArea={styles.textArea}
          textSize={styles.textSize}
          textView={styles.textView}
        />

        <Text
          style={VisitStatus === 1 ? styles.blureffect : styles.textsubname}
        >
          {I18nManager.isRTL === false ? CustomerName : CustomerName}
        </Text>
        <Text style={VisitStatus === 1 ? styles.blureffect : styles.textname}>
          {I18nManager.isRTL === false ? LaborName : LaborName}
        </Text>
        <Text
          style={VisitStatus === 1 ? styles.blureffect : styles.textaddress}
        >{`${VisitShelter}`}</Text>
        <View style={styles.flexDirections}>
          <View style={styles.rowview}>
            <TouchableOpacity
              onPress={() => this.handleWhatsapp(PreferedPhone)}
            >
              <Icons.Whatappicons height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconsview}
              onPress={() => this.handleCall(PreferedPhone)}
            >
              <Icons.ProfileIcons height={20} width={20} />
            </TouchableOpacity>

            <Text
              style={VisitStatus === 1 ? styles.blureffect : styles.textnumber}
            >
              {PreferedPhone}
            </Text>
          </View>
          {Telephone1 !== null || Telephone2 !== null || Telephone3 !== null ? (
            <View style={styles.rowview}>
              <TouchableOpacity
                style={styles.nuiconsviewmber}
                onPress={() =>
                  this.handleWhatsapp(
                    PreferedPhone || EmergancyPhone || Telephone3
                  )
                }
              >
                <Icons.Whatappicons height={24} width={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconsview}
                onPress={() => this.handleCall(EmergancyPhone)}
              >
                <Icons.CalIIcons height={20} width={20} />
              </TouchableOpacity>
              <Text
                style={
                  VisitStatus === 1 ? styles.blureffect : styles.textnumber
                }
              >
                {PreferedPhone || EmergancyPhone || Telephone3}
              </Text>
            </View>
          ) : (
            ""
          )}
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
          style={
            I18nManager.isRTL === false
              ? styles.flexDirections
              : styles.flexDirectionsarb
          }
        >
          <View style={styles.rowview}>
            <Icons.Logout height={24} width={24} />

            <Text style={styles.textnumber}>
              {this.getVisitTime(
                VisitStatus,
                TimeID === 100000000
                  ? "Morning_start_time"
                  : "Evening_start_time"
              )}
            </Text>
          </View>
          <View style={styles.rowview}>
            <View
              style={{
                transform: [{ scaleX: 1 }, { rotate: "180deg" }],
              }}
            >
              <Icons.Login height={24} width={24} />
            </View>
            <Text style={styles.textnumber}>
              {this.getVisitTime(
                VisitStatus,
                TimeID === 100000000 ? "Morning_end_time" : "Evening_end_time"
              )}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "column",
  },
  textArea: {
    width: "100%",
    height: 15,
    paddingHorizontal: 1,
    marginBottom: 10,
  },
  textSize: {
    fontSize: 14,
    color: Colors.Tabprimary,
    fontFamily: Fonts.fontFamily.AileronBold,
  },
  textnumber: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: Fonts.fontFamily.Aileronsemibold,
  },
  textsubname: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: Fonts.fontFamily.AileronBold,
  },
  textname: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: Fonts.fontFamily.Aileronregular,
  },
  textaddress: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: Fonts.fontFamily.Aileronsemibold,
    marginTop: 5,
  },

  box: {
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 18,
    marginTop: 20,
    elevation: 4,
  },
  flexDirections: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  flexDirectionsarb: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  rowview: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconsview: {
    marginHorizontal: 5,
  },
  number: {
    paddingLeft: 5,
  },
  blureffect: {
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    color: "transparent",
  },
  runningTimeContainer: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center icon and text vertically,
    alignSelf: "flex-end", // Align this container to the end of its parent

  },
  runningTime: {
    fontSize: width * 0.025, // Responsive font size
    color: Colors.white,
    fontFamily: Fonts.fontFamily.AileronBold,
    marginLeft: 5, // Add some space between the icon and the text
    backgroundColor: Colors.primary,
    width: "25%",
    height: width * 0.05, // Responsive height
    borderRadius: 20,
    paddingHorizontal: 5,
    textAlign: 'center',
    paddingTop:4
  },

});
const mapStateToProps = (state) => ({
  getVisitDetailData: state.dashboard.getVisitDetailData,
});
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardCard);
