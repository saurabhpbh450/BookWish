//this is my backend\routes\cart.js file
const router = require("express").Router();
const { response } = require("express");
const User = require("../models/user.js"); 
const {authenticateToken} = require("./userAuth.js");

//put book to cart
router.put("/add-to-cart", authenticateToken, async(req, res) => {
    try{
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            return res.json({
                status: "success",
                message: "book is already in cart",
            });
        }
        await User.findByIdAndUpdate(id, {
            $push: {cart: bookid},
        });
        return res.json({
            status: "success",
            message: "book is added to cart",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "an error occured"});
    }
})

// remove from cart api 
router.put("/remove-from-cart/:bookid", authenticateToken, async(req, res) => {
    try{
        const {bookid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id, { $pull: {cart: bookid},});
        return res.json({
            status: "success", 
            message: "book is removed from cart",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "an error occured"});
    }
})

// get cart of partcular user api 
router.get("/get-user-cart", authenticateToken, async(req, res) => {
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status: "success",
            data: cart,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "an error occured"});
    }
})
module.exports = router;