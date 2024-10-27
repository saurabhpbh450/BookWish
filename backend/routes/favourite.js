// this is a my backend\routes\favourite.js file
const router = require("express").Router();
const { response } = require("express");
const User = require("../models/user.js"); 
//const Book = require("../models/book.js");
const {authenticateToken} = require("./userAuth.js");

//add book to favourite api
router.put("/add-book-to-favourite", authenticateToken, async(req, res) => {
    try{
        const { bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in favourite"});
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid}});
        return res.status(200).json({ message: "Book is added to favourite"});
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
})
//delete book from favourite api
router.put("/remove-book-from-favourite", authenticateToken, async(req, res) => {
    try{
        const { bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid}});
        }
        
        return res.status(200).json({ message: "Book is removed from favourite"});
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
})
//get favourite book of partcular user api
router.get("/get-favourite-books", authenticateToken, async(req, res) => {
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favourateBooks = userData.favourites;
        return res.json({
            status: "success",
            data: favourateBooks,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({ message:"an error occurred" });
    }
})

module.exports = router;