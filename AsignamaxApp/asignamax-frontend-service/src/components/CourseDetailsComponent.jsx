import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseService from "../services/CourseService";
import Table from "react-bootstrap/Table";

import HeaderComponent from "./HeaderComponent01";
import "../css/Home.css";

export default function CourseDetailsComponent() {
  // Declare the state variable and the function to update it
  const { courseCode } = useParams();
  // Initialize the course details state variable with an empty object
  const [courseDetails, setCourseDetails] = useState({});

  // Fetch the course details from the API
  useEffect(() => {
    CourseService.getCourseByCode(courseCode)
      .then((res) => {
        setCourseDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [courseCode]);

  // Fetch the course prerequisites from the API
    useEffect(() => {
        CourseService.getCoursePrerequisites(courseCode)
        .then((res) => {
            setCourseDetails((prevDetails) => ({
            ...prevDetails,
            coursePrerequisites: res.data,
            }));
        })
        .catch((error) => {
            console.log(error);
        });
    }, [courseCode]);

  return (
    <div className="MainDiv">

      <div className="Header">
        <HeaderComponent />
      </div>

      <div className="PageBody">
        <div className="TableContainer">
          <h1>Detalles de curso</h1>

          <div className="info-item">
            <span className="label">Codigo: </span>
            <span className="value">{courseDetails.courseCode}</span>
          </div>

            <div className="info-item">
                <span className="label">Nombre: </span>
                <span className="value">{courseDetails.courseName}</span>
            </div>

            <div className="info-item">
                <span className="label">Carrera: </span>
                <span className="value">{courseDetails.courseCareerCode}</span>
            </div>

            <div className="info-item">
                <span className="label">Nivel: </span>
                <span className="value">{courseDetails.courseLevel}</span>
            </div>

            <div className="info-item">
                <span className="label">Plan: </span>
                <span className="value">{courseDetails.coursePlan}</span>
            </div>
            
            {/* Table of pre requisites */}
            <div className="TableContainer">
                <h1>Prerrequisitos</h1>
                <Table className="content-table">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Codigo de carrera</th>
                            <th>Nivel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseDetails.coursePrerequisites?.map((course) => (
                            <tr key={course.courseCode}>
                                <td> {course.courseCode}</td>
                                <td> {course.courseName} </td>
                                <td> {course.courseCareerCode} </td>
                                <td> {course.courseLevel} </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>

            {/* Table of schedules */}
            <div className="TableContainer">
                <h1>Horarios</h1>
                <Table className="content-table">
                    <thead>
                        <tr>
                            <th>Seccion</th>
                            <th>Profesor</th>
                            <th>Horario</th>
                            <th>Capacidad</th>
                            <th>Disponibilidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseDetails.courseSchedules?.map((schedule) => (
                            <tr key={schedule.scheduleSection}>
                                <td> {schedule.scheduleSection}</td>
                                <td> {schedule.scheduleProfessor} </td>
                                <td> {schedule.scheduleTime} </td>
                                <td> {schedule.scheduleCapacity} </td>
                                <td> {schedule.scheduleAvailability} </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>


        </div>

      </div>

    </div>
  );
}
