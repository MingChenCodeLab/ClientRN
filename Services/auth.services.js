import Config from "../Api/Config";
import { useState, useEffect, useContext } from "react";
import { ToastAndroid } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import authHeader from "./HeaderAuth/auth.header";

const useAuth = () => {
  const InfoAuth = async () => {
    const headers = await authHeader();
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/users/info-user/`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("lỗi mạng5", error);
    }
  };
  const GetProducts = async (skip, limit) => {
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/products?skip=${skip}&limit=${limit}`
      );
      if (response.data) {
        return { success: true, data: response.data }; 
      } else {
        throw new Error("No data in response");
      }
    } catch (error) {
      console.error("Có lỗi, không thể lấy danh sách sản phẩm", error);
      return { success: false, message: error.message };
    }
  };
  

  const CheckOtp = async (user) => {
    try {
      const headers = await authHeader();
      const userid = await AsyncStorage.getItem("user_id");
      console.log("AsyncStorage CheckOtp");
      const response = await axios.post(
        `${Config.API_BASE_URL}/auth/verify-user/${userid}`,
        user,
        {
          headers: headers,
        }
      );
      if (response.data) {
        console.log("Reset thành công", response.data);
      }
    } catch (error) {
      console.error("Lỗi gửi otp:", error);
    }
  };
  const CreatePasswordUser = async (user) => {
    try {
      const headers = await authHeader();
      const userid = await AsyncStorage.getItem("user_id");
      const response = await axios.post(
        `${Config.API_BASE_URL}/auth/authentication-otp/${userid}`,
        user,
        {
          headers: headers,
        }
      );
      if (response.data) {
        console.log("otp đúng", response.data);
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show("Mã lỗi không xác định", ToastAndroid.SHORT);
    }
  };
  const GetCart = async (skip,limit) => {
    const headers = await authHeader();
    try {
      const response = await axios.get(`${Config.API_BASE_URL}/carts/?skip=${skip}&limit=${limit}`, {
        headers: headers,
      });
      if (response.data) {
        console.log(response.data)
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show("Mã lỗi không xác định cuar cart", ToastAndroid.SHORT);
    }
  };
 
  const GetVoucher = async () => {
    const headers = await authHeader();
    try {
      const response = await axios.get(`${Config.API_BASE_URL}/vouchers/`, {
        headers: headers,
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show("Mã lỗi không xác định", ToastAndroid.SHORT);
    }
  };
  
 
 
  const search_voucher_and_add = async (voucher_code) => {
    const headers = await authHeader();
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/vouchers/find-voucher`,
        { voucher_code: voucher_code },
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("Network error", error);
    }
  };

  const getAddress = async () => {
    const headers = await authHeader();
    try {
      const response = await axios.get(`${Config.API_BASE_URL}/address/info`, {
        headers: headers,
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const getDefaultAddress = async () => {
    const headers = await authHeader();
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/address/default`,

        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const CreateAddress = async (address) => {
    const headers = await authHeader();
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/address/create`,
        address,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const updateAddress = async (addressForm) => {
    const headers = await authHeader();
    try {
      const response = await axios.put(
        `${Config.API_BASE_URL}/address/update`,
        addressForm,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const DeleteAddress = async (address_id) => {
    const headers = await authHeader();
    try {
      const response = await axios.delete(
        `${Config.API_BASE_URL}/address/delete/${address_id}`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const SearchProduct = async (product_name) => {
    const headers = await authHeader();
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/search/products?name=${product_name}`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const Orders = async (order) => {
    const headers = await authHeader();
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/orders/`,
        order,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const CancelOrder = async (order_id) => {
    const headers = await authHeader();
    try {
      const response = await axios.patch(
        `${Config.API_BASE_URL}/orders/${order_id}/cancel`,
        {},
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const VerifyDelivered = async (order_id) => {
    const headers = await authHeader();
    try {
      const response = await axios.patch(
        `${Config.API_BASE_URL}/orders/${order_id}/verify-delivered`,
        {},
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const CheckStatusOrder = async (order_code) => {
    const headers = await authHeader();
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/orders?statusCode=${order_code}`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("Lỗi mạng1", error);
      return error.response.data;
    }
  };
  const UpdateInfoUser = async (user) => {
    const headers = await authHeader();
    try {
      const response = await axios.put(
        `${Config.API_BASE_URL}/users/update-info-user`,
        user,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("Lỗi mạng2", error);
      return error.response.data;
    }
  };
  const totalOrderStatus = async () => {
    const headers = await authHeader();
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/orders/total-order-status`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("Lỗi mạng3", error);
      return error.response.data;
    }
  };

  const GuiDanhGia = async (product_id, score) => {
    const headers = await authHeader();
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/products/${product_id}/rating?score=${score}`,
        {},
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("Lỗi mạng5", error);
      return error.response.data;
    }
  };
  const UpdateNotifyToken = async (key) => {
    const headers = await authHeader();
    try {
      const response = await axios.patch(
        `${Config.API_BASE_URL}/users/notify-token`,
        { notifyToken: key },
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) { }
  };
  const UpdateCreateCart = async (Cart_id, product_detail_id, quantity) => {
    const headers = await authHeader();
    try {
      const response = await axios.patch(
        `${Config.API_BASE_URL}/carts/${Cart_id}`,
        { product_detail_id: product_detail_id, quantity: quantity },
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  return {
    InfoAuth,
    GetProducts,
    CheckOtp,
    CreatePasswordUser,
    GetCart,
    GetVoucher,
    search_voucher_and_add,
    getAddress,
    getDefaultAddress,
    CreateAddress,
    updateAddress,
    DeleteAddress,
    SearchProduct,
    Orders,
    CancelOrder,
    VerifyDelivered,
    CheckStatusOrder,
    UpdateInfoUser,
    totalOrderStatus,
    GuiDanhGia,
    UpdateNotifyToken,
    UpdateCreateCart
  };
};

export default useAuth;
