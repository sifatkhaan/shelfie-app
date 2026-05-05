import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

type Props = {
  value?: string;
  onChange: (date: string) => void;
};

const ThemedDatePicker = ({ value, onChange }: Props) => {
  const [show, setShow] = useState(false);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      onChange(formatted);
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: theme.text }}>{value || "Select Date"}</Text>

        {show && (
          <DateTimePicker
            value={value ? new Date(value) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ThemedDatePicker;
