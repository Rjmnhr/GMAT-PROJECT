import "./App.css";
import AppRouter from "./app-routes/app-router";
import { AppContextProvider } from "./context/app-context";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <AppRouter />
      </AppContextProvider>
    </div>
  );
}

export default App;
