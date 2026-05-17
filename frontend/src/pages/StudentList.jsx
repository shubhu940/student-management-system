import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";
import StudentCard from "../components/StudentCard";
import ConfirmModal from "../components/ConfirmModal";

import {
  getStudents,
  deleteStudent
} from "../services/studentService";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    studentId: null
  });

  const fetchStudents = async (page = 1) => {
    try {
      setLoading(true);

      const response = await getStudents(page, 6);

      setStudents(response.data);

      setCurrentPage(response.meta.currentPage);

      setTotalPages(response.meta.totalPages);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch students"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const handleDelete = async () => {
    try {
      await deleteStudent(deleteModal.studentId);

      fetchStudents(currentPage);

      setDeleteModal({
        isOpen: false,
        studentId: null
      });
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Student Management Dashboard
        </h1>

        {loading && <Loader />}

        {error && (
          <ErrorMessage message={error} />
        )}

        {!loading && students.length === 0 && (
          <div className="bg-white p-10 rounded-xl text-center shadow">
            No students found
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={(id) =>
                setDeleteModal({
                  isOpen: true,
                  studentId: id
                })
              }
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <ConfirmModal
          isOpen={deleteModal.isOpen}
          title="Delete Student"
          message="Are you sure you want to delete this student?"
          onConfirm={handleDelete}
          onCancel={() =>
            setDeleteModal({
              isOpen: false,
              studentId: null
            })
          }
        />
      </div>
    </div>
  );
};

export default StudentList;