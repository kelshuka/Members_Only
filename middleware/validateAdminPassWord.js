const { body } = require('express-validator');
require('dotenv').config();

module.exports =[
    body('password')
        .trim()
        .notEmpty()
        .withMessage("Admin password required!")
        .equals(process.env.ADMIN_PASSWORD)
        .withMessage('Incorrect password!'),
];