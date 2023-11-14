import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouteManage from "./routes/Route";
import "./index.css";
import { AuthProvider } from "./contexts/auth";
import { StatusProvider } from "./contexts/status";
import { CategoryContext, CategoryProvider } from "./contexts/category";
import { ItemProvider } from "./contexts/Items";
function App() {
  return (
    <Router>
      <StatusProvider>
        <AuthProvider>
          <CategoryProvider>
            <ItemProvider>
              <RouteManage />
            </ItemProvider>
          </CategoryProvider>
        </AuthProvider>
      </StatusProvider>
    </Router>
  );
}

export default App;
