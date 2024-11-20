import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import UserIntro from '../../components/profile/UserInfo'
import MenuList from '../../components/profile/MenuList'
import Orders from '../../components/profile/Orders'

const Profile = () => {
  return (
    <SafeAreaView>
      <Text style={{ 
        fontFamily:'poppins-bold',
        fontSize:25,
        paddingLeft:20,
       }}>Profile</Text>
       
       <UserIntro/>
       <Orders/>
       <MenuList/>
    </SafeAreaView>
  )
}

export default Profile