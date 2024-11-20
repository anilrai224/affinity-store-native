import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { sliderData } from './data';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const Slider = () => {
  return (
    <View style={styles.main}>
      <FlatList
        data={sliderData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.slideContainer} key={index}>
            <View style={styles.singleSlide}>
              <Text style={styles.heading}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 20,
  },
  slideContainer: {
    width: width, 
    justifyContent: 'center', 
  },
  singleSlide: {
    width: width - 40, 
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20, 
    alignSelf: 'center', 
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
    width: 90,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 10, 
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold',
  },
});

export default Slider;
