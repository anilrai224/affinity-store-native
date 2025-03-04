import { SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; 
import { Colors } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const Page = () => {
    const userDetail = useSelector(state => state.loginStatus.userDetail);
    const dispatch = useDispatch();
    const navigation = useNavigation();  // Get the navigation prop
    
    const [firstName, setFirstName] = useState(userDetail?.first_name || '');
    const [lastName, setLastName] = useState(userDetail?.last_name || '');
    const [profileImage, setProfileImage] = useState(null); 
    const [loading, setLoading] = useState(false);

    // Handle profile update
    const handleProfileUpdate = async () => {
        if (!firstName || !lastName) {
            Alert.alert('Error', 'Please fill both First Name and Last Name');
            return;
        }

        const token = await AsyncStorage.getItem('auth-token');
        const body = {
            payload: {
                customer: {
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        };

        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/system/customer/profile`,
                body,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200 && response.data.success) {
                Alert.alert('Success', 'Profile updated successfully');
                navigation.goBack(); 
            } else {
                Alert.alert('Error', response.data.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to update profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Handle image selection
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: [ImagePicker.MediaType.photo],  // Updated to array format
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfileImage(result.uri);
        }
    };

    // Handle image upload
    const handleImageUpload = async () => {
        if (!profileImage) {
            Alert.alert('Error', 'Please select an image to upload');
            return;
        }

        const token = await AsyncStorage.getItem('auth-token');
        const formData = new FormData();
        formData.append('profile_image', {
            uri: profileImage,
            name: 'profile_image.jpg',
            type: 'image/jpeg',
        });

        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/system/customer/upload-profile`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200 && response.data.success) {
                Alert.alert('Success', 'Image uploaded successfully');
            } else {
                Alert.alert('Error', response.data.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to upload image. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Check if userDetail is available before rendering inputs
    if (!userDetail) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Update Profile</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: Colors.primary }]}
                        onPress={handleProfileUpdate}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>Update Profile</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Upload Profile Image</Text>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: Colors.primary }]}
                        onPress={pickImage}
                    >
                        <Text style={styles.buttonText}>Choose Image</Text>
                    </TouchableOpacity>

                    {profileImage && (
                        <View style={styles.imagePreview}>
                            <Text style={styles.imageText}>Image Selected</Text>
                            <img src={profileImage} alt="Profile Image" style={styles.imagePreviewStyle} />
                        </View>
                    )}

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: Colors.primary }]}
                        onPress={handleImageUpload}
                        disabled={loading || !profileImage}
                    >
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    formContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imagePreview: {
        marginTop: 15,
        alignItems: 'center',
    },
    imagePreviewStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
    },
    imageText: {
        fontSize: 16,
        color: '#555',
    },
});

export default Page;
