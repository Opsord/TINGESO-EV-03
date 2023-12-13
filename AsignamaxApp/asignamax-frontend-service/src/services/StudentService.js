import axios from "axios";

const STUDENT_API_URL = "http://localhost:8090/students";

class StudentService {
  getAllStudents() {
    // Log the current URL to the console
    console.log("StudentService.getAllStudents() URL: " + STUDENT_API_URL);
    return axios.get(STUDENT_API_URL);
  }

  getStudentByRut(studentRut) {
    return axios.get(STUDENT_API_URL + "/" + studentRut);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new StudentService();
