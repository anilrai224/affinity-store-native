import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Colors } from '../../../constants/Colors';
import { useRouter } from 'expo-router';

const Form = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip_code: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const router = useRouter();

    const handleSubmit = async () => {
        const token = await AsyncStorage.getItem('auth-token');
        let formErrors = {};

        // Validation: check if fields are empty
        if (!formData.first_name) formErrors.first_name = 'First Name is required';
        if (!formData.last_name) formErrors.last_name = 'Last Name is required';
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.phone) formErrors.phone = 'Phone number is required';
        if (!formData.address) formErrors.address = 'Address is required';
        if (!formData.city) formErrors.city = 'City is required';
        if (!formData.zip_code) formErrors.zip_code = 'Zip Code is required';

        const phoneRegex = /^[0-9]{10}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            formErrors.phone = 'Phone number must be exactly 10 digits';
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const payload = {
            payload: {
                customer: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    zip_code: formData.zip_code,
                },
            },
        };

        try {
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
            if (response.data.success) {
                Alert.alert('Success', 'Billing details saved successfully');
                router.push('/(tabs)/cart');
            } else {
                Alert.alert('Error', 'Failed to save billing details');
            }
        } catch (error) {
            Alert.alert('Error', 'There was an error submitting your billing details');
        }
    };

    return (
        <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Enter Billing Details</Text>

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
                    {errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}

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
                    {errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}

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
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

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
                    {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

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
                    {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

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
                    {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

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
                    {errors.zip_code && <Text style={styles.errorText}>{errors.zip_code}</Text>}

                    <TouchableOpacity style={styles.btn} title="Submit" onPress={handleSubmit}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

export default Form;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        fontSize: 12,
    },
});
