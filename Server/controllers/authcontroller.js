const jwt = require('jsonwebtoken');
require('dotenv').config();


const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        
        
        
        const pseudoAdminId = 'admin_user_001'; 

        const token = jwt.sign({ id: pseudoAdminId, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '1h', 
        });

        res.json({
            token,
            user: { 
                id: pseudoAdminId,
                email: ADMIN_EMAIL,
                role: 'admin',
                name: 'Admin User' 
            }
        });
    } else {
        res.status(401).json({ message: 'Invalid admin credentials' });
    }
};

module.exports = { loginAdmin };