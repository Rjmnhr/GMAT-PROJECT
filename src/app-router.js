import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardComponent from "./pages/dashboard";

import InstructionPage from "./pages/instruction";
import ResultPage from "./pages/results";
import QuantTestPage from "./pages/quant-test-page";
import VerbalTestPage from "./pages/verbal-test-page";
import SectionDivider from "./components/section-divider";
import OptionalBreak from "./components/optional-break";
import IRTestPage from "./pages/IR_section";
import DashboardDetailed from "./components/detailed-dashboard";

import LoginPage from "./pages/login-page";
import OtpVerification from "./pages/otp-verification";
import AdminDashboard from "./components/admin-dashboard";
import UserDataComponent from "./components/user-details";
import UserDetailedDashboard from "./components/user-details/user-detailed-dashboard";
import "./pages/home-page/style.css";
import HomePage from "./pages/home-page";
import ProfilerPage from "./pages/profiler-page";

const ConditionalComponent = () => {
  return (
    <>
      <div
        className="container-fluid img_container "
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1695657433/pgsgfjhvitdmjl0pnbco.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          transform: "translate3d(0px, 0px, 0px)",
          display: "grid",
          alignContent: "center",
          justifyItems: "center",
        }}
      >
        <img
          src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1695818576/ichnuzqxvbetqcymqti4.svg"
          alt=""
          width={250}
          height={250}
        />

        <p style={{ color: "white" }}>
          Please view this website on a web screen for the best experience.
        </p>
      </div>
    </>
  );
};
const AppRouter = () => {
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 912; // Change this value to adjust the threshold
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div>{isMobile ? <ConditionalComponent /> : <HomePage />}</div>
              </>
            }
          />
          <Route
            path="/profiler"
            element={
              <>
                <div>
                  {isMobile ? <ConditionalComponent /> : <ProfilerPage />}
                </div>
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <div>
                  {isMobile ? <ConditionalComponent /> : <DashBoardComponent />}
                </div>
              </>
            }
          />
          <Route
            path="/quant-test"
            element={
              <>
                <div>
                  {isMobile ? <ConditionalComponent /> : <QuantTestPage />}
                </div>
              </>
            }
          />
          <Route
            path="verbal-test"
            element={
              <>
                <div>
                  {isMobile ? <ConditionalComponent /> : <VerbalTestPage />}
                </div>
              </>
            }
          />
          <Route
            path="/instructions"
            element={
              <>
                <div>
                  <InstructionPage />
                </div>
              </>
            }
          />
          <Route
            path="/section"
            element={
              <>
                <div>
                  <SectionDivider />
                </div>
              </>
            }
          />
          <Route
            path="/results"
            element={
              <>
                <div>
                  <ResultPage />
                </div>
              </>
            }
          />
          <Route
            path="/test-break"
            element={
              <>
                <div>
                  <OptionalBreak />
                </div>
              </>
            }
          />
          <Route
            path="/ir-test"
            element={
              <>
                <div>
                  {isMobile ? <ConditionalComponent /> : <IRTestPage />}
                </div>
              </>
            }
          />
          <Route
            path="/dashboard-detailed"
            element={
              <>
                <div>
                  {isMobile ? <ConditionalComponent /> : <DashboardDetailed />}
                </div>
              </>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <>
                <div>
                  {isMobile ? <ConditionalComponent /> : <AdminDashboard />}
                </div>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <div>
                  <LoginPage />
                </div>
              </>
            }
          />
          <Route
            path="/login-app"
            element={
              <>
                <div>
                  <LoginPage />
                </div>
              </>
            }
          />
          <Route
            path="/otp-validation"
            element={
              <>
                <div>
                  <OtpVerification />
                </div>
              </>
            }
          />
          <Route
            path="/user/:id"
            element={
              <>
                <div>
                  {isMobile ? <ConditionalComponent /> : <UserDataComponent />}
                </div>
              </>
            }
          />
          UserDetailedDashboard
          <Route
            path="/dashboard-detailed/:id"
            element={
              <>
                <div>
                  {isMobile ? (
                    <ConditionalComponent />
                  ) : (
                    <UserDetailedDashboard />
                  )}
                </div>
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <div
                  style={{
                    height: "100vh",
                    display: "grid",
                    alignContent: "center",
                    justifyItems: "center",
                  }}
                >
                  <h1>404 Error</h1>
                  <h1>Page not found</h1>
                  <a href="https://www.adefteducation.com/">
                    <button className="btn border">Go Back</button>
                  </a>
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
