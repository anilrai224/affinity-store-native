import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Image from '../../components/singleproductdeatil/Image';
import axios from 'axios';
import ProductDesc from '../../components/singleproductdeatil/ProductDesc';
import BottomPrice from '../../components/singleproductdeatil/BottomPrice';
import ProductRating from '../../components/singleproductdeatil/ProductRating';

const ProductDetail = () => {
  const { productid } = useLocalSearchParams();
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [refreshing, setRefreshing] = useState(false); 

  const fetchSingleProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/services/products/${productid}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false); 
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [productid]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSingleProduct();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const ratings= [
    {
        stars: 5,
        comment: "wow nice",
        user: {
            name: "Anil Rai",
            email: "anil@anil.com"
        }
    },
    {
        stars: 4,
        comment: "lovely man paro hai",
        user: {
            name: "Subash Sharma",
            email: "subash@gmail.com"
        }
    },
    {
        stars: 4,
        comment: "lovely man paro hai",
        user: {
            name: "Subash Sharma",
            email: "subash@gmail.com"
        }
    },
    {
        stars: 4,
        comment: "lovely man paro hai",
        user: {
            name: "Subash Sharma",
            email: "subash@gmail.com"
        }
    }
]
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Image product={product} />
        <ProductDesc product={product} />
        <ProductRating ratings={ratings}/>
      </ScrollView>
      <BottomPrice product={product}/>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  scrollViewContent: {
    paddingBottom: 100, 
  },
});
