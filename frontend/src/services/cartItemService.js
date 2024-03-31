import axios from 'axios';
const baseUrl = 'http://localhost:3001/cart/'

const getAll = async ({userid}) => {
    try {
        const response = await axios.get(baseUrl ,{
            buyer_id: userid
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching cart items:', error);
        throw error;
    }
};

const incrementItem = async ({userid, itemid}) => {
    try {
        const response = await axios.post(baseUrl + 'increase',{
            buyer_id: userid,
            item_id: itemid
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while incrementing cart item:', error);
        throw error;
    }
};

const decrementItem = async ({userid, itemid}) => {
    try {
        const response = await axios.post(baseUrl + 'reduce',{
            buyer_id: userid,
            item_id: itemid
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while decrementing cart item:', error);
        throw error;
    }
};

const removeItem = async ({userid, itemid}) => {
    try {
        const response  = await axios.delete(baseUrl,{
            buyer_id: userid,
            item_id: itemid
        }
        )
        } catch (error) {
            console.error('Error occurred while removing cart item:', error);
            throw error;
        }
    }


const addItem = async ({userid, itemid}) => {
    try {
        const response = await axios.post(baseUrl,{
            buyer_id: userid,
            item_id: itemid
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while adding cart item:', error);
        throw error;
    }
}

export default { getAll, incrementItem, decrementItem, removeItem, addItem };