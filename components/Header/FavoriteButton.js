import React, { useState, useCallback, useContext, useEffect, useMemo } from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, ToastAndroid, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import authHeader from '../../Services/HeaderAuth/auth.header';
import favoritesServices from '../../Services/Favorites';
import { AuthContext } from "../../Services/AuthContext";

const FavoriteButton = ({ productId, style, iconStyle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [countFavorites, setCountFavorites] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation(); // Initialize navigation

  const fetchFavoriteStatus = useCallback(async () => {
    if (authState.userToken === null) {
      // No need to fetch favorite status if the user is not logged in
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const headers = await authHeader();
      const response = await favoritesServices.CheckFavoriteByProduct(headers, productId);
      const getCountAllFavorites = await favoritesServices.getAllCountFavorites(headers, productId);
      setCountFavorites(getCountAllFavorites.value);
      setIsFavorite(response.isFavorite);
    } catch (error) {
      console.error('Error fetching favorite status:', error);
      setError('Unable to fetch favorite status.');
    } finally {
      setLoading(false);
    }
  }, [productId, authState.userToken]);

  useEffect(() => {
    fetchFavoriteStatus();
  }, [fetchFavoriteStatus]);

  const toggleFavorite = useCallback(async () => {
    if (loading) return;
    
    if (authState.userToken === null) {
      // Redirect to login screen if user is not authenticated
      navigation.navigate('Login');
      return;
    }
    
    setLoading(true);
    try {
      const headers = await authHeader();
      const currentStatus = isFavorite;

      if (currentStatus) {
        await favoritesServices.RemoveFavorite(headers, productId);
        ToastAndroid.showWithGravity(
          'Đã loại bỏ khỏi mục yêu thích',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        await favoritesServices.AddFavorite(headers, productId);
        ToastAndroid.showWithGravity(
          'Đã thêm sản phẩm vào mục yêu thích',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
      // Update countFavorites after toggling status
      const updatedCount = await favoritesServices.getAllCountFavorites(headers, productId);
      setCountFavorites(updatedCount.value);
      setIsFavorite(!currentStatus);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      ToastAndroid.showWithGravity(
        'Error toggling favorite status',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } finally {
      setLoading(false);
    }
  }, [isFavorite, loading, productId, authState.userToken, navigation]);

  // Use useMemo to cache the favorite status
  const favoriteStatus = useMemo(() => isFavorite, [isFavorite]);

  return (
    <TouchableOpacity onPress={toggleFavorite} style={[styles.container, style]}>
      {loading ? (
        <ActivityIndicator size="small" color="gray" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.content}>
          <FontAwesome name="heart" style={[styles.icon, iconStyle]} color={authState.userToken ? (favoriteStatus ? 'red' : 'gray') : 'gray'} />
          {/* <Text style={styles.count}>{countFavorites}</Text> */}
        </View>
      )}
    </TouchableOpacity>
  );
};

FavoriteButton.propTypes = {
  productId: PropTypes.number.isRequired,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    width: 45, // Increased width to accommodate the count
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'white',
    flexDirection: 'row', // Arrange icon and count in a row
    paddingHorizontal: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  count: {
    fontSize: 14,
    marginLeft: 5,
    color: 'black',
  },
  errorText: {
    color: 'red',
  },
});

export default FavoriteButton;
