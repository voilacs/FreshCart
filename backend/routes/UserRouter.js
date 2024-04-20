const { Router } = require('express');
const userService = require('../services/UserService');

const userRouter = Router();

userRouter.get('/foryou/:buyer_id', async (req, res) => {
    const { buyer_id } = req.params;
    try {
        const result = await userService.forYou({ buyer_id });
        return res.status(200).json(result);
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});

module.exports = userRouter;
