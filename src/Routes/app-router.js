import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "../Components/AdminDashboard";
import ProfilerPage from "../Components/Profiler";
import ChancesOfSelection from "../Components/Profiler/output";
import InstructionFocusPage from "../Components/GMAT/FocusEdition/instructions-focus.js";
import InstructionPage from "../Components/GMAT/OldEdition/instructions.js";
import ProfilerLandingPage from "../Pages/profiler-landing-page";
import PracticeQuestionsPage from "../Pages/practice-questions-page";
import CategoryVideos from "../Pages/videos-page/category-videos.js";
import CategoryQuestions from "../Pages/practice-questions-page/category-questions.js";
import OtpVerification from "../Components/Auth/otp-verification";
import PrivacyPolicy from "../Legal/privacy-policy";
import ForgotPasswordPage from "../Components/Auth/forgot-password";
import UserDataComponent from "../Components/AdminDashboard/users";
import UserDetailedDashboard from "../Components/AdminDashboard/user-detailed-dashboard";
import LMSRepresentation from "../Components/LMS-Screen";
import HomePage from "../Pages/home-page";
import LoginPage from "../Pages/login-page";
import BlogsMainPage from "../Pages/blog-page/main";
import BlogsPage from "../Pages/blog-page";
import {
  gmat_landing_path,
  gmat_dashboard_path,
  home_path,
  profiler_landing_path,
  profiler_path,
  gmat_results_path,
  gmat_results_focus_path,
  registration_payment_path,
  success_registration_path,
  gmat_practice_exam_path,
} from "../Config/config.js";
import GMATLandingPage from "../Pages/GMAT-landing-page/index.js";
import DashboardMainPage from "../Components/GMAT/index.js";
import PracticeExam from "../Components/GMAT/OldEdition/practice-exam.js";
import RegistrationPricing from "../Components/Payment/PricingPage.js";
import SuccessRegistration from "../Components/Payment/success-registration.js";
import Canceled from "../Components/Payment/Canceled.js";
import ResultFocusPage from "../Components/GMAT/FocusEdition/result-focus.js";
import ResultPage from "../Components/GMAT/OldEdition/result.js";

const ConditionalComponent = () => {
  return (
    <>
      <div
        className="container-fluid img_container"
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
            path={home_path}
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route
            path={profiler_path}
            element={
              <>
                <ProfilerPage />
              </>
            }
          />
          <Route
            path={profiler_landing_path}
            element={
              <>
                <ProfilerLandingPage />
              </>
            }
          />
          <Route
            path={gmat_dashboard_path}
            element={
              <>
                <DashboardMainPage />
              </>
            }
          />
          <Route
            path={gmat_practice_exam_path}
            element={
              <>
                <PracticeExam />
              </>
            }
          />
          <Route
            path={gmat_results_path}
            element={
              <>
                <ResultPage />
              </>
            }
          />
          <Route
            path={gmat_results_focus_path}
            element={
              <>
                <ResultFocusPage />
              </>
            }
          />

          <Route
            path={registration_payment_path}
            element={
              <>
                <RegistrationPricing />
              </>
            }
          />

          <Route
            path={success_registration_path}
            element={
              <>
                <SuccessRegistration />
              </>
            }
          />

          <Route
            path={"/canceled.html"}
            element={
              <>
                <Canceled />
              </>
            }
          />
          {/* <Route
            path="/videos"
            element={
              <>
                <VideosPage />
              </>
            }
          /> */}
          <Route
            path="/practice-questions"
            element={
              <>
                <PracticeQuestionsPage />
              </>
            }
          />
          <Route
            path="/category-questions"
            element={
              <>{isMobile ? <ConditionalComponent /> : <CategoryQuestions />}</>
            }
          />
          <Route
            path="/category-videos"
            element={
              <>
                <CategoryVideos />
              </>
            }
          />
          <Route
            path="/selection-chance"
            element={
              <>
                <ChancesOfSelection />
              </>
            }
          />
          <Route
            path={gmat_landing_path}
            element={
              <>{isMobile ? <ConditionalComponent /> : <GMATLandingPage />}</>
            }
          />

          <Route
            path="/instructions"
            element={
              <>
                <InstructionPage />
              </>
            }
          />
          <Route
            path="/instructions-focus"
            element={
              <>
                <InstructionFocusPage />
              </>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <>{isMobile ? <ConditionalComponent /> : <AdminDashboard />}</>
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
              <>{isMobile ? <ConditionalComponent /> : <UserDataComponent />}</>
            }
          />
          <Route
            path="/dashboard-detailed/:id"
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
          <Route
            path="/blogs"
            element={
              <>
                <div>
                  <BlogsMainPage />
                </div>
              </>
            }
          />
          <Route
            path="/post"
            element={
              <>
                <div>
                  <BlogsPage />
                </div>
              </>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <>
                <div>
                  <PrivacyPolicy />
                </div>
              </>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <>
                <div>
                  <ForgotPasswordPage />
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
