import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useLayoutEffect ,useContext, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons } from '@expo/vector-icons';
const WIDTH = Dimensions.get("window").width;
const Category = ({ route }) => {
  const { categoryData, categoryName } = route.params;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: categoryName,
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
  const handlePressDetailProduct = (item) => {
    console.log("item", item);
    navigation.navigate("ProductDetail", { product: item });
  };
  const renderItem = useMemo(
    () => ({ item }) => {
      let tensp = item.name.length > 10 ? item.name.slice(0, 25) + "..." : item.name;
      let totalQuantitySold = item.total_quantity_sold;
  
      if (totalQuantitySold === null) {
        totalQuantitySold = 0;
      } else {
        totalQuantitySold = parseInt(totalQuantitySold);
      }
  
      return (
        <TouchableOpacity
          onPress={() => handlePressDetailProduct(item)}
          style={styles.shoeItem}
        >
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Image source={{ uri: item.thumbnail }} style={styles.shoeImage} />
          <Text style={styles.bestSeller}>BÁN CHẠY</Text>
          <View style={styles.itemsolid}>
            <Text style={styles.daban}>Đã bán</Text>
            <Text style={styles.item_solid_quantity}>{totalQuantitySold}</Text>
          </View>
          <Text style={styles.shoeName}>{tensp}</Text>
          <Text style={styles.shoePrice}>
            $ {parseFloat(item.price).toLocaleString("vi-VN")}
          </Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    },
    [handlePressDetailProduct, styles] // Mảng phụ thuộc
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}

      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#4A7AFF",
    fontSize: 16,
  },
  shoeItem: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 4,
  },
  favoriteButton: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 1,
  },
  shoeImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: 8,
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
    marginBottom: 4,
  },
  shoePrice: {
    fontSize: 14,
    color: "#4A7AFF",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#4A7AFF",
    borderBottomEndRadius: 12,
    borderTopStartRadius: 12,
    padding: 8,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default Category;
