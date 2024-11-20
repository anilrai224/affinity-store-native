import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Colors } from '../../../../constants/Colors';
import defaultImg from '@/src/assets/default.png';

const Profile = () => {
  const loginStatus = useSelector(state => state.loginStatus.isLoggedIn);
  const user = useSelector(state => state.loginStatus.userDetail);

  const imgUrl = loginStatus && user?.image?.url
    ? `${process.env.EXPO_PUBLIC_IMAGE}/${user.image.url}`
    : defaultImg;
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Home</Text>
        </View>
        <View style={styles.iconsContainer}>
          <Ionicons name="notifications-outline" style={styles.icon} size={34} />
          <View style={styles.imageContainer}>
            <Image source={imgUrl} style={styles.profileImage} resizeMode="contain" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  icon: {
    color: 'white',
  },
  imageContainer: {
    overflow: 'hidden',
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  profileImage: {
    height: '100%',
    width: '100%',
  },
  dummy: {
    width: 70,
    height: 70,
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyText: {
    fontSize: 12,
  },
});

export default Profile;
