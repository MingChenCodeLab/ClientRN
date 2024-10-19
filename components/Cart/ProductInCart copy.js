import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, ToastAndroid, Alert } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import useAuth from "../../Services/auth.services";
import ProductItem from "./ProductItem";
import BottomBar from "./BottomBar";

const ProductInCart = ({ dataCart, Cart_id, navigation, onItemSelect }) => {
  const { UpdateCreateCart } = useAuth();
  const [data, setData] = useState(dataCart);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setData(dataCart);
  }, [dataCart]);

  const toggleItemSelection = useCallback(
    (item_id, product_price, quantity) => {
      setSelectedItems((prevSelectedItems) => {
        const isItemSelected = prevSelectedItems.some(
          (item) => item.item_id === item_id
        );
        const newSelectedItems = isItemSelected
          ? prevSelectedItems.filter((item) => item.item_id !== item_id)
          : [...prevSelectedItems, { item_id, product_price, quantity }];

        onItemSelect(
          { item_id, product_price, quantity },
          !isItemSelected
        );
        return newSelectedItems;
      });
    },
    [onItemSelect]
  );

  const handleQuantityChange = useCallback(
    (quantity, product_detail_id, item_id, isIncrease) => {
      const newQuantity = isIncrease ? quantity + 1 : quantity - 1;
      if (newQuantity <= 0) {
        deleteCart(product_detail_id, item_id);
      } else {
        UpdateCreateCart(Cart_id, product_detail_id, newQuantity).then(
          (result) => {
            if (result.status === 1) {
              toggleItemSelection(item_id, product_price, newQuantity);
            }
            ToastAndroid.show(result.message, ToastAndroid.SHORT);
          }
        );
      }
    },
    [Cart_id, UpdateCreateCart, toggleItemSelection]
  );

  const deleteCart = useCallback(
    (product_detail_id, item_id) => {
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn tiếp tục không?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancelled"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              UpdateCreateCart(Cart_id, product_detail_id, 0).then((result) => {
                if (result.status === 1) {
                  toggleItemSelection(item_id, 0, 0); // Remove item from selection
                }
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
              });
            },
          },
        ],
        { cancelable: false }
      );
    },
    [Cart_id, UpdateCreateCart, toggleItemSelection]
  );

  const renderProductItem = ({ item, index }) => (
    <Swipeable
      renderRightActions={() => (
        <Animated.View
          entering={SlideInRight}
          exiting={SlideOutRight}
          style={styles.hiddenItemContainer}
        >
          <View style={styles.deleteButton}>
            <Text
              style={styles.deleteButtonText}
              onPress={() => deleteCart(item.ProductDetail.detail_id, item.item_id)}
            >
              Xoá
            </Text>
          </View>
        </Animated.View>
      )}
    >
      <ProductItem
        key={index}
        item={item}
        toggleItemSelection={toggleItemSelection}
        handleQuantityChange={handleQuantityChange}
      />
    </Swipeable>
  );

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {data.map(renderProductItem)}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hiddenItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "red",
  },
  deleteButton: {
    paddingHorizontal: 20,
    justifyContent: "center",
    height: "100%",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductInCart;
