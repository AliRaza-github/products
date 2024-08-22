const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {

    const { user_name, password } = req.body;

    if (user_name !== process.env.ADMIN_USERNAME) {
        return res.status(401).json({ error: null, data: null, message: "Invalid username or password" })
    }
  
    if (password !== process.env.ADMIN_PASSWORD) {     
        return res.status(401).json({ error: null, data: null, message: "Invalid username or password" })
    }

    const token = jwt.sign({ user_name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ error: null, data: token, message: "Login successfully." });

}