import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import axios from 'axios';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleSignup = async () => {
        setErrors({});

        const newErrors = {};

        if (!firstName) newErrors.firstName = 'First Name is required';
        if (!lastName) newErrors.lastName = 'Last Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
        
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match!';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('register');
        const payload = {
            payload: {
                customer: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    password_confirmation: confirmPassword,
                },
            },
        };

        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/system/auth/register`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                Alert.alert('Success', 'Signup successful!');
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                router.push('/Login');
            } else {
                Alert.alert('Error', response.data.message || 'Signup failed!');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during signup. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Create Account</Text>

            <View style={styles.inputContainer}>
                <Ionicons name="person" size={24} color="#aaa" />
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="black"
                    value={firstName}
                    onChangeText={setFirstName}
                />
            </View>
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

            <View style={styles.inputContainer}>
                <Ionicons name="person" size={24} color="#aaa" />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="black"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

            <View style={styles.inputContainer}>
                <Ionicons name="mail" size={24} color="#aaa" />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="black"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={24} color="#aaa" />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="black"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="#aaa" />
                </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={24} color="#aaa" />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="black"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!confirmPasswordVisible}
                />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                    <Ionicons name={confirmPasswordVisible ? "eye" : "eye-off"} size={24} color="#aaa" />
                </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.loginText}>
                Already have an account?
                <TouchableOpacity style={styles.loginLink} onPress={() => router.push('/Login')}>
                    <Text style={{ color:Colors.primary }}> Login</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
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
    button: {
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loginText: {
        fontSize: 14,
    },
    loginLink: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        fontSize: 12,
    },
});
