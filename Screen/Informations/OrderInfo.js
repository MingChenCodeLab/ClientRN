import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../Services/auth.services";
import TokenStorage from "../../Services/authToken/TokenStorage";
import { useFocusEffect } from '@react-navigation/native';
// Icons
import PENDING from "../../images/1.png";
import PROCESSING from "../../images/2.png";
import SHIPPING from "../../images/3.png";
import SHIPPED from "../../images/4.png";
import DELIVERED from "../../images/5.png";
import CANCELED from "../../images/6.png";

// Function to get icon based on status ID
const getIconByStatusId = (statusId) => {
  switch (statusId) {
    case 1: return PROCESSING;
    case 2: return PENDING;
    case 3: return SHIPPING;
    case 4: return SHIPPED;
    case 5: return DELIVERED;
    case 6: return CANCELED;
    default: return null;
  }
};

const OrderInfo = () => {
  const { totalOrderStatus } = useAuth();
  const [totalOrderStatusItem, setTotalOrderStatusItem] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const tokenLoggedIn = await TokenStorage.getToken();
          if (tokenLoggedIn === null) {
            console.log("User is not logged in");
           
          } else {
            // Fetch order statuses if logged in
            const res = await totalOrderStatus();
            setTotalOrderStatusItem(res.data);
          }
        } catch (error) {
          console.error("Failed to fetch token or data", error);
        }
      };

      fetchData();
    }, [navigation])
  );

  const handleNavigation = (key) => {
    navigation.navigate("MainTabPurchase", { initialTabIndex: key });
  };

  return (
    <View style={styles.iconsContainer}>
      <View style={styles.info}>
        <Text style={styles.label}>Đơn hàng</Text>
        <TouchableOpacity onPress={() => navigation.navigate("MainTabPurchase")}>
          <Text style={styles.viewAllOrders}>Xem tất cả đơn hàng </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Containerinfo}>
        {totalOrderStatusItem.length > 0 ? (
          totalOrderStatusItem.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconItem}
              onPress={() => handleNavigation(item.status_id - 1)}
            >
              <Image
                style={styles.iconImage}
                source={getIconByStatusId(item.status_id)}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.total_orders}</Text>
              </View>
              <Text style={styles.iconText}>{item.status_name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noOrdersText}>No orders found</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Containerinfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 80,
  },
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  iconItem: {
    alignItems: "center",
    marginBottom: 20,
    width: "15%",
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  iconText: {
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllOrders: {
    fontSize: 14,
    color: "rgba(166, 179, 185, 0.8)",
    marginHorizontal: 50,
    marginLeft: 70,
  },
  info: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  badge: {
    position: "absolute",
    right: 7,
    top: -5,
    backgroundColor: "red",
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
  },
  noOrdersText: {
    fontSize: 16,
    color: "rgba(166, 179, 185, 0.8)",
    textAlign: "center",
    marginTop: 20,
  },
});

export default OrderInfo;
