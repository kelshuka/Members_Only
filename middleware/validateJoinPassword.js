const { body } = require('express-validator');
require('dotenv').config();

module.exports =[
    body('password')
        .trim()
        .notEmpty()
        .withMessage("Join code required!")
        .equals(process.env.JOIN_PASSWORD)
        .withMessage('Incorrect code!'),
];