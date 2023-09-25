import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardComponent from "./pages/dashboard";

import InstructionPage from "./pages/instruction";
import ResultPage from "./pages/results";
import QuantTestPage from "./pages/quant-test-page";
import VerbalTestPage from "./pages/verbal-test-page";
import SectionDivider from "./components/section-divider";
import OptionalBreak from "./components/optional-break";
import IRTestPage from "./pages/IR_section";
import GetAllQuestions from "./components/get-all-questions";
import DashboardDetailed from "./components/detailed-dashboard";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import OtpVerification from "./pages/otp-verification";
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div>
                  <HomePage />
                </div>
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <div>
                  <DashBoardComponent />
                </div>
              </>
            }
          />

          <Route
            path="/quant-test"
            element={
              <>
                <div>
                  <QuantTestPage />
                </div>
              </>
            }
          />
          <Route
            path="verbal-test"
            element={
              <>
                <div>
                  <GetAllQuestions />
                  <VerbalTestPage />
                </div>
              </>
            }
          />
          <Route
            path="/instructions"
            element={
              <>
                <div>
                  <GetAllQuestions />
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
                  <IRTestPage />
                </div>
              </>
            }
          />
          <Route
            path="/dashboard-detailed"
            element={
              <>
                <div>
                  <DashboardDetailed />
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
            path="/otp-validation"
            element={
              <>
                <div>
                  <OtpVerification />
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
