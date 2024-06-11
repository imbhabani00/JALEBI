require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Example route
app.get('/protected', authenticateJWT, (req, res) => {
  res.send('This is a protected route');
});

// Login route to generate JWT token
app.post('/login', (req, res) => {
  // Normally, you would authenticate the user here
  const user = { id: 1, username: 'test' };

  const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ accessToken });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
