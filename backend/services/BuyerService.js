const db = require("../utils/db");

const getBuyerData = async () => { 
    try {
        const buyers = await db.all('SELECT * FROM Buyer');
        return buyers;
    } catch (error) {
        console.error('Error fetching buyer data:', error);
        throw error;
    }
}

module.exports = {
        getBuyerData  }