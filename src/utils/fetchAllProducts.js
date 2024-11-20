import axios from "axios";

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/services/products`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error Fetching All Products", error);
  }
};
