import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://store.zerkbro.com/api/v1/services/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.category}>
      <View style={styles.heading}>
        <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 17 }}>Categories</Text>
        <Text>See All</Text>
      </View>
      <View style={styles.slider}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push('/products/' + item.slug)}>
              <View style={styles.singleCategory}>
                <Image source={{ uri: item.storage_path + item.image.image_url }} style={styles.image} />
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
  },
  singleCategory: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    gap: 5,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
});

export default Categories;
