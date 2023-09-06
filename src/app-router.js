import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardComponent from "./pages/dashboard";
import TestPage from "./pages/test-page/index";
import InstructionPage from "./pages/instruction";
import ResultPage from "./pages/results";
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
            path="/test"
            element={
              <>
                <div>
                  <TestPage />
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
            path="/results"
            element={
              <>
                <div>
                  <ResultPage />
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
