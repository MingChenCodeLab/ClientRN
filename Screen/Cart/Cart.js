import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import ProductItem from "../../components/Cart/ProductItem";
import useAuth from "../../Services/auth.services";
import { Checkbox } from "react-native-paper";
import authHeader from "../../Services/HeaderAuth/auth.header";
import CartServices from "../../Services/CartServices";
import { Ionicons } from "@expo/vector-icons";
import CustomStatusBar from "../../components/StatusBar/CustomStatusBar";
import ConfirmationOrder from "../ConfirmationOrder/ConfirmationOrder";
import { useFocusEffect } from '@react-navigation/native';

export default function Cart({ navigation }) {
  const limit = 10;
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isSelectingAll, setIsSelectingAll] = useState(false);
  const [total, setTotal] = useState(0);
  const isStop = useRef(false);
  const { GetCart } = useAuth();

  const callApi = async ({ skip, limit }) => {
    try {
      setError(null);

      const result = await GetCart(skip, limit);
      if (!result || !result.carts) {
        throw new Error("Invalid response format");
      }

      if (result.carts.length < limit) {
        isStop.current = true;
      }

      return result.carts;
    } catch (error) {
      console.error("Failed to load data:", error);
      setError(error.message);
      return [];
    }
  };

  const flattenData = (cartData) => {
    return cartData.flatMap((cart) =>
      cart.products.map((product) => ({
        ...product,
        cartId: cart.cartId,
      }))
    );
  };
  
  const fetchData = useCallback(async (type) => {
    if (type === "refresh") {
      setIsRefreshing(true);
      isStop.current = false;
    } else {
      setIsLoading(true);
    }
  
    const skip = type === "loadMore" ? data.length : 0;
    const newData = await callApi({ skip, limit });
  
    if (type === "refresh") {
      setData(flattenData(newData));
      setSelectedItems([]);
      setIsRefreshing(false);
    } else if (type === "loadMore") {
      setData((prevData) => [...prevData, ...flattenData(newData)]);
    }
  
    setIsLoading(false);
  }, [data.length]);
  
  useFocusEffect(
    useCallback(() => {
      fetchData("refresh");
    }, [fetchData])
  );

  const handleSelect = useCallback((item) => {
    if (item.stock > 0) {
      setSelectedItems((prevSelected) =>
        prevSelected.includes(item.productDetailId)
          ? prevSelected.filter((id) => id !== item.productDetailId)
          : [...prevSelected, item.productDetailId]
      );
    }
  }, []);
  useEffect(() => {
    const selectedProducts = data.filter(
      (product) =>
        selectedItems.includes(product.productDetailId) && product.stock > 0
    );
  
    const calculatedTotal = selectedProducts.reduce(
      (sum, product) => sum + parseFloat(product.discountedTotal || 0),
      0
    );
  
    setTotal(calculatedTotal);
  }, [data, selectedItems]);
  

  const handleSwipe = useCallback(async (item) => {
    console.log("item", item.itemId);
  
    try {
      const authHeaderToken = await authHeader();
      await CartServices.deleteProductInCart(authHeaderToken, item.itemId);
      setData((prevData) =>
        prevData.filter(
          (product) => product.itemId !== item.itemId
        )
      );
      ToastAndroid.show("Sản phẩm đã được xóa khỏi giỏ hàng", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error.message || "Unknown error");
      Alert.alert("Error", "Có lỗi xảy ra khi xóa sản phẩm, vui lòng thử lại sau.");
    }
  }, []);
  
  const handleSelectAll = useCallback(() => {
    setIsSelectingAll(true);
    setTimeout(() => {
      const allAvailableProductIds = data
        .filter((product) => product.stock > 0)
        .map((product) => product.productDetailId);
      setSelectedItems(
        selectedItems.length === allAvailableProductIds.length
          ? []
          : allAvailableProductIds
      );
      setIsSelectingAll(false);
    }, 1000);
  }, [data, selectedItems]);

  const handleProductInCartChange = async (updatedItem) => {
    try {
      const authHeaderToken = await authHeader();
      await CartServices.updateProductInCart(
        authHeaderToken,
        updatedItem.cartId,
        updatedItem.productDetailId,
        updatedItem.quantity
      );
  
      // Cập nhật dữ liệu sản phẩm với số lượng mới
      setData((prevData) =>
        prevData.map((product) =>
          product.productDetailId === updatedItem.productDetailId
            ? {
                ...product,
                quantity: updatedItem.quantity,
                discountedTotal: (updatedItem.quantity * parseFloat(product.price) * (1 - product.discountPercentage / 100)).toFixed(2)
              }
            : product
        )
      );
  
      // Tính toán lại tổng tiền
      const selectedProducts = data.filter(
        (product) =>
          selectedItems.includes(product.productDetailId) && product.stock > 0
      );
      const calculatedTotal = selectedProducts.reduce(
        (sum, product) => sum + parseFloat(product.discountedTotal.replace(/\./g, "").replace(/\,/g, '.')), // Đổi ngược về số thực để tính tổng
        0
      ).toLocaleString("vi-VN");
      setTotal(calculatedTotal);
    } catch (error) {
      console.error(
        "An error occurred while updating product in cart:",
        error.message || "Unknown error"
      );
    }
  };
  
  

  const handleCheckout = () => {
    
    const selectedProducts = data.filter(product => 
      selectedItems.includes(product.productDetailId)
    );
    console.log("selectedProducts",selectedProducts);
  
    navigation.navigate("ConfirmationOrder", {
      total: total,
      orderData: selectedProducts,
    });
  };

  const renderItem = useCallback(
    ({ item }) => (
      <ProductItem
        item={item}
        onSelect={handleSelect}
        onSwipe={handleSwipe}
        isSelected={selectedItems.includes(item.productDetailId)}
        onProductUpdate={handleProductInCartChange}
      />
    ),
    [selectedItems]
  );

  return (
    <View style={styles.container}>
      <CustomStatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
        paddingTop={true}
        translucent={true}
        text={"Giỏ hàng"}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.cartId}-${item.productDetailId}`}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => fetchData("refresh")}
          />
        }
        onEndReached={() =>
          !isStop.current && !isLoading && fetchData("loadMore")
        }
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isLoading && <ActivityIndicator size="large" color="#0000ff" />
        }
      />
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <View style={styles.footer}>
        <View style={styles.selectAllContainer}>
          <Checkbox
            status={
              selectedItems.length ===
                data.filter((product) => product.stock > 0).length
                ? "checked"
                : "unchecked"
            }
            onPress={handleSelectAll}
            disabled={isSelectingAll}
          />
          <Text>Tất cả</Text>
        </View>
        <Text style={styles.totalText}>
          Tổng: {total.toLocaleString("vi-VN")} VND
        </Text>
        <TouchableOpacity
          style={[
            styles.thanhtoan,
            {
              backgroundColor: selectedItems.length > 0 ? "red" : "gray",
              borderColor: selectedItems.length > 0 ? "darkred" : "darkgray",
            },
          ]}
          onPress={handleCheckout}
          disabled={selectedItems.length === 0}
        >
          <Text style={{ color: "white" }}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="none"
        visible={isSelectingAll}
        onRequestClose={() => { }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
  thanhtoan: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: "auto",
  },
  totalText: {
    fontSize: 12,
    fontWeight: "bold",
    minWidth: 50,
    flexShrink: 1,
    textAlign: "right",
    marginBottom: 10,
    marginLeft: 60,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 40,
  },
  title: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
});
