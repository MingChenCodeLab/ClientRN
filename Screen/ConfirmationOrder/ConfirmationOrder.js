import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../Services/auth.services";

const ConfirmationOrder = (props) => {
  const { getDefaultAddress, Orders } = useAuth();
  const navigation = useNavigation();

  const { orderData } = props.route.params;

  // Tính tổng tiền hàng dựa trên các sản phẩm trong orderData
  const calculateTotalItemsPrice = () => {
    return orderData.reduce(
      (total, product) => total + parseFloat(product.discountedTotal),
      0
    );
  };

  // Tính tổng số tiền cần thanh toán (bao gồm cả phí vận chuyển)
  const calculateTotalPayment = () => {
    return calculateTotalItemsPrice() + formData.freightCost;
  };

  const [formData, setFormData] = useState({
    cartItems: orderData.map((product) => product.itemId),
    cartId: orderData[0].cartId,
    totalPrice: calculateTotalItemsPrice(), // Tính tổng tiền hàng
    shippingAddressId: "",
    paymentMethodId: 1,
    freightCost: 10000,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedOption, setSelectedOption] = useState("cash");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [notificationKey, setNotificationKey] = useState(0);

  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Voucher", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  useEffect(() => {
    const onFocus = async () => {
      await fetchAddresses();
    };

    const unsubscribeFocus = navigation.addListener("focus", onFocus);
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const fetchAddresses = async () => {
    try {
      const data = await getDefaultAddress();
      if (data.status === -1) {
        navigation.navigate("Address");
        ToastAndroid.show(
          "Bạn chưa có địa chỉ hoặc chưa chọn mặc định",
          ToastAndroid.SHORT
        );
      }
      if (data.success === true) {
        setAddresses(data.data);
        setFormData({ ...formData, shippingAddressId: data.data[0]?.id });
      } else {
        console.log("error fetching address", data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handlePlaceOrder = async () => {
    try {
      let paymentmethod = 0;
      formData.totalPrice = calculateTotalPayment();

      if (selectedOption === "card") {
        paymentmethod = 2;
        navigation.navigate("VerifyVnPayPayMent", {
          cartItems: formData.cartItems,
          cartId: formData.cartId,
          totalPrice: formData.totalPrice,
          shippingAddressId: formData.shippingAddressId,
          paymentMethodId: paymentmethod,
          freightCost: formData.freightCost,
        });
      } else if (selectedOption === "cash") {
        console.log("formData", formData);
        const orderResponse = await Orders(formData);


        if (orderResponse) {
          ToastAndroid.show("Đặt hàng thành công", ToastAndroid.SHORT);
          setOrderSuccess(true);
          setNotificationKey((prevKey) => prevKey + 1);
          navigation.navigate("VerifyCOD");
        } else {
          setOrderSuccess(false);
          ToastAndroid.show("Đặt hàng thất bại", ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View
              key={index}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Địa chỉ nhận hàng
        </Text>

        <Pressable>
          {addresses?.map((item, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingBottom: 17,
                marginVertical: 7,
                borderRadius: 6,
              }}
              key={index}
              onPress={() => {
                navigation.navigate("Address");
              }}
            >
              <View style={{ marginLeft: 6 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Entypo name="location-pin" size={24} color="red" />
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    {item?.recipient_name}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    | (+84) {item?.recipient_numberphone}
                  </Text>
                </View>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item?.street_address}, {item?.city}
                </Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item?.state}
                </Text>

                <Text style={{ fontSize: 15, color: "#181818" }}>
                  pin code : {item?.postal_code}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 7,
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}
                    onPress={() => {
                      navigation.navigate("EditAddress", { item });
                    }}
                  >
                    <Text>Edit</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: item?.default
                        ? "rgba(255, 124, 49, 0.8)"
                        : "#D0D0D0",
                      backgroundColor: item?.default
                        ? "rgba(255, 124, 49, 0.8)"
                        : "#F5F5F5",
                    }}
                    disabled={item?.default}
                  >
                    {item?.default ? (
                      <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                        Mặc định
                      </Text>
                    ) : (
                      <Text style={{}}>Chọn mặc định </Text>
                    )}
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Voucher</Text>

        <Pressable
          onPress={() => {
            setCurrentStep(2);
          }}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text>Tiếp tục</Text>
        </Pressable>
      </View>

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Chọn phương thức thanh toán
          </Text>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOption("cash");
                  setFormData({ ...formData, paymentMethodId: 1 });
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>Thanh toán khi nhận hàng</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  Alert.alert("UPI/Debit card", "Pay Online", [
                    {
                      text: "Cancel",
                      onPress: () => {
                        setSelectedOption("cash");
                        setFormData({ ...formData, paymentMethodId: 1 });
                      },
                    },
                    {
                      text: "OK",
                      onPress: async () => {
                        setSelectedOption("card");
                        setFormData({ ...formData, paymentMethodId: 2 });
                      },
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>UPI / Credit or debit card</Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Tiếp tục</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 &&
        (selectedOption === "cash" || selectedOption === "card") && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Đặt hàng ngay</Text>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 3,
                }}
              >
                <Text style={{ fontSize: 15, color: "gray" }}>
                  Tổng tiền hàng
                </Text>

                <Text style={{ color: "gray", fontSize: 16 }}>
                  {calculateTotalItemsPrice().toLocaleString("vi-VN")}đ
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 3,
                }}
              >
                <Text style={{ fontSize: 15, color: "gray" }}>
                  Phí vận chuyển
                </Text>

                <Text style={{ color: "gray", fontSize: 16 }}>
                  {formData.freightCost.toLocaleString("vi-VN")}đ
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 3,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Tổng Thanh Toán
                </Text>

                <Text
                  style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
                >
                  {calculateTotalPayment().toLocaleString("vi-VN")}đ
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, color: "gray" }}>
                Kiểu thanh toán
              </Text>

              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
                {selectedOption === "cash"
                  ? "Thanh toán khi nhận hàng"
                  : "UPI/Debit card"}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handlePlaceOrder}
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                position: "relative",
                top: -5,
              }}
            >
              <Text>Xác nhận đặt hàng</Text>
            </TouchableOpacity>
          </View>
        )}
    </ScrollView>
  );
};

export default ConfirmationOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
