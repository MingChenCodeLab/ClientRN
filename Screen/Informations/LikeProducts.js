import React, { useState, useEffect ,useContext} from "react";
import {
  StyleSheet,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import FavoriteProduct from "../../components/FavoriteProduct/FavoriteProduct";
import favoritesServices from "../../Services/Favorites";
import authHeader from "../../Services/HeaderAuth/auth.header";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../Services/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function LikeProducts({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);
  const { authState, dispatch } = useContext(AuthContext);

  const fetchData = async () => {
    const headersToken = await authHeader();
    setIsLoading(true);
    try {
      if (authState.userToken === null) {
        navigation.navigate("Login");
      }
      else {
        const resultFavorites = await favoritesServices.getFavorites(headersToken);
        setData(resultFavorites);
      }


    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!refreshing) {
      fetchData();
    }
  }, [refreshing]);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const height = event.nativeEvent.layoutMeasurement.height;
    if (offsetY + height >= contentHeight - 20) {
      setVisibleItems((prev) => prev + 4);
    }
  };

  const handlePressDetailProduct = (item) => {
    navigation.navigate("ProductDetail", { product: item });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setVisibleItems(4);
    setTimeout(() => {
      setRefreshing(true);
      fetchData();
    }, 1700);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#9Bd35A"
          style={styles.loadingIndicator}
        />
      ) : (
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Yêu thích của bạn</Text>
          </View>
          <View style={styles.separator} />
          <FlatList
            contentContainerStyle={styles.viewProductsContainer}
            data={data.slice(0, visibleItems)} // Giới hạn số lượng sản phẩm hiển thị
            renderItem={({ item }) => (
              <FavoriteProduct
                dataProd={item}
                handlePress={handlePressDetailProduct}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            onScroll={handleScroll}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={["#9Bd35A", "#689F38"]}
              />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  viewProductsContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 20,
  },
  title: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  separator: {
    borderWidth: 0.5,
    borderColor: "#AAAAAA",
    marginBottom: 10,
  },
});
