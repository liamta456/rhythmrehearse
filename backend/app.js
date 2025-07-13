const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});