import Config from "../../Api/Config";
import axios from "axios";
import { ToastAndroid } from "react-native";

const productServices = {
    getProductbyid: async (product_id) => {
        try {
            const response = await axios.get(`${Config.API_BASE_URL}/products/${product_id}`);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            ToastAndroid.show("Mã lỗi không xác định của GetProduct", ToastAndroid.SHORT);
        }
    },
    getProducts: async () => {
        try {
            const response = await axios.get(`${Config.API_BASE_URL}/products`);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            ToastAndroid.show("Mã lỗi không xác định của GetProducts", ToastAndroid.SHORT);
        }
    },
    getProductsByCategory: async (category_id) => {
        try {
            const response = await axios.get(`${Config.API_BASE_URL}/products/category/${category_id}`);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            ToastAndroid.show("Mã lỗi không xác định của GetProductsByCategory", ToastAndroid.SHORT);
        }
    },
    GetRatingProduct: async (product_id) => {
        try {
            const response = await axios.get(`${Config.API_BASE_URL}/products/rating/${product_id}`);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            ToastAndroid.show("Mã lỗi không xác định của GetProductsByRating", ToastAndroid.SHORT);
        }
    },
    GetSoldCount: async (product_id) => {
        try {
            const response = await axios.get(`${Config.API_BASE_URL}/products/soldcountproduct/${product_id}`);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            ToastAndroid.show("Mã lỗi không xác định của GetSolidProductById", ToastAndroid.SHORT);
        }
    },

};

export default productServices;
