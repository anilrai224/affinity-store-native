import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { StyleSheet } from 'react-native'
import SignInWithOAuth from './SignInWithOAuth'

const LoginScreen = () => {

    return (
        <View style={styles.container}>
            <View
                style={{ backgroundColor: '#fff' }}
            >
                {/* <Image source={require('../assets/logo.jpg')} style={styles.logo}/> */}
                <Text style={{ fontSize: 30, fontFamily: 'poppins-bold', textAlign: 'center', backgroundColor: 'transparent' }}>Welcome To {"\n"} <Text style={{ color: Colors.primary }}>affinityclo.np {"\n"}</Text></Text>
                <Text
                    style={{ fontSize: 15, textAlign: 'center', fontFamily: 'poppins', marginVertical: 5, paddingHorizontal: 15 }}
                >Discover the latest trends and shop your favorite styles. Please sign in to get started.
                </Text>
            </View>
            <SignInWithOAuth />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width:150,
        height:100,
    }
})

export default LoginScreen