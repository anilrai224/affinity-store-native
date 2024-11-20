import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const SearchBar = () => {
  return (
    <View style={styles.searchsection}>
      <View style={styles.input}>
        <Ionicons name="search" size={24} color={Colors.primary} style={{}}/>
        <TextInput placeholderTextColor='#000' style={{ width:'100%',height:'100%',fontFamily:'poppins',fontSize:16, }} placeholder='Search'/>
      </View>
      <View style={styles.icon}>
        <Ionicons name="filter" size={24}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    searchsection:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        alignItems:'center'
    },
    input:{
        height:50,
        width:'82%',
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        backgroundColor:'#fff',
        padding:10,
        marginTop:10,
        borderRadius:8,
    },
    icon:{
        marginTop:10,
        height:50,
        width:'15%',
        backgroundColor:Colors.primary,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    }
})

export default SearchBar