import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouteMangane from "./routes/Route";
import "./index.css";
function App() {
  return (
    <Router>
      <RouteMangane />
    </Router>
  );
}

export default App;
