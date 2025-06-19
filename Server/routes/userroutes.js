const express = require('express');
const { getUsers, addUser, deleteUser, updateUser } = require('../controllers/usercontroller');
const { protect } = require('../middleware/authmiddleware');
const router = express.Router();


router.route('/')
    .get(protect, getUsers)
    .post(protect, addUser);

router.route('/:id')
    .delete(protect, deleteUser)
    .put(protect, updateUser); 

module.exports = router;