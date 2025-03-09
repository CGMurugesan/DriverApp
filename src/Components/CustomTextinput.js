import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import Fonts from "../assets/Fonts/Fonts";
import Colors from "../Themes/Colors";
import Icons from "../assets/Icons";
const { width, height } = Dimensions.get("screen");

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
              paddingHorizontal: 5,
              height: 44,
              width: width - 80,
            }}
            keyboardType={keyboardType}
            value={value}
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
            maxLength={maxLength}
            autoCapitalize='none'
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
export default CustomTextinput;
