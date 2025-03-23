import { useState, useEffect } from "react";
import CoursesServices from "../Services/CoursesServices";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState("");

  // Fonction pour récupérer la liste des courses
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

  // Ajouter un nouveau produit
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

  // Supprimer un produit
  const handleDeleteCourse = (courseId) => {
    CoursesServices.deleteCourse(courseId)
      .then(() => {
        fetchCourses();
      })
      .catch((error) => console.error("Error deleting course:", error));
  };

  if (loading) return <p>Chargement des courses...</p>;

  return (
    <div className="courses-section">
      <form onSubmit={handleAddCourse} className="add-course-form">
        <input
          type="text"
          placeholder="Ajouter un produit"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          className="course-input"
        />
        <button type="submit" className="course-add-btn">
          Valider
        </button>
      </form>
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
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
