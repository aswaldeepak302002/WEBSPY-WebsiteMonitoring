import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardBody from "./DashboardBody";

const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex h-full">
        {/* <div className="h-screen hidden lg:block fixed top-0 w-1/6"> */}
        <div className="fixed">
          <DashboardSidebar />
        </div>
        <main className="w-full pt-16 overflow-y-auto lg:ml-72 md:overflow-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;

{
  /* <nav className="flex justify-between">
  <div className="block lg:hidden">
    <Link to="/">
      <h1>FollowUp.</h1>
    </Link>
  </div>
  <div></div>
  <div className="flex items-center justify-end">
    <EventForm />
  </div>
</nav> */
}
