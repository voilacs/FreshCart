const db = require("../utils/db");
const getAllItems = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Item", (err, rows) => {
            if (err) {
                console.error("Database error: ", err);
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });
    });
}

module.exports = {
    getAllItems
}