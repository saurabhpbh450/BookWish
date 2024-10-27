// this is my backend\routes\book.js file
const router = require("express").Router();
const User = require("../models/user.js"); 
const Book = require("../models/book.js");
const {authenticateToken} = require("./userAuth.js");

//add book api
router.post("/add-book", authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({message: "you have not access to perform admin work"});
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({message: "book added successfully"})
    }catch{
        res.status(500).json({ message: "Internal server error" }); 
    }
})

//update book api
router.put("/update-book", authenticateToken, async (req, res) => {
    try{
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,
    });
    return res.status(200).json({ message: "book updated successfully" });
    }catch{
        res.status(500).json({ message: "Internal server error" }); 
    }
});


//delete book api
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "book deleted successfully" });
    }catch{
        res.status(500).json({ message: "Internal server error" }); 
    } 
})

//get all books api
router.get("/get-all-books", async (req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1});
        return res.json({
            status: "success",
            data: books,
        });
    } catch (error){
        console.log(error);
        return res.status(500).json({message: "an error accured "});
    }
})

//get recently added books limit 4 api
router.get("/get-recent-books", async (req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.json({
            status: "success",
            data: books,
        });
    } catch (error){
        console.log(error);
        return res.status(500).json({message: "an error accured "});
    }
})

// get book by id api
router.get("/get-book-by-id/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "success",
            data: book,
        });
    } catch (error){
        console.log(error);
        return res.status(500).json({message: "an error accured "});
    }
})

module.exports = router;