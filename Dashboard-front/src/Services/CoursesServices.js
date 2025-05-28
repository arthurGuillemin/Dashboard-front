import axios from 'axios';

const API_BASE_URL = "https://dashboard-back-9yvd.onrender.com/courses";

class CoursesServices {
  getAllCourses() {
    return axios.get(API_BASE_URL);
  }

  createCourse(courseData) {
    return axios.post(API_BASE_URL, courseData);
  }
  deleteCourse(courseId) {
    return axios.delete(`${API_BASE_URL}/${courseId}`);
  }
}

export default new CoursesServices();