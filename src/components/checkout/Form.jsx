import { StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Colors } from '../../../constants/Colors';
import { TouchableOpacity } from 'react-native';

const Form = ({ billingDetails }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip_code: '',
    });

    const handleChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const token = await AsyncStorage.getItem('auth-token');
        const payload={
            payload:{
                customer:{
                    first_name:formData.first_name,
                    last_name:formData.last_name,
                    email:formData.email,
                    phone:formData.phone,
                    address:formData.address,
                    city:formData.city,
                    zip_code:formData.zip_code
                }
            }
        }
        try {
            console.log(payload)
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/system/billings/add`,
                payload,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                    },
                }
            );
            console.log(response.data)
            if (response.data.success) {
                Alert.alert('Success', 'Billing details saved successfully');
            } else {
                Alert.alert('Error', 'Failed to save billing details');
            }
        } catch (error) {
            console.error('Failed to submit billing details:', error);
            Alert.alert('Error', 'There was an error submitting your billing details');
        }
    };
    return (
        <View>
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Enter Billing Details</Text>
                <View style={styles.formGroup}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color="gray" />
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            placeholderTextColor="black"
                            value={formData.first_name}
                            onChangeText={(text) => handleChange('first_name', text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color="gray" />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            placeholderTextColor="black"
                            value={formData.last_name}
                            onChangeText={(text) => handleChange('last_name', text)}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="gray" />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="black"
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="call-outline" size={20} color="gray" />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        placeholderTextColor="black"
                        value={formData.phone}
                        onChangeText={(text) => handleChange('phone', text)}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="home-outline" size={20} color="gray" />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        placeholderTextColor="black"
                        value={formData.address}
                        onChangeText={(text) => handleChange('address', text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="location-outline" size={20} color="gray" />
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        placeholderTextColor="black"
                        value={formData.city}
                        onChangeText={(text) => handleChange('city', text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="map-outline" size={20} color="gray" />
                    <TextInput
                        style={styles.input}
                        placeholder="Zip Code"
                        placeholderTextColor="black"
                        value={formData.zip_code}
                        onChangeText={(text) => handleChange('zip_code', text)}
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity style={styles.btn} title="Submit" onPress={handleSubmit} >
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }, nav: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
    btn: {
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    }
});