const db = require("../utils/db");

const getWarehouseData = async () => {
    try {
        const warehouses = await db.all('SELECT * FROM Warehouse');
        const items = await db.all('SELECT * FROM Item');
        const warehouseData = await Promise.all(warehouses.map(async (warehouse) => {
            const { warehouse_id, warehouse_address, warehouse_name } = warehouse;
            const inventory = await Promise.all(items.map(async (item) => {
                const { item_id, item_name } = item;
                const stock = await db.get('SELECT quantity_in_stock FROM Warehouse_Inventory WHERE item_id = ? AND warehouse_id = ?', [item_id, warehouse_id]);
                return { [item_name]: stock ? stock.quantity_in_stock : 0 }; // Ensure stock is not undefined
            }));
            const mergedInventory = Object.assign({}, ...inventory); // Merge the inventory objects
            return { warehouse_id, warehouse_name, warehouse_address, ...mergedInventory };
        }));
        return warehouseData;
    } catch (error) {
        console.error('Error fetching warehouse data:', error);
        throw error;
    }
};



module.exports = {
    getWarehouseData
};