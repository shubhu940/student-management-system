const express = require("express");

const router = express.Router();

const marksController = require("../controllers/marks.controller");

const validate = require("../middlewares/validate.middleware");

const {
  createMarksValidator
} = require("../validators/marks.validator");

router.post(
  "/",
  createMarksValidator,
  validate,
  marksController.createMarks
);

router.get(
  "/student/:studentId",
  marksController.getMarksByStudentId
);

router.delete(
  "/:id",
  marksController.deleteMarks
);

module.exports = router;