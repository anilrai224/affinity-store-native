import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import axios from 'axios';
import ProductItem from '../../components/productitem/ProductItem';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const ProductsWithCategory = () => {
  const { category } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
    const router = useRouter(); 
    const navigation = useNavigation();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/services/products`);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchAllProducts();
  }, [category]);

  const filteredProducts = products.filter(product =>
    product.category.some(cat => cat.slug === category)
  );

  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        <ProductItem product={item} />
      </View>
    );
  };

  const formatWord=(word)=>{
    return word.split("")[0].toUpperCase()+word.slice(1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={22}/>
        </TouchableOpacity>
        <Text style={styles.heading}>Products : {formatWord(category)}</Text>
      </View>
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noProductsText}>No products found in this category.</Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Explore more Categories</Text>
        <TouchableOpacity onPress={()=>router.push('/home')} style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>See All Categories</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal:10,
    marginBottom: 20,
    marginTop:20,
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 22,
    color: Colors.primary,
    textAlign:'center'
  },
  promotionalSection: {
    backgroundColor: Colors.primaryLight,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
  },
  promoImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  promoButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  promoButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  noProductsText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exploreButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  exploreButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductsWithCategory;
