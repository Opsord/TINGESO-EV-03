import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
// import { useNavigate } from "react-router-dom";
import StudentService from "../services/StudentService";
import HeaderComponent from "./HeaderComponent01";
import "../css/Home.css";

export default function StudentListFunComponent() {
  const initialState = {
    studentRUT: "",
    studentList: [],
  };

  // const navigate = useNavigate();

  const [input, setInput] = useState(initialState);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(20); // Adjust the number of students per page as needed
  const [maxPagesToShow] = useState(5); // Adjust the number of pages to show in the pagination index

  useEffect(() => {
    StudentService.getAllStudents()
      .then((res) => {
        setInput((prevInput) => ({ ...prevInput, studentList: res.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // See student details
  const seeDetails = async (studentRUT) => {
    try {
      const details = await StudentService.getStudentByRut(studentRUT);
      setInput((prevInput) => ({
        ...prevInput,
        selectedStudentDetails: details.data,
      }));
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching

    if (query.trim() === "") {
      // If the search query is empty, reset the table to its original state
      StudentService.getAllStudents()
        .then((res) => {
          setInput((prevInput) => ({ ...prevInput, studentList: res.data }));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // If there's a search query, filter the table based on the query
      const filteredStudents = input.studentList.filter((student) => {
        const lowerCaseRUT = student.studentRUT.toLowerCase();
        const lowerCaseEmail = student.studentEmail.toLowerCase();
        const lowerCaseCareerCode = String(
          student.studentCareerCode
        ).toLowerCase();

        return (
          lowerCaseRUT.includes(query.toLowerCase()) ||
          lowerCaseEmail.includes(query.toLowerCase()) ||
          lowerCaseCareerCode.includes(query.toLowerCase())
        );
      });

      setInput((prevInput) => ({
        ...prevInput,
        studentList: filteredStudents,
      }));
    }
  };

  // Calculate indexes for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = input.studentList.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(input.studentList.length / studentsPerPage);
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
          <h1>Listado de estudiantes</h1>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <Table className="content-table" data-search="true">
            <thead>
              <tr>
                <th>RUT / Codigo</th>
                <th>E-Mail</th>
                <th>Codigo de carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <tr key={student.studentRUT}>
                    <td> {student.studentRUT}</td>
                    <td> {student.studentEmail} </td>
                    <td> {student.studentCareerCode} </td>
                    <td>
                      <button
                        className="input-plan-boton"
                        onClick={() => seeDetails(student.studentRUT)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Sin estudiantes</td>
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
          <h1>Información de estudiante</h1>
          {input.selectedStudentDetails ? (
            <div>
              <p>RUT: {input.selectedStudentDetails.studentRUT}</p>
              <p>Nombre: {input.selectedStudentDetails.studentName}</p>
              <p>Apellido: {input.selectedStudentDetails.studentLastName}</p>
              {/* Agrega más detalles según sea necesario */}
            </div>
          ) : (
            <p>Seleccione un estudiante para ver los detalles.</p>)}
        </div>

      </div>
    </div>
  );
}
