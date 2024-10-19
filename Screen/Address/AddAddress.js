import React, { useState, useRef, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Switch,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AddressConfirm from "./addressConfirm";
import useAuth from "../../Services/auth.services";

const AddAddress = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState({});
  const [region, setRegion] = useState({
    latitude: 21.0285, // Default to Hanoi
    longitude: 105.8542,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showMap, setShowMap] = useState(false);
  const { CreateAddress } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Thêm địa chỉ",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("BottomTabNavigation")}
          style={styles.iconContainer}
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
  }, [navigation]);

  const googlePlacesRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const [name, setName] = useState("");
  const [sodienthoai, setSoDienThoai] = useState("");
  const [diaChiCuThe, setDiaChiCuThe] = useState("");

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const filterAddress = (address) => {
    // Loại bỏ các ký tự đặc biệt và số nhà
    return address.replace(/[^\w\s]/gi, '').replace(/\b\d+\b/, '');
  };

  const handlePhoneInputChange = (text) => {
    setSoDienThoai(text);
  };

  const handleDiaChiCuTheChange = async (text) => {
    setDiaChiCuThe(text);

    if (address.province && address.district && address.wards && text) {
      const filteredAddress = filterAddress(text);
      const fullAddress = `${filteredAddress}, ${address.wards}, ${address.district}, ${address.province}`;
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
          ToastAndroid.show(
            "Không tìm thấy địa chỉ chính xác, hiển thị vị trí gần đúng",
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show(
            "Không tìm thấy vị trí trên bản đồ với địa chỉ đã nhập",
            ToastAndroid.SHORT
          );
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
    if (!address.province || !address.district || !address.wards || !diaChiCuThe) {
      Alert.alert("Lỗi", "Vui lòng chọn đầy đủ địa chỉ và nhập địa chỉ cụ thể");
      return;
    }

    const updatedFormAddress = {
      recipient_name: name,
      street_address: `${diaChiCuThe}, ${address.wards}, ${address.district}`,
      city: address.province,
      state: address.wards,
      postal_code: "chưa cập nhật",
      default_address: isEnabled,
      recipient_numberphone: sodienthoai,
    };

    const result = await CreateAddress(updatedFormAddress);
    if (result.success) {
      ToastAndroid.show("Cập nhật địa chỉ thành công", ToastAndroid.SHORT);
      navigation.goBack();
    } else {
      ToastAndroid.show("Cập nhật địa chỉ thất bại", ToastAndroid.SHORT);
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
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ cụ thể"
            value={diaChiCuThe}
            onChangeText={handleDiaChiCuTheChange}
            ref={addressRef}
          />
          <View style={styles.addressContainer}>
            <AddressConfirm sendDataAddress={handleDataAndress} />
          </View>

          {showMap && (
            <MapView style={styles.map} region={region}>
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            </MapView>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.containerSwitch}>
          <Text style={styles.switchLabel}>Đặt làm địa chỉ mặc định</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsEnabled((previousState) => !previousState)}
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
    backgroundColor: "#F5F5F5",
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
    backgroundColor: "#F5F5F5",
  },
  confirmButton: {
    height: 50,
    backgroundColor: "#007AFF",
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

export default AddAddress;
