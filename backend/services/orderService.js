const db = require('../utils/db');

const orderItem = async ({ buyer_id, item_id, quantity, order_id }) => {
    try {
        const buyer = await db.get('SELECT buyer_address, payment_mode FROM Buyer WHERE buyer_id = ?', [buyer_id]);
        const buyerPincode = buyer.buyer_address;
        const warehouse = await db.get('SELECT * FROM Warehouse WHERE warehouse_address = ?', [buyerPincode]);
        let stock = await db.get('SELECT quantity_in_stock FROM Warehouse_Inventory WHERE item_id = ? AND warehouse_id = ?', [item_id, warehouse.warehouse_id]);
    
        let availableQuantity = stock!==undefined ? stock.quantity_in_stock: 0; 
        let d = false;
        if (availableQuantity < quantity) {
            d= true;
        }

        // Start a transaction
        await db.run('BEGIN TRANSACTION');

        // Place order
        await db.run('INSERT INTO Order_Details (order_id, item_id, quantity) VALUES (?, ?, ?)', [order_id, item_id, quantity]);
        await db.run('UPDATE Warehouse_Inventory SET quantity_in_stock = quantity_in_stock - ? WHERE item_id = ? AND warehouse_id = ?', [Math.min(availableQuantity,quantity), item_id, warehouse.warehouse_id]);
        if (d) await db.run ('UPDATE Warehouse_Inventory SET quantity_in_stock = quantity_in_stock - ? WHERE item_id = ? AND warehouse_id = 1', [quantity-availableQuantity, item_id]);
        if (availableQuantity-quantity <20) {
            const stock = await db.get('SELECT quantity_in_stock FROM Warehouse_Inventory WHERE item_id = ? AND warehouse_id = 1', [item_id]);
            const availableQuantityinPrimary = stock.quantity_in_stock;
            const stock2 = await db.get('SELECT quantity_in_stock FROM Warehouse_Inventory WHERE item_id = ? AND warehouse_id = ?', [item_id, warehouse.warehouse_id]);
            await db.run('UPDATE Warehouse_Inventory SET quantity_in_stock = quantity_in_stock - ? WHERE item_id = ? AND warehouse_id = 1', [Math.min(80,availableQuantityinPrimary), item_id]);
            if (stock2===undefined) await db.run('INSERT INTO Warehouse_Inventory (warehouse_id, item_id, quantity_in_stock) VALUES (?, ?, ?)', [warehouse.warehouse_id, item_id, 0]);
            await db.run('UPDATE Warehouse_Inventory SET quantity_in_stock = quantity_in_stock + ? WHERE item_id = ? AND warehouse_id = ?', [Math.min(80,availableQuantityinPrimary), item_id, warehouse.warehouse_id]);
        }
        // Commit transaction
        await db.run('COMMIT');

        return 'Order placed successfully';
    } catch (error) {
        // Rollback transaction if there's an error
        await db.run('ROLLBACK');
        console.error('Error in orderItem:', error);
        throw new Error('Failed to process order');
    }
};


module.exports = {
    orderItem
}