//this is my backend\app.js file
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./connection/conn.js");

const prt = process.env.PORT || 1000;
const user = require("./routes/user.js");
const Books = require("./routes/book.js");
const Favourite = require("./routes/favourite.js");
const Cart = require("./routes/cart.js");
const Order = require("./routes/order.js");

app.use(cors());

app.use(express.json());

app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
app.listen(prt, () => {
    console.log(`server started on port ${prt}`);
});
