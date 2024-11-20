import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const fetchAllCartProducts = async()=>{
    const token = await AsyncStorage.getItem("auth-token");
    try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/system/orders/all`,{
            headers:{
                'Authorization':'Bearer '+token,
                'Accept':'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error '+error)
    }
}