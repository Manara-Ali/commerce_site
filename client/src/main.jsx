import "./bootstrap/css/bootstrap.min.css";
import "./index.css";
import "./font-awesome/css/font-awesome.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
