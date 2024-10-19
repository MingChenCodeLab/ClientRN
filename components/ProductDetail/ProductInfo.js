import React, { useEffect, useState, useCallback, memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Star from "react-native-star-view";
import productServices from "../../Services/Product";
import FavoriteButton from "../Header/FavoriteButton";

const ProductInfo = (props) => {
  const { name, price, id } = props;
  const [star, setStar] = useState(0);
  const [daban, setDaban] = useState(0);

  const fetchProductData = useCallback(async () => {
    try {
      const ratingData = await productServices.GetRatingProduct(id);
      const soldData = await productServices.GetSoldCount(id);

      if (ratingData) {
        setStar(parseFloat(ratingData.averageRating) || 0);
      }

      if (soldData) {
        setDaban(parseInt(soldData.total_quantity_sold, 10) || 0);
      }
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{name || "No Name Available"}</Text>
      <Text style={styles.productPrice}>
        {parseFloat(price).toLocaleString("vi-VN")}
        <Text style={styles.currency}> đ</Text>
      </Text>
      <View style={styles.detailsContainer}>
        <View style={styles.ratingContainer}>
          <Star score={star} style={styles.star} />
          <Text style={styles.ratingText}>{star.toFixed(1)}</Text>
        </View>
        <View style={styles.soldContainer}>
          <Text style={styles.soldLabel}>Đã bán:</Text>
          <Text style={styles.soldCount}>{daban}</Text>
        </View>
        <FavoriteButton productId={id} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "500",
    color: "#FF0000",
    marginBottom: 12,
  },
  currency: {
    fontSize: 18,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F7F7F7",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    width: 100,
    height: 20,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 8,
  },
  soldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  soldLabel: {
    fontSize: 16,
    fontWeight: "400",
    marginRight: 8,
  },
  soldCount: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ProductInfo;
