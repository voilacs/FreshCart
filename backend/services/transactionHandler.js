const transactionHandler = async ({buyer, total_cost})=>{
    try {
        // Start a transaction
        db.run('BEGIN TRANSACTION');
        // Place order
        db.run('INSERT INTO Orders (buyer_id, total_cost) VALUES (?, ?)', [buyer, total_cost]);
        // Commit transaction
        db.run('COMMIT');
        const order_id = db.get('SELECT last_insert_rowid() as order_id');
        return order_id;
    } catch (error) {
        // Rollback transaction if there's an error
        db.run('ROLLBACK');
        console.error('Error in orderItem:', error);
        throw new Error('Failed to process order');
    }
    
}
