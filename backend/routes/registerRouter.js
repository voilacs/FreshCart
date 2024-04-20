const Router = require('express').Router;
const registerRouter = Router();
const registerService = require('../services/registerService');
registerRouter.get('/', (req, res) => {

    res.send(
      <!DOCTYPE html>
      <html>
        <head>
          <title>Registration Success</title>
          <script>
            setTimeout(function() {
              window.location.href = '/'; // Adjust this URL as needed
            }, 5000); // 5000 milliseconds = 5 seconds
          </script>
        </head>
        <body>
          <h1>Registration Successful!</h1>
          <p>You will be redirected to the main page in 5 seconds.</p>
        </body>
      </html>
    );
  });
registerRouter.post('/', async (req, res) => {
  const { buyerName, buyerPhone, buyerEmail, buyerAddress, loyaltyPoints, paymentMode, buyerDob, membershipType, password } = req.body;
console.log("registerRouter working");
  try {
    const newBuyer = await registerService.registerBuyer({
      buyerName,
      buyerPhone,
      buyerEmail,
      buyerAddress,
      loyaltyPoints,
      paymentMode,
      buyerDob,
      membershipType,
      password
    });

    if (newBuyer) {
      return res.status(201).json(newBuyer);
    } else {
      return res.status(400).json({ message: 'Registration failed' });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = registerRouter;
