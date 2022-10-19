require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const User = require('./model/user');
const Contactus = require('./model/contactus');
const auth = require('./middleware/auth');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get('/', (req, res) => {
  res.send('<h1>Hello from auth</h1>');
});

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

    //token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: '2h',
      }
    );
    user.token = token;
    //update or not in DB

    // handle password situation
    user.password = undefined;

    // send token or send just success yes and redirect - choice
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});
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
        res.status(200).send('Success');
      })
      .catch((err) => {
        res.status(400).send('Errr');
      });
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send('Field is missing');
    }

    const user = await User.findOne({ email });

    // if(!user){
    //   res.status(400).send("You are not registered in our app")
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

app.get('/dashboard', auth, (req, res) => {
  res.send('Welcome to secret information');
});

module.exports = app;
