import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import {
  getStudentById,
  updateStudent
} from "../services/studentService";

const EditStudent = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(id);

        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          age: response.data.age
        });
      } catch (err) {
        setError("Failed to fetch student");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateStudent(id, {
        ...formData,
        age: Number(formData.age)
      });

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-6">
            Edit Student
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <button
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
            >
              {loading
                ? "Updating..."
                : "Update Student"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;