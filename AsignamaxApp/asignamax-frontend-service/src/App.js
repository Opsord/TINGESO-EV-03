import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components imports
import HomeComponent from "./components/HomeComponent";
import StudentAdminComponent from "./components/StudentAdminComponent";
import CourseAdminComponent from "./components/CourseAdminComponent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Home page */}
          <Route path="/" element={<HomeComponent />} />
          {/* Student section */}
          <Route path="/students" element={<StudentAdminComponent />} />
          {/* Course section */}
          <Route path="/courses" element={<CourseAdminComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
