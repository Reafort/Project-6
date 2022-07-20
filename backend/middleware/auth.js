const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {                                     //catch block- any errors automatically sends a failed response back to the client
    const token = req.headers.authorization.split(' ')[1];    // extract the token      
    const decodedToken = jwt.verify(token, 'SecretKey');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};