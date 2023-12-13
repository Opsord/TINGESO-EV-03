import axios from "axios";

const COURSE_API_URL = "http://localhost:8090/courses";

class CourseService {
  getAllCourses() {
    // Log the current URL to the console
    console.log("CourseService.getAllCourses() URL: " + COURSE_API_URL);
    return axios.get(COURSE_API_URL);
  }

  getCourseByCode(courseCode) {
    return axios.get(COURSE_API_URL + "/" + courseCode);
  }

  getCoursePrerequisites(courseCode) {
    return axios.get(COURSE_API_URL + "/prerequisites/" + courseCode);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CourseService();
