import "./bootstrap/css/bootstrap.min.css";
import "./index.css";
import "./font-awesome/css/font-awesome.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/index.js";
import { App } from "./App.jsx";
import { store } from "./store/index.js";
import { CustomProvider } from "./context/ModalContext.jsx";
import { CustomQuantityProvider } from "./context/QuantityContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomProvider>
          <CustomQuantityProvider>
            <App />
          </CustomQuantityProvider>
        </CustomProvider>
      </PersistGate>
    </Provider>
  </Router>
);
