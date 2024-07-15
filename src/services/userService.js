const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const { sendToQueue } = require('../utlis/sendMessage');

const signup = async (body) => {
  const { username, email, password , phoneNumber, address } = body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { status: 400, message: 'User already exists' };
    }

    const newUser = new User({ username, email, password, phoneNumber,address });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1h' });
    const message = JSON.stringify({ email, userId: newUser._id });
    await sendToQueue('signup_queue', message);

    return { status: 201, token };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const login = async (body) => {
  const { email, password } = body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 400, message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 400, message: 'Invalid credentials' };
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    return { status: 200, token };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const forgotPassword= async (body)=>{

}

const updateUserDetails = async(body)=>{

}

const deleteUser = async (body)=>{

}






module.exports = {
  signup,
  login,
};
