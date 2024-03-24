const db = require("../utils/db");

const loginBuyer = ({email, password}) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Buyer WHERE buyer_email = ? AND password = ?", [email, password], (err, rows) => {
            if (err) {
                console.error("Database error: ", err);
                reject(err);
            } else {
                console.log("username: ", email, "password: ", password, "rows: ", rows)
                if (rows.length == 1) {
                    const {buyer_id}  = rows[0]; 
                    resolve(buyer_id);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

const loginSeller = ({email, password}) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Seller WHERE seller_email = ? AND password = ?", [email, password], (err, rows) => {
            if (err) {
                console.error("Database error: ", err);
                reject(err);
            } else {
                console.log("username: ", email, "password: ", password, "rows: ", rows)
                if (rows.length == 1) {
                    const {seller_id}  = rows[0]; 
                    resolve(seller_id);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

module.exports = {
    loginBuyer,
    loginSeller
}