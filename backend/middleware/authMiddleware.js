require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // HTTP request header takes the standard form of:
        // Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    let token = null;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized. '});
    }
    token = authHeader.substring('Bearer '.length);
    try {
        const decodedPayload = jwt.verify(token, process.env.SUPABASE_LEGACY_JWT_SECRET);
        req.user = { id: decodedPayload.sub };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized. '});
    }
};

module.exports = authMiddleware;