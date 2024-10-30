//this is my backend\connection\conn.js file
const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect('mongodb+srv://saurabhmishrapbh100:Project100@cluster100.4ubku.mongodb.net/Project100');
        console.log("connected to database");
    } catch (error) {
        console.log(error);
    }
};
conn();
