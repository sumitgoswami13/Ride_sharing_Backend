const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { passport } = require('./src/utlis/googleAuth');
const connectDB = require('./src/config/dB');
const app = express();
const error = require('./src/middleware/response/errror')
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
app.use('/user',userRouter)
app.use(error)
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
