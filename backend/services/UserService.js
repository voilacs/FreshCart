const db = require("../utils/db");

const forYou = async({buyer_id})=>{
    let categories = await db.all('SELECT * FROM interested_categories WHERE buyer_id = ?', [buyer_id]);
    categories.sort((a,b) => b.quantity - a.quantity);
    categories = categories.length < 3 ? categories : categories.slice(0, 3);
    f = {}
    for (const category of categories){
        const items = await db.all('SELECT * FROM Item WHERE category_id = ?', [category.category_id]);
        const category_name = await db.get('SELECT category_name FROM Category WHERE category_id = ?', [category.category_id]);
        f[category_name.category_name] = items;
    }

    return f;
}
module.exports = {
    forYou
}