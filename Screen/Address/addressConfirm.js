import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import axios from "axios";

const AddressConfirm = (props) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWards, setSelectedWards] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const { sendDataAddress } = props;

  useEffect(() => {
    GetProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedWards) {
      sendDataAddress({
        province: selectedProvince,
        district: selectedDistrict,
        wards: selectedWards,
      });
    }
  }, [selectedProvince, selectedDistrict, selectedWards]);

  const GetProvinces = () => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching province data:", error);
      });
  };

  const handleProvinceSelection = (value, name) => {
    setDistricts([]);
    setWards([]);
    setSelectedProvince(name);
    setCurrentStep(1);
    GetDistricts(value);
  };

  const handleDistrictSelection = (value, name) => {
    setWards([]);
    setSelectedDistrict(name);
    setCurrentStep(2);
    GetWards(value);
  };

  const handleWardsSelection = (value, name) => {
    setSelectedWards(name);
    setCurrentStep(3);
  };

  const GetDistricts = (code) => {
    axios
      .get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const GetWards = (code) => {
    axios
      .get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
      .then((response) => {
        setWards(response.data.wards);
      })
      .catch((error) => {
        ToastAndroid.show(
          "Có lỗi lấy phường tại địa chỉ này",
          ToastAndroid.SHORT
        );
      });
  };

  const renderSelectedItems = () => {
    return (
      <View style={styles.selectedItemsContainer}>
        {selectedProvince && (
          <TouchableOpacity
            style={styles.selectedItem}
            onPress={() => {
              setCurrentStep(0);
              setSelectedDistrict("");
              setSelectedWards("");
            }}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.selectedItemText}>{selectedProvince}</Text>
              <Image
                source={{
                  uri: "https://cdn.icon-icons.com/icons2/67/PNG/512/next_13716.png",
                }}
                style={styles.nextIcon}
              />
            </View>
          </TouchableOpacity>
        )}
        {selectedDistrict && (
          <TouchableOpacity
            style={styles.selectedItem}
            onPress={() => {
              setCurrentStep(1);
              setSelectedWards("");
            }}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.selectedItemText}>{selectedDistrict}</Text>
              <Image
                source={{
                  uri: "https://cdn.icon-icons.com/icons2/67/PNG/512/next_13716.png",
                }}
                style={styles.nextIcon}
              />
            </View>
          </TouchableOpacity>
        )}
        {selectedWards && (
          <TouchableOpacity
            style={styles.selectedItem}
            onPress={() => setCurrentStep(2)}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.selectedItemText}>{selectedWards}</Text>
              <Image
                source={{
                  uri: "https://cdn.icon-icons.com/icons2/67/PNG/512/next_13716.png",
                }}
                style={styles.nextIcon}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderSelectableItems = () => {
    switch (currentStep) {
      case 0:
        return (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.selectionHeader}>
              <View style={styles.selectionDot} />
              <Text style={styles.selectionText}>Chọn Tỉnh/Thành phố</Text>
            </View>

            {provinces.map((province) => (
              <TouchableOpacity
                key={province.code}
                style={styles.selectableItem}
                onPress={() =>
                  handleProvinceSelection(province.code, province.name)
                }
              >
                <Text style={styles.selectableItemText}>{province.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      case 1:
        return (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.selectionHeader}>
              <View style={styles.selectionDot} />
              <Text style={styles.selectionText}>Chọn Quận/Huyện</Text>
            </View>

            {districts &&
              districts.map((district) => (
                <TouchableOpacity
                  key={district.code}
                  style={styles.selectableItem}
                  onPress={() =>
                    handleDistrictSelection(district.code, district.name)
                  }
                >
                  <Text style={styles.selectableItemText}>{district.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        );
      case 2:
        return (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.selectionHeader}>
              <View style={styles.selectionDot} />
              <Text style={styles.selectionText}>Chọn Phường/Xã</Text>
            </View>

            {wards &&
              wards.map((ward) => (
                <TouchableOpacity
                  key={ward.code}
                  style={styles.selectableItem}
                  onPress={() => handleWardsSelection(ward.code, ward.name)}
                >
                  <Text style={styles.selectableItemText}>{ward.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderSelectedItems()}
      {renderSelectableItems()}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedItemsContainer: {
    padding: 10,
    backgroundColor: "#f0f4f7",
    borderBottomWidth: 1,
    borderColor: "#d1d8de",
  },
  selectedItem: {
    borderRadius: 8,
    backgroundColor: "#007aff",
    marginVertical: 5,
    padding: 15,
    elevation: 3,
  },
  selectedItemText: {
    fontSize: 18,
    color: "#ffffff",
  },
  selectableItem: {
    padding: 20,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectableItemText: {
    fontSize: 18,
    color: "#333333",
  },
  scrollContainer: {
    padding: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nextIcon: {
    width: 20,
    height: 20,
    tintColor: "#ffffff",
    marginLeft: 10,
  },
  selectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  selectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#34c759",
    marginRight: 10,
  },
  selectionText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#007aff",
  },
});

export default AddressConfirm;
