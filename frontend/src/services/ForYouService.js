import axios from "axios";
const baseUrl = 'http://localhost:3001/user';

const getForYou = async ({ buyer_id }) => {
    try {
        const response = await axios.get(`${baseUrl}/forYou/${buyer_id}`); 
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching for you items:', error);
        throw error;
    }
}

export {
    getForYou
};
