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
import { useModal } from "./ModalContext"; // Đảm bảo đường dẫn đúng
import useAuth from "../../../Services/auth.services";
import { AuthContext } from "../../../Services/AuthContext";

const COLORS = {
  black: "#3C3C3C",
  gray: "#F5F5F5",
  white: "#FFFFFF",
  red: "#EE4B2B",
};
const { width } = Dimensions.get("window");

export default function ModalBottom() {
  const { state, closeModal } = useModal(); // Sử dụng useModal từ ModalContext
  const { UpdateCreateCart } = useAuth();
  const { state: authState } = useContext(AuthContext);
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    product_detail_id: null,
    quantity: quantity,
  });

  const addCart = async () => {
    if (formData.product_detail_id === null) {
      alert("Vui lòng chọn size");
      return;
    }
    const data = await UpdateCreateCart(
      authState.userInfo.cart_id,
      formData.product_detail_id,
      quantity
    );
    if (data) {
      alert("Thêm vào giỏ hàng thành công");
      // Xử lý sau khi thêm vào giỏ hàng thành công
    }
  };

  const handleSizeSelection = (detail, size) => {
    setSelectedSize(size);
    setFormData({ ...formData, product_detail_id: detail });
  };

  if (!state.isVisible) return null;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={state.isVisible}
        onRequestClose={closeModal}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={closeModal}
        />
        <SafeAreaView style={styles.safeArea}>
          <Pressable style={styles.innerContainer}>
            <View style={styles.modalContent}>
              {state.modalType === 'product' && state.modalData && (
                <>
                  <Text style={styles.h4}>Chọn Size:</Text>
                  <View style={styles.sizeContainer}>
                    {state.modalData.ProductDetails.map((detail, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.checkboxContainer,
                          selectedSize === detail.size && styles.selectedCheckbox,
                        ]}
                        onPress={() =>
                          handleSizeSelection(
                            detail.detail_id,
                            detail.size,
                            detail.color
                          )
                        }
                      >
                        <Text
                          style={[
                            selectedSize === detail.size && styles.checkboxText,
                          ]}
                        >
                          {detail.size}
                        </Text>
                        <Text
                          style={[
                            selectedSize === detail.size && styles.checkboxText,
                          ]}
                        >
                          {detail.color}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  
                  <Text style={styles.h4}>Qty</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                      style={styles.quantityButton}
                    >
                      <Feather name="minus" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text style={styles.body3}>{quantity}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setQuantity((prevQuantity) => prevQuantity + 1);
                      }}
                      style={styles.quantityButton}
                    >
                      <Feather name="plus" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={addCart}
                  >
                    <Feather name="shopping-bag" size={24} color={COLORS.white} />
                    <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                  </TouchableOpacity>
                </>
              )}
              {/* Thêm các trường hợp khác nếu cần */}
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  safeArea: {
    flex: 1,
  },
  innerContainer: {
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
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  sizeContainer: {
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
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  quantityButton: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  body3: {
    fontSize: 16,
  },
  button: {
    marginTop: 12,
    height: 60,
    width: width - 44,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
  buttonText: {
    color: COLORS.white,
    marginLeft: 12,
  },
});
