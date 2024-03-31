import axios from "axios";

const baseUrl = 'http://localhost:3001/warehouse';

const getWarehouseData = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching warehouse data:', error);
        throw error;
    }
}

export {
    getWarehouseData
};