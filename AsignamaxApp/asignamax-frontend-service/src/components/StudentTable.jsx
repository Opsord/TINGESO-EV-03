import React from "react";
import "../css/Table.css";

const StudentTable = ({ studentData, viewStudent }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Carrera</th>
          <th className="buttons">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {studentData.map((student) => (
          <tr key={student.studentRUT}>
            <td>{student.studentRUT}</td>
            <td>{student.studentName}</td>
            <td>{student.studentLastName}</td>
            <td>{student.studentCareerCode}</td>
            <td>
              <button
                onClick={() => viewStudent(student.studentRUT)} // Pasa el RUT del estudiante a la función
                className="btn btn-info"
              >
                Ver
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
