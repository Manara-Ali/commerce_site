import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Footer } from "./components/Footer";
import { checkAuthThunk } from "./store";
import { Protect } from "./components/Protect";
import { ForgotPassword } from "./pages/ForgotPassword";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Protect>
              <Home />
            </Protect>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
      </Routes>
        <Footer />
    </div>
  );
};

export default App;
