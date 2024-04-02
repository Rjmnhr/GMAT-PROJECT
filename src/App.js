import "./App.css";
import AppRouter from "./Routes/app-router";
import { AppContextProvider } from "./Context/app-context";

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
