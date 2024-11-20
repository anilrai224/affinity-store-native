import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Alert, RefreshControl } from 'react-native';
import Profile from '@/src/components/home/profile/Profile';
import { Colors } from '@/constants/Colors';
import SearchBar from '@/src/components/home/searchbar/SearchBar';
import Slider from '@/src/components/home/slider/Slider';
import Categories from '@/src/components/home/categories/Categories';
import Sale from '@/src/components/home/sale/Sale';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '@/src/store/slice/loginStatusSlice';
import { setLoggedIn } from '@/src/store/slice/loginStatusSlice';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const fetchUserDetail = async () => {
    try {
      const token = await AsyncStorage.getItem('auth-token');
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/system/customer/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch(setUserDetail(response.data.data));
        dispatch(setLoggedIn(true));
        setUserDetails(response.data.data);
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch user details');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserDetail();
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color={Colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: Colors.light }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.primary]}
        />
      }
    >
      <Profile userDetails={userDetails} />
      <SearchBar />
      <Slider />
      <Categories />
      <Sale />
    </ScrollView>
  );
};

export default Home;
