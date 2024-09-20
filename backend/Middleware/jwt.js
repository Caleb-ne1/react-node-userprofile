require("dotenv").config();
const {sign, verify} = require("jsonwebtoken");

const generateToken = (user) => {
    const accessToken = sign({email : user.email, id: user.id}, "helloThere");
    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-token'];

    if (!accessToken) {
        return res.status(401).send("User not authenticated");
    }

    try {
        const validToken = verify(accessToken, "helloThere");
        if (validToken) {
            req.authenticated = true;
            req.user = validToken; 
            return next();
        }
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token',  err });
    }
};

module.exports = {generateToken, validateToken};
