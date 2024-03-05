import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Footer } from "./components/Footer";
import { Protect } from "./components/Protect";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { PrivateNavbar } from "./components/PrivateNavbar";
import { Profile } from "./pages/Profile";
import { DeleteAccount } from "./pages/DeleteAccount";

export const App = () => {

  const { isAuthenticated, user } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  return (
    <div className="app-container">
      {isAuthenticated || user?._id ? <PrivateNavbar /> : <Navbar />}
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
        <Route path="/reset/password/:resetToken" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={
            <Protect>
              <Profile />
            </Protect>
          }
        />
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
