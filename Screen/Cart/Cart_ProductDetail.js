import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native';
import ProductInfo from '../../components/ProductDetail/ProductInfo';
import ProductImages from '../../components/ProductDetail/ProductImages';
import productServices from '../../Services/Product';
import BackButton from '../../components/Header/BackButton';
import DescriptionToggle from '../../components/ProductDetail/DescriptionToggle';

const Cart_ProductDetail = () => {
    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

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
        </SafeAreaView>
    );
}

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


export default Cart_ProductDetail