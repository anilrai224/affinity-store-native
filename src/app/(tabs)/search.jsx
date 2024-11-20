import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { fetchAllProducts } from '@/src/utils/fetchAllProducts';
import { useRouter } from 'expo-router';
import ProductItem from '@/src/components/productitem/ProductItem';

const Search = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); 
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('0');
  const [isFilterVisible, setIsFilterVisible] = useState(false); 
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await fetchAllProducts();
      setProducts(response);
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    if (query === '') {
      setFilteredProducts([]);
      setShowSearchResults(false); 
    } else {
      const results = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [query, products]);

  const handleSearch = () => {
    setShowSearchResults(true);
    const results = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchProducts(results);
  };

  const handleFilter = () => {
    let filtered = [...searchProducts];

    if (minPrice) {
      filtered = filtered.filter(product => parseFloat(product.price) >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(product => parseFloat(product.price) <= parseFloat(maxPrice));
    }

    setSearchProducts(filtered);
    setIsFilterVisible(false); 
    setMinPrice(0);
    setMaxPrice(0)
  };

  const handleProductSelect = (product) => {
    router.push('/products/' + product.category[0].slug);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductSelect(item)} style={styles.productItem}>
      <Text style={styles.productTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
        />

        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {!showSearchResults && filteredProducts.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.product_id.toString()}
          />
        </View>
      )}

      {showSearchResults && (
        <View style={styles.content}>
          <View style={styles.filterHeader}>
            <Text style={styles.options}>Best Match</Text>
            <TouchableOpacity onPress={() => setIsFilterVisible(!isFilterVisible)} style={styles.filterToggle}>
              <Ionicons name="filter" size={20} color="black" />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>

          {isFilterVisible && (
            <View style={styles.filterContainer}>
              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Min Price"
                  keyboardType="numeric"
                  value={minPrice}
                  onChangeText={setMinPrice}
                  placeholderTextColor={Colors.primary}
                  />
                <TextInput
                  style={styles.priceInput}
                  placeholder="Max Price"
                  keyboardType="numeric"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                  placeholderTextColor={Colors.primary}
                />
              </View>
              <TouchableOpacity onPress={handleFilter} style={styles.applyFilterButton}>
                <Text style={styles.applyFilterText}>Apply Filter</Text>
              </TouchableOpacity>
            </View>
          )}

          {searchProducts.length > 0 ? (
            <FlatList
              data={searchProducts}
              renderItem={({ item }) => <ProductItem key={item.product_id} product={item} />}
              keyExtractor={item => item.product_id.toString()}
              contentContainerStyle={styles.suggestionsContainer}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapperStyle}
            />
          ) : (
            <Text style={styles.noResults}>No products found for "{query}".</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  backButton: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    marginHorizontal: 10,
    backgroundColor: '#f1f1f1',
  },
  searchButton: {
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  productItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:80
  },
  options: {
    marginTop: 13,
    fontSize: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal:20
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    marginTop: 10,
    width: '90%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  priceInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  priceInput: {
    height: 40,
    width: '48%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  applyFilterButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyFilterText: {
    color: '#fff',
    fontSize: 16,
  },
  noResults: {
    fontSize: 16,
    color: '#777',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
});

export default Search;
