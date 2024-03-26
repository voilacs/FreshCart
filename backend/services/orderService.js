const db = require('../utils/db');

const orderItem =  ({ buyer_id, product_id, quantity , order_id}) => {
    try {
        // Check buyer's pincode and mode of payment
        const buyer =  db.get('SELECT buyer_address, payment_mode FROM Buyer WHERE buyer_id = ?', [buyer_id]);
        const buyerPincode = buyer.buyer_address;
        const mode_of_payment = buyer.payment_mode;
        console.log('buyer' , buyer);
        // Check stock at buyer's pincode
        let stock =  db.get('SELECT quantity_in_stock FROM Warehouse_Inventory WHERE item_id = ? AND warehouse_id IN (SELECT warehouse_id FROM Warehouse WHERE warehouse_address = ?)', [product_id, buyerPincode]);
        let availableQuantity = stock.quantity_in_stock;

        if (availableQuantity < quantity) {
            // Insufficient stock at buyer's pincode, check main warehouse
            stock =  db.get('SELECT quantity_in_stock FROM Warehouse_Inventory WHERE item_id = ? AND warehouse_id = 1', [product_id]);
            availableQuantity = stock.quantity_in_stock;

            if (availableQuantity < quantity) {
                // Insufficient stock at main warehouse as well
                return 'Insufficient Stock';
            }
        }

        // Fetch price of the product
        const product = db.get('SELECT mrp FROM Item WHERE item_id = ?', [product_id]);
        const productPrice = product.mrp;

        // Calculate total cost
        const total_cost = productPrice * quantity;
        
        // Start a transaction
        db.run('BEGIN TRANSACTION');

        // Place order
        db.run('INSERT INTO Order_Details (order_id, item_id, quantity) VALUES (?, ?, ?)', [order_id, product_id, quantity]);

        // Reduce inventory
        db.run('UPDATE Warehouse_Inventory SET quantity_in_stock = quantity_in_stock - ? WHERE item_id = ? AND warehouse_id IN (SELECT warehouse_id FROM Warehouse WHERE warehouse_address = ?)', [quantity, product_id, buyerPincode]);

        // Commit transaction
        db.run('COMMIT');

        return 'Order placed successfully';
    } catch (error) {
        // Rollback transaction if there's an error
        db.run('ROLLBACK');
        console.error('Error in orderItem:', error);
        throw new Error('Failed to process order');
    }
};


module.exports = {
    orderItem
}