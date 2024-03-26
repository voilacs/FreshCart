const Router = require('express').Router;
const cartHandler = require('../services/cartHandler');
const router = Router();

router.get('/', async (req,res)=>{
    const {buyer_id} = req.body;
    const result = await cartHandler.getCart({buyer_id});
    res.status(200).json(result);
})

router.post('/',async (req,res)=>{
    const {buyer_id,item_id,quantity} = req.body;
    const result = await cartHandler.addToCart({buyer_id,item_id,quantity});
    res.status(200).json({result});
})

router.delete('/',async(req,res)=>{
    const {buyer_id,item_id} = req.body;
    const result = await cartHandler.deleteFromCart({buyer_id,item_id});
    res.status(200).json({result});
}
)
router.post('/proceed', async (req, res) => {
    try {
        const body = req.body;
        buyer_id = parseInt(body.buyer_id); 
        const r = await cartHandler.proceedToCheckout({ buyer_id });
        if (r.result) res.status(200).json({message : 'Order Verified'})
        else res.status(400).json({message : 'Insufficient Stock'})
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/order',async (req,res)=>{
    const {buyer_id} = req.body;
    const result = await cartHandler.orderFromCart({buyer_id});
    res.status(200).json({result});
    
})

module.exports = router;