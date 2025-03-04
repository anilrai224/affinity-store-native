import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

const OrdersPage = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useNavigation();
  const routers = useRouter();

  const fetchAllOrders = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/system/orders/all`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data.success) {
        setAllOrders(response.data.data);
        setError('');
      } else if (response.status === 401) {
        setError('Unauthorized access. Please log in again.');
        Alert.alert('Error', 'Unauthorized access. Please log in again.');
      } else {
        setError(`Error: ${response.status} - ${response.statusText}`);
        Alert.alert('Error', `Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setError(error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const formatId = (id) => {
    return id.slice(0, 14);
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Ionicons name="hourglass" size={20} color={Colors.orange} />;
      case 'shipped':
        return <Ionicons name="rocket" size={20} color={Colors.primary} />;
      case 'processing':
        return <Ionicons name="cog" size={20} color={Colors.lightPrimary} />;
      case 'delivered':
        return <Ionicons name="checkmark-circle" size={20} color={Colors.green} />;
      case 'cancelled':
        return <Ionicons name="close-circle" size={20} color={Colors.red} />;
      default:
        return <Ionicons name="help-circle" size={20} color={Colors.darkText} />;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.heading}>
          <TouchableOpacity onPress={() => router.goBack()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>All Orders</Text>
        </View>
        {loading ? (
          <Text style={styles.loadingText}>Loading orders...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : allOrders.length > 0 ? (
          allOrders.map((order) => (
            <View key={order.order_id} style={styles.orderItem}>
              <View style={styles.orderHeader}>
                <View style={{ flexDirection:'row',justifyContent:'space-between' }}>
                  <Text style={styles.orderNumber}>Order ID: <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{formatId(order.order_number)}</Text></Text>
                  <TouchableOpacity onPress={()=>routers.push(`/singleorder/${order.order_number}`)}>
                    <Ionicons name="eye" size={25} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.statusContainer}>
                  
                  <Text style={styles.status}>Status: {order.order_status} {getStatusIcon(order.order_status)}</Text>
                </View>
              </View>
              <Text style={styles.grandTotal}>Grand Total: Rs. {order.grand_total_amount}</Text>
              <Text style={styles.paymentStatus}>Payment Status: {order.order_payment_status}</Text>
              <View style={styles.orderItems}>
                {order.order_items.map((item) => (
                  <View key={item.id} style={styles.orderItemDetails}>
                    <Image
                      source={{ uri: `${item.storage_url}${item.product_image}` }}
                      style={styles.productImage}
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.productName}>{item.product_name}</Text>
                      <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                      <Text style={styles.itemPrice}>Price: Rs. {item.purchase_price}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noOrdersText}>No orders found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  scrollContainer: {
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.red,
  },
  orderItem: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    flexDirection:'row',
    alignItems:'cente'
  },
  grandTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.primary,
  },
  paymentStatus: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  orderItems: {
    marginTop: 10,
    paddingLeft: 10,
  },
  orderItemDetails: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
    paddingBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  quantity: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.darkText,
  },
});

export default OrdersPage;
