const marksService = require("../services/marks.service");
const studentService = require("../services/student.service");

const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const createMarks = asyncHandler(async (req, res) => {
  const student = await studentService.getStudentById(
    req.body.studentId
  );

  if (!student) {
    return res.status(404).json(
      apiResponse({
        success: false,
        message: "Student not found"
      })
    );
  }

  const marks = await marksService.createMarks(req.body);

  res.status(201).json(
    apiResponse({
      success: true,
      message: "Marks added successfully",
      data: marks
    })
  );
});

const getMarksByStudentId = asyncHandler(async (req, res) => {
  const marks = await marksService.getMarksByStudentId(
    req.params.studentId
  );

  res.status(200).json(
    apiResponse({
      success: true,
      message: "Marks fetched successfully",
      data: marks
    })
  );
});

const deleteMarks = asyncHandler(async (req, res) => {
  await marksService.deleteMarks(req.params.id);

  res.status(200).json(
    apiResponse({
      success: true,
      message: "Marks deleted successfully"
    })
  );
});

module.exports = {
  createMarks,
  getMarksByStudentId,
  deleteMarks
};