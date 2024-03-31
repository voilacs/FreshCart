const Router = require('express').Router;
const warehouseHandler = require('../services/WarehouseService');
const router = Router();

router.get('/', async (req, res) => {
    const result = await warehouseHandler.getWarehouseData();
    res.status(200).json(result);
}
)

module.exports = router;