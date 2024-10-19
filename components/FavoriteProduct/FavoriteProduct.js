import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartShopping, faEllipsis } from "@fortawesome/free-solid-svg-icons";

export default function FavoriteProduct(props) {
  const { dataProd, handlePress } = props;

  const fun_handlePress = () => {
    if (handlePress) {
      handlePress(dataProd);
    }
  };

  let tensp =
    dataProd.name.length > 25
      ? dataProd.name.slice(0, 25) + "..."
      : dataProd.name;

  return (
    <TouchableOpacity onPress={fun_handlePress} style={styles.container}>
      <View style={styles.shadow}>
        <Image source={{ uri: dataProd.thumbnail }} style={styles.img} />
        <Text style={styles.tensp}>{tensp}</Text>
        <View style={styles.itemContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.currencySymbol}>đ</Text>
            <Text style={styles.price}>
              {parseFloat(dataProd.price).toLocaleString("vi-VN")}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => alert("Thêm vào giỏ hàng")}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => alert("Tùy chọn thêm")}
        >
          <FontAwesomeIcon
            icon={faEllipsis}
            size={25}
            color="#B1B1B1"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flex: 1,
    overflow: "hidden",
    margin: 10,
  },
  shadow: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 5,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: Dimensions.get("window").width / 2,
    resizeMode: "cover",
  },
  tensp: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
    color: "#333333",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    color: "#F60000",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
  price: {
    color: "#F60000",
    fontWeight: "bold",
    fontSize: 16,
  },
  addToCartButton: {
    backgroundColor: "#F60000",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
