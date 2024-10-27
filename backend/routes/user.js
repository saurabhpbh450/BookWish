// this is my backend\routes\user.js file 
const router = require("express").Router();
const User = require("../models/user.js"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth.js");
//signup api
router.post("/sign-up" , async(req, res) => {
    try{
        const {username, email, password, address} = req.body;
        //check username length is more then 4
        if (username.length < 4) {
            return res
                .status(400)
                .json({message: "username length should be greater then 3"})
        }

        //check username already exist
        const existingUsername = await User.findOne({username: username});
        if (existingUsername) {
            return res.status(400).json({ message: "username already exists" });
        }

        //check email already exist
        const existingEmail = await User.findOne({email: email});
        if (existingEmail) {
            return res.status(400).json({ message: "email already exists" });
        }

        //check password length is more then 4
        if (password.length < 6) {
            return res
                .status(400)
                .json({message: "password length should be greater then 5"})
        }
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address
        });
        await newUser.save();
        return res.status(200).json({ message: "signUp Successfully"});
    }catch(error){
        console.error("Error during sign-up:", error);  // Logs more detailed error in the console
        res.status(500).json({ message: "Internal server error" });
    }
})

//signin api
router.post("/sign-in" , async(req, res) => {
    try{
        const { username, password } =  req.body;

        const existingUser = await User.findOne({username});
        if (!existingUser) {
            res.status(400).json({message: "invalid credentials"});
        }
        await bcrypt.compare(password, existingUser.password,(err, data) => {
            if (data) {
                const authClaims = [
                    {name: existingUser.username},
                    {role: existingUser.role},
                ]
                const token = jwt.sign({authClaims}, "bookStore45",{
                    expiresIn: "30d",
                })
                res.status(200).json({id: existingUser.id, role: existingUser.role, token: token})
            }else{
                res.status(400).json({message: "invalid credentials"});
            }

        });
    }catch(error){
        console.error("Error during sign-in:", error);  // Logs more detailed error in the console
        res.status(500).json({ message: "Internal server error" });
    }
})

//get user information api
router.get("/get-user-information",authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        // console.error("Error during sign-in:", error);  // Logs more detailed error in the console
        res.status(500).json({ message: "Internal server error" }); 
    }
})

//update address api
router.put("/update-address",authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address: address});
        return res.status(200).json({message: "Address updated successfully"});
    } catch (error) {
        // console.error("Error during sign-in:", error);  // Logs more detailed error in the console
        res.status(500).json({ message: "Internal server error" }); 
    }
})
module.exports = router;