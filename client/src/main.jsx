import "./bootstrap/css/bootstrap.min.css";
import "./index.css";
import "./font-awesome/css/font-awesome.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from 'react-redux';
import { App } from "./App.jsx";
import { store } from "./store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
