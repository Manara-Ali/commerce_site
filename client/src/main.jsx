import "./bootstrap/css/bootstrap.min.css";
import "./index.css";
import "./font-awesome/css/font-awesome.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import { persistor } from "./store/index.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { App } from "./App.jsx";
import { store } from "./store/index.js";
import { CustomProvider } from "./context/ModalContext.jsx";
import { CustomQuantityProvider } from "./context/QuantityContext.jsx";
import { CustomSizeProvider } from "./context/SizeContext.jsx";
import { CustomPriceProvider } from "./context/PriceContext.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

const stripeLoad = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const options = {
  mode: "payment",
  currency: "usd",
  amount: 1099,
};

if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomProvider>
          <CustomPriceProvider>
            <CustomSizeProvider>
              <CustomQuantityProvider>
                <Elements stripe={stripeLoad} options={options}>
                  <HelmetProvider>
                    <App />
                  </HelmetProvider>
                </Elements>
              </CustomQuantityProvider>
            </CustomSizeProvider>
          </CustomPriceProvider>
        </CustomProvider>
      </PersistGate>
    </Provider>
  </Router>
);
