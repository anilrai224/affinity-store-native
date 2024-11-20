import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {fetchAllCartProducts} from '../../utils/fetchAllOrders'

const page = () => {
    const [allOrders,setAllOrders]=useState([]);
    useEffect(()=>{
        const fetchAllOrder = async()=>{
            const response = await fetchAllCartProducts();
            console.log(response.order_items[0])
        }
        fetchAllOrder();
    },[])
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
            <Text>Page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default page

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20
    }
})