const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log('Authenticating.');
    // HTTP request header takes the standard form of:
        // Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    let token = null;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Authentication unsuccessful.');
        return res.status(401).json({ error: 'Unauthorized.' });
    }
    token = authHeader.substring('Bearer '.length);
    try {
        console.log('Authentication successful.');
        const decodedPayload = jwt.verify(token, process.env.SUPABASE_LEGACY_JWT_SECRET);
        req.user = { id: decodedPayload.sub };
        next();
    } catch (error) {
        console.log('Authentication unsuccessful.');
        return res.status(401).json({ error: 'Unauthorized.' });
    }
};

module.exports = authMiddleware;