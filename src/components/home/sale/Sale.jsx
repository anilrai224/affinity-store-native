import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import ProductItem from '../../productitem/ProductItem';
import axios from 'axios';

const Sale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/services/products`);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  const renderProductItems = () => {
    return products.map((item, index) => {
      if (index % 2 === 0 && index < 4) {
        return (
          <View style={styles.row} key={index}>
            <View style={styles.productContainer}>
              <ProductItem product={item} />
            </View>
            {products[index + 1] && (
              <View style={styles.productContainer}>
                <ProductItem product={products[index + 1]} />
              </View>
            )}
          </View>
        );
      }
      return null;
    });
  };

  return (
    <View style={styles.sale}>
      <Text style={styles.heading}>Flash Sale:</Text>
      {renderProductItems()}
    </View>
  );
};

const styles = StyleSheet.create({
  sale: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom:100
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 17,
  },
  productContainer: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Sale;
