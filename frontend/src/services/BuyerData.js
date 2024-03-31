import axios from "axios";
const baseUrl = 'http://localhost:3001/buyerData';

const getBuyerData = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching buyer data:', error);
        throw error;
    }
}

export {
    getBuyerData
};
