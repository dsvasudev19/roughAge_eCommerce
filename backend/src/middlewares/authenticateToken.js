const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const {User} = require('../models');

// const secretKey = 'yourSecretKey';

// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, secretKey, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// };

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(403).json({message: 'Token is not valid'});
    }

    // Assuming you store user ID in the token payload
    const userId = decoded.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }

      // Set the user object in the request for later use
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({message: 'Internal Server Error'});
    }
  });
};

module.exports = authenticateToken;