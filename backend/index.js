const express = require("express");
const cors = require("cors");
const itemBuyerRouter = require("./routes/itemBuyerRouter");
const loginRouter  = require("./routes/loginRouter");
const app = express();
const PORT = 3001;




app.use(cors());
app.use(express.json());

app.use("/b/items", itemBuyerRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);
