import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import {
  getStudentById,
  addMarks
} from "../services/studentService";

const StudentDetails = () => {
  const { id } = useParams();

  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [marksForm, setMarksForm] = useState({
    subject: "",
    marks: ""
  });

  const fetchStudent = async () => {
    try {
      setLoading(true);

      const response = await getStudentById(id);

      setStudent(response.data);
    } catch (err) {
      setError("Failed to fetch student");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setMarksForm({
      ...marksForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAddMarks = async (e) => {
    e.preventDefault();

    try {
      await addMarks({
        studentId: Number(id),
        subject: marksForm.subject,
        marks: Number(marksForm.marks)
      });

      setMarksForm({
        subject: "",
        marks: ""
      });

      fetchStudent();
    } catch (err) {
      alert("Failed to add marks");
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-4">
            {student.firstName} {student.lastName}
          </h1>

          <p className="text-gray-700 mb-2">
            Email: {student.email}
          </p>

          <p className="text-gray-700 mb-6">
            Age: {student.age}
          </p>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">
              Add Marks
            </h2>

            <form
              onSubmit={handleAddMarks}
              className="grid md:grid-cols-3 gap-4 mb-8"
            >
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={marksForm.subject}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="marks"
                placeholder="Marks"
                value={marksForm.marks}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <button className="bg-green-600 text-white rounded-lg px-4 py-3">
                Add Marks
              </button>
            </form>

            <h2 className="text-2xl font-bold mb-4">
              Subject Marks
            </h2>

            {student.marks.length === 0 ? (
              <div className="bg-gray-100 p-4 rounded-lg">
                No marks available
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">
                        Subject
                      </th>

                      <th className="p-3 text-left">
                        Marks
                      </th>

                      <th className="p-3 text-left">
                        Added At
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {student.marks.map((mark) => (
                      <tr
                        key={mark.id}
                        className="border-b"
                      >
                        <td className="p-3">
                          {mark.subject}
                        </td>

                        <td className="p-3">
                          {mark.marks}
                        </td>

                        <td className="p-3">
                          {new Date(
                            mark.createdAt
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;