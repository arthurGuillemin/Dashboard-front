import ReadingList from "../ReadinList/ReadingList";
import CoursesList from "../Courses/CoursesList";
import MachineControl from "../laundry/laundry";
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
        <section>
          <h2>Machine a laver</h2>
          <MachineControl />
        </section>
      </div>
    </div>
  );
};


export default Dashboard;
