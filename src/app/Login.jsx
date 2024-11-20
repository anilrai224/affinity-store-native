import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {setLoggedIn} from '../store/slice/loginStatusSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter your email and password.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                payload: {
                    customer: {
                        email:email,
                        password: password,
                    },
                },
            };
            
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/system/auth/login`, payload);

            if (response.status === 200) {
                Alert.alert('Success', 'Logged in successfully!');
                dispatch(setLoggedIn(true));
                AsyncStorage.setItem("auth-token",response.data.data.token);
                router.push('/home');
            }
        } catch (error) {
            Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Login to your account</Text>

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
                    <Ionicons 
                        name={passwordVisible ? "eye" : "eye-off"} 
                        size={24} 
                        color="#aaa" 
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.signupText}>
                Don't have an account?
                <TouchableOpacity style={styles.signupLink} onPress={() => router.push('/Signup')}>
                    <Text> Sign Up</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
};

export default Login;

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
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
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
    signupText: {
        fontSize: 14,
    },
    signupLink: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
});
