import { View, Image, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "react-native";
type Props = {
  value?: string;
  onChange: (uri: string) => void;
};

const ThemedImagePicker = ({ value, onChange }: Props) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onChange(uri);
    }
  };
  return (
    <View>
      {value ? (
        <Image
          key={value}
          source={{ uri: value }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            // width: 250,
            alignSelf: "center",
            backgroundColor: "red",
          }}
        />
      ) : null}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          marginTop: 10,
          padding: 12,
          backgroundColor: theme.primary,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: theme.text, textAlign: "center" }}>
          {value ? "Change Photo" : "Upload Photo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemedImagePicker;
