const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("freshcart.db", (err) => {
    if (err) {
        console.error("Database opening error: ", err);
        return;
    }
    console.log("Connected to the freshcart database.");
});

module.exports = db;