import React, { useState, useEffect ,useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import CpnProductDetail from "../../components/Product/ProductDetail";

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <CpnProductDetail product={product} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProductDetail;
