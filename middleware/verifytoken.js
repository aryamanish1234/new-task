const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");

dotenv.config();



exports.verifyToken = (req, res, next) => {
    const token = req.headers["token"];
    // const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET, (err, id) => {
        if (err) {
            return res.status(403).json({
                meaage: "Token is Invalid"
            })
        }
        req.id = id
        next();
    })
}