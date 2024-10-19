import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native';
import ProductInfo from '../ProductDetail/ProductInfo';
import ProductImages from '../ProductDetail/ProductImages';
import productServices from '../../Services/Product';
import BackButton from '../Header/BackButton';
import DescriptionToggle from '../ProductDetail/DescriptionToggle';
import ModalBottom from "../../Screen/Modal/modal.product.detail";
import ModalBottomOrder from "../../Screen/Modal/modale/modal.product.order";
const CpnProductDetail = ({ product, navigation }) => {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleOrder, setisModalVisibleOrder] = useState(false);

  const fetchData = async () => {
    try {
      const res = await productServices.getProductbyid(product.id);
      setData(res);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [product.id]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const BackButton1 = () => {
    navigation.goBack();
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddToCart = () => {
    console.log("Product added to cart");
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={BackButton1} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6AD9FA']}
          />
        }
      >
        {isModalVisible && (
          <ModalBottom
            openDrawer={isModalVisible}
            closeDrawer={toggleModal}
            dataprod={data}
          />
        )}
        {isModalVisibleOrder && (
          <ModalBottomOrder
            openDrawer={isModalVisibleOrder}
            closeDrawer={toggleModalOrder}
            dataprod={data}
          />
        )}
        {data && <ProductImages images={data?.images} />}
        {data ? (
          <>
            <ProductInfo
              key={data.id}
              name={data.name}
              price={data.price}
              id={data.id}
            />
            <DescriptionToggle description={data.description || 'No description available'} />
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={toggleModal}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100, // Để đảm bảo khoảng trống cho nút ở dưới
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center', // Canh giữa text
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  addToCartButton: {
    backgroundColor: 'rgba(39, 148, 245, 0.8)', // Màu đỏ cam để nổi bật nút
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CpnProductDetail;
