const User = require('./models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const amqp = require('amqplib');
const SECRET_KEY = 'your_secret_key'; 

const rabbitMQUrl = 'amqp://localhost';

async function sendToQueue(queue, message) {
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  setTimeout(() => {
    connection.close();
  }, 500);
}

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1h' });
    const message = JSON.stringify({ email, userId: newUser._id });
    await sendToQueue('signup_queue', message);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  login,
};
