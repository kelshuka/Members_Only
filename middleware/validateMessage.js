const { body } = require('express-validator');

module.exports = [
  body('messageTitle')
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty!')
    .isLength({ min: 1, max: 255 })
    .withMessage('Name must be between 1 and 500 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message cannot be empty!')
    .isLength({ min: 1, max: 500 })
    .withMessage('Name must be between 1 and 500 characters'),
    
];