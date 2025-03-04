import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import ProductItem from '../../productitem/ProductItem';
import axios from 'axios';

const MostRated = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/services/products`);
        const filteredProducts = response.data.data.filter(item => item.average_rating !== "0.0");
        const sortedProducts = filteredProducts.sort((a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating)); 
        setProducts(sortedProducts.slice(0, 4)); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  const renderProductItems = ({ item }) => (
    <View style={styles.productContainer}>
      <ProductItem product={item} />
    </View>
  );

  return (
    <View style={styles.sale}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Most Rated Products:</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItems}
        keyExtractor={(item) => item.product_id.toString()} 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.productRow} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sale: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 100,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 17,
  },
  productRow: {
    paddingVertical: 10,
  },
  productContainer: {
    width: 150, 
    marginHorizontal: 10, 
  },
});

export default MostRated;
