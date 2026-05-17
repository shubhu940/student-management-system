const express = require("express");

const router = express.Router();

const studentController = require("../controllers/student.controller");

const validate = require("../middlewares/validate.middleware");

const {
  createStudentValidator,
  updateStudentValidator
} = require("../validators/student.validator");

router.post(
  "/",
  createStudentValidator,
  validate,
  studentController.createStudent
);

router.get(
  "/",
  studentController.getStudents
);

router.get(
  "/:id",
  studentController.getStudentById
);

router.put(
  "/:id",
  updateStudentValidator,
  validate,
  studentController.updateStudent
);

router.delete(
  "/:id",
  studentController.deleteStudent
);

module.exports = router;