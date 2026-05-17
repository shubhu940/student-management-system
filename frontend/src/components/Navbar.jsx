import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Student Dashboard
        </Link>

        <Link
          to="/add-student"
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
        >
          Add Student
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;