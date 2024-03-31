const db = require("../utils/db");
const getAllItems = async() => {
    const items = await db.all('SELECT * FROM Item');
    return items;
}

module.exports = {
    getAllItems
}