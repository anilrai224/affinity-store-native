import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import { useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const Cod = () => {
  const total = useSelector(state => state.cartTotal)
  const { height } = Dimensions.get('window')
  const router = useRouter();

  const handleConfirm =async()=>{
    const token = await AsyncStorage.getItem('auth-token');
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/system/checkout/cod`,{},{
      headers:{
        'Authorization':'Bearer '+token,
        'Accept':'application/json'
      }
    })
    if(response.data.success){
      Alert.alert('Your Order has been placed successfully.');
      router.push('/home')
    }
  }
  return (
    <SafeAreaView style={[styles.container, { height }]}>
      <Text style={styles.title}>Cash On Delivery</Text>
      <View style={styles.contentContainer}>
        <View style={styles.pointsContainer}>
          <Ionicons name={'cash'} color={Colors.primary} size={24} />
          <View style={styles.points}>
            <Text>- You my pay in cash to our courier upon receiving your parcel at the doorstepl</Text>
            <Text>- Before agreeing to reveive the parcel, check if your delivery status has been updated to 'Our for Delivery'</Text>
            <Text>- Before receiving, confirm that the airway bill shows the parcel is from Daraz</Text>
            <Text>- Before you make payment to the courier, confirm your order number, sender information and tracking number on the parcel</Text>
          </View>
        </View>
      </View>
      <View style={styles.subTotalDetails}>
        <View style={styles.detail}>
          <View style={styles.flexDetail}>
            <Text>SubTotal</Text>
            <Text>Rs. {total}</Text>
          </View>
          <View style={styles.flexDetail}>
            <Text>Cash Payment Fee</Text>
            <Text>Rs. 10</Text>
          </View>
          <View style={styles.flexDetail}>
            <Text style={{ fontSize:20,fontWeight:'bold' }}>Total Amount</Text>
            <Text style={{ fontSize:20,fontWeight:'bold',color:Colors.primary }}>Rs. {total + 10}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleConfirm}>
          <Text style={styles.button}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Cod

const styles = StyleSheet.create({
  container: {
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBlockColor: '#ccc',
  },
  contentContainer: {
    backgroundColor: 'white',
    height: '100vh',
    padding: 20
  },
  pointsContainer: {
    flexDirection: 'row',
    gap: 20,
    paddingRight: 50
  },
  points: {
    flexDirection: 'column',
    gap: 15
  },
  subTotalDetails: {
    position: 'absolute',
    backgroundColor:'white',
    bottom: 0,
    padding: 20,
    width:'100%',
    paddingBottom:40
  },
  detail:{
    width:'100%',
    borderBottomWidth:1,
    borderTopWidth:1,
    borderBottomColor:'#ccc',
    borderTopColor:'#ccc',
    paddingVertical:10,
    flexDirection:'column',
    gap:10
  },
  flexDetail:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  button:{
    backgroundColor:Colors.primary,
    padding:15,
    borderRadius:74,
    textAlign:'center',
    fontSize:20,
    color:'white',
  }
})