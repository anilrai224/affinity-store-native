import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants/Colors';
import RenderHTML from 'react-native-render-html';

const ProductDesc = ({ product = { title: 'Default Product', description: '<p>No description available</p>' } }) => {
    const { title, description } = product;
    const htmlContent = description;

    return (
        <View style={styles.container}>
            <View style={styles.productDetails}>
                <Text style={styles.name}>{title}</Text>
                <RenderHTML
                    contentWidth={300}
                    source={{ html: htmlContent }}
                    tagsStyles={{
                        p: { color: 'black', marginBottom: 8 },
                    }}
                />
            </View>
        </View>
    );
};

export default ProductDesc;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    productDetails: {
        flexDirection: 'column',
        marginTop: 20,
    },
    name: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:10
    },
    size: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    singleSize: {
        marginRight: 20,
        paddingHorizontal: 10,
        textTransform: 'uppercase',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 5,
        paddingVertical: 5,
    },
    colors: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 15,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
