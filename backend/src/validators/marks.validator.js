const { body } = require("express-validator");

const createMarksValidator = [
  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required")
    .isInt({ min: 1 })
    .withMessage("Student ID must be valid"),

  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Subject must be between 2 and 100 characters"),

  body("marks")
    .notEmpty()
    .withMessage("Marks are required")
    .isInt({ min: 0, max: 100 })
    .withMessage("Marks must be between 0 and 100")
];

module.exports = {
  createMarksValidator
};