// this is my backend\routes\order.js file 
const router = require("express").Router();
const Order = require("../models/order.js"); 
const Book = require("../models/order.js");
const {authenticateToken} = require("./userAuth.js");
const User = require("../models/user.js"); 

//place order api 
router.post("/place-order", authenticateToken, async(req,res) => {
    try{
        const {id} = req.headers;
        const {order} = req.body;
        for (const orderData of order) {
            const newOrder = new Order({user: id, book: orderData._id});
            const orderDataFromDb = await newOrder.save();
            //saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: {orders: orderDataFromDb._id},
            });
            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: {cart: orderData._id}
            });
        }
        return res.json({
            status: "success",
            message: "order placed successfully"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "an error occured"});
    }
})

// get order history of particular user api
router.get("/get-order-history", authenticateToken, async(req,res) => {
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "book"},
        });
        const orderData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: orderData,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "an error occured"});
    }
});

//get all order --admin api
router.get("/get-all-orders", authenticateToken, async(req, res) => {
    try{
        const userData = await Order.find()
            .populate({
                path: "book",
            })
            .populate({
                path: "user"
            })
            .sort({createAt: -1});
        return res.json({
            status: "success",
            data: userData,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "an error occured"});
    }
})

//update order status --admin api
router.put("/update-status/:id", authenticateToken, async(req, res) => {
    try{
        const {id}  = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status});
        return res.json({
            status: "success", 
            message: "status updated successfully",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "an error occured"});
    }
})
module.exports = router;