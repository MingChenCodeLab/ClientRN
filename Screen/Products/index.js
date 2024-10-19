import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import Product from "../../components/Product/Product";
import Config from "../../Api/Config";
import Banner from "../../components/Banner";
import MenuCategory from "../../components/MenuCategory/MenuCategory";
import useAuth from "../../Services/auth.services";

export default function Index({ navigation }) {
  const limit = 10;
  const [data, setData] = useState([]);
  const [UI, setUI] = useState(false);
  const [error, setError] = useState(null); 
  const isStop = useRef(false);
  const isLoading = useRef(false);
  const { GetProducts } = useAuth();

  const getData = async (type) => {
    if (isLoading.current) return;
    if (type === "loadMore" && (isStop.current || error)) return;  

    if (type === "refresh") {
      setData([]);
      isStop.current = false;
    }

    try {
      setUI(true);
      isLoading.current = true;
      setError(null); 

      const response = await callApi({
        skip: type === "loadMore" ? data.length : 0,
        limit: limit,
      });

      if (!response || !response.data) {
        throw new Error("Invalid response format");
      }

      if (response.data.length < limit) {
        isStop.current = true;
      }

      if (type === "refresh") {
        setData(response.data);
      } else if (type === "loadMore") {
        setData(prevData => [...prevData, ...response.data]);
      }
    } catch (error) {
      setError("Failed to load data. Please try again later.");
      isStop.current = true;  
    } finally {
      isLoading.current = false;
      setUI(false);
    }
  };

  const callApi = async (data) => {
    try {
      const result  = await GetProducts(data.skip, data.limit);
      if (result.success) {
        return result.data;  
      } else {
        throw new Error(result.message);  
      }
    } catch (error) {
      console.error("API call failed:", error);
      throw error;  
    }
  };

  const renderFooterList = useMemo(() => {
  
    if (UI) return <ActivityIndicator color={"red"} />;
    if (error) return <Text>{error}</Text>;
    if (data.length === 0 && isStop.current) return <Text>Danh sách trống</Text>;
    if (isStop.current) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.endOfListText}>Danh sách đã hết</Text>
          <TouchableOpacity style={styles.button} onPress={() => getData('refresh')}>
            <Text style={styles.buttonText}>Làm mới</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <View />;
  }, [UI, data.length, isStop.current, error]);
  

  useEffect(() => {
    getData("refresh");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <Banner />
            <MenuCategory />
          </>
        }
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Product dataProd={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListFooterComponent={
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            {renderFooterList}
          </View>
        }
        refreshControl={
          <RefreshControl refreshing ={UI} onRefresh={() => getData('refresh')} />
        }
        onEndReached={() => getData('loadMore')}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  footerContainer: {
    flexDirection: 'row',   
    justifyContent: 'center', 
    alignItems: 'center',   
    marginVertical: 10,
  },
  endOfListText: {
    marginRight: 5, 
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    
    borderRadius: 5,
  },
  buttonText: {
    color: '#55AFFF',
    fontSize: 16,
  },
});
