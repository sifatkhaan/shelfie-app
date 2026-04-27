import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const ThemedButton = ({ style, ...props }: any) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      {...props}
    />
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 6,
    marginVertical:10,
  },
  pressed: {
    opacity: 0.5,
  },
});
