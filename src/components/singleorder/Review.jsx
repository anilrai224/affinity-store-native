import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

const Review = ({ product }) => {
    const [isEligible, setIsEligible] = useState(false);
    const [rating, setRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRatingCheck = async () => {
            const token = await AsyncStorage.getItem('auth-token');
            try {
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/system/ratings/check/${product.product_id}`,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        },
                    }
                );
                if (response.data.message === "User has already rated this product") {
                    setIsEligible(false);
                    setRating(response.data.data.rating);
                } else {
                    setIsEligible(true);
                }
            } catch (error) {
                setIsEligible(false);
            }
        };

        fetchRatingCheck();
    }, [product.product_id, showReviewForm]);

    const handleRating = (starValue) => {
        setRating(starValue);
    };

    const handleSubmitReview = async () => {
        if (rating === 0) {
            Alert.alert('Error', 'Please select a rating');
            return;
        }
        try {
            const token = await AsyncStorage.getItem('auth-token');
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/system/ratings/give-rating`, {
                rating: rating,
                comment: message,
                product_id: product.product_id
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json'
                }
            });
            if (response.status === 200 && response.data.success) {
                Alert.alert('Success', 'Your review has been submitted');
                setRating(0);
                setMessage('');
                setShowReviewForm(false);
            } else if (response.status === 404) {
                Alert.alert('Error', response.data.message);
            } else {
                Alert.alert('Error', response.data.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to submit review. Please try again later.');
        }
    };

    return (
        <View style={styles.reviewContainer}>
            {isEligible ? (
                <>
                    <TouchableOpacity onPress={() => setShowReviewForm(!showReviewForm)}>
                        <Text style={styles.reviewButtonText}>Give Review</Text>
                    </TouchableOpacity>

                    {showReviewForm && (
                        <View style={styles.reviewForm}>
                            <Text style={styles.reviewTitle}>Rate the Product</Text>

                            <View style={styles.ratingContainer}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                                        <Ionicons
                                            name={star <= rating ? 'star' : 'star-outline'}
                                            size={32}
                                            color={star <= rating ? Colors.primary : '#ccc'}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <KeyboardAvoidingView
                                style={styles.couponsSection}
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            >
                                <Text style={styles.messageLabel}>Your Message (Optional):</Text>
                                <TextInput
                                    style={styles.messageInput}
                                    value={message}
                                    onChangeText={setMessage}
                                    placeholder="Add a short message..."
                                    maxLength={100}
                                    multiline
                                />

                                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
                                    <Text style={styles.submitButtonText}>Submit</Text>
                                </TouchableOpacity>
                            </KeyboardAvoidingView>
                        </View>
                    )}
                </>
            ) : (
                <View>
                    <Text style={styles.reviewTitle}>Your Rating:</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons
                                key={star}
                                name={star <= rating ? 'star' : 'star-outline'}
                                size={32}
                                color={star <= rating ? Colors.primary : '#ccc'}
                            />
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    reviewContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    reviewButtonText: {
        fontSize: 16,
        backgroundColor: Colors.primary,
        maxWidth: 110,
        width: '100%',
        paddingHorizontal: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 5,
        overflow: 'hidden',
        borderRadius: 8,
    },
    reviewForm: {
        marginTop: 20,
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    messageLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    notEligibleText: {
        fontSize: 16,
        color: '#FF0000',
    },
    submitButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Review;
