import React from "react";
import { Text, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/dist/Feather";

const Icon = ({ name }) => <span>{name}</span>;

const buttonBackgroundByType = {
  default: "#eeeeee",
  success: "#009900",
  danger: "#ff0000",
  transparent: "transparent"
};
const buttonBorderByType = {
  default: "#cccccc",
  success: "#006600",
  danger: "#ff0000",
  transparent: "transparent"
};
const buttonColorByType = {
  default: "#666",
  success: "#fff",
  danger: "#fff",
  transparent: "#333"
};

const Button = ({
  title,
  type = "default",
  onPress,
  width = 100,
  height = 50,
  fontSize = 18,
  fontColor,
  align = "center",
  icon,
  iconSize = 18,
  iconColor
}) => (
  <TouchableOpacity
    onPress={() => onPress()}
    style={{
      flex: 0,
      flexDirection: "row",
      flexWrap: "nowrap",
      backgroundColor: buttonBackgroundByType[type],
      width: width,
      height: height,
      justifyContent: align,
      alignItems: "center",
      margin: 2,
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 1,
      borderColor: buttonBorderByType[type]
    }}
  >
    {icon ? (
      <Icon
        name={icon}
        size={iconSize}
        color={iconColor || buttonColorByType[type]}
        style={{ marginRight: title ? 5 : 0 }}
      />
    ) : null}
    {title ? (
      <Text
        style={{
          color: fontColor || buttonColorByType[type],
          fontSize: fontSize
        }}
        ellipsizeMode={"tail"}
        numberOfLines={3}
      >
        {title}
      </Text>
    ) : null}
  </TouchableOpacity>
);

export default Button;
