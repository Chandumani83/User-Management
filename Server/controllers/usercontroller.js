const User = require('../models/user');


const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude passwords
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const addUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password, 
            role: role || 'user', 
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
             return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};


const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            
            
        
            // }
            await user.deleteOne(); 
            
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const updateUser = async (req, res) => {
    const { name, email, role, password } = req.body;
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            user.role = role || user.role;
            if (password) { 
                user.password = password; 
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
         if (error.code === 11000) { // Duplicate key error for email
            return res.status(400).json({ message: 'Email already in use.' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    getUsers,
    addUser,
    deleteUser,
    updateUser, 
};