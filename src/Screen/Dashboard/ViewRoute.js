import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import RouteMap from "./RouteMap";
import Icons from "../../assets/Icons";
import Colors from "../../Themes/Colors";
import HeaderTitle from "../../Components/HeaderTitle";
import Fonts from "../../assets/Fonts/Fonts";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import strings from "../../localization/Localization";

class ViewRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    // this.props.handleViewRouteClose;
    // console.log(this.props.morningVisitData);
    // this.setState({Pickup:this.props.morningVisitData})
  }
  render() {
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
          <HeaderTitle
            font={styles.font}
            title={strings.viewroute}
            bottomView={styles.bottomView}
            topView={styles.topView}
          />
          <TouchableOpacity onPress={this.props.handleViewRouteClose}>
            <Icons.CloseIcon height={24} width={24} />
          </TouchableOpacity>
        </View>
        <RouteMap handleViewRouteClose={this.props.handleCardView} ontripstarted={this.props.ontripstarted}/>
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
    width: "30%",
  },
  tripText: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.fontFamily.AileronBold,
    textAlign: "center",
  },
  headContainer: {
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomView: {
    width: "30%",
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  topView: {
    width: "100%",
    justifyContent: "center",
    marginTop: 0,
  },
  font: {
    fontSize: 16,
    color: "#222222",
    fontFamily: Fonts.fontFamily.AileronBold,
    textTransform:'lowercase'
  },
});
const mapStateToProps = (state) => ({
  morningVisitData: state.dashboard.morningVisitData,

});
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewRoute);
