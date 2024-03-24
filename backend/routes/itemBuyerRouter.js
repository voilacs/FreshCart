const Router = require('express').Router;

const router = Router();
const ItemBuyerService = require('../services/itemBuyerService');
router.get("/", async (req, res) => {
    const items = await ItemBuyerService.getAllItems();
    res.json(items);
}
);

module.exports = router;