import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { log } from "../../services";
// import Icon from 'react-native-vector-icons/Feather';
import i18n from "../../i18n";
const { width, height } = Dimensions.get("window");

const bottomStackIconList = {
  AddOperation: "plus",
  OperationList: "align-left",
  CategoryList: "server",
  Settings: "settings",
  Menu: "menu"
};
const bottomStackTitleList = {
  AddOperation: i18n.t("title.addOperation"),
  OperationList: i18n.t("title.operationList"),
  CategoryList: i18n.t("title.categoryList"),
  Settings: i18n.t("title.settings"),
  Menu: i18n.t("title.menu")
};
const bottomTabRouteList = [
  // 'AddOperation',
  "OperationList",
  "CategoryList",
  "Settings",
  "Menu"
];

const getBottomStackIcon = routeName =>
  bottomStackIconList[routeName] || "x-square";
const getBottomStackTitle = routeName => bottomStackTitleList[routeName] || "-";
const getCurrentRouteName = navState => {
  if (navState.hasOwnProperty("index")) {
    return getCurrentRouteName(navState.routes[navState.index]);
  }

  return navState.routeName;
};

const MenuBottom = props => {
  const currentRouteName = getCurrentRouteName(props.props.navigation.state);
  const menuItems = props.props.navigation.state.routes.filter(route =>
    bottomTabRouteList.includes(route.routeName)
  );

  log(
    "MenuBottom",
    "currentRouteName",
    currentRouteName,
    "menuItems",
    menuItems
  );

  return (
    <View
      style={{
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
        borderTopColor: "#eee",
        borderTopWidth: 1,
        height: 60,
        backgroundColor: "#fff"
      }}
      onPress={() => log("press")}
    >
      {menuItems.map(route => (
        <TouchableOpacity
          key={"route-" + route.key}
          style={{
            flex: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: width / menuItems.length
          }}
          onPress={() =>
            route.routeName === "Menu"
              ? null
              : props.props.navigation.navigate(route.routeName)
          }
        >
          {/* <Icon
            name={getBottomStackIcon(route.routeName)}
            size={18}
            color={
              currentRouteName === route.routeName
                ? props.props.activeTintColor
                : props.props.inactiveTintColor
            }
          /> */}
          <Text
            style={{
              color:
                currentRouteName === route.routeName
                  ? props.props.activeTintColor
                  : props.props.inactiveTintColor,
              fontSize: 11,
              marginTop: 2
            }}
          >
            {getBottomStackTitle(route.routeName)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MenuBottom;
