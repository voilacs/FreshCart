import axios from 'axios';
const baseUrl = 'http://localhost:3001/login'

const loginBuyer = async ({email, password}) => {
    try {
        const response = await axios.post(baseUrl + '/buyer', {
            email: email,
            password: password
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while logging in:', error);
        throw error;
    }
}

export default { loginBuyer };