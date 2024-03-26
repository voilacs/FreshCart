const db = require('../utils/db');
const transactionHandler = async ({buyer, total_cost})=>{
    try {
        // Start a transaction
        await db.run('BEGIN TRANSACTION');
        // Place order
        await db.run('INSERT INTO Transaction_details (pincode, total_cost, order_date, mode_payment, buyer_id) VALUES (?, ?, ?, ?, ?)', [buyer.buyer_address, total_cost, new Date(), buyer.payment_mode, buyer.buyer_id]);
        // Commit transaction
        // Commit transaction
        await db.run('UPDATE Buyer SET spent_amount = spent_amount + ? WHERE buyer_id = ?', [total_cost, buyer.buyer_id]);
        await db.run('COMMIT');
        const order_id = await db.get('SELECT last_insert_rowid() as order_id');
        return order_id;
    } catch (error) {
        // Rollback transaction if there's an error
        await db.run('ROLLBACK');
        console.error('Error in orderItem:', error);
        throw new Error('Failed to process order');
    }
    
}

module.exports =  transactionHandler;