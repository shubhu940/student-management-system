import { Link } from "react-router-dom";

const StudentCard = ({ student, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-gray-800">
        {student.firstName} {student.lastName}
      </h2>

      <p className="text-gray-600 mt-2">
        {student.email}
      </p>

      <p className="text-gray-600">
        Age: {student.age}
      </p>

      <div className="flex gap-3 mt-5">
        <Link
          to={`/student/${student.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          View
        </Link>

        <Link
          to={`/edit-student/${student.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(student.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;