import { Image, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import LightLogo from "../assets/image/logo_light.png";
import DarkLogo from "../assets/image/logo_dark.png";

const ThemedLogo = ({...props}) => {
  const colorSheme = useColorScheme();
  const logo = colorSheme === "dark" ? DarkLogo : LightLogo;
  return <Image source={logo} {...props}/>;
};

export default ThemedLogo;
