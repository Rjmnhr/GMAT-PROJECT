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
import LMSRepresentation from "../components/lms-representation";
import PracticeQuestionsPage from "../pages/practice-questions-page";
import CategoryQuestions from "../pages/practice-questions-page/category-questions";
import DashboardDetailed from "../pages/detailed-dashboard";
import InstructionFocusPage from "../pages/instruction-focus";
import SectionDividerFocus from "../components/section-divider-focus";
import QuantTestPageFocus from "../pages/quant-test-page/quant-test-page-focus";
import VerbalTestPageFocus from "../pages/verbal-test-page/verbal-test-page-focus";
import DataInsightsTestPage from "../pages/IR_section/data-insights-test-page";
import OptionalBreakFocus from "../components/optional-break/optional-break-focus";
import ResultPageFocus from "../pages/results/results-focus";
import BlogsPage from "../pages/blog-page";

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
            path="/practice-questions"
            element={
              <ProtectedRoute
                element={
                  <>
                    <PracticeQuestionsPage />
                  </>
                }
              />
            }
          />
          <Route
            path="/category-questions"
            element={
              <ProtectedRoute
                element={
                  <>
                    {isMobile ? (
                      <ConditionalComponent />
                    ) : (
                      <CategoryQuestions />
                    )}
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
            path="/gmat"
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
            path="/quant-test-focus"
            element={
              <ProtectedRoute
                element={
                  <>
                    {isMobile ? (
                      <ConditionalComponent />
                    ) : (
                      <QuantTestPageFocus />
                    )}
                  </>
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
            path="verbal-test-focus"
            element={
              <ProtectedRoute
                element={
                  <>
                    {isMobile ? (
                      <ConditionalComponent />
                    ) : (
                      <VerbalTestPageFocus />
                    )}
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
            path="/instructions-focus"
            element={
              <ProtectedRoute
                element={
                  <>
                    <InstructionFocusPage />
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
            path="/section-focus"
            element={
              <ProtectedRoute
                element={
                  <>
                    <SectionDividerFocus />
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
            path="/results-focus"
            element={
              <ProtectedRoute
                element={
                  <>
                    <ResultPageFocus />
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
            path="/test-break-focus"
            element={
              <ProtectedRoute
                element={
                  <>
                    <OptionalBreakFocus />
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
            path="/data-insights-test"
            element={
              <ProtectedRoute
                element={
                  <>
                    {isMobile ? (
                      <ConditionalComponent />
                    ) : (
                      <DataInsightsTestPage />
                    )}
                  </>
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
            path="/lms"
            element={
              <>
                <div>
                  <LMSRepresentation />
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
            path="/blogs"
            element={
              <>
                <div>
                  <BlogsPage />
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
