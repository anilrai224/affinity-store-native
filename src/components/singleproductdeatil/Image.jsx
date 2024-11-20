import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image as RNImage } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const Image = ({ product = { title: 'Default Product', image_samples: [{ image_url: '' }], storage_path: '' } }) => {
    const imgUrl = product.image_samples[0]?.image_url ? `${product.storage_path}${product.image_samples[0].image_url}` : null;
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.navigation} onPress={()=>navigation.goBack()}>
                <Ionicons name='arrow-back' size={24} />
            </TouchableOpacity>
            <RNImage source={{ uri: imgUrl }} style={styles.image} />
        </SafeAreaView>
    );
};

export default Image;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        paddingTop:30,
    },
    navigation: {
        paddingHorizontal:20,
    },
    productName: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 35,
        flex: 1,
    },
    icon: {
        color: 'black',
    },
    iconContainer: {
        position: 'absolute',
        left: 10,
        height: '100%',
        justifyContent: 'center',
        zIndex: 10,
    },
    image: {
        backgroundColor: 'white',
        width: '100%',
        height: 250,
        resizeMode: 'contain',
        marginTop: 10,
    },
});
