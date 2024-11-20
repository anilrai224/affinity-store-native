import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const ProductRating = ({ ratings }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; 
    const emptyStars = 5 - fullStars - halfStar; 

    return (
      <View style={styles.starsContainer}>
        {Array(fullStars).fill().map((_, index) => (
          <Ionicons key={`full-${index}`} name="star" size={15} color={Colors.primary} />
        ))}
        {halfStar === 1 && (
          <Ionicons name="star-half" size={15} color={Colors.primary} />
        )}
        {Array(emptyStars).fill().map((_, index) => (
          <Ionicons key={`empty-${index}`} name="star-outline" size={15} color={Colors.primary} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Rating & Reviews</Text>
      </View>

      {ratings.map((review, index) => (
        <View key={index} style={styles.reviewContainer}>
          <View style={styles.reviewTextContainer}>
            <Text style={styles.comment}>{review.comment}</Text>
            {renderStars(review.stars)}
          </View>
          <View style={styles.userContainer}>
            <View style={styles.userAvatar}>
              <Text style={styles.userInitial}>{review.user.name[0]}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ProductRating;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headingContainer: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  reviewTextContainer: {
    flex: 1,
  },
  comment: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitial: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
