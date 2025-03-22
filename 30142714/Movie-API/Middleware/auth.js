const jwt = require('jsonwebtoken');
const secret = 'your_secret_key';

// Generating the token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
};

// Verifying the token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('No Token Provided');
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = { generateToken, verifyToken };
