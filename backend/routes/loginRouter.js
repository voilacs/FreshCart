const Router = require('express').Router;
const loginRouter = Router();
const loginService = require('../services/loginService');

loginRouter.post('/buyer', async (req, res) => {
    const { email, password } = req.body;
    console.log("email: ", email, "password: ", password);
    try {
        const token = await loginService.loginBuyer({ email, password});
        if (token === null) {
            return res.status(401).json({ message: "Invalid credentials" }); 
        }
        return res.status(200).json(token); 
    } catch (e) {
        return res.status(401).json({ message: e.message }); 
    }
});

loginRouter.post('/seller', async (req, res) => {
    const { email, password } = req.body;
    console.log("email: ", email, "password: ", password);
    try {
        const token = await loginService.loginSeller({ email, password});
        if (token === null) {
            return res.status(401).json({ message: "Invalid credentials" }); 
        }
        return res.status(200).json(token); 
    } catch (e) {
        return res.status(401).json({ message: e.message }); 
    }
}
);

module.exports = loginRouter;