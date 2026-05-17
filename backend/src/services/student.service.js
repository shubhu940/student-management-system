const prisma = require("../config/db");

const createStudent = async (data) => {
  return await prisma.student.create({
    data
  });
};

const getStudents = async (skip, take) => {
  const [students, totalRecords] = await Promise.all([
    prisma.student.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        marks: true
      }
    }),

    prisma.student.count()
  ]);

  return {
    students,
    totalRecords
  };
};

const getStudentById = async (id) => {
  return await prisma.student.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      marks: true
    }
  });
};

const updateStudent = async (id, data) => {
  return await prisma.student.update({
    where: {
      id: Number(id)
    },
    data
  });
};

const deleteStudent = async (id) => {
  return await prisma.student.delete({
    where: {
      id: Number(id)
    }
  });
};

const checkEmailExists = async (email) => {
  return await prisma.student.findUnique({
    where: {
      email
    }
  });
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  checkEmailExists
};