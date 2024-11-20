import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Form from '../components/checkout/Form';
import PaymentMethod from '../components/checkout/PaymentMethod';
import { Colors } from '../../constants/Colors';

const Checkout = () => {
  const [billingDetails, setBillingDetails] = useState(null);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const fetchBillingDetail = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    console.log('Making API call to /system/billings/check with token ' + token);

    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/system/billings/check`, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      }
    });

    console.log('Response Data:', response.status);

    if (response.data.success) {
      setBillingDetails(response.data.data);
    } else {
      console.log('API response not successful', response.data);
    }
  };


  useEffect(() => {
    fetchBillingDetail();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleBack}>
          <Ionicons style={styles.icon} name="caret-back-outline" color={Colors.primary} size={34} />
        </TouchableOpacity>
        <Text style={styles.title}>Select Payment Method</Text>
      </View>
      {billingDetails ? (
        <PaymentMethod billingDetails={billingDetails} />
      ) : (
        <Form billingDetails={billingDetails} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    flexDirection: 'column',
    backgroundColor:'whitec'
  }, nav: {
    flexDirection: 'row',
    // backgroundColor:'white'
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom:20
  },
  iconContainer: {
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    margin: 'auto'
  },
  billingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 30,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
});

export default Checkout;
