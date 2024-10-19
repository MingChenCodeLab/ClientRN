import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Repurchase = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemContainer}>
        <Image
          style={styles.icon}
          source={{ uri: "https://iili.io/JdjjLmv.png" }}
        />
        <Text style={styles.text}>Mua lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Repurchase;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
});
