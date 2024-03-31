const db = require('../utils/db');
const orderService = require('./orderService');
const transactionHandler = require('./transactionHandler');

const proceedToCheckout = async ({ buyer_id }) => {
    try {
        const cart = await getCart({ buyer_id });
        let outOfStockItems = [];
        const {buyer_address} = await db.get('SELECT buyer_address FROM Buyer WHERE buyer_id = ?', [buyer_id]);
        const warehouse = await db.get('SELECT * FROM Warehouse WHERE warehouse_address = ?', [buyer_address]);
        const warehouse_id = warehouse.warehouse_id;
        for (const cartItem of cart) {
            const { item_id, quantity } = cartItem;
            const result = await inStock({item_id, warehouse_id ,quantity });
            if (!result) {
                outOfStockItems.push(item_id);
            }
        }
        if (outOfStockItems.length > 0) {
            const items = await db.all('SELECT item_name FROM Item WHERE item_id IN (?)', [outOfStockItems]);
            const outOfStockItemNames = items.map(item => item.item_name).join(', ');
            return ({result:false,arr:outOfStockItemNames})
        }
        return ({result:true,arr:[]})
    } catch (error) {
        console.error('Error in proceedToCheckout:', error);
        return new Error('Failed to proceed to checkout');
    }
};

const getCart = async ({ buyer_id }) => {
    const r = await db.all('SELECT * FROM Cart WHERE buyer_id = ?', [buyer_id]);
    return r;
};

const reduceQuantity = async({buyer_id,item_id})=>{
    await db.run('UPDATE Cart SET quantity = quantity - 1 WHERE buyer_id = ? AND item_id = ?', [buyer_id, item_id]);j
}
const increaseQuantity = async({buyer_id,item_id})=>{
    await db.run('UPDATE Cart SET quantity = quantity + 1 WHERE buyer_id = ? AND item_id = ?', [buyer_id, item_id]);
}

const inStock = async ({ item_id, warehouse_id, quantity }) => {
    if (quantity >50) return false;
    const stock = await db.get('SELECT quantity_in_stock FROM Warehouse_Inventory WHERE item_id = ? AND warehouse_id = ?', [item_id, warehouse_id]);
    const availableQuantity = stock.quantity_in_stock;
    if (availableQuantity < quantity) {
        const stockinPrimary = await db.get('SELECT quantity_in_stock FROM Warehouse_Inventory WHERE item_id = ? AND warehouse_id = 1', [item_id]);
        const availableQuantityinPrimary = stockinPrimary.quantity_in_stock;
        if (availableQuantityinPrimary + availableQuantity < quantity) return false;
    }
    return true;
};

const getAllItems = async () => {
    const r = await db.all('SELECT * FROM Cart');
    return r;
}
const addToCart = async ({ buyer_id, item_id, quantity }) => {
    const cartItem = await db.get('SELECT * FROM Cart WHERE buyer_id = ? AND item_id = ?', [buyer_id, item_id]);
    if (cartItem) {
        await db.run('UPDATE Cart SET quantity = quantity + ? WHERE buyer_id = ? AND item_id = ?', [quantity, buyer_id, item_id]);
    } else {
        await db.run('INSERT INTO Cart (buyer_id, item_id, quantity) VALUES (?, ?, ?)', [buyer_id, item_id, quantity]);
    }
};

const getCartToShow  =  async ({buyer_id})=>{
    const r = await getCart({buyer_id});
    // get names of items
    const itemIds =r.map(item => item.item_id);
    const items = await db.all('SELECT item_name FROM Item WHERE item_id IN (' + itemIds.join(',') + ')');    const itemNames = items.map(item=>item.item_name);
    return r.map((item,index)=>({...item,item_name:itemNames[index]}));
}
const deleteFromCart = async ({ buyer_id, item_id }) => {
    await db.run('DELETE FROM Cart WHERE buyer_id = ? AND item_id = ?', [buyer_id, item_id]);
}
const orderFromCart = async ({ buyer_id }) => {
    try {
        const cart = await getCart({ buyer_id });
        let total_cost = 0;

        for (const cartItem of cart) {
            const { item_id, quantity } = cartItem;
            const product = await db.get('SELECT current_price FROM Item WHERE item_id = ?', [item_id]);
            const productPrice = product.current_price;
            total_cost += productPrice * quantity;
        }
        const buyer = await db.get('SELECT * FROM Buyer WHERE buyer_id = ?', [buyer_id]);
        const order_id = await transactionHandler({ buyer, total_cost });
        
        for (const cartItem of cart) {
            const { item_id, quantity } = cartItem;
            await orderService.orderItem({ buyer_id, item_id, quantity, order_id });
        }

        await db.run('DELETE FROM Cart WHERE buyer_id = ?', [buyer_id]);
        console.log('Order placed successfully', order_id);
        const order_summary = {amount : total_cost, order_id};
        return order_summary; 
    } catch (error) {
        console.error('Error in orderFromCart:', error);
        throw new Error('Failed to place order from cart');
    }
};

module.exports = {
    orderFromCart,
    getCart,
    addToCart,
    proceedToCheckout,
    getAllItems,
    deleteFromCart,
    reduceQuantity,
    increaseQuantity,
    getCartToShow
};
