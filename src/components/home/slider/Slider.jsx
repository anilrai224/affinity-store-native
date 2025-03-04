import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';

const { width } = Dimensions.get('window');

const Slider = () => {
  const [coupons, setCoupons] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/services/coupons`);
      if (response.data.success) {
        const formattedData = response.data.data.map(coupon => ({
          title: `${coupon.coupon_code} - Save Rs. ${coupon.coupon_value}`,
          desc: `Use this coupon on orders above Rs. ${coupon.min_cart_value}. Expires on ${coupon.expiry_date}.`,
        }));
        setCoupons(formattedData);
      }
    };
    fetchCoupons();
  }, []);

  const icon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
    </svg>
  `;

  return (
    <View style={styles.main}>
      <FlatList
        data={coupons}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.slideContainer} key={index}>
            <View style={styles.singleSlide}>
              <View style={styles.heading}>
                <SvgXml xml={icon} width={20} height={20} />
                <Text style={styles.name}>{item.title}</Text>
              </View>
              <Text style={styles.desc}>{item.desc}</Text>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/allproducts/page')}>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap:10
  },
  name:{
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
