const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            console.log('JWT_SECRET:', process.env.JWT_SECRET);
            console.log('Incoming token:', token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            
            if (decoded.id === 'admin_user_001' && decoded.role === 'admin') {
                req.user = {
                    id: decoded.id,
                    email: process.env.ADMIN_EMAIL,
                    role: 'admin',
                    name: 'Admin User'
                };
                return next();
            }

            
            req.user = await User.findById(decoded.id).select('-password'); 

            if (!req.user || req.user.role !== 'admin') {
                 return res.status(403).json({ message: 'Not authorized, admin role required' });
            }
            next();
        } catch (error) {
            console.error('JWT verification error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };