// Import Packge
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var cookieParser = require('cookie-parser');

// Import from local project
require('dotenv').config();
require('./config/database').connect();
const User = require('./model/user');
const Contactus = require('./model/contactus');
const auth = require('./middleware/auth');

// create express app
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// refister route for creating new user
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
      res.status(400).send('All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).send('User already exists');
    }

    const myEncPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: myEncPassword,
    });

    // create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: '2h',
      }
    );
    user.token = token;

    user.password = undefined;

    // send token or send just success yes and redirect - choice
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

// login route for verifing user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send('Field is missing');
    }

    const user = await User.findOne({ email });

    // if (!user) {
    //   res.status(400).send('You are not registered in our app');
    // }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: '2h',
        }
      );
      user.token = token;
      user.password = undefined;
      // res.status(200).json(user);

      // if you want to use cookies
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user,
      });
    }

    res.sendStatus(400).send('email or password is incorrect');
  } catch (error) {
    console.log(error);
  }
});

// contactus route for saving query info form user
app.post('/contactus', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!(email && message && name)) {
      res.status(400).send('All fields are required');
    }

    Contactus.create({
      name,
      email: email.toLowerCase(),
      message,
    })
      .then(() => {
        res.status(200).json({ message: 'Your Response is Recoded.' });
      })
      .catch((err) => {
        res.status(400).send('Errr');
      });
  } catch (error) {
    console.log(error);
  }
});

// Protected route from non-login user
app.get('/dashboard', auth, (req, res) => {
  res.send('Welcome to secret information');
});
app.get('/', (req, res) => {
  res.send('<h1>Hello from auth</h1>');
});
module.exports = app;
