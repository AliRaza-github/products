// const crypto = require("crypto");

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");


// const jwtSecret = process.env.SECRET_KEY;
// const salt = parseInt(process.env.PASSWORD_SALT)

// const verifyEmail = require("../utils/sendEmail");


// const registration = async (req, res) => {
//   const { first_name, last_name, email, password } = req.body;


//   try {
//     const existingUser = await User.findOne({ email: email });
//     if (existingUser) {
//       return res
//         .status(401)
//         .json({ message:"Email already exist"});
//     }


//     const hashPassword = await bcrypt.hash(password,salt);
//     const Token = crypto.randomBytes(16).toString("hex");

//     const user = new User({
//       first_name: first_name,
//       last_name: last_name,
//       email: email,
//       password: hashPassword,
//       email_verify_token: Token,
//     });

//     const savedUser = await user.save();
//     const link = `${process.env.BASE_URL}api/users/verify-email/${savedUser._id}/${savedUser.email_verify_token}`;

//     verifyEmail(savedUser.email, link);

//     return res.status(200).json({
//       message: "Verification email sent successfully"
//     });
//   } catch (error) {
//     console.log('error in registration',error);
//     return res.status(500).json({ message:"Error in registration"});
//   }
// };


// const login = async (req, res) => {
//   const { email, password } = req.body;


//   try {
//     const user = await User.findOne({ email:email});

//     if (!user) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }
//     if(user.status != 'active'){
//       return res.status(401).json({ message: "Please verify your email" });
//     }

//     const matchPassword = await bcrypt.compare(password, user.password);
//     if (!matchPassword) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     const token = jwt.sign(
//       { email: user.email, id: user._id },
//       jwtSecret
//     );

//    return res.status(201).json({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       jwt: token,
//     });
//   } catch (error) {
//     console.log('error in login',error);
//     return res.status(500).json({ message:"Error in login"});
//   }
// };




// const activeUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const token = req.params.token;
//     let user = await User.findOne({ _id: id, email_verify_token: token });
//     if (!user) {
//       return res.status(401).json({ message:"User not found"});
//     }
// // console.log("user..",user)
//     user.status = 'active';
//     user.email_verify = true;
//     user.email_verify_token=undefined;
//     await user.save();
//     console.log("user:",user);
//     return res.status(200).json({ message: "User verified successfully" });
//   } catch (error) {
//     console.log("error:", error);
//     return res.status(500).json({ message: 'Error verifying email' });
//   }
// };


const User = require("../models/userModel");

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { userId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile image URL
    user.profileImage = file.path;
    await user.save();

    res.status(200).json({ message: 'Image uploaded successfully', profileImage: user.profileImage });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    const newUser = new User({
      name,
      email,
      password: password,
    });
    const user = await newUser.save();
    res.status(201).json({ error: null, message: 'User registered successfully', userId: newUser._id, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error || error.message });
  }
};
module.exports = {
  uploadImage,
  register,
  getAll
};

