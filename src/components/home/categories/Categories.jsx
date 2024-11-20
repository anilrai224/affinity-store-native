import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { category } from './data'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

const Categories = () => {
  const router = useRouter();
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
          data={category}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => router.push('/products/' + item.to)}>
              <View key={index} style={styles.singleCategory}>
                <Image source={item.image} style={styles.image} />
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  category: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
    paddingHorizontal: 20
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20
  },
  singleCategory: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    gap: 5
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50
  }
})

export default Categories
