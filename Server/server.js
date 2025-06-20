const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userroutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => {
    res.send('Admin Panel API is running...');
});


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));