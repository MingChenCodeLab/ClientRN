import Config from "../../Api/Config";
import axios from "axios";
import { ToastAndroid } from "react-native";

const favoritesServices = {
  getFavorites: async (headersToken) => {
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/favorites`,
        {
          headers: headersToken,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show(
        "Mã l��i không xác đ��nh của GetFavorite",
        ToastAndroid.SHORT
      );
    }
  },
  CheckFavoriteByProduct: async (headersToken, product_id) => {
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/favorites/check-favorited/${product_id}`,
        {
          headers: headersToken
      }
      );
      return response.data || { isFavorite: false };
    } catch (error) {
      console.error('Error checking favorite status:', error); {
    }
      return { isFavorite: false }; 
    }
  },
  getcountFavorites: async (headersToken) => {
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/favorites/count-favorites`,
        {
          headers: headersToken,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show(
        "Mã lỗi không xác định của số lượng Favorite",
        ToastAndroid.SHORT
      );
    }
  },
  getAllCountFavorites: async (headersToken, product_id) => {
    try {
      const response = await axios.get(`${Config.API_BASE_URL}/favorites/countAllFavorites/${product_id}`,
        {
          headers: headersToken,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show(
        "Mã l��i không xác đ��nh của số lượng tất cả Favorite",
        ToastAndroid.SHORT
      );
    }
  },
  AddFavorite: async (headersToken, product_id) => {
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/favorites/create`,
        { productId: product_id },
        {
          headers: headersToken,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show(
        "Mã lỗi không xác định của GetFavorite",
        ToastAndroid.SHORT
      );
    }
  },
  RemoveFavorite: async (headersToken, product_id) => {
    try {
      const response = await axios.delete(
        `${Config.API_BASE_URL}/favorites/delete/${product_id}`,
        {
          headers: headersToken,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show("Mã lỗi không xác định", ToastAndroid.SHORT);
    }
  },
};

export default favoritesServices;
