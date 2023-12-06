import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardComponent from "../pages/dashboard";
import ProtectedRoute from "./protected-route";
import InstructionPage from "../pages/instruction";
import ResultPage from "../pages/results";
import QuantTestPage from "../pages/quant-test-page";
import VerbalTestPage from "../pages/verbal-test-page";
import SectionDivider from "../components/section-divider";
import OptionalBreak from "../components/optional-break";
import IRTestPage from "../pages/IR_section";
import DashboardDetailed from "../components/detailed-dashboard";
import VideosPage from "../pages/videos-page";
import LoginPage from "../pages/login-page";
import OtpVerification from "../pages/otp-verification";
import AdminDashboard from "../components/admin-dashboard";
import UserDataComponent from "../components/user-details";
import UserDetailedDashboard from "../components/user-details/user-detailed-dashboard";
import "../pages/home-page/style.css";
import HomePage from "../pages/home-page";
import ProfilerPage from "../pages/profiler-page";
import ChancesOfSelection from "../pages/chances-of-selection";
import CategoryVideos from "../pages/videos-page/category-videos";

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
                <HomePage />
              </>
            }
          />
          <Route
            path="/profiler"
            element={
              <ProtectedRoute
                element={
                  <>
                    <ProfilerPage />
                  </>
                }
              />
            }
          />
          <Route
            path="/videos"
            element={
              <ProtectedRoute
                element={
                  <>
                    <VideosPage />
                  </>
                }
              />
            }
          />
          <Route
            path="/category-videos"
            element={
              <ProtectedRoute
                element={
                  <>
                    <CategoryVideos />
                  </>
                }
              />
            }
          />
          <Route
            path="/selection-chance"
            element={
              <ProtectedRoute
                element={
                  <>
                    <ChancesOfSelection />
                  </>
                }
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={
                  <>
                    {isMobile ? (
                      <ConditionalComponent />
                    ) : (
                      <DashBoardComponent />
                    )}
                  </>
                }
              />
            }
          />
          <Route
            path="/quant-test"
            element={
              <ProtectedRoute
                element={
                  <>{isMobile ? <ConditionalComponent /> : <QuantTestPage />}</>
                }
              />
            }
          />
          <Route
            path="verbal-test"
            element={
              <ProtectedRoute
                element={
                  <>
                    {isMobile ? <ConditionalComponent /> : <VerbalTestPage />}
                  </>
                }
              />
            }
          />
          <Route
            path="/instructions"
            element={
              <ProtectedRoute
                element={
                  <>
                    <InstructionPage />
                  </>
                }
              />
            }
          />
          <Route
            path="/section"
            element={
              <ProtectedRoute
                element={
                  <>
                    <SectionDivider />
                  </>
                }
              />
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute
                element={
                  <>
                    <ResultPage />
                  </>
                }
              />
            }
          />
          <Route
            path="/test-break"
            element={
              <ProtectedRoute
                element={
                  <>
                    <OptionalBreak />
                  </>
                }
              />
            }
          />
          <Route
            path="/ir-test"
            element={
              <ProtectedRoute
                element={
                  <>{isMobile ? <ConditionalComponent /> : <IRTestPage />}</>
                }
              />
            }
          />
          <Route
            path="/dashboard-detailed"
            element={
              <ProtectedRoute
                element={
                  <>
                    {isMobile ? (
                      <ConditionalComponent />
                    ) : (
                      <DashboardDetailed />
                    )}
                  </>
                }
              />
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                element={
                  <>
                    {isMobile ? <ConditionalComponent /> : <AdminDashboard />}
                  </>
                }
              />
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
              <ProtectedRoute
                element={
                  <>
                    {isMobile ? (
                      <ConditionalComponent />
                    ) : (
                      <UserDataComponent />
                    )}
                  </>
                }
              />
            }
          />

          <Route
            path="/dashboard-detailed/:id"
            element={
              <ProtectedRoute
                element={
                  <>
                    {isMobile ? (
                      <ConditionalComponent />
                    ) : (
                      <UserDetailedDashboard />
                    )}
                  </>
                }
              />
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
