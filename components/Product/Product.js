import React, { useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Services/AuthContext";
import FavoriteButton from "../Header/FavoriteButton";

export default function Product(props) {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const { dataProd, handlePress } = props;

  const handlePressProduct = () => {
    if (authState.userToken == null) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("ProductDetail", { product: dataProd });
    }
  };

  let tensp =
    dataProd.name.length > 25
      ? dataProd.name.slice(0, 25) + "..."
      : dataProd.name;

  let totalQuantitySold = dataProd.total_quantity_sold || 0;

  return (
    <TouchableOpacity
      onPress={handlePressProduct}
      style={styles.shoeItem}
    >
      <FavoriteButton productId={dataProd.id} style={styles.favoriteButton} />
      <Image source={{ uri: dataProd.thumbnail }} style={styles.shoeImage} />
      <Text style={styles.bestSeller}>BÁN CHẠY</Text>
      <Text style={styles.shoeName}>{tensp}</Text>
      <Text style={styles.shoePrice}>${dataProd.price}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shoeItem: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0", // Thêm đường viền thay vì đổ bóng
  },
  favoriteButton: {
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 1,
  },
  shoeImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  bestSeller: {
    backgroundColor: "#4A7AFF",
    color: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    marginBottom: 4,
  },
  shoeName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // Căn giữa tên sản phẩm
    marginBottom: 4,
  },
  shoePrice: {
    fontSize: 14,
    color: "#4A7AFF",
    marginBottom: 8,
    textAlign: "center", // Căn giữa giá sản phẩm
  },
  addButton: {
    backgroundColor: "#4A7AFF",
    borderRadius: 8,
    padding: 8,
    position: "absolute",
    bottom: 8,
    right: 8,
  },
});
