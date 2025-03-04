import { StyleSheet, Text, View, Alert, Image, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Use Ionicons for icons
import Review from '../../components/singleorder/Review';

const SingleOrder = () => {
    const { orderId } = useLocalSearchParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useNavigation();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/system/orders/${orderId}`;
            const token = await AsyncStorage.getItem("auth-token");
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200 && response.data.success) {
                    setOrderDetails(response.data.data);
                } else {
                    setError(response.data.message || 'Something went wrong');
                    Alert.alert('Error', response.data.message || 'Something went wrong');
                }
            } catch (error) {
                setError(error.message);
                Alert.alert('Error', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const renderStatusIcon = (status) => {
        switch (status) {
            case 'Pending':
                return <Ionicons name="time-outline" size={20} color={Colors.orange} />;
            case 'Shipped':
                return <Ionicons name="rocket-outline" size={20} color={Colors.blue} />;
            case 'Processing':
                return <Ionicons name="cog-outline" size={20} color={Colors.yellow} />;
            case 'Delivered':
                return <Ionicons name="checkmark-circle-outline" size={20} color={Colors.green} />;
            case 'Cancelled':
                return <Ionicons name="close-circle-outline" size={20} color={Colors.red} />;
            default:
                return <Ionicons name="time-outline" size={20} color={Colors.gray} />;
        }
    };

    const renderPaymentStatusIcon = (status) => {
        switch (status) {
            case 'Paid':
                return <Ionicons name="cash-outline" size={20} color={Colors.green} />;
            case 'Pending':
                return <Ionicons name="time-outline" size={20} color={Colors.orange} />;
            case 'Failed':
                return <Ionicons name="close-circle-outline" size={20} color={Colors.red} />;
            default:
                return <Ionicons name="time-outline" size={20} color={Colors.gray} />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {loading ? (
                    <Text style={styles.loadingText}>Loading order details...</Text>
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : orderDetails ? (
                    <View style={styles.scrollContainer}>
                        <View style={{ flexDirection: 'row', gap: 10, borderBottomWidth: 1, borderBlockColor: 'gray', marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => router.goBack()}>
                                <Ionicons name="arrow-back" size={28} color={Colors.primary} />
                            </TouchableOpacity>
                            <Text style={styles.title}>Order Details</Text>
                        </View>
                        <Text style={styles.orderNumber}>Order Number: {orderDetails.order_number}</Text>
                        <View style={styles.statusContainer}>
                            {renderStatusIcon(orderDetails.order_status)}
                            <Text style={styles.status}>Status: {orderDetails.order_status}</Text>
                        </View>
                        <View style={styles.paymentStatusContainer}>
                            {renderPaymentStatusIcon(orderDetails.order_payment_status)}
                            <Text style={styles.paymentStatus}>Payment Status: {orderDetails.order_payment_status}</Text>
                        </View>
                        <Text style={styles.grandTotal}>Grand Total: Rs. {orderDetails.grand_total_amount}</Text>

                        <View style={styles.billingDetails}>
                            <Text style={styles.billingTitle}>Billing Details</Text>
                            <Text style={styles.billingText}>
                                Name: {orderDetails.order_billing_detail.first_name} {orderDetails.order_billing_detail.last_name}
                            </Text>
                            <Text style={styles.billingText}>Email: {orderDetails.order_billing_detail.email}</Text>
                            <Text style={styles.billingText}>Phone: {orderDetails.order_billing_detail.phone}</Text>
                            <Text style={styles.billingText}>Address: {orderDetails.order_billing_detail.address}, {orderDetails.order_billing_detail.city}, {orderDetails.order_billing_detail.zip_code}</Text>
                        </View>

                        <View style={styles.itemsList}>
                            {orderDetails.order_items.map((item) => (
                                <View  key={item.id}>
                                    <View style={styles.item}>
                                        <Image source={{ uri: `${item.storage_url}${item.product_image}` }} style={styles.productImage} />
                                        <View style={styles.itemDetails}>
                                            <Text style={styles.productName}>{item.product_name}</Text>
                                            <Text style={styles.itemPrice}>Price: Rs. {item.purchase_price}</Text>
                                            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                                        </View>
                                    </View>
                                    <Review product={item}/>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : (
                    <Text style={styles.noOrderText}>No order details found.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary,
    },
    scrollContainer: {
        padding: 20,
    },
    errorText: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.red,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    orderNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    paymentStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    status: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    paymentStatus: {
        fontSize: 16,
        color: Colors.secondaryText,
        marginLeft: 10,
        fontWeight: 'bold',

    },
    grandTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 20,
    },
    billingDetails: {
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: Colors.lightGray,
    },
    billingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
    },
    billingText: {
        fontSize: 16,
        color: Colors.darkText,
        marginBottom: 5,
    },
    itemsList: {
        marginTop: 20,
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 8,
        backgroundColor: Colors.lightGray,
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
    itemPrice: {
        fontSize: 14,
        color: Colors.primary,
    },
    quantity: {
        fontSize: 14,
        color: Colors.secondaryText,
    },
    noOrderText: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.darkText,
    },
});

export default SingleOrder
