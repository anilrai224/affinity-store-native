import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ProductItem = ({ product }) => {
  const router = useRouter();
  const imgUrl = product?.image_samples[0].image_url ? `${product.storage_path}${product.image_samples[0].image_url}` : null;

  const ratings = product.ratings || []; 
  const totalStars = ratings.reduce((acc, rating) => acc + rating.stars, 0);
  const averageRating = ratings.length > 0 ? (totalStars / ratings.length).toFixed(1) : '0';

  return (
    <TouchableOpacity onPress={() => router.push('/singleproduct/' + product.product_id)} style={styles.itemContainer}>
      <Image source={{ uri: imgUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{product.title}</Text>
        <View style={styles.priceSection}>
          <Text style={styles.price}>Rs.{product.price}</Text>
          <View style={styles.starSection}>
            <Text style={{ fontSize: 12 }}>{averageRating}</Text>
            <Ionicons name="star" size={15} color={Colors.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: (windowWidth / 2) - 40,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  starSection:{
    flexDirection:'row',
    gap:5
  },
  name: {
    fontSize: 13,
    textAlign: 'center',
  },
  priceSection:{
    flexDirection:'row',
    paddingHorizontal:20,
    marginTop:10
  },
  price: {
    fontSize: 13,
    color: '#888',
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    color: Colors.primary
  },
});

export default ProductItem;
