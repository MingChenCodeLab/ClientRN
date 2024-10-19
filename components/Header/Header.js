import React, { useState, useEffect ,useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faQrcode,
  faShoppingCart,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Ionicons } from '@expo/vector-icons';
import CartBadge from "../Cart/CartBadge";

const { width } = Dimensions.get("window");
import { AuthContext } from "../../Services/AuthContext";
const Header = (props) => {
  const { navigation } = props;

  const handlePress = () => {
    navigation.navigate("Cart");
  };
  const openqr = () => {
    navigation.navigate("Qrcode");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.icon} onPress={openqr}>
          <FontAwesomeIcon icon={faQrcode} size={24} style={styles.iconitem} />
        </TouchableOpacity>
        <TouchableWithoutFeedback>
          <TouchableOpacity style={styles.center}>
            <View style={styles.inputWrapper}>
              <TouchableOpacity
                style={styles.iconsearch}
                onPress={() => navigation.navigate("Search")}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  size={18}
                  style={styles.searchIcon}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Tìm kiếm..."
                placeholderTextColor="#999"
                onPressIn={() => navigation.navigate("Search")}
              />
            </View>
          </TouchableOpacity>
        </TouchableWithoutFeedback>
        <View style={styles.right}>
          {/* <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <View style={styles.count_notify}>
              <Text style={styles.count_notify_total}>40</Text>
            </View>

            <FontAwesomeIcon
              icon={faBell}
              size={24}
              style={styles.iconitem}
              color="#363636"
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              handlePress();
            }}
          >
            <CartBadge />

            
            <Ionicons name="basket-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    backgroundColor: "transparent",
    width: width,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: "row",
    height: 60,
  },
  center: {
    flex: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f9",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    
    borderColor: "rgba(0, 199, 218, 0.8)",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#333", // Màu chữ
  },
  right: {
    flex: 1,
    flexDirection: "row",

    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: "center",
    color: "white",
  },
  iconitem: {
    width: 30,
    height: 30,

    color: "black",
  },
  iconitemcart: {
    width: 30,
    height: 30,
    alignSelf: "center",
    color: "black",
    position: "relative",
    top: 1,
  },
  count_cart: {
    position: "absolute",
    borderRadius: 200,
    zIndex: 999,
    top: -6,
    right: -8,
    backgroundColor: "red",
    minWidth: 20,
   alignItems: "center",
    height: 21,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: 'center',
  },
  count_notify: {
    position: "absolute",
    borderRadius: 200,
    zIndex: 999,
    top: -13,
    right: -0,
    backgroundColor: "red",
    width: "auto",
    padding: 2,

    height: 21,
    borderWidth: 1,
    borderColor: "#fff",
  },
  count_cart_total: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    width:"auto",
    
  },
  count_notify_total: { color: "#fff", fontSize: 10, fontWeight: "bold" },
};

export default Header;
