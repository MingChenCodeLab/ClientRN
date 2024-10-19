import React, { createContext, useContext, useReducer, useMemo, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenStorage from "./authToken/TokenStorage";
import authLogin from "../Services/authLogin";
import CartServices from "../Services/CartServices";
import authHeader from "./HeaderAuth/auth.header";
import FavoriteProduct from "../Services/Favorites";
import UserServices from "../Services/./userServices";

// Import reducers
import authReducer from "./Context/Reducer/authReducer";
import cartReducer from './Context/Reducer/cartReducer';
import favoritesReducer from './Context/Reducer/favoritesReducer';

const initialState = {
  isLoading: true,
  userToken: null,
  userInfo: [],
  infoCart: {},
  useVoucher: [],
  favorites: [],
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Set up reducers
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
  const [favoritesState, favoritesDispatch] = useReducer(favoritesReducer, initialState);

  useEffect(() => {
    console.log('AuthContext: useEffect');
    const bootstrapAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('userToken11111:', userToken);

        if (userToken) {
          const fetchHeaders = await authHeader();

          await authContext.infoCart(fetchHeaders);
          await authContext.favorites(fetchHeaders);
          await authContext.userInfo(fetchHeaders);

        authDispatch({ type: 'RESTORE_TOKEN', token: userToken });
        }
      } catch (e) {
        console.error('Failed to fetch token or data', e);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => ({
    signUp: async (user) => {
      try {
        console.log('signUp called with user:', user);
        if (!user) {
          throw new Error('User object is null or undefined');
        }
        const response = await authLogin.signUpUser(user);
        console.log('signUp response:', response);
  
      } catch (error) {
        console.error('Sign-up error:', error);
      }
    },
    signIn: async (user) => {
      try {
        console.log('signIn called with user:', user);
        if (!user) {
          throw new Error('User object is null or undefined');
        }
        const response = await authLogin.loginUser(user);
        console.log('signIn response:', response);
    
        // Chỉ tiếp tục xử lý nếu response chứa accesstoken
        if (response && response.accesstoken) {
          await TokenStorage.saveToken(response.accesstoken);
          authDispatch({ type: 'SIGN_IN', token: response.accesstoken });
          const headers = await authHeader();
          console.log('authHeader:', headers);
          await authContext.infoCart(headers);
          await authContext.favorites(headers);
          await authContext.userInfo(headers);
        }
        return response;  // Trả về response ngay cả khi không chứa accesstoken
      } catch (error) {
        console.error('Sign-in error:', error);
      }
    },
    
  
    signOut: async () => {
      try {
        console.log('signOut called');
        await TokenStorage.removeToken();
        authDispatch({ type: 'SIGN_OUT' });
      } catch (error) {
        console.error('Sign-out error:', error);
      }
    },
    infoCart: async (token) => {
      try {
        console.log('infoCart called with token:', token);
        if (!token) throw new Error('Token is null or undefined');
        const response = await CartServices.getInfoCart(token);
        console.log('infoCart response:', response);
        cartDispatch({ type: 'INFOCART', payload: response });
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    },
    favorites: async (token) => {
      try {
        console.log('favorites called with token:', token);
        if (!token) throw new Error('Token is null or undefined');
        const response = await FavoriteProduct.getcountFavorites(token);
        console.log('favorites response:', response);
        favoritesDispatch({ type: 'FAVORITES', payload: response });
      } catch (error) {
        console.error('Error fetching favorites data:', error);
      }
    },
    userInfo: async (token) => {
      try {
        console.log('userInfo called with token:', token);
        if (!token) throw new Error('Token is null or undefined');
        const response = await UserServices.getUserInfo(token);
        console.log('userInfo response:', response);
        authDispatch({ type: 'USER_INFO', user: response });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
  }), []);  
  const contextValue = useMemo(() => ({
    authState,
    cartState,
    favoritesState,
    authDispatch,
    cartDispatch,
    favoritesDispatch,
    ...authContext
  }), [authState, cartState, favoritesState, authDispatch, cartDispatch, favoritesDispatch]);
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
