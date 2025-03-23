import ReadingList from "./ReadingList";
import CoursesList from "./CoursesList";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-sections">
        <section>
          <h2>Liste de lecture</h2>
          <ReadingList />
        </section>
        <section>
          <h2>Liste de courses</h2>
          <CoursesList />
        </section>
      </div>
    </div>
  );
};


export default Dashboard;
