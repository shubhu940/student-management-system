const studentService = require("../services/student.service");

const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const getPagination = require("../utils/pagination");

const createStudent = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existingStudent = await studentService.checkEmailExists(email);

  if (existingStudent) {
    return res.status(400).json(
      apiResponse({
        success: false,
        message: "Email already exists"
      })
    );
  }

  const student = await studentService.createStudent(req.body);

  res.status(201).json(
    apiResponse({
      success: true,
      message: "Student created successfully",
      data: student
    })
  );
});

const getStudents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const { skip, take, currentPage, perPage } = getPagination(
    page,
    limit
  );

  const { students, totalRecords } =
    await studentService.getStudents(skip, take);

  const totalPages = Math.ceil(totalRecords / perPage);

  res.status(200).json(
    apiResponse({
      success: true,
      message: "Students fetched successfully",
      data: students,
      meta: {
        totalRecords,
        currentPage,
        totalPages,
        limit: perPage
      }
    })
  );
});

const getStudentById = asyncHandler(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);

  if (!student) {
    return res.status(404).json(
      apiResponse({
        success: false,
        message: "Student not found"
      })
    );
  }

  res.status(200).json(
    apiResponse({
      success: true,
      message: "Student fetched successfully",
      data: student
    })
  );
});

const updateStudent = asyncHandler(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);

  if (!student) {
    return res.status(404).json(
      apiResponse({
        success: false,
        message: "Student not found"
      })
    );
  }

  if (req.body.email) {
    const existingEmail = await studentService.checkEmailExists(
      req.body.email
    );

    if (
      existingEmail &&
      existingEmail.id !== Number(req.params.id)
    ) {
      return res.status(400).json(
        apiResponse({
          success: false,
          message: "Email already exists"
        })
      );
    }
  }

  const updatedStudent = await studentService.updateStudent(
    req.params.id,
    req.body
  );

  res.status(200).json(
    apiResponse({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent
    })
  );
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);

  if (!student) {
    return res.status(404).json(
      apiResponse({
        success: false,
        message: "Student not found"
      })
    );
  }

  await studentService.deleteStudent(req.params.id);

  res.status(200).json(
    apiResponse({
      success: true,
      message: "Student deleted successfully"
    })
  );
});

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};