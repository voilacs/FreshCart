const express = require("express");
const cors = require("cors");
const itemBuyerRouter = require("./routes/itemBuyerRouter");
const loginRouter  = require("./routes/loginRouter");
const cartRouter = require("./routes/cartRouter");
const warehouseRouter = require("./routes/warehouseRouter");
const buyerDataRouter = require("./routes/buyerDataRouter");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/cart',cartRouter)
app.use("/items", itemBuyerRouter);
app.use("/login", loginRouter);
app.use('/warehouse',warehouseRouter)
app.use('/buyerData',buyerDataRouter)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);
