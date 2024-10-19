import React, { useState, useRef, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Switch,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AddressConfirm from "./addressConfirm";
import useAuth from "../../Services/auth.services";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

const EditAddress = ({ navigation, route }) => {
  const [address, setAddress] = useState("");
  const { item } = route.params;
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const googlePlacesRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const detailAddressRef = useRef();
  const { updateAddress } = useAuth();

  const [name, setName] = useState(item.recipient_name || "");
  const [sodienthoai, setSoDienThoai] = useState(
    item.recipient_numberphone || ""
  );
  const [isEnabled, setIsEnabled] = useState(item.default || false);
  const [diaChiCuThe, setDiaChiCuThe] = useState(item.street_address || "");
  const [region, setRegion] = useState({
    latitude: 21.0285, // Default to Hanoi
    longitude: 105.8542,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showMap, setShowMap] = useState(false);
  const [toastShown, setToastShown] = useState({
    success: false,
    failure: false,
    locationNotFound: false,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Sửa địa chỉ",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 5, marginRight: 10 }}
        >
          <FontAwesome
            name="arrow-left"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{9,}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneInputChange = (text) => {
    setSoDienThoai(text);
  };

  const handleDiaChiCuTheChange = async (text) => {
    setDiaChiCuThe(text);

    if (address.province && address.district && address.wards && text) {
      const fullAddress = `${text}, ${address.wards}, ${address.district}, ${address.province}`;
      const coords = await getCoordinatesFromAddress(fullAddress);

      if (!coords) {
        const fallbackAddress = `${address.wards}, ${address.district}, ${address.province}`;
        const fallbackCoords = await getCoordinatesFromAddress(fallbackAddress);
        if (fallbackCoords) {
          setRegion({
            latitude: fallbackCoords.latitude,
            longitude: fallbackCoords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setShowMap(true);
          if (!toastShown.locationNotFound) {
            ToastAndroid.show(
              "Không tìm thấy địa chỉ chính xác, hiển thị vị trí gần đúng",
              ToastAndroid.SHORT
            );
            setToastShown((prev) => ({ ...prev, locationNotFound: true }));
          }
        } else {
          if (!toastShown.locationNotFound) {
            ToastAndroid.show(
              "Không tìm thấy vị trí trên bản đồ với địa chỉ đã nhập",
              ToastAndroid.SHORT
            );
            setToastShown((prev) => ({ ...prev, locationNotFound: true }));
          }
          setShowMap(false);
        }
      } else {
        setRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setShowMap(true);
      }
    } else {
      setShowMap(false);
    }
  };

  const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
    return null;
  };

  const xacNhanDiaChi = async () => {
    if (!validatePhoneNumber(sodienthoai)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ");
      return;
    }
    if (name == "") {
      Alert.alert("Lỗi", "Vui lòng nhập họ và tên");
      return;
    }
    let updatedFormAddress = {};
    if (address == "") {
      updatedFormAddress = {
        address_id: item.id,
        recipient_name: name,
        street_address: diaChiCuThe || item.street_address,
        city: item.city,
        state: item.state,
        postal_code: item.postal_code,
        default_address: isEnabled,
        recipient_numberphone: sodienthoai,
      };
    } else {
      updatedFormAddress = {
        address_id: item.id,
        recipient_name: name,
        street_address: diaChiCuThe || address.district,
        city: address.province,
        state: address.wards,
        postal_code: "chưa cập nhật",
        default_address: isEnabled,
        recipient_numberphone: sodienthoai,
      };
    }
    const result = await updateAddress(updatedFormAddress);
    if (result.success) {
      if (!toastShown.success) {
        ToastAndroid.show("Cập nhật địa chỉ thành công", ToastAndroid.SHORT);
        setToastShown((prev) => ({ ...prev, success: true }));
      }
      navigation.goBack();
    } else {
      if (!toastShown.failure) {
        ToastAndroid.show("Cập nhật địa chỉ thất bại", ToastAndroid.SHORT);
        setToastShown((prev) => ({ ...prev, failure: true }));
      }
    }
  };

  const handleDataAndress = (data) => {
    setAddress(data);
    if (diaChiCuThe) {
      handleDiaChiCuTheChange(diaChiCuThe);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={name}
            onChangeText={(text) => setName(text)}
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current.focus()}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={sodienthoai}
            onChangeText={handlePhoneInputChange}
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={() => googlePlacesRef.current.focus()}
            ref={phoneRef}
          />
          <View style={styles.currentAddressContainer}>
            <Text style={styles.currentAddressTitle}>
              Địa chỉ hiện tại của bạn
            </Text>
            <Text style={styles.currentAddressText}>
              {item.city}
            </Text>
            <Text style={styles.currentAddressText}>
              {item.street_address}
            </Text>
            <Text style={styles.currentAddressText}>
              {item.state}
            </Text>
          </View>
          <View style={styles.addressContainer}>
            <View style={styles.AddressConfirm}>
              <Image
                source={{ uri: "https://iili.io/JzRD1wB.png" }}
                style={styles.locationicon}
              />
              <AddressConfirm sendDataAddress={handleDataAndress} />
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ cụ thể (Số nhà, tên đường...)"
            value={diaChiCuThe}
            onChangeText={handleDiaChiCuTheChange}
            ref={detailAddressRef}
          />
        </View>

        {showMap && (
          <MapView style={styles.map} region={region}>
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          </MapView>
        )}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.containerSwitch}>
          <Text style={styles.switchLabel}>Đặt làm địa chỉ mặc định</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switchContainer}
          />
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={xacNhanDiaChi}>
          <Text style={styles.confirmButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    marginVertical: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  currentAddressContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 20,
  },
  currentAddressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  currentAddressText: {
    fontSize: 15,
    color: "rgba(255, 13, 0, 0.8)",
  },
  addressContainer: {
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  map: {
    height: 200,
    borderRadius: 8,
    marginVertical: 20,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#E0E0E0",
  },
  confirmButton: {
    height: 50,
    backgroundColor: "#DB3022",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  locationicon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 10,
  },
  AddressConfirm: {
    flex: 1,
  },
  containerSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333333",
  },
  switchContainer: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  iconContainer: {
    padding: 10,
  },
});

export default EditAddress;
