import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;

const BottomBar = ({ totalAmount, isAnyProductSelected, selectedItems, handleNavigateToConfirmationOrder }) => {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.totalTextContainer}>
        <Text style={styles.totalText}>Tổng tiền:</Text>
        <Text style={styles.totalAmount}>
          {totalAmount.toFixed(2)} <Text style={styles.currency}>VND</Text>
        </Text>
        <Text style={styles.selectedItemsCount}>
          Đã chọn: {isAnyProductSelected ? selectedItems.length : 0} sản phẩm
        </Text>
      </View>
      <View style={styles.paymentButtonContainer}>
        <TouchableOpacity
          style={[styles.paymentButton, { backgroundColor: isAnyProductSelected ? "#3399ff" : "#ccc" }]}
          onPress={isAnyProductSelected ? handleNavigateToConfirmationOrder : null}
        >
          <Text style={styles.paymentButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  totalTextContainer: {
    marginBottom: 10,
  },
  totalText: {
    fontSize: 16,
    color: "#333",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  currency: {
    fontSize: 16,
  },
  selectedItemsCount: {
    fontWeight: "bold",
    color: "red",
  },
  paymentButtonContainer: {
    alignItems: "center",
  },
  paymentButton: {
    width: WIDTH - 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  paymentButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default BottomBar;
