import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
  Animated,
  SafeAreaView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShare, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Config from "../../Api/Config";
import Star from "react-native-star-view";
import authHeader from "../../Services/HeaderAuth/auth.header";
import favoritesServices from "../../Services/Favorites";
import useAuth from "../../Services/auth.services";
import ModalBottom from "../../Screen/Modal/modal.product.detail";
import ModalBottomOrder from "../../Screen/Modal/modale/modal.product.order";
import FavoriteButton from "../Header/FavoriteButton";

const { width } = Dimensions.get("window");

const CpnProductDetail = ({ product, navigation }) => {
  const scrollX = new Animated.Value(0);
  const [data, setData] = useState(null);
  const [dataImage, setDataImage] = useState([]);
  const [daban, setDaban] = useState(0);
  const [star, setStar] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleOrder, setisModalVisibleOrder] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Config.API_BASE_URL}/products/${product.id}`);
        const headers = await authHeader();
        setData(response.data);
        setDataImage(response.data.images || []);
        // setDaban(productDetails.total_quantity_sold || 0);
        // setStar(parseFloat(ratingResponse.average_rating || 0).toFixed(1));   
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", fetchData);
    return unsubscribe;
  }, []);

  const renderProduct = useMemo(
    () => ({ item }) => (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    ),
    []
  );

  const toggleModal = useCallback(() => setModalVisible(prev => !prev), []);
  const toggleModalOrder = useCallback(() => setisModalVisibleOrder(prev => !prev), []);

  return (
    <SafeAreaView style={styles.container}>
      <FavoriteButton productId={product.id} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        {isModalVisible && <ModalBottom openDrawer={isModalVisible} closeDrawer={toggleModal} dataprod={data} />}
        {isModalVisibleOrder && <ModalBottomOrder openDrawer={isModalVisibleOrder} closeDrawer={toggleModalOrder} dataprod={data} />}

        <FlatList
          data={dataImage}
          horizontal
          renderItem={renderProduct}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.8}
          snapToInterval={width}
          bounces={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        />

        <View style={styles.dotContainer}>
          {dataImage.map((_, index) => {
            const opacity = scrollX.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.2, 1, 0.2],
              extrapolate: "clamp",
            });
            return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
          })}
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>
            {parseFloat(product.price).toLocaleString("vi-VN")}<Text>đ</Text>
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.ratingContainer}>
            <Star score={+star} style={styles.star} />
            <Text style={styles.ratingText}>{star}</Text>
            <View style={styles.soldContainer}>
              <Text>Đã bán</Text>
              <Text style={styles.soldCount}>{daban}</Text>
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.shareButton}>
              <FontAwesomeIcon icon={faShare} size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.addToCartButton} onPress={toggleModal}>
          <FontAwesomeIcon style={styles.iconAddToCart} icon={faCartShopping} size={20} color="white" />
          <Text style={styles.buttonTextAdd}>Thêm vào giỏ hàng</Text>
        </Pressable>
        {/* <Pressable style={styles.buyNowButton} onPress={hanldThanhToan}>
          <Text style={styles.buttonTextBuy}>Mua ngay</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: "100%",
  },
  main: {
    paddingTop: 0,
  },
  imageContainer: {
    width: width,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
  dotContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  dot: {
    width: "16%",
    height: 2.4,
    backgroundColor: "#000",
    marginHorizontal: 4,
    borderRadius: 100,
  },
  productInfo: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
  },
  productName: {
    fontSize: 20,
    fontWeight: "200",
    paddingLeft: 10,
    paddingRight: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 10,
    color: "red",
  },
  detailsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: "rgba(240, 237, 241, 0.72)",
    padding: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    width: 100,
    height: 20,
    marginTop: 5,
  },
  ratingText: {
    fontWeight: "200",
    paddingLeft: 5,
  },
  soldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 50,
  },
  soldCount: {
    fontWeight: "200",
    paddingLeft: 5,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    position: "relative",
  },
  shareButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    paddingTop: 10,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "white",
    marginLeft: 30,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  descriptionContainer: {
    position: "relative",
    top: 25,
  },
  descriptionText: {
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 150,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addToCartButton: {
    alignItems: "center",
    backgroundColor: "#26aa99",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    height: "100%",
  },
  buyNowButton: {
    backgroundColor: "#ee4d2d",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: "100%",

    width: "50%",
    paddingVertical: 16,
  },
  iconAddToCart: {
    marginRight: 5,
  },
  buttonTextadd: {
    textAlign: "center",
    fontSize: 10,
    color: "white",
  },
  buttonTextmua: {
    textAlign: "center",
    fontSize: 15,

    color: "white",
  },

});
export default CpnProductDetail;
