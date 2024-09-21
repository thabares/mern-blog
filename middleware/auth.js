const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Access the token from cookies
  const token = req.cookies.token; // Assuming 'token' is the name of your cookie
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded', decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
