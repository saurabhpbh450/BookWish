// this is my backend\routes\userAuth.js file
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({message: "Authentication token required"});
    }
    jwt.verify(token, "bookStore45", (err, user) => {
        if (err) {
            return res.status(403).json({message: "the token expired, please signin again"});
        }
        req.user = user;
        next();
    });
};

module.exports = {authenticateToken};