import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardComponent from "./pages/dashboard";

import InstructionPage from "./pages/instruction";
import ResultPage from "./pages/results";
import QuantTestPage from "./pages/quant-test-page";
import VerbalTestPage from "./pages/verbal-test-page";
import SectionDivider from "./components/section-divider";
import OptionalBreak from "./components/optional-break";
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
