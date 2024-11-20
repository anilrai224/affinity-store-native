import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slice/cartSlice';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomPrice = ({ product }) => {
  const isLoggedIn = useSelector(state => state.loginStatus.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (isLoggedIn) {
      const token = await AsyncStorage.getItem("auth-token");
      try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/system/cart/add/${product.product_id}`, {
          quantity: 1,
        },{
          headers:{
            'Authorization':'Bearer '+token,
          }
        });

        if (response.data.success) {
          dispatch(addToCart({ id: product.id, ...product, quantity: 1 }));//check if it is id:proudct.id or id:product.product_id
          Alert.alert("Success", "Product added to cart.");
        } else {
          Alert.alert("Error", response.data.message || "Failed to add product to cart.");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } else {
      router.push('/Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>Total Price</Text>
          <Text style={styles.price}>Rs.{product?.price}</Text>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={handleAddToCart}>
          <View style={styles.actionContent}>
            <Ionicons name="card" size={28} color="white" />
            <Text style={styles.actionText}> Buy</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomPrice;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
    backgroundColor: Colors.gray,
    marginTop: 20,
    paddingVertical: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
