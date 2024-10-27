//this is my backend\models\user.js file
const mongoose = require("mongoose");


const user = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://img.freepik.com/free-vector/purple-man-with-blue-hair_24877-82003.jpg?w=740&t=st=1726886402~exp=1726887002~hmac=88b5a80acf8436eae2d4be22101fd629526f3869107cd1de1cef4fb5d04cdab9",
    },
    //"https://th.bing.com/th/id/OIP.z1qiTo8DMqQhhAtW7NfLsQHaHa?rs=1&pid=ImgDetMain"  https://img.freepik.com/free-vector/purple-man-with-blue-hair_24877-82003.jpg?w=740&t=st=1726886402~exp=1726887002~hmac=88b5a80acf8436eae2d4be22101fd629526f3869107cd1de1cef4fb5d04cdab9
    role:{
        type: String,
        default:"user",
        enum: ["user", "admin"],
    },
    favourites:[
        {
            type: mongoose.Types.ObjectId,
            ref:"books",
        },
    ],
    cart:[
        {
            type: mongoose.Types.ObjectId,
            ref:"books",
        },
    ],
    orders:[
        {
            type: mongoose.Types.ObjectId,
            ref:"order",
        },
    ],

},
{timestamps: true}
);
module.exports = mongoose.model("user", user);