const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/userModel");
const Notification = require("../models/notificationModel")
const jwtSecret = process.env.SECRET_KEY

// Registration Function
const register = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already registered.",
        data: null,
        message: "User already registered."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      user_name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    //create notifaction 
    const notifaction = new Notification({
      message: `New user registered: ${savedUser}. Awaiting approval.`
    })
    await notifaction.save();

    return res.status(201).json({
      error: null,
      data: savedUser,
      message: 'User registered successfully. Awaiting admin approval.'
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message || error,
      data: null,
      message: "Registration error. Please try again or contact support."
    });
  }
};

const login = async (req, res) => {
  const { user_name, password } = req.body;

  // Determine if the user_name is an email or username
  const isEmail = user_name.includes('@');

  try {
    if (isEmail) {
      // Authenticate as a user using email
      const user = await User.findOne({ email: user_name });

      if (!user) {
        return res.status(404).json({
          error: "Invalid credentials",
          data: null,
          message: "User not found"
        });
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return res.status(400).json({
          error: "Invalid credentials",
          data: null,
          message: "Incorrect password"
        });
      }

      if (!user.is_approved) { // Corrected property name
        return res.status(403).json({
          error: 'Account not approved',
          data: null,
          message: 'Account not approved'
        });
      }

      // Generate a token for the user
      const token = jwt.sign({ id: user._id, role: 'endUser' }, jwtSecret, { expiresIn: '12h' });
      return res.status(200).json({ error: null, token, role: 'endUser', message: "Login successfully" });

    } else {
      // Authenticate as an admin using username and password
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;

      // Check if either user_name or password is incorrect
      if (user_name !== adminUsername || password !== adminPassword) {
        // return res.status(401).json({
        //   error: 'Invalid credentials',
        //   data: null,
        //   message: 'Invalid credentials'
        // });
        return res.status(200).json({ error: null, data:null, message: "Invalid credentials" });
      }

      // If credentials match, generate a token for admin
      const token = jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '12h' });
      return res.status(200).json({ error: null, token, role: 'admin', message: "Login successfully" });

    }

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      error: 'Internal server error',
      data: null,
      message: 'Internal server error'
    });
  }
};



module.exports = { register, login };


