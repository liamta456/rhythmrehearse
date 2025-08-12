const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const practiceSessionRoutes = require('./routes/practiceSessionRoutes');
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/practice-session', authMiddleware, practiceSessionRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});