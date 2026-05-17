import { Routes, Route } from "react-router-dom";

import StudentList from "../pages/StudentList";
import AddStudent from "../pages/AddStudent";
import EditStudent from "../pages/EditStudent";
import StudentDetails from "../pages/StudentDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentList />} />

      <Route
        path="/add-student"
        element={<AddStudent />}
      />

      <Route
        path="/edit-student/:id"
        element={<EditStudent />}
      />

      <Route
        path="/student/:id"
        element={<StudentDetails />}
      />
    </Routes>
  );
};

export default AppRoutes;