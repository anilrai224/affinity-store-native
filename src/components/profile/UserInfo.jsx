import { View, Text, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import defaultImg from '../../assets/default.png'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const UserIntro = () => {
  const loginStatus = useSelector(state => state.loginStatus.isLoggedIn);
  const user = useSelector(state => state?.loginStatus.userDetail);
  const router = useRouter();

  const imgUrl = loginStatus && user?.image?.url
    ? `${process.env.EXPO_PUBLIC_IMAGE}/${user.image.url}`
    : defaultImg;
  return (
    <View style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30
    }}>
      {imgUrl ? (
        <Image
          source={imgUrl}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50
          }}
        />
      ) : (
        <ActivityIndicator size="small" color="#aaa" />
      )}
      <Text style={{ fontFamily: 'poppins-bold', fontSize: 20 }}>
        {user?.name || 'Loading...'}
      </Text>
      <Text style={{ fontFamily: 'poppins', fontSize: 16 }}>
        {user?.email || 'Email not available'}
      </Text>
      {/* <TouchableOpacity style={{ flexDirection:'row',alignItems:'center',marginTop:10 }} onPress={()=>router.push('/editprofile/page')}>
        <Ionicons name='create' size={25} color={Colors.primary} />
        <Text style={{ fontSize:16 }}>Edit Profile</Text>
      </TouchableOpacity> */}
    </View>
  );
}

export default UserIntro;
