import axios from 'axios';

export const fetchAllOrders = async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/system/orders/all`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200 && response.data.success) {
            return response;
        } else if (response.status === 401) {
            throw new Error('Unauthorized access. Please log in again.');
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};
