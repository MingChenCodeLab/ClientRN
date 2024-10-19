import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import CartServices from "../../Services/CartServices";
import authHeader from "../../Services/HeaderAuth/auth.header";
import { AuthContext } from "../../Services/AuthContext";

const COLORS = {
  black: "#3C3C3C",
  gray: "#F5F5F5",
  white: "#FFFFFF",
  red: "#EE4B2B",
};

const { width } = Dimensions.get("window");

export default function ModalBottomOrder({ closeDrawer, openDrawer, dataprod }) {
  const { authState } = useContext(AuthContext);
  const [selectedDetailId, setSelectedDetailId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    product_detail_id: null,
    quantity: 1,
  });

  const handleSizeSelection = (detailId, size, color) => {
    setSelectedDetailId(detailId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      product_detail_id: detailId,
    }));
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setFormData((prevFormData) => ({
      ...prevFormData,
      quantity: newQuantity,
    }));
  };

  const addCart = async () => {
    if (!formData.product_detail_id) {
      alert("Vui lòng chọn size và màu");
      return;
    }
    try {
      const token = await authHeader();
      console.log("token", token);
      const data = await CartServices.addtocart(token, authState.userInfo.cart_id, formData.product_detail_id, formData.quantity);
      if (data) {
        alert("Thêm vào giỏ hàng thành công");
        closeDrawer();  // Đóng modal sau khi thêm thành công
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Thêm vào giỏ hàng không thành công");
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openDrawer}
        onRequestClose={closeDrawer}
      >
        <SafeAreaView style={styles.safeArea}>
          <Pressable style={styles.pressableArea} onPress={closeDrawer}>
            <View style={styles.modalContent}>
              {/* Phần chọn size */}
              <Text style={styles.h4}>Chọn Size:</Text>
              <View style={styles.sizeSelector}>
                {dataprod.ProductDetails.map((detail, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.checkboxContainer,
                      selectedDetailId === detail.detail_id && styles.selectedCheckbox,
                    ]}
                    onPress={() => handleSizeSelection(detail.detail_id, detail.size, detail.color)}
                  >
                    <Text style={[
                      selectedDetailId === detail.detail_id && styles.checkboxText,
                    ]}>
                      {detail.size} - {detail.color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Phần chọn số lượng */}
              <Text style={styles.h4}>Qty</Text>
              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  onPress={() => {
                    if (quantity > 1) {
                      handleQuantityChange(quantity - 1);
                    }
                  }}
                  style={styles.quantityButton}
                >
                  <Feather name="minus" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.body3}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Feather name="plus" size={24} color={COLORS.black} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={addCart}
              >
                <Feather name="send" size={24} color={COLORS.white} />
                <Text style={styles.buttonText}>Thêm vào giỏ ngay</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  pressableArea: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
    paddingHorizontal: 22,
    paddingVertical: 22,
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  h4: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sizeSelector: {
    flexDirection: "row",
    marginVertical: 18,
  },
  checkboxContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12,
  },
  selectedCheckbox: {
    backgroundColor: COLORS.black,
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  quantitySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
    backgroundColor: COLORS.gray,
    height: 48,
    width: 134,
    borderRadius: 24,
    paddingHorizontal: 12,
  },
  quantityButton: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 12,
    height: 60,
    width: width - 44,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: COLORS.white,
    marginLeft: 12,
  },
});
