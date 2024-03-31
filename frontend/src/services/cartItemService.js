import axios from 'axios';
const baseUrl = 'http://localhost:3001/cart'

const getAll = async ({ buyer_id }) => {
    try {
        const response = await axios.get(baseUrl, {
            params: {
                buyer_id: buyer_id
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching cart items:', error);
        throw error;
    }
};


const incrementItem = async ({buyer_id, item_id}) => {
    try {
        const response = await axios.post(baseUrl + '/increase',{
            buyer_id,
            item_id
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while incrementing cart item:', error);
        throw error;
    }
};

const decrementItem = async ({buyer_id, item_id}) => {
    try {
        const response = await axios.post(baseUrl + '/reduce',{
            buyer_id,
            item_id
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while decrementing cart item:', error);
        throw error;
    }
};

const removeItem = async ({ buyer_id, item_id }) => {
    try {
        const response = await axios.post(baseUrl+'/delete', {
            buyer_id,
            item_id
        });
    } catch (error) {
        console.error('Error occurred while removing cart item:', error);
        throw error;
    }
}



const addItem = async ({buyer_id, item_id}) => {
    try {
        const response = await axios.post(baseUrl,{
            buyer_id,
            item_id,
            quantity : 1
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while adding cart item:', error);
        throw error;
    }
}

export default { getAll, incrementItem, decrementItem, removeItem, addItem };