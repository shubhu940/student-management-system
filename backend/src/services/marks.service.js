const prisma = require("../config/db");

const createMarks = async (data) => {
  return await prisma.mark.create({
    data
  });
};

const getMarksByStudentId = async (studentId) => {
  return await prisma.mark.findMany({
    where: {
      studentId: Number(studentId)
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

const deleteMarks = async (id) => {
  return await prisma.mark.delete({
    where: {
      id: Number(id)
    }
  });
};

module.exports = {
  createMarks,
  getMarksByStudentId,
  deleteMarks
};