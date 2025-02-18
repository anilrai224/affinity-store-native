import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, SafeAreaView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../store/slice/cartSlice';
import { setTotalCartAmount } from '../../store/slice/cartTotalSlice';
import { useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const cartItem = useSelector(state => state.cart);
  const totalAmountOfCart = useSelector(state => state.cartTotal);
  const navigation = useNavigation();

  const fetchCartItems = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/system/cart/all`, {
        headers: { 'Authorization': 'Bearer ' + token },
      });

      const items = response.data.data;
      if (items && items.length > 0) {
        setCartItems(items[0]?.item_details || []);
        dispatch(setTotalCartAmount(items[0]?.grand_total || 0));
      } else {
        setCartItems([]);
        dispatch(setTotalCartAmount(0));
      }

    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, [cartItem]);

  const handleRemove = async (itemId) => {
    const token = await AsyncStorage.getItem("auth-token");
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/system/cart/remove/${itemId}`, {}, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json'
        },
      });
      dispatch(removeFromCart(itemId));
      Alert.alert("Removed", "Item has been removed from your cart.");
      fetchCartItems();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      Alert.alert("Error", "Failed to remove item from your cart.");
    }
  };

  const handleProceedToCheckout = () => {
    router.push('/Checkout');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCartItems();
    setRefreshing(false);
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) => {
      return prevItems.map(item => {
        if (item.product_id === itemId) {
          item.quantity = newQuantity;
          item.total_price = item.product_price * newQuantity;
        }
        return item;
      });
    });
    const grandTotal = cartItems.reduce((total, item) => total + parseFloat(item.total_price ? item.total_price : item.total_amount), 0);
    dispatch(setTotalCartAmount(grandTotal))
  };

  const renderItem = ({ item }) => {
    console.log(item)
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: `${item.storage_url}${item.product_image}` }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{item.product_name}</Text>
          <Text style={styles.productPrice}>Rs. {item.product_price}</Text>
          <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => updateCartItemQuantity(item.product_id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              style={[styles.quantityButton, item.quantity <= 1 && styles.disabledButton]}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              value={String(item.quantity)}
              keyboardType="numeric"
              onChangeText={(text) => updateCartItemQuantity(item.product_id, parseInt(text))}
            />
            <TouchableOpacity
              onPress={() => updateCartItemQuantity(item.product_id, item.quantity + 1)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemove(item.cart_item_id)}
        >
          <Ionicons name='trash' color="red" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>
          My Cart
        </Text>
      </View>

      {cartItems?.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.cart_item_id.toString()}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          <View style={styles.total}>
            <View style={styles.totalAmount}>
              <Text style={styles.totalPrice}>Total: Rs. {totalAmountOfCart}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleProceedToCheckout}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    flexDirection: 'column',
  },
  titleContainer: {
    textAlign: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyMessage: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
  total: {
    flexDirection: 'row',
    marginBottom: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    padding: 10,
  },
  totalAmount: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productPrice: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 12,
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
  },
  quantityInput: {
    width: 40,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  removeButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
