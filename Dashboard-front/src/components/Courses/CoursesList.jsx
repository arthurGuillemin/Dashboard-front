import { useState, useEffect } from "react";
import CoursesServices from "../../Services/CoursesServices";
import styles from "./CoursesList.module.css";
const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState("");

  const fetchCourses = () => {
    setLoading(true);
    CoursesServices.getAllCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error("Error fetching courses:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (newCourse.trim() === "") return;

    const courseData = { item: newCourse};
    CoursesServices.createCourse(courseData)
      .then(() => {
        setNewCourse("");
        fetchCourses();
      })
      .catch((error) => console.error("Error creating course:", error));
  };

  const handleDeleteCourse = (courseId) => {
    CoursesServices.deleteCourse(courseId)
      .then(() => {
        fetchCourses();
      })
      .catch((error) => console.error("Error deleting course:", error));
  };

  if (loading) return <p>Chargement des courses...</p>;

  return (
    <div className>
      <form onSubmit={handleAddCourse} className={styles.addcourseform}>
        <input
          type="text"
          placeholder="Ajouter un produit"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          className={styles.courseinput}
        />
        <button type="submit" className={styles.courseaddbtn}>
          Valider
        </button>
      </form>
      <div className={styles.courseslist}>
        {courses.map((course) => (
          <div key={course.id} className={styles.coursecard}>
            <span>
              {course.item}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleDeleteCourse(course.id)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
