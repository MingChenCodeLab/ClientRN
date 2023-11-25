import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
} from "react-native";

import loading from "../../images/loading.gif";
import Header from "../../components/Header/Header";
import HeaderBanner from "../../components/Header/HeaderBanner";
import MenuCategory from "../../components/MenuCategory/MenuCategory";
import Product from "../../components/Product/Product";
import { FlatGrid } from "react-native-super-grid";
import NetInfo from "@react-native-community/netinfo";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Config from "../../Api/Config";
export default function ListProduct({ navigation }) {
  const [data, setData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);
  const [isConnected, setIsConnected] = useState(false);
  const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();
    if (netInfoState.isConnected) {
      return true;
    } else {
      return false;
    }
  };
  const fetchData = () => {
    // Define the API URL huy
    if (checkInternetConnection()) {
      console.log("Internet is connected");
      const apiUrl = `${Config.API_BASE_URL}/products`;
      // Make the GET request using fetch
      fetch(apiUrl)
        .then((response) => response.json())
        .then((responseData) => {
          // Handle the retrieved data by updating the state
          const first10Items = responseData.slice(0, visibleItems);
          setData(first10Items);
          setIsLoading(false);
          setRefreshing(false);
        })
        .catch((error) => {
          console.error("Đang gặp lỗi vui lòng chờ đợi trong giây lát:");
          setRefreshing(false);
          setTimeout(() => {
            setIsConnected(false);
            setIsLoading(false);
            
            ToastAndroid.show("Không có kết nối internet", ToastAndroid.SHORT);
          }, 5000);
        });
    }
  };

  useEffect(() => {
    if (!refreshing) {
      fetchData();
    }
  }, [refreshing]);

  useEffect(() => {
    if (visibleItems > 4)
      setTimeout(() => {
        setRefreshing(true);
        fetchData();
      }, 1200);
  }, [visibleItems]);
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const height = event.nativeEvent.layoutMeasurement.height;
    if (offsetY + height >= contentHeight - 20) {
      setVisibleItems(visibleItems + 4);
    }

    const newOpacity = Math.min(offsetY / 100, 1);
    setBackgroundOpacity(newOpacity);
  };

  const handlePressDetailProduct = (item) => {
    navigation.navigate("ProductDetail", { product: item });
  };

  const handleRefresh = () => {
    if (checkInternetConnection()) {
      setIsLoading(true);
      setVisibleItems(4);
      setTimeout(() => {
        setRefreshing(true);
        fetchData();
        setIsConnected(true);
        ToastAndroid.show("Đang tải lại dữ liệu", ToastAndroid.SHORT);
      }, 1700);
    } else {
      setTimeout(() => {
        setIsConnected(false);
        setIsLoading(false);
        setRefreshing(false);
        ToastAndroid.show("Không có kết nối internet", ToastAndroid.SHORT);
      }, 5000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="rgba(234, 235, 236, 0.72)"
        barStyle="dark-content"
      />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Header backgroundOpacity={backgroundOpacity} navigation={navigation} />
      </View>
      {isloading ? (
        { isConnected } ? (
          <ScrollView
            contentContainerStyle={styles.viewProductsContainer}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            removeClippedSubviews={true}
            maximumZoomScale={1}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={["#9Bd35A", "#689F38"]}
              />
            }
            nestedScrollEnabled={true}
            style={{ flex: 0 }}
          >
            <Image source={loading} style={styles.loadingImage} />
          </ScrollView>
        ) : null
      ) : (
        <ScrollView
          contentContainerStyle={styles.viewProductsContainer}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          removeClippedSubviews={true}
          maximumZoomScale={1}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#9Bd35A", "#689F38"]}
            />
          }
          nestedScrollEnabled={true}
          style={{ flex: 0 }}
        >
          {/* banner */}
          <View style={styles.viewBanner}>
            <HeaderBanner />
            <MenuCategory />
          </View>
          <View style={styles.productList}>
            <FlatGrid
              itemDimension={WIDTH / 3}
              scrollEnabled={false}
              data={data}
              renderItem={({ item }) => (
                <Product
                  dataProd={item}
                  handlePress={handlePressDetailProduct}
                />
              )}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    flex: 1,
    paddingBottom: 50,
    alignItems: "center",
    alignContent: "center",
    height: HEIGHT,
  },
  searchs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 75,
    backgroundColor: "rgba(75, 158, 255, 1)",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 47.6,
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 20,
  },
  inputt: {
    width: 200,
    height: 30,
    paddingLeft: 10,
    fontSize: 20,
    color: "white",
  },
  glass: {
    marginLeft: 10,
    marginRight: 5,
  },
  viewBanner: {
    width: WIDTH,
  },
  viewProductsContainer: {
    flexGrow: 1,
  },
  productList: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-around",
    // marginTop: 12,
    // alignSelf: "center",
    // width: WIDTH-10,
    // borderColor: "red",
    // borderWidth: 1,
  },
  loadingImage: {
    width: 100,
    height: 100,
    marginTop: 100,
    alignSelf: "center",
  },
});
