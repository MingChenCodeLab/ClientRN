// CartBadge.js
import React, { useEffect, useState ,useContext } from "react";
import { View, Text } from "react-native";

const NotiBadge = () => {
  return (
    1 > 0 && (
      <View
        style={{
          position: "absolute",
          right: -8,
          top: -2,
          backgroundColor: "#FF3232",
          borderRadius: 8.5,
          width: 17,
          height: 17,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: "white",
            fontWeight: "bold",
          }}
        >  
        {10}
        </Text>
      </View>
    )
  );
};

export default NotiBadge;
