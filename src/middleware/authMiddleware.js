const jwt = require('jsonwebtoken');

exports.verifyAdmin = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : authHeader;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the username in the token matches the admin username
    if (decoded.user_name !== process.env.ADMIN_USERNAME) {
      return res.status(403).json({ message: 'Unauthorized: Admin access only' });
    }

    // If everything is okay, proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};
