import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProductItem({ item, onSelect, onSwipe, isSelected, onProductUpdate, onPress }) {
  const [quantity, setQuantity] = useState(String(item.quantity));
  const [discountedTotal, setDiscountedTotal] = useState(item.discountedTotal);

  // Chỉ tính toán và định dạng discountedTotal một lần
  useEffect(() => {
    const updatedDiscountedTotal = parseFloat(item.price * (1 - item.discountPercentage / 100) * parseInt(quantity, 10)).toFixed(0);
    setDiscountedTotal(updatedDiscountedTotal);
  }, [quantity, item.price, item.discountPercentage]);

  const handleInputChange = (value) => {
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue) && parsedValue > 0 && parsedValue <= item.stock) {
      setQuantity(String(parsedValue));
      onProductUpdate({ ...item, quantity: parsedValue });
    } else {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (item.stock === 0) {
      ToastAndroid.show('Sản phẩm đã hết hàng!', ToastAndroid.SHORT);
      return;
    }
    if (parseInt(quantity, 10) > 1) {
      handleInputChange(String(parseInt(quantity, 10) - 1));
    }
  };

  const increaseQuantity = () => {
    if (item.stock === 0) {
      ToastAndroid.show('Sản phẩm đã hết hàng!', ToastAndroid.SHORT);
      return;
    } else if (parseInt(quantity, 10) < item.stock) {
      handleInputChange(String(parseInt(quantity, 10) + 1));
    }
  };

  const renderRightActions = (progress, dragX) => (
    <TouchableOpacity style={styles.rightAction} onPress={() => onSwipe(item)}>
      <Text style={styles.actionText}>Xóa</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={[styles.container, item.stock === 0 && styles.outOfStockContainer]}>
          <Checkbox
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={() => onSelect(item)}
            disabled={item.stock === 0}
            color="#4CAF50"
          />
          <Image source={{ uri: item.thumbnail }} style={[styles.image, item.stock === 0 && styles.outOfStockImage]}
            onPress={onPress} />
          <View style={styles.details}>
            <Text style={styles.productName}>{item.title}</Text>

            {/* Định dạng chỉ khi hiển thị */}
            <Text style={styles.productDiscount}>{parseFloat(discountedTotal).toLocaleString('vi-VN')} VND</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                <Icon name="minus" size={16} color="#fff" />
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                value={quantity}
                onChangeText={handleInputChange}
                editable={item.stock > 0}
              />
              <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                <Icon name="plus" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.productColorSize}>Màu: {item.color} - Size: {item.size}</Text>
            {item.stock === 0 && <Text style={styles.outOfStockText}>Sản phẩm đã hết hàng</Text>}
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outOfStockContainer: {
    opacity: 0.5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  outOfStockImage: {
    opacity: 0.5,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDiscount: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quantityButton: {
    backgroundColor: 'rgba(183, 183, 183, 0.8)',
    padding: 8,
    borderRadius: 5,
  },
  quantityInput: {
    width: 40,
    height: 30,
    textAlign: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
  },
  productColorSize: {
    fontSize: 14,
    color: '#555',
  },
  rightAction: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    width: 100,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  outOfStockText: {
    marginTop: 5,
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});
