import axios from 'axios';
const baseUrl = 'http://localhost:3001/register'

const registerBuyer = async (formData) => {
  try {
    const response = await axios.post(baseUrl , formData);
    return response.data;
    console.log("trying to Register Buyer");
  } catch (error) {
    console.error('Error occurred while registering: testing this thing', error);
    throw error;    
  }
};

export default { registerBuyer };
