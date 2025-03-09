import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
  Dimensions
} from "react-native";

import Fonts from "../../assets/Fonts/Fonts";
import Heading from "../../Components/Heading";
import moment from "moment";
import strings from "../../localization/Localization";
import OrderStatus from "../../Constant/OrderStatus";
import Colors from "../../Themes/Colors";
import Icons from "../../assets/Icons";
import Constant from "../../Constant/Constant";
const { width } = Dimensions.get('window'); // Get screen width

class VisitInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runningTime: null,
    };
    this.timer = null; // Initialize a reference for the interval timer
  }

  onStatusFunction = (item) => {
    const statusObject = OrderStatus.GetVisitStatus.find(
      (status) => status.TypeValue === item
    );
    if (statusObject) {
      return !I18nManager.isRTL ? statusObject.TypeNameEn : statusObject.TypeNameAR;
    } else {
      return "Status not found";
    }
  };
  onvisitstatus(visitid) {
    if (visitid === 1) {
      return strings.new;
    } else if (visitid === 2) {
      return strings.assigned;
    } else if (visitid === 3) {
      return strings.allocated;
    } else if (visitid === 4) {
      return strings.started;
    } else if (visitid === 5) {
      return strings.ended;
    } else if (visitid === 6) {
      return strings.customerpostponed;
    } else if (visitid === 8) {
      return strings.customerCanceled;
    } else if (visitid === 9) {
      return strings.companyCanceled;
    } else if (visitid === 10) {
      return strings.noWoman;
    } else if (visitid === 11) {
      return strings.wrongLocation;
    } else if (visitid === 12) {
      return strings.customerRefusesService;
    }
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
    const { VisitStatus, ActualStartTime } = this.props.visitData;
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

  getVisitTime = (visitIds, timeKey) => {
    switch (visitIds) {
      case 1: // Wait
        return Constant.Visit_time[timeKey];
      case 100000000: // On Delivery
        return Constant.Visit_time[timeKey];

      case 100000004: // Finished Partially
      case 100000006: // On Collection
      const actualStartTime = moment(this.props.visitData.ActualStartTime);
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
            ? this.props.visitData.ActualStartTime
            : this.props.visitData.ActualEndTime
        );
        return actualEndTime.format("hh:mm A");

      default:
        return ""; // Handle unexpected visit IDs
    }
  };
  render() {
    const {
      RequestNumber,
      new_ReservationNumber,
      ScheduledStartTime,
      ScheduledEndTime,
      VisitStatus,
      ActualArrivalTime,
      ActualStartTime,
      ActualEndTime,
      VisitDuration,
      WaitingDuration,
      CarTripInNumber,
      CarTripOutNumber,
      NumberOfHours,
      CarNumber,
      EmpNameArabic,
      EmpNameEnglish,
      MobilePhone,
      Telephone1,
      Telephone2,
      Telephone3,
      CustomerEnglishName,
      CustomerName,
      VisitActualStart,
      VisitDate,
      PreferedPhone,
      LaborName,
      VisitStartTime,
      VisitName,
      WorkerName,
      Status,
      TimeID
      
    } = this.props.visitData;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View>
        {
  (VisitStatus === 100000004 || VisitStatus === 100000006) && (
    <View style={styles.runningTimeContainer}>
      <Icons.RunTimer height={14} width={14} fill={Colors.black} />
      <Text style={styles.runningTime}>{this.state.runningTime} </Text>
    </View>
  )
}
          <Heading
            title={`${strings.VisitNum}  - ${VisitName} `}
            textArea={styles.textArea}
            textSize={styles.textSize}
            textView={styles.textView}
          />
          
          <View style={styles.row}>
            <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.reservationnumber}</Text>
              <Text style={styles.textValue}>{RequestNumber}</Text>
            </View>
            <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.visitstatus}</Text>
              <Text style={styles.textValue}>
                {Status ? this.onStatusFunction(Status) : "-"}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            {/* <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.startdate}</Text>
              <Text style={styles.textValue}>
                {VisitDate ? moment(VisitDate).format("DD-MM-YYYY - hh:mm A") : "--:--"}
              </Text>
            </View> */}
           
             <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.startvisit}</Text>
              <Text style={styles.textValue}>
                {VisitStartTime ? moment(VisitStartTime).format("DD-MM-YYYY - hh:mm A"): "--:--"}
              </Text>
            </View>
          </View>
        
          
          <View style={styles.row}>
           
            <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.expectedvisitend}</Text>
              <Text style={styles.textValue}>
              {this.getVisitTime(
                VisitStatus,
                TimeID === 100000000
                  ? "Morning_start_time"
                  : "Evening_start_time"
              )} 
              </Text>
            </View>
            <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.endvisit}</Text>
              <Text style={styles.textValue}>
              {this.getVisitTime(
                VisitStatus,
                TimeID === 100000000 ? "Morning_end_time" : "Evening_end_time"
              )}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
           
            <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.visitduration}</Text>
              <Text style={styles.textValue}>{VisitDuration}</Text>
            </View>
            <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.numberofhours}</Text>
              <Text style={styles.textValue}>{NumberOfHours}</Text>
            </View>
          </View>
        

          <View style={styles.row}>
            
            <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.carnumber}</Text>
              <Text style={styles.textValue}>{CarNumber}</Text>
            </View>
            <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.mobile1}</Text>
              <Text style={VisitStatus === 1 ? styles.blureffect :  styles.textValue}>{PreferedPhone}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.CustomerName}</Text>
              <Text style={VisitStatus === 1 ? styles.blureffect :  styles.textValue}>
                {I18nManager.isRTL === false
                  ? CustomerName
                  : CustomerName}
              </Text>
            </View>
            <View style={styles.textline}>
              <Text style={styles.titleValue}>{strings.Employeename}</Text>
              <Text style={VisitStatus === 1 ? styles.blureffect :  styles.textValue}>
                {I18nManager.isRTL === false ? WorkerName : WorkerName}
              </Text>
            </View>
          </View>
         
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  textArea: {
    width: "100%",
    height: 30,
    paddingHorizontal: 1,
    marginBottom: 10,
  },
  textSize: {
    justifyContent: "center",
    marginTop: 5,
    fontSize: 14,
    color: "#000000",
    fontFamily: Fonts.fontFamily.Aileronsemibold,
  },
  textView: {
    fontSize: 14,
    color: "#000000",
    fontFamily: Fonts.fontFamily.Aileronregular,
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },

  titleValue: {
    fontSize: 12,
    color: "#9B9B9B",
    fontFamily: Fonts.fontFamily.Aileronregular,
    textAlign: "left",
  },
  textline: {
    marginTop: 15,
    width: "50%",
  },
  textValue: {
    fontSize: 14,
    color: "#000000",
    fontFamily: Fonts.fontFamily.Aileronregular,
    textAlign: "left",
    marginTop: 5,
  },
  blureffect:{
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    color:"transparent"
},runningTimeContainer: {
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
export default VisitInfo;
