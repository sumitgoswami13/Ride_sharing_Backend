const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { passport } = require('./src/utlis/googleAuth');
const { generateToken } = require('./src/middleware/authToken')
const connectDB = require('./src/config/dB');
const app = express();
const PORT = 3000;
const userRouter = require("./src/routes/userRoutes")

app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    const token = generateToken(req.user);
    res.json({ token });
  });

app.use('/user',userRouter)

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
