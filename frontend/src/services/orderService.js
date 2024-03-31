import axios from "axios";

const baseUrl = 'http://localhost:3001/cart';

const proceedToCheckout = async ({ buyer_id }) => {
    try {
        const response = await axios.post(baseUrl + '/proceed', {
            buyer_id
        });
        if (response.data.message === 'Order Verified') {
            return response.data;
        }
        else{
            return({message:'You have ordered more than 50 units of one or few items, please reduce the quantity to proceed'});
        }
    } catch (error) {
        console.error('Error occurred while proceeding to checkout:', error);
        throw error;
    }
}



const orderFromCart = async ({ buyer_id }) => {
    try {
        const response = await axios.post(baseUrl + '/order', {
            buyer_id
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while ordering from cart:', error);
        throw error;
    }
}

export  {
    proceedToCheckout,
    orderFromCart
};