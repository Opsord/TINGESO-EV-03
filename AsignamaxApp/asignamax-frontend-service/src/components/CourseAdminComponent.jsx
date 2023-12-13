import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
// import { useNavigate } from "react-router-dom";
import CourseService from "../services/CourseService";
import HeaderComponent from "./HeaderComponent01";
import "../css/Home.css";

export default function CourseListComponent() {
  const initialState = {
    courseCode: "",
    courseList: [],
    selectedCourseDetails: null,
    coursePrerequisites: [],
  };

  // const navigate = useNavigate();

  const [input, setInput] = useState(initialState);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursessPerPage] = useState(20); // Adjust the number of courses per page as needed
  const [maxPagesToShow] = useState(5); // Adjust the number of pages to show in the pagination index

  useEffect(() => {
    CourseService.getAllCourses()
      .then((res) => {
        setInput((prevInput) => ({ ...prevInput, courseList: res.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // See course details
  const seeDetails = async (courseCode) => {
    try {
      const details = await CourseService.getCourseByCode(courseCode);
      console.log(details.data);
      const prerequisites = await CourseService.getCoursePrerequisites(
        courseCode
      );
      console.log(prerequisites.data);

      setInput((prevInput) => ({
        ...prevInput,
        selectedCourseDetails: details.data,
        coursePrerequisites: prerequisites.data.coursePreRequisite, // Assuming coursePreRequisite is the array of prerequisites
      }));
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching

    if (query.trim() === "") {
      // If the search query is empty, reset the table to its original state
      CourseService.getAllCourses()
        .then((res) => {
          setInput((prevInput) => ({ ...prevInput, courseList: res.data }));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // If there's a search query, filter the table based on the query
      const filteredCourses = input.courseList.filter((course) => {
        const lowerCaseCode = String(course.courseCode).toLowerCase(); // Convert to string to avoid errors when using toLowerCase() on a number
        const lowerCaseName = course.courseName.toLowerCase();
        const lowerCaseCareerCode = String(
          course.courseCareerCode
        ).toLowerCase(); // Convert to string to avoid errors when using toLowerCase() on a number

        return (
          lowerCaseCode.includes(query.toLowerCase()) ||
          lowerCaseName.includes(query.toLowerCase()) ||
          lowerCaseCareerCode.includes(query.toLowerCase())
        );
      });

      setInput((prevInput) => ({
        ...prevInput,
        courseList: filteredCourses,
      }));
    }
  };

  // Calculate indexes for pagination
  const indexOfLastcourse = currentPage * coursessPerPage;
  const indexOfFirstcourse = indexOfLastcourse - coursessPerPage;
  const currentcourses = input.courseList.slice(
    indexOfFirstcourse,
    indexOfLastcourse
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(input.courseList.length / coursessPerPage);
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than or equal to maxPagesToShow
      return Array.from({ length: totalPages }, (_, index) => (
        <li
          key={index}
          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
          <button onClick={() => paginate(index + 1)} className="page-link">
            {index + 1}
          </button>
        </li>
      ));
    }

    const pages = [];
    let startPage, endPage;

    if (currentPage <= halfMaxPagesToShow) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + halfMaxPagesToShow >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfMaxPagesToShow;
      endPage = currentPage + halfMaxPagesToShow;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}>
          <button onClick={() => paginate(i)} className="page-link">
            {i}
          </button>
        </li>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <li key="startEllipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <li key="endEllipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="MainDiv">
      <div className="Header">
        <HeaderComponent />
      </div>

      <div className="PageBody">
        <div className="TableContainer">
          <h1>Listado de cursos</h1>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <Table className="content-table" data-search="true">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Codigo de carrera</th>
                <th>Nivel</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentcourses.length > 0 ? (
                currentcourses.map((course) => (
                  <tr key={course.courseCode}>
                    <td> {course.courseCode}</td>
                    <td> {course.courseName} </td>
                    <td> {course.courseCareerCode} </td>
                    <td> {course.courseLevel} </td>
                    <td>
                      <button
                        className="input-plan-boton"
                        onClick={() => seeDetails(course.courseCode)}>
                        Detalles
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Sin cursos</td>
                </tr>
              )}
            </tbody>
          </Table>
          {/* Pagination controls */}
          <nav>
            <ul className="pagination">{renderPageNumbers()}</ul>
          </nav>
        </div>

        <div className="InfoContainer">
          <h1>Información de cursos</h1>

          {input.selectedCourseDetails ? (
            <div>
              <p>Codigo: {input.selectedCourseDetails.courseCode}</p>
              <p>Nombre: {input.selectedCourseDetails.courseName}</p>
              <p>
                Codigo de carrera:{" "}
                {input.selectedCourseDetails.courseCareerCode}
              </p>
              <p>Nivel: {input.selectedCourseDetails.courseLevel}</p>

              {input.coursePrerequisites &&
              input.coursePrerequisites.length > 0 ? (
                <div>
                  <p>Pre-requisitos:</p>
                  <ul>
                    {input.coursePrerequisites.map((prerequisite, index) => (
                      <li key={prerequisite.courseCode}>
                        <p>Codigo: {prerequisite.courseCode}</p>
                        <p>Nombre: {prerequisite.courseName}</p>
                        {/* Add other properties as needed */}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Sin pre requisitos</p>
              )}
            </div>
          ) : (
            <p>Seleccione un curso para ver los detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
