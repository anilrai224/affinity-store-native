import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import ProductItem from '../../components/productitem/ProductItem';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/services/products`);
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const renderProductItems = ({ item }) => {
    return (
      <View style={styles.productContainer} key={item.product_id}>
        <ProductItem product={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>All Products:</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItems}
        keyExtractor={(item) => item.product_id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 17,
    paddingHorizontal:20
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  productContainer: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;
