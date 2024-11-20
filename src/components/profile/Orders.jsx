import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

const Orders = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={{ fontWeight:'bold' }}>My Orders</Text>
                <TouchableOpacity onPress={()=>router.push('allorders/page')}>
                    <Text style={{ fontWeight:'bold' }}>View All Orders </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    content:{
        flexDirection:'row',
        paddingHorizontal:20,
        marginTop:20,
        justifyContent:'space-between'
    }
})