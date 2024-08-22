const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/userModel");
const Notification = require("../models/notificationModel")
const JWT_SECRET = process.env.SECRET_KEY

// Registration Function
const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                data: null,
                message: "Registration error. Please try again or contact support."
            });
        }

        const { user_name, email, password, role } = req.body;

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
            role,
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

// Login Function
const login = async (req, res) => {
    try {

        // validate input 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                data: null,
                message: "Login error."
            });
        }

        const { email, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!user.is_apporved) {
            return res.status(403).json({ error: 'Account not approved', data: null, message: 'Account not approved' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { user: user },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            error: null,
            data: { token },
            message: "Login successful."
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message || error,
            data: null,
            message: "Login error."
        });
    }
};


module.exports = { register, login };
