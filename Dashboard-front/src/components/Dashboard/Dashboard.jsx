import ReadingList from "../ReadinList/ReadingList";
import CoursesList from "../Courses/CoursesList";
import styles from './Dashboard.module.css';
const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.dashboardsections}>
        <section>
          <h2>Liste de courses</h2>
          <CoursesList />
        </section>
      </div>
    </div>
  );
};


export default Dashboard;
