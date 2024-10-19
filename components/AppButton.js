import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// app button rn component
const AppButton = ({ title, onPress, backgroundColor, textColor }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor || "white",
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.title,
          {
            color: textColor ?? "black",
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 50, 
    width: "90%",
    borderRadius: 10,
    margin:20,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
});
export default AppButton;
