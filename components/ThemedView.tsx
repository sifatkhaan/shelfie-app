import { useColorScheme, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemedView = ({ style, safe = false, ...props }: any) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;


    if (!safe) return (
      <View
        style={[{ backgroundColor: theme.background }, style]}
        {...props}
      />
    )

  const insets: any = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: insets.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedView;
