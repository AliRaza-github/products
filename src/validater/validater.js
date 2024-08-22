const { check } = require("express-validator");

exports.registerValidator = [
    check('user_name', 'UserName is required.').not().isEmpty(),
    check('email', 'Email is required.').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password is required.').not().isEmpty(),

]
exports.loginValidator = [
    check('email', 'Email is required.').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password is required.').not().isEmpty(),

]


