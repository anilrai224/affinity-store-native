import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PaymentMethod = ({ billingDetails }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const total = useSelector(state => state.cartTotal);
    const user = useSelector(state => state.loginStatus.userDetail);
    const router = useRouter();

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <View style={styles.container}>
            <View style={styles.billingDetailsContainer}>
                <Ionicons name="map-outline" size={24} />
                <View style={{ flexDirection: 'column', gap: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
                    <Text>{billingDetails.phone}</Text>
                    <Text>{billingDetails.address}</Text>
                </View>
            </View>

            <View style={styles.paymentMethodContainer}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <TouchableOpacity
                    style={styles.paymentOption}
                    onPress={() => handlePaymentMethodSelect('Cod')}
                >
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'Cod' && <View style={styles.radioButtonInner} />}
                    </View>
                    <Text style={styles.paymentText}>Cash On Delivery (COD)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.paymentOption}
                    onPress={() => handlePaymentMethodSelect('Cod')}
                >
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'CreditCard' && <View style={styles.radioButtonInner} />}
                    </View>
                    <Text style={styles.paymentText}>Credit Card</Text>
                </TouchableOpacity>
            </View>

            {selectedPaymentMethod && (
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total: Rs. {total}</Text>
                    <TouchableOpacity
                        style={styles.order}
                        onPress={() => router.push(`/${selectedPaymentMethod}`)}
                    >
                        <Text style={styles.orderText}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default PaymentMethod;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    billingDetailsContainer: {
        flexDirection: 'row',
        gap: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical:10
    },
    paymentMethodContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 15,

    },
    totalContainer: {
        paddingTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.primary,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.primary,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.primary,
    },
    paymentText: {
        fontSize: 16,
    },
    totalText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    order: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
        fontWeight: 'bold',
    },
    orderText: {
        fontWeight: 'bold',
        color: 'white',
    },
});
