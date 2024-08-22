const { body } = require('express-validator');

module.exports = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty!')
    .isLength({ min: 1, max: 255 })
    .withMessage('Name must be between 1 and 255 characters'),
    body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty!')
    .isLength({ min: 1, max: 255 })
    .withMessage('Name must be between 1 and 255 characters'),
  body('email')
    .trim()
    .optional({ values: 'falsy' })
    .isEmail()
    .withMessage('Not a valid e-mail address')
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage("Please enter a password")
    .isLength({ min: 4})
    .withMessage("Number of password characters must not be less than 4"),
  body('confirmPassword')
    .custom( (value, { req }) => { return value === req.body.password })
    .withMessage("Passwords not match!"),
];