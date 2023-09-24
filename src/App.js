import "./App.css";
import AppRouter from "./app-router";
import { AppContextProvider } from "./app-context";

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
