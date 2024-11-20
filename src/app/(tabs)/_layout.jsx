import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:Colors.primary,
        tabBarStyle:{
          height:100,
          borderTopLeftRadius: 40, 
          borderTopRightRadius: 40, 
          overflow: 'hidden', 
          backgroundColor: 'white',
          position:'absolute',
          bottom:0,
          overflow:'hidden',
        },
        tabBarItemStyle: {
          padding: 0, 
        },
        tabBarLabelStyle: {
          fontSize: 12, 
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel:'',
          tabBarIcon:({color,focused})=>(
            <View style={tabBarStyle.tabBarItem}>
              <Ionicons name="home" size={28} color={color}/>
              <Text style={{ color: focused ? Colors.primary : 'black',fontFamily: focused ? 'poppins-bold':'poppins'  }}>Home</Text>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: '',
          tabBarIcon:({color,focused})=>(
            <View style={tabBarStyle.tabBarItem}>
              <Ionicons name="search" size={28} color={color}/>
              <Text style={{ color: focused ? Colors.primary : 'black',fontFamily: focused ? 'poppins-bold':'poppins'  }}>Search</Text>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{ 
          tabBarLabel:'',
          tabBarIcon:({color,focused})=>(
            <View style={tabBarStyle.tabBarItem}>
              <Ionicons name="cart" size={28} color={color}/>
              <Text style={{ color: focused ? Colors.primary : 'black',fontFamily: focused ? 'poppins-bold':'poppins' }}>Cart</Text>
            </View>
          )
         }}
      />
      <Tabs.Screen
        name="profile"
        options={{ 
          tabBarLabel:'',
          tabBarIcon:({color,focused})=>(
            <View style={tabBarStyle.tabBarItem}>
              <Ionicons name="person" size={28} color={color}/>
              <Text style={{ color: focused ? Colors.primary : 'black',fontFamily: focused ? 'poppins-bold':'poppins'  }}>Profile</Text>
            </View>
          )
         }}
      />
    </Tabs>
  );
}

const tabBarStyle = StyleSheet.create({
  tabBarItem:{
    display:'flex',
    flexDirection:'column',
    gap:5,
    alignItems:'center',
    paddingTop:20,
    fontFamily:'poppins'
  }
})