const Router = require('express').Router;

const buyerDataHandler = require('../services/BuyerService');

const router = Router();

router.get('/', async (req, res) => {
    const result = await buyerDataHandler.getBuyerData();
    res.status(200).json(result);
}
)

module.exports = router;
