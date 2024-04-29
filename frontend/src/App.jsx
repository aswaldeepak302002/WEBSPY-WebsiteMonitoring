import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import NotFound from "./components/NotFound.jsx";
import ForgetPassword from "./components/auth/ForgetPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import DashboardBody from "./components/dashboard/DashboardBody.jsx";
import Uptime from "./components/dashboard/Uptime/uptime.jsx";
import Ssl from "./components/dashboard/SSL/Ssl.jsx";
import Chartj from "./components/dashboard/Uptime/Chart.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import Pageload from "./components/dashboard/PageLoadTIme/Pageload.jsx";
import PageLoadDetail from "./components/dashboard/PageLoadTIme/pageLoadDetail.jsx";
import Co2 from "./components/dashboard/co2js/co2.jsx";
import Setting from './components/setting/setting.jsx'


function App() {
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/login/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardBody />} />
              <Route path="uptime" element={<Uptime />} />
              <Route path="/dashboard/uptime/chart/:id" element={<Chartj />} />
              <Route path="ssl" element={<Ssl />} />
              <Route path="pageloadtime" element={<Pageload />} />
              <Route path="/dashboard/pageloadtime/pageloaddetail/:id" element={<PageLoadDetail/>} />
              <Route path="co2" element={<Co2 />} />
              <Route path="setting" element={<Setting />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
